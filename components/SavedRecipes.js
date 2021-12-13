import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import axios from "react-native-axios";
import { AuthContext } from "../providers/AuthContext";
import Recipe from "./Recipe";
import { API_URL_RECIPES } from "@env";
import { colors } from "../functions/Themes";

const SavedRecipes = ({ navigation, route }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const getSavedRecipes = () => {
        console.log("UseEffect: GET SAVEDRECIPES");
        const userID = user.id;
        axios
          .get(`${API_URL_RECIPES}/savedrecipes`, {
            params: {
              userID,
            },
          })
          .then(function (response) {
            setSavedRecipes(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      getSavedRecipes();
    }
  }, [user.id]);

  return (
    <>
      <Text style={styles.title}>Sačuvani recepti</Text>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 15,
          paddingLeft: 5,
          paddingLeft: 25,
        }}
        horizontal={true}
        style={styles.scrollView}
      >
        {savedRecipes?.map((recipe) => (
          <Recipe
            recipe={recipe}
            route={route}
            navigation={navigation}
            key={recipe.id}
          />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 23,
    marginTop: 20,
    paddingLeft: 25,
    color: colors.textColor,
  },
  scrollView: {
    display: "flex",
    flex: 1,
  },
});
export default SavedRecipes;
