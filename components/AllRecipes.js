import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "react-native-axios";
import { API_URL_RECIPES } from "@env";
import { colors } from "../functions/Themes";
//components
import Recipe from "./Recipe";

const AllRecipes = ({ navigation, category, route }) => {
  const [recipes, setRecipes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [message, setMessage] = React.useState("");

  const getRecipes = () => {
    setIsLoading(true);

    if (category === "") {
      axios
        .get(`${API_URL_RECIPES}/all`)
        .then((res) => {
          setRecipes(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(`${API_URL_RECIPES}/bycategory/${category}`)
        .then((res) => {
          setRecipes(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (recipes.length === 0 && category !== undefined) {
      setMessage("Nemamo recepata za izabranu kategoriju :((");
    }
  };

  React.useEffect(() => {
    getRecipes();
  }, [category]);

  const searchRecipes = () => {
    if (searchValue !== "") {
      setIsLoading(true);
      axios
        .get(`${API_URL_RECIPES}/byname/${searchValue}`)
        .then((res) => {
          setRecipes(res.data);
          setIsLoading(false);

          setSearchValue("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (recipes.length === 0) {
      setMessage("Nemamo recepata za pretragu probaj nesx drugo brt  :(( ");
    }
  };

  if (isLoading)
    return (
      <ActivityIndicator
        style={styles.loader}
        size="large"
        color={colors.loader}
      />
    );

  return (
    <View style={styles.allrecipes}>
      <View style={styles.searchView}>
        <TextInput
          style={styles.input}
          placeholder="Pretražite.."
          onChangeText={(t) => setSearchValue(t)}
          value={searchValue}
        />
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => searchRecipes()}
        >
          <Image
            style={styles.image}
            source={require("../assets/global/search.png")}
          />
        </TouchableOpacity>
      </View>

      {recipes.length === 0 ? (
        <Text style={styles.norecipesTitle}>{message}</Text>
      ) : (
        recipes.map((recipe) => (
          <Recipe
            route={route}
            navigation={navigation}
            key={recipe.id}
            recipe={recipe}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  allrecipes: {
    marginTop: 10,
    paddingBottom: 70,
    paddingHorizontal: 25,
  },
  searchView: {
    display: "flex",
    flexDirection: "row",
    width: "88%",
  },
  input: {
    backgroundColor: colors.input,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 12,
    width: "100%",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchBtn: {
    backgroundColor: colors.input,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    height: 24,
    width: 24,
    paddingRight: 14,
  },
  loader: {
    marginTop: 120,
  },
  norecipesTitle: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 100,
    color: "#c7c7c7",
  },
});

export default AllRecipes;
