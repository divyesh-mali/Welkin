import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import ScreenWrapper from './../components/ScreenWrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';


const index = () => {
  const router = useRouter()
  return (
    <ScreenWrapper>
      {/* {console.log('hello')} */}
      
      <Text>index</Text>
      <Button title='welcome' onPress={ () => router.push('welcome') } />
    </ScreenWrapper> 
  )
}

export default index