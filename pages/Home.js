import * as React from "react";
import { StyleSheet, ScrollView, Platform } from "react-native";

//Components
import Categories from "../components/Categories";
import Tags from "../components/Tags";
import Nav from "../components/Nav";
import AllRecipes from "../components/AllRecipes";
import { colors } from "../functions/Themes";

const Home = ({ navigation, route }) => {
  const [category, setCategory] = React.useState("");

  return (
    <ScrollView style={styles.home}>
      <Nav navigation={navigation} />
      <Categories setCategory={setCategory} />
      <Tags setCategory={setCategory} />
      <AllRecipes
        setCategory={setCategory}
        navigation={navigation}
        category={category}
        route={route}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  home: {
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: colors.background,
  },
});

export default Home;
