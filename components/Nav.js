import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { colors } from "../functions/Themes";
import { AuthContext } from "../providers/AuthContext";

const Nav = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.nav}>
      <View>
        <Text style={styles.title}>Zdravo,</Text>
        <Text style={styles.subtitle}>Šta kuvamo danas?</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image
          style={styles.image}
          source={
            user ? { uri: user.image } : require("../assets/global/user.png")
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 25,
    paddingLeft: 25,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: colors.textColor,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    color: colors.textColor,
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 50,
  },
});

export default Nav;
