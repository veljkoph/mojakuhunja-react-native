import React, { useContext, useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//context
import { AuthContext } from "../providers/AuthContext";
import Yellow from "../assets/global/yellow.png";
import * as ImagePicker from "expo-image-picker";
import axios from "react-native-axios";
import { API_URL_USERS } from "@env";

//functions
import { colors, colorScheme } from "../functions/Themes";
import { uploadCloud } from "../functions/UploadImage";
import pickImage from "../functions/ImagePicker";

const Settings = ({ navigation }) => {
  const { user, logout, setUser } = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(false);

  ///IMAGE PICK
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const changePic = async (url) => {
    const newImage = await axios.put(`${API_URL_USERS}/changepic`, {
      userID: user.id,
      image: url,
    });
  };

  const saveImage = async () => {
    if (user) {
      setisLoading(true);
      const image = await pickImage();

      const upload = await uploadCloud(image);
      const newImage = await changePic(upload.data.url);
      const newPicUser = {
        id: user.id,
        loggedIn: user.loggedIn,
        username: user.username,
        name: user.name,
        image: upload.data.url,
      };
      await AsyncStorage.setItem("User", JSON.stringify(newPicUser));
      await setUser(newPicUser);
      setisLoading(false);
    }
  };

  if (!user)
    return (
      <View style={styles.notlogged}>
        <ImageBackground source={Yellow} style={styles.imageBackground} />
        <Text style={styles.notloggedText}>Morate biti prijavljeni</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.buttonText}>Prijavi se</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <View style={styles.settings}>
      <ImageBackground source={Yellow} style={styles.imageBackground} />
      <Text style={styles.title}>Podesavanja</Text>
      <View style={styles.info}>
        {isLoading ? (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#79266b"
          />
        ) : (
          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={{ uri: user.image }} />
            <TouchableOpacity
              style={styles.imageBtn}
              onPress={() => saveImage()}
            >
              <Image
                source={
                  colorScheme === "light"
                    ? require("../assets/global/camera.png")
                    : require("../assets/global/cameraLight.png")
                }
              />
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.username}</Text>
        <TouchableOpacity onPress={() => logout()} style={styles.button}>
          <Text style={styles.buttonText}>Odjavi se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settings: {
    paddingTop: 110,
    backgroundColor: colors.background,
  },
  imageBackground: {
    width: "100%",
    height: 199,
    position: "absolute",
    top: -10,
    justifyContent: "center",
    flex: 1,
  },
  image: {
    height: 160,
    width: 160,
    borderRadius: 100,
  },
  loader: {
    marginTop: 100,
  },
  imageWrapper: {
    height: 160,
    width: 160,
    borderRadius: 100,
    position: "relative",
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    alignSelf: "center",
    color: colors.textColor,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 10,
    color: colors.textColor,
  },
  email: {
    fontWeight: "400",
    fontSize: 15,
    marginTop: 10,
    color: colors.textColor,
  },
  info: {
    marginTop: 44,
    alignItems: "center",
    //  justifyContent: "center",
    display: "flex",
    height: "100%",
  },
  button: {
    backgroundColor: "#2a9d8f",
    paddingTop: 11,
    paddingBottom: 11,
    paddingHorizontal: 33,
    borderRadius: 20,
    marginTop: 10,
    position: "absolute",
    bottom: 190,
  },
  saveChanges: {
    backgroundColor: "#f4a261",
    borderRadius: 20,
    alignItems: "center",
    margin: 10,
    paddingVertical: 10,
    // paddingHorizontal: 50,
    width: 136,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  buttonTextBlack: {
    fontSize: 16,
    color: "#000",
    fontWeight: "normal",
  },
  imageBtn: {
    position: "absolute",
    backgroundColor: colors.background,
    opacity: 0.8,
    borderRadius: 100,
    bottom: 0,

    width: "100%",
    alignItems: "center",
  },
  notlogged: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    height: "100%",
  },
  notloggedText: {
    fontSize: 24,
    marginBottom: 10,
  },
});
export default Settings;
