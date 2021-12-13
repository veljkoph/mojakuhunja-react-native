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

const Tags = ({ navigation, setCategory }) => {
  return (
    <View style={styles.categories}>
      <Text style={styles.title}>Često traženo </Text>
      <ScrollView
        style={styles.scrollcategories}
        horizontal={true}
        persistentScrollbar={true}
        contentContainerStyle={{ paddingRight: 35 }}
      >
        <TouchableOpacity
          onPress={() => setCategory("vegan")}
          style={[styles.button, styles.green]}
        >
          <Text style={styles.text}>#vegan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCategory("bolonjeze")}
          style={[styles.button, styles.red2]}
        >
          <Text style={styles.text}>#bolonese</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory("ljuto")}
          style={[styles.button, styles.red]}
        >
          <Text style={styles.text}>#ljuto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory("dijetalno")}
          style={[styles.button, styles.green2]}
        >
          <Text style={styles.text}>#dijetalno</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory("piletina")}
          style={[styles.button, styles.orange]}
        >
          <Text style={styles.text}>#piletina</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory("slatko")}
          style={[styles.button, styles.magenta]}
        >
          <Text style={styles.text}>#slatko</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory("kineska")}
          style={[styles.button, styles.red]}
        >
          <Text style={styles.text}>#kineska</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory("krompir")}
          style={[styles.button, styles.orange]}
        >
          <Text style={styles.text}>#krompir</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categories: {
    marginTop: 10,
  },
  scrollcategories: {
    paddingBottom: 15,
    paddingTop: 10,
    paddingLeft: 25,
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
    backgroundColor: "#f7ba70",
    paddingVertical: 10,
    paddingHorizontal: 15,

    borderRadius: 15,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginRight: 10,
  },
  text: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "bold",
  },
  green: {
    backgroundColor: "#2a9d8f",
  },
  green2: {
    backgroundColor: "#9fb31e",
  },
  red: {
    backgroundColor: "#941b0c",
  },
  red2: {
    backgroundColor: "#e76f51",
  },
  orange: {
    backgroundColor: "#f77f00",
  },
  magenta: {
    backgroundColor: "#f15bb5",
  },
});

export default Tags;
