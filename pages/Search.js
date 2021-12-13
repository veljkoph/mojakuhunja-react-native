import React from "react";
import AllRecipes from "../components/AllRecipes";
import { ScrollView, StyleSheet, Text } from "react-native";
import { colors } from "../functions/Themes";

const Search = ({ navigation, route }) => {
  return (
    <ScrollView style={styles.search}>
      <Text style={styles.title}>Pretraga</Text>
      <AllRecipes route={route} navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  search: {
    paddingTop: 25,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 27,
    fontWeight: "600",
    paddingLeft: 25,
    color: colors.textColor,
  },
});

export default Search;
