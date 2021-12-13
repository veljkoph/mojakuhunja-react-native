import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import axios from "react-native-axios";
import { AuthContext } from "../providers/AuthContext";
import Recipe from "./Recipe";
import { API_URL_RECIPES } from "@env";
import { colors } from "../functions/Themes";
const MyRecipes = ({ navigation, route }) => {
  const [myRecipes, setMyRecipes] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("UseEffect: GET MYRECIPES");
    if (user) {
      const getMyRecipes = () => {
        axios
          .get(`${API_URL_RECIPES}/my/${user.id}`)
          .then(function (response) {
            setMyRecipes(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      getMyRecipes();
    }
  }, [user.id]);

  return (
    <>
      <Text style={styles.title}>Moji recepti</Text>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 15,
          paddingLeft: 25,
        }}
        horizontal={true}
        style={styles.scrollView}
      >
        {myRecipes?.map((recipe) => (
          <Recipe
            route={route}
            navigation={navigation}
            recipe={recipe}
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
    paddingBottom: 24,
    flex: 1,
  },
});
export default MyRecipes;
