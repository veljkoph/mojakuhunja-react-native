import * as React from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";
import { AuthContext } from "../providers/AuthContext";
import axios from "react-native-axios";
import * as ImagePicker from "expo-image-picker";
//functions
import pickImage from "../functions/ImagePicker";
import { uploadCloud } from "../functions/UploadImage";
import { colors } from "../functions/Themes";
//components
import Profile from "./Profile";

const AddRecipe = ({ navigation }) => {
  const [message, setMessage] = React.useState("");

  const [recipe, setRecipe] = React.useState({
    title: "",
    descr: "",
    ingridients: "",
    image: "",
    category: "",
    time: "",
    tags: "",
  });

  ///IMAGE PICK
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const categories = ["All", "Pasta", "Pizza"];
  const time = [15, 20, 30, 45, 60, 75, 90, 120];
  const { user } = React.useContext(AuthContext);

  const postRecipe = async () => {
    if (
      recipe.title !== "" &&
      recipe.descr !== "" &&
      recipe.ingridients !== "" &&
      recipe.tags !== "" &&
      recipe.image !== "" &&
      user
    ) {
      const upload = await uploadCloud(recipe.image);
      setRecipe({ ...recipe, image: upload.data.url });

      const postRecipe = await axios.post(
        "https://mojakuhinja.herokuapp.com/recipe/add",
        {
          userTitle: recipe.title,
          userDescr: recipe.descr,
          userIngridients: recipe.ingridients,
          userImage: upload.data.url,
          userCategory: recipe.category,
          userTime: recipe.time,
          userTags: recipe.tags,
          userID: user.id,
        }
      );
      console.log(postRecipe, "postrecipe");
      setMessage("Uspesno dodato");

      setRecipe({
        title: "",
        descr: "",
        ingridients: "",
        image: "",
        category: "",
        tags: "",
        time: "",
      });
    } else {
      setMessage("Morate popuniti sva polja");
    }
  };

  if (user) {
    return (
      <View>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 48,
            paddingTop: 25,
            alignItems: "center",
            backgroundColor: colors.background,
          }}
        >
          <Text style={styles.heading}>Dodaj Recept</Text>
          <TextInput
            style={styles.input}
            placeholder="Naziv recepta"
            value={recipe.title}
            onChangeText={(text) => setRecipe({ ...recipe, title: text })}
          />
          <TextInput
            multiline={true}
            numberOfLines={5}
            style={{ paddingTop: 17, ...styles.input }}
            placeholder="Opis pripreme"
            value={recipe.descr}
            onChangeText={(text) => setRecipe({ ...recipe, descr: text })}
          />
          <TextInput
            multiline={true}
            numberOfLines={5}
            style={{ paddingTop: 17, ...styles.input }}
            placeholder="Sastojci"
            value={recipe.ingridients}
            onChangeText={(text) => setRecipe({ ...recipe, ingridients: text })}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              pickImage().then((response) => {
                setRecipe({ ...recipe, image: response });
              })
            }
          >
            <Text
              style={[
                styles.text,
                { color: `${recipe.image ? "#000" : "#C7C7CD"}` },
              ]}
            >
              {recipe.image
                ? "Uspešno dodata fotografija"
                : "Dodaj fotografiju"}
            </Text>
            <Ionicons name="camera-outline" size={22} color="#C7C7CD" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.shadow}>
            <SelectDropdown
              defaultButtonText="Odaberi Kategoriju"
              data={categories}
              onSelect={(selectedItem) => {
                setRecipe({ ...recipe, category: selectedItem });
              }}
              buttonStyle={{
                backgroundColor: colors.input,
                borderRadius: 15,
                width: "80%",
                elevation: 5,
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                marginBottom: 20,
              }}
              buttonTextStyle={{
                color: `${recipe.category ? "#000" : "#C7C7CD"}`,
                fontSize: 15,
                textAlign: "left",
              }}
              dropdownStyle={{
                borderRadius: 15,
                backgroundColor: colors.input,
              }}
              renderDropdownIcon={() => {
                return (
                  <Ionicons
                    name="chevron-down-outline"
                    size={22}
                    color="#C7C7CD"
                  />
                );
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shadow}>
            <SelectDropdown
              defaultButtonText="Vreme Pripreme"
              data={time}
              onSelect={(selectedItem) => {
                setRecipe({ ...recipe, time: selectedItem });
              }}
              buttonStyle={{
                backgroundColor: colors.input,
                borderRadius: 15,
                width: "80%",
                elevation: 5,
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                marginBottom: 20,
              }}
              dropdownStyle={{
                borderRadius: 15,
                backgroundColor: colors.input,
              }}
              buttonTextStyle={{
                color: `${recipe.time ? "#000" : "#C7C7CD"}`,
                fontSize: 15,
                textAlign: "left",
              }}
              renderDropdownIcon={() => {
                return (
                  <Ionicons
                    name="chevron-down-outline"
                    size={22}
                    color="#C7C7CD"
                  />
                );
              }}
            />
          </TouchableOpacity>
          <TextInput
            multiline={true}
            numberOfLines={5}
            style={{ paddingTop: 17, ...styles.input }}
            placeholder="Tagovi: #salata #ljuto #vegeta"
            value={recipe.tags}
            onChangeText={(text) => setRecipe({ ...recipe, tags: text })}
          />
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity onPress={() => postRecipe()} style={styles.postBtn}>
            <Text style={styles.postTxt}>Postavi recept</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  } else {
    return <Profile navigation={navigation} />;
  }
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
    color: colors.textColor,
  },
  shadow: {
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    width: "80%",

    padding: 18,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: colors.input,
    elevation: 5,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    textAlignVertical: "top",
    flex: 1,
    color: colors.textColor,
  },
  button: {
    backgroundColor: colors.input,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    padding: 17,
    borderRadius: 15,
    elevation: 5,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  text: {
    color: colors.textColor,
  },
  message: {
    color: colors.textColor,
  },
  postBtn: {
    backgroundColor: "#2a9d8f",
    paddingTop: 11,
    paddingBottom: 11,
    paddingHorizontal: 33,
    borderRadius: 20,
    marginTop: 10,
  },
  postTxt: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default AddRecipe;
