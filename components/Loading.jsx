import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { ActivityIndicator } from 'react-native' // Fixed typo which caused error. Change: react-native-web to react-native

// Fixed typo which caused error. Change: changed theme.color.primary to theme.colors.primary
export const Loading = ({size="large", color=theme.colors.primary}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})