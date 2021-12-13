import React, { useContext } from "react";

import { View, StyleSheet, ScrollView } from "react-native";

//Components
import { AuthContext } from "../providers/AuthContext";
import Login from "../components/Login";
import MyRecipes from "../components/MyRecipes";
import SavedRecipes from "../components/SavedRecipes";
import { colors } from "../functions/Themes";
const Profile = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);

  if (!user)
    return (
      <View>
        <Login navigation={navigation} />
      </View>
    );
  return (
    <View style={styles.profile}>
      <ScrollView>
        <SavedRecipes route={route} navigation={navigation} />
        <MyRecipes route={route} navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    backgroundColor: colors.background,
    height: "100%",
  },
});

export default Profile;
