import * as FileSystem from 'expo-file-system';

export const getUserImageSrc = imagePath => {
    if(imagePath) {
        return {uri: imagePath}
    }
    
    else {
        return require('../assets/images/defaultUser.png')
    }
}

// WE've created bucket in supabase to perform CRUD operations on images. We've set policies for the bucket to allow public access to the images. But editing the image is only allowed to authorised users.
export const uploadFile = async (folderName, fileUri, isImage = true) => {
    try {
        let fileName = getFilePath(folderName, isImage);
        const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {

        });

        // let imageData = decode to array buffer

    }

    catch(error) {
        console.log('file upload error: ', error);
        return {success: false, msg: 'Could not upload media'}
        
    }
}

export const getFilePath = (folderName, isImage) => {
    return `/${folderName}/${(new Date()).getTime()}$(isImage ? '.png': '.mp4')`
    // If you're uploading in a folder named 'profile', the file name will be profile/163123456789.png
    // If you're uploading in a folder named 'posts', the file name will be images/163123456789.png

    // Refer docs: https://supabase.com/docs/reference/javascript/storage-emptybucket
    // " For React Native, using either Blob, File or FormData does not work as intended. Upload file using ArrayBuffer from base64 file data instead, see example below. 
    // Thats why we need to convert image into base64 format. For that we'll 'expo file system' library
}