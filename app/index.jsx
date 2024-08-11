import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import ScreenWrapper from './../components/ScreenWrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';


const index = () => {
  const router = useRouter()
  return (
    // <ScreenWrapper>
    //   {/* {console.log('hello')} */}
      
    //   <Text>index</Text>
    //   <Button title='welcome' onPress={ () => router.push('welcome') } />
    // </ScreenWrapper> 

    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Loading />
    </View>
  )
}

export default index