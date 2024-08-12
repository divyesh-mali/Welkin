import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp, wp } from '../helpers/common';
import {Image} from 'expo-image';
import {getUserImageSrc} from '../services/imageServices'

const Avatar = ({
    uri,
    size=hp(4.5),
    rounded=theme.radius.md,
    style={}
}) => {
  return (
    // Refer Expo Image docs: https://docs.expo.dev/versions/latest/sdk/image/
    <Image 
        source={getUserImageSrc(uri)} 
        transition={100}
        style={[styles.avatar, {height: size, width: size, borderRadius: rounded}, style]}
    />
  )
}

export default Avatar

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 'continuous',
        borderColor: theme.colors.darkLight,
        borderWidth: 1
    }
})