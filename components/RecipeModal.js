import React, { useState, useEffect, useContext } from "react";
import axios from "react-native-axios";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { AuthContext } from "../providers/AuthContext";
import { API_URL_RECIPES } from "@env";
import { colors } from "../functions/Themes";

const RecipeModal = ({ route, navigation }) => {
  const [activeDesc, setActiveDesc] = useState("desc");
  const [isLiked, setIsLiked] = useState();
  const [isDisliked, setIsDisliked] = useState();
  const [isMyRecipe, setIsMyRecipe] = useState(false);

  const { user } = useContext(AuthContext);
  const { recipe } = route.params;

  const deleteRecipe = () => {
    if (user) {
      const userID = user.id;
      const recipeID = recipe.id;
      axios
        .delete(`${API_URL_RECIPES}/delete`, {
          data: {
            userID,
            recipeID,
          },
        })
        .then((response) => {
          navigation.goBack();
          alert("Recept je obrisan");
        });
    } else {
      alert("Morate biti registrovani");
    }
  };
  const alertOptions = () => {
    Alert.alert(
      recipe.title,
      "Obriši recept?",
      [
        { text: "Da", onPress: () => deleteRecipe() },
        {
          text: "Ne",
          onPress: () => console.log("Canceled"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const likeRecipe = () => {
    if (user) {
      axios
        .post(`${API_URL_RECIPES}/like`, {
          userID: user.id,
          recipeID: recipe.id,
        })
        .then((response) => {
          setIsLiked(true);
        });
    } else {
      alert("Morate biti regisrovani");
    }
  };
  const dislikeRecipe = () => {
    if (user) {
      axios
        .post(`${API_URL_RECIPES}/dislike`, {
          userID: user.id,
          recipeID: recipe.id,
        })
        .then((response) => {
          setIsDisliked(true);
        });
    } else {
      alert("Morate biti regisrovani");
    }
  };

  useEffect(() => {
    if (user) {
      if (recipe.users_id == user.id) {
        setIsMyRecipe(true);
      }
      const recipeID = recipe.id;
      axios
        .get(`${API_URL_RECIPES}/isliked`, {
          params: {
            userID: user.id,
            recipeID: recipeID,
          },
        })
        .then((response) => {
          setIsLiked(response.data);
        });
      axios
        .get(`${API_URL_RECIPES}/isdisliked`, {
          params: {
            userID: user.id,
            recipeID,
          },
        })
        .then((response) => {
          setIsDisliked(response.data);
        });
    }
  }, [user]);

  return (
    <View style={styles.modal}>
      {Platform.OS !== "ios" ? (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.modalCloseAndroid}
        >
          <Image source={require("../assets/global/previous.png")} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.modalClose}
        />
      )}

      <Image style={styles.banner} source={{ uri: recipe.image }} />
      {isMyRecipe ? (
        <TouchableOpacity
          style={styles.dotsMenu}
          onPress={() => alertOptions()}
        >
          <Image source={require("../assets/global/trash.png")} />
        </TouchableOpacity>
      ) : (
        <Text></Text>
      )}
      <View style={styles.titleWrap}>
        <Text style={styles.title}>{recipe.title}</Text>
      </View>
      <View style={styles.statistics}>
        <TouchableOpacity
          onPress={() => likeRecipe()}
          style={styles.statisticsItem}
        >
          <Image
            source={
              isLiked
                ? require("../assets/global/like-black.png")
                : require("../assets/global/like-transparent.png")
            }
          />
          <Text>{recipe.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statisticsItem}>
          <Image source={require("../assets/global/clock-red.png")} />
          <Text>{recipe.time}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dislikeRecipe()}
          style={styles.statisticsItem}
        >
          <Image
            source={
              isDisliked
                ? require("../assets/global/dislike-black.png")
                : require("../assets/global/dislike-transparent.png")
            }
          />
          <Text>{recipe.dislikes}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.descriptions}>
        <TouchableOpacity
          style={{
            borderColor: activeDesc === "desc" ? "red" : "#c7c7c7",
            borderBottomWidth: 3,
          }}
          onPress={() => setActiveDesc("desc")}
        >
          <Text style={styles.descTitle}>Opis pripreme</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: activeDesc === "ing" ? "red" : "#c7c7c7",
            borderBottomWidth: 3,
          }}
          onPress={() => setActiveDesc("ing")}
        >
          <Text style={styles.descTitle}>Sastojci</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        bounces={false}
        persistentScrollbar={true}
        style={styles.scrollText}
      >
        {activeDesc === "desc" ? (
          <Text style={styles.descText}>{recipe.descr}</Text>
        ) : (
          <Text style={styles.ingText}>{recipe.ingridients}</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.background,
    position: "relative",
    height: "100%",
  },
  modalClose: {
    backgroundColor: "#c7c7c7",
    fontSize: 22,
    width: 93,
    height: 7,
    alignItems: "center",
    display: "flex",
    alignSelf: "center",
    position: "absolute",
    top: 20,
    borderRadius: 15,
    zIndex: 11,
  },
  modalCloseAndroid: {
    position: "absolute",
    top: 35,
    borderRadius: 15,
    zIndex: 11,
    left: 25,
  },
  banner: {
    width: "100%",
    height: 255,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  dotsMenu: {
    position: "absolute",
    right: 20,
    top: 25,
  },
  titleWrap: {
    position: "absolute",
    borderRadius: 15,
    backgroundColor: "rgba(217, 217, 217, 0.7)",
    paddingVertical: 3,
    paddingHorizontal: 11,
    top: 195,
    left: 34,
  },
  title: {
    fontSize: 22,
    fontWeight: "400",
    color: "#212121",
  },
  statistics: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: 25,
  },
  statisticsItem: {
    alignItems: "center",
    padding: 8,
    backgroundColor: colors.input,
    marginEnd: 15,
    borderRadius: 15,
    elevation: 5,
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  descriptions: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingTop: 25,

    justifyContent: "space-between",
  },
  descTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 3,
    color: colors.textColor,
  },
  descText: {
    paddingHorizontal: 25,
    fontSize: 16,
    lineHeight: 22,
    paddingTop: 22,
    textAlign: "left",
    color: colors.textColor,
  },
  ingText: {
    paddingHorizontal: 25,
    fontSize: 16,
    lineHeight: 22,
    paddingTop: 22,
    textAlign: "right",
    color: colors.textColor,
    maxWidth: 150,
    alignSelf: "flex-end",
  },
});
export default RecipeModal;
