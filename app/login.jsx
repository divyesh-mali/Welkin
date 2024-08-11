import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "./../components/ScreenWrapper";
import Home from "../assets/icons/Home";
import { theme } from "../constants/theme";
import Icon from "../assets/icons";
import icons from "../app/login";
import { StatusBar } from "expo-status-bar";
import BackButton from "../components/BackButton";
import { useRouter } from "expo-router";
import { wp, hp } from "../helpers/common";
import { TextInput } from "react-native"; // Fixed typo which caused error. Change: react-native-web to react-native
import Input from "../components/Input";
// import { Button } from "react-native"; // DONT IMPORT BUILT IN 'BUTTON' COMPONENT
import Button from "../components/Button"; // Import our custom 'Button' component for reusability
import { supabase } from "../lib/supabase";

const login = () => {
  // We're using 'reference' to store login details instead of 'state' because we don't need to re-render the component when the user types in the input field. It actually changes value when the user types every single character & make the component re-render.
  // This is not a good practice because it's not efficient. So, we use 'reference' to store the value of the input field. It doesn't re-render the component when the user types in the input field. It only re-renders when the user clicks the submit button.

  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    
    if( !emailRef.current || !passwordRef.current ) {
    Alert.alert("Please fill all the fields");
    return;
  }

  let email = emailRef.current.trim()
  let password = passwordRef.current.trim()
  setLoading(true)
  const {error} = await supabase.auth.signInWithPassword({
    email,
    password
  });

  setLoading(false)

  console.log('error: ', error)
  if(error) {
    Alert.alert('Login ', error.message)
  }
}

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />

        {/* Welcome  */}
        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        {/* form  */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please login to continue
          </Text>

          <Input
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder="Email"
            onChangeText={(value) => {
              emailRef.current = value;
            }}
          />

          <Input
            icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(value) => {
              passwordRef.current = value;
            }}
          />

          <Text style={styles.forgotPassword}>
            Forgot Password?
          </Text>

          {/* Button  */}
          <Button title={'Login'} loading={loading} onPress={onSubmit} />
        </View>


          {/* footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?
            </Text>
            <Pressable onPress={() => router.push('signUp')}>
              <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>Signup</Text>
            </Pressable>
          </View>
            
      </View>
    </ScreenWrapper>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },

  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.extraBold,
    color: theme.colors.text,
  },

  form: {
    gap: 25,
  },

  forgotPassword: {
    textAlign: "right",
    fontweight: theme.fonts.bold,
    color: theme.colors.text,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  footerText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
