import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import { supabase } from './../lib/supabase';
import { supabaseUrl } from './../constants/index';

export const getUserImageSrc = imagePath => {
    if(imagePath) {
        return getSupabaseFileUrl(imagePath)
    }
    
    else {
        return require('../assets/images/defaultUser.png')
    }
}

export const getSupabaseFileUrl = filePath => {
    if(filePath) {
        // The part of this url before '/storage....' is same as which we had set as 'supabaseUrl'
        return {uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`}
    }
}

// WE've created bucket in supabase to perform CRUD operations on images. We've set policies for the bucket to allow public access to the images. But editing the image is only allowed to authorised users.
export const uploadFile = async (folderName, fileUri, isImage = true) => {
    try {
        let fileName = getFilePath(folderName, isImage);
        const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64
        });

        // For conversion of base64 to ArrayBuffer we've used 'base64-arraybuffer' library
        let imageData = decode(fileBase64); // ArrayBuffer
        // After this conversion you can upload it to Supabase storage
        // Refer docs: https://supabase.com/docs/reference/javascript/storage-from-upload

        let {data, error} = await supabase
        .storage
        .from('uploads') // Name of the bucket
        .upload(fileName, imageData, {
            cacheControl: '3600', // 1 hour
            upsert: false, // If file exists, do not overwrite
            contentType: isImage ? 'image/*' : 'video/*'
        });

        if(error) {
            console.log('File upload error: ', error);
            return {success: false, msg: 'Could not upload media'}
        }

        // console.log('data: ', data); // For debugging purpose
        return {success: true, data: data.path}
        

    }

    catch(error) {
        console.log('file upload error: ', error);
        return {success: false, msg: 'Could not upload media'}
        
    }
}

export const getFilePath = (folderName, isImage) => {
    return `/${folderName}/${(new Date()).getTime()}${isImage? '.png': '.mp4'}`
    // If you're uploading in a folder named 'profile', the file name will be profile/163123456789.png
    // If you're uploading in a folder named 'posts', the file name will be images/163123456789.png
    // Refer the console logs to see the file path after uploading the image

    

    // Refer docs: https://supabase.com/docs/reference/javascript/storage-emptybucket
    // " For React Native, using either Blob, File or FormData does not work as intended. Upload file using ArrayBuffer from base64 file data instead, see example below. 
    // Thats why we need to convert image into base64 format. For that we'll 'expo file system' library
}