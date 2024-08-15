import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { theme } from "./../../constants/theme";
import { wp, hp } from "./../../helpers/common";
import { Image } from "expo-image";
import Icon from "../../assets/icons";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";
import { getUserImageSrc } from "../../services/imageServices";
import Input from "../../components/Input";
import { Button } from "../../components/Button"; // Fixed typo which caused error. Change: react-native to react-native-web. Error: Text string must be rendered within a <Text> component.
import { Alert } from "react-native";
import { updateUser } from "../../services/userServices";
import { router, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const EditProfile = () => {
  const { user: currentUser, setUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    image: null,
    bio: "",
    address: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser.name || "",
        phoneNumber: currentUser.phoneNumber || "",
        image: currentUser.image || null,
        bio: currentUser.bio || "",
        address: currentUser.address || "",
      });
    }
  }, [currentUser]);

  // Refer ImagePicker docs: https://docs.expo.dev/versions/latest/sdk/imagepicker/
  const onPickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Changed this from '.All' to '.Images' to allow only images
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7, // Just set this value from 1 to 0.7 to reduce the image size for large images
    });
    if(!result.canceled) {
      setUser({...user, image: result.assets[0]})
    }
  }


  const onSubmit = async () => {
    let userData = { ...user };
    let { name, phoneNumber, address, image, bio } = userData;
    if (!name || !phoneNumber || !address || !bio || !image) {
      Alert.alert("Profile", "Please fill all the fields");
      return;
    }
    setLoading(true);

    if(typeof image == 'object') {
      // upload image
    }

    // update user
    const res = await updateUser(currentUser?.id, userData);
    setLoading(false); // This is used to stop loading after the data is updated

    // console.log("update user result: ", res); // For debugging purpose
    if (res.success) {
      setUserData({ ...currentUser, ...userData });
      router.back();
    }
  };

  let imageSource = user.image && typeof user.image =='object' ? user.image.uri : getUserImageSrc(user.image);
  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Header title="Edit Profile" />

          {/* form */}
          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image source={imageSource} style={styles.avatar} />
              <Pressable style={styles.cameraIcon} onPress={onPickImage}>
                <Icon name="camera" size={20} strokeWidth={2.5} />
              </Pressable>
            </View>

            <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
              Please fill your profile details
            </Text>

            <Input
              icon={<Icon name="user" />}
              placeholder="Enter your name"
              value={user.name}
              onChangeText={(value) => setUser({ ...user, name: value })} // https://chatgpt.com/share/8fb4122c-6533-4ab9-b3ee-3c7fdcced467
            />

            <Input
              icon={<Icon name="call" />}
              placeholder="Enter your phone number"
              value={user.phoneNumber}
              onChangeText={(value) => setUser({ ...user, phoneNumber: value })}
            />

            <Input
              icon={<Icon name="location" />}
              placeholder="Enter your address"
              value={user.address}
              onChangeText={(value) => setUser({ ...user, address: value })}
            />

            <Input
              placeholder="Enter your bio"
              value={user.bio}
              multiline={true}
              containerStyle={styles.bio}
              onChangeText={(value) => setUser({ ...user, bio: value })}
            />

            <Button title="Update" loading={loading} onPress={onSubmit} />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },

  avatarContainer: {
    height: hp(14),
    width: hp(14),
    alignSelf: "center",
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: theme.radius.xxl * 1.8,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: theme.colors.darkLight,
  },

  cameraIcon: {
    position: "absolute",
    bottom: 8,
    right: -10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: theme.colors.textLight,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },

  form: {
    gap: 18,
    marginTop: 20,
  },

  input: {
    flexDirection: "row",
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: "continuous",
    padding: 17,
    paddingHorizontal: 20,
    gap: 15,
  },

  bio: {
    flexDirection: "row",
    height: hp(15),
    alignItems: "flex-start",
    paddingVertical: 15,
  },
});
