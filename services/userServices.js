// Refer docs for API integration & calling API : https://supabase.com/docs/reference/javascript/select 

import { supabase } from "../lib/supabase"

export const getUserData = async (userId) => {
    try {
        const { data, error } = await supabase
        .from('users')
        .select()
        .eq('id', userId)
        .single()

        if(error) {
            return {success: false, msg: error?.message}
        }
        return {success: true, data}
    }

    catch(error) {
        console.log('got error: ', error);
        return {success: false, msg: error.message}
        
    }
}

// refer docs : https://supabase.com/docs/reference/javascript/update
// You can also 'select' method to update data as used in above function but here we are already having data so we are using 'update' method
export const updateUser = async (userId, data) => {
    try {
        const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', userId)

        if(error) {
            return {success: false, msg: error?.message}
        }
        return {success: true, data}
    }

    catch(error) {
        console.log('got error: ', error);
        return {success: false, msg: error.message}
        
    }
}