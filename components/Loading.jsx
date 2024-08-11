import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native' // Fixed typo which caused error. Change: react-native-web to react-native

const Loading = ({size="large", color=theme.color.primary}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})