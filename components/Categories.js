import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { colors } from "../functions/Themes";

//Components

const Categories = ({ navigation, setCategory }) => {
  return (
    <View style={styles.categories}>
      <Text style={styles.title}>Kategorije </Text>
      <ScrollView
        style={styles.scrollcategories}
        horizontal={true}
        persistentScrollbar={true}
        contentContainerStyle={{ paddingRight: 35 }}
      >
        <TouchableOpacity onPress={() => setCategory("")} style={styles.button}>
          <Image
            style={styles.icon}
            source={require("../assets/categories-icons/all.png")}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setCategory("pasta")}
        >
          <Image
            style={styles.icon}
            source={require("../assets/categories-icons/pasta.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCategory("pizza")}
        >
          <Image
            style={styles.icon}
            source={require("../assets/categories-icons/pizza.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCategory("burger")}
        >
          <Image
            style={styles.icon}
            source={require("../assets/categories-icons/burger.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory("meat")}
          style={styles.button}
        >
          <Image
            style={styles.icon}
            source={require("../assets/categories-icons/meat.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCategory("cake")}
        >
          <Image
            style={styles.icon}
            source={require("../assets/categories-icons/cupcake.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory("spoon")}
          style={styles.button}
        >
          <Image
            style={styles.icon}
            source={require("../assets/categories-icons/soup.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory("salad")}
          style={styles.button}
        >
          <Image
            style={styles.icon}
            source={require("../assets/categories-icons/salad.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory("pie")}
          style={styles.button}
        >
          <Image
            style={styles.icon}
            source={require("../assets/categories-icons/pie.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory("fish")}
          style={styles.button}
        >
          <Image
            style={styles.icon}
            source={require("../assets/categories-icons/fish.png")}
          ></Image>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categories: {
    marginTop: 18,
  },
  scrollcategories: {
    paddingBottom: 15,
    paddingLeft: 25,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textColor,
    paddingLeft: 25,
  },
  icon: {
    height: 40,
    width: 40,
  },
  button: {
    backgroundColor: "#ffb703",
    padding: 15,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginRight: 10,
  },
});

export default Categories;
