import React, { useState, useContext, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Appearance,
} from "react-native";
import { Dimensions } from "react-native";
import axios from "react-native-axios";
import { AuthContext } from "../providers/AuthContext";
import { API_URL_RECIPES } from "@env";
import { colors } from "../functions/Themes";
export const colorScheme = Appearance.getColorScheme();

const Recipe = ({ navigation, recipe, route, deleteRecipe }) => {
  const [isSaved, setIsSaved] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const recipeID = recipe.id;
      const userID = user.id;
      axios
        .get(`${API_URL_RECIPES}/issaved`, {
          params: {
            userID,
            recipeID,
          },
        })
        .then((response) => {
          setIsSaved(response.data);
        });
    }
  }, [user]);

  const likesPercentage = Math.round(
    (parseInt(recipe.likes) /
      (parseInt(recipe.likes) + parseInt(recipe.dislikes))) *
      100
  );

  const saveRecipe = () => {
    if (user) {
      const userID = user.id;
      axios
        .post(`${API_URL_RECIPES}/save`, {
          userID,
          recipeID: recipe.id,
        })
        .then((response) => {
          setIsSaved(!isSaved);
        });
    } else {
      alert("Morate biti registrovani");
    }
  };

  return (
    <TouchableOpacity
      style={
        route.name === "ProfileScreen"
          ? [styles.cardMargin, styles.card]
          : [styles.card]
      }
      onPress={() =>
        navigation.navigate("RecipeModalScreen", { recipe, deleteRecipe })
      }
    >
      <Image style={styles.banner} source={{ uri: recipe.image }} />

      <View style={styles.info}>
        <View style={styles.item}>
          <Image
            style={styles.icon}
            source={
              colorScheme === "light"
                ? require("../assets/global/clock.png")
                : require("../assets/global/clockLight.png")
            }
          />
          <Text style={styles.infotext}>{recipe.time} min</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.infotext}>{likesPercentage}%</Text>
          <Image
            style={styles.icon}
            source={
              colorScheme === "light"
                ? require("../assets/global/like-transparent.png")
                : require("../assets/global/likeLight.png")
            }
          />
        </View>
      </View>
      <View style={styles.infoBottom}>
        <Text style={styles.title}>{recipe.title}</Text>
        <TouchableOpacity onPress={() => saveRecipe()} style={styles.saveBtn}>
          <Image
            style={styles.icon}
            source={
              isSaved
                ? require("../assets/global/bookmarked.png")
                : require("../assets/global/bookmark.png")
            }
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    backgroundColor: colors.recipeBackground,
    borderRadius: 15,
    elevation: 5,
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: Dimensions.get("window").width - 50,
  },
  cardMargin: {
    marginRight: 10,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  infoBottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingTop: 15,
  },

  banner: {
    width: "100%",
    height: 175,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  item: {
    flexDirection: "row",
  },
  icon: {
    width: 20,
    height: 20,
  },
  infotext: {
    fontSize: 16,
    fontWeight: "300",
    marginHorizontal: 5,
    color: colors.textColor,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    maxWidth: 250,
    color: colors.textColor,
  },
  saveBtn: {
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderStyle: "solid",
    borderColor: colors.saveBorder,
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    borderWidth: 1,
    padding: 10,
  },
});

export default Recipe;
