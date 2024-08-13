// This code is used to store the context of user
// When user is loggen in, then its context is stored in the AuthContext so that it can be used in all the components

import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { getUserData } from '../services/userServices'

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}

const MainLayout = () => {
  const {setAuth, setUserData} = useAuth()
  const router = useRouter()

  // Refer docs : https://supabase.com/docs/guides/auth/quickstarts/react-native
  useEffect( () => {
    supabase.auth.onAuthStateChange((_event, session) => {
      // console.log('session user: ', session?.user?.id);

      if(session) {
        // set auth
        // move to home screen
        setAuth(session?.user)
        updateUserData(session?.user, session?.user?.email)
        // console.log('auth user: ', session?.user?.email);
        router.replace('/home') // here we are replacing the screen with home screen so that user can't go back to login/welcome screen and won't have to login again
      }

      else {
        // set auth to null
        // move to welcome screen
        setAuth(null)
        router.replace('/welcome')
      }
      
    })
  }, []) // Here, once I forgot to add the empty array, and it caused the useEffect to run infinitely. So, always remember to add the empty array to avoid infinite loop.

  const updateUserData = async (user, email) => {
    // Getting response from the API defined/called in : ..\services\userServices.js
    let res = await getUserData(user?.id)
    // console.log('got user data: ', res); // For debugging purposes
    if(res.success) setUserData({...res.data, email}) // It doesn't make any difference if we use this function or setAuth function to set the user data. Both will work fine.
    
  }

  return (
    <Stack 
        screenOptions={{
            headerShown: false
        }}
    />
  )
}

export default _layout