import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { wp, hp } from '../helpers/common'
import Loading from './loading'

// I've added this 'export'

export const Button = ({ 
    title, // I added this line and solved the error of 'property "title" doesn't exist 
    buttonStyle,
    textStyle,
    onPress = () => {},
    loading = false, // Control the loading state of button with this prop
    hasShadow = true, // Control the shadow of button with this prop
}) => {

    const shadowStyle = {
        shadowColor: theme.colors.dark,
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4
    }

    if(loading) {
        return (
            <View style={[styles.button, buttonStyle, {backgroundColor: 'white'}]}>
                <Loading />
            </View>
        )
    }
    
  return (
    <Pressable onPress={onPress} style={ [styles.button, buttonStyle, hasShadow && shadowStyle] }>
      <Text style={ [styles.text, textStyle] }>{title}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        height: hp(6.6),
        justifyContent: 'center',
        alignItems: 'center',
        borderCurve: 'continuous',
        borderRadius: theme.radius.xl
    },

    text: {
        color: 'white',
        fontSize: hp(2.5),
        fontWeight: theme.fonts.bold
    }
})