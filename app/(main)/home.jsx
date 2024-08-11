import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";

const Home = () => {

  const {user, setAuth} = useAuth()

  console.log('user: ', user);
  

  const onLogout = async () => {
    // setAuth(null) // We've already set the auth to null in _layout.jsx for logout functionality and so we dont need it here
    const {error} = await supabase.auth.signOut()

    if(error) {
      Alert.alert('Sign out ', "Error signing out!")
    }
  }

  return (
    <ScreenWrapper>
      <Text>Home</Text>
      <Button title="logout" onPress={onLogout} />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
