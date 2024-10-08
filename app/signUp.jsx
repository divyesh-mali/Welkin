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

// Additional Info :-
// We've created policies in Supabase dashboard, due to which, when users signup they are not automtically added to users table. We created a trigger & function that will help us add the user to the users table when they signup.
// This is implemented in the supabase backend for security purposes. You can verify this by going in table editor -> users in the supabase dashboard when you signup a new user.
// Normally we can see users in authentication -> users but we can't see them in the users table. This is because of the policies we've implemented.

const signUp = () => {
  // We're using 'reference' to store login details instead of 'state' because we don't need to re-render the component when the user types in the input field. It actually changes value when the user types every single character & make the component re-render.
  // This is not a good practice because it's not efficient. So, we use 'reference' to store the value of the input field. It doesn't re-render the component when the user types in the input field. It only re-renders when the user clicks the submit button.

  const router = useRouter();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    
    if( !emailRef.current || !passwordRef.current ) {
    Alert.alert("Please fill all the fields");
    return;
  }

  // Refer docs : https://supabase.com/docs/guides/auth/quickstarts/react-native

  let name = nameRef.current.trim()
  let email = emailRef.current.trim()
  let password = passwordRef.current.trim()

  setLoading(true)

  const {data: {session}, error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      // User management guide: https://supabase.com/docs/guides/auth/managing-user-data
      data: {
        name
      }
    }
  });
  setLoading(false)


  // Console statements for debugging purposes :-
  // console.log('session: ', session);
  // console.log('error: ', error);

  if(error) {
    Alert.alert('Sign up ', error.message)
  }
  
}

  // else good to go

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />

        {/* Welcome  */}
        <View>
          <Text style={styles.welcomeText}>Let's,</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        {/* form  */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Enter the details to create an account
          </Text>

          <Input
            icon={<Icon name="user" size={26} strokeWidth={1.6} />}
            placeholder="Name"
            onChangeText={(value) => {
              nameRef.current = value;
            }}
          />

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

          {/* Button  */}
          <Button title={'Sign up'} loading={loading} onPress={onSubmit} />
        </View>


          {/* footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?
            </Text>
            <Pressable onPress={() => router.push('login')}>
              <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>Login</Text>
            </Pressable>
          </View>
            
      </View>
    </ScreenWrapper>
  );
};

export default signUp;

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
