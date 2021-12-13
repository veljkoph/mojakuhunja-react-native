import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import axios from "react-native-axios";
import { AuthContext } from "../providers/AuthContext";
//IMG
import Yellow from "../assets/global/yellow.png";
import { API_URL_USERS } from "@env";
//ASK ABOUT SVG!!
export default function Login({ navigation }) {
  const { login, setUser, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const submitLogin = () => {
    if (email !== "" && password !== "") {
      axios
        .post(`${API_URL_USERS}/login`, {
          userEmail: email,
          userPassword: password,
        })
        .then((response) => {
          if (response.data.loggedIn) {
            setErrMsg("Uspešna prijava");
            login(response.data);
            setUser(response.data);
          } else {
            setErrMsg(response.data.message);
            console.log("error");
          }
        });

      setPassword("");
      setEmail("");
    } else {
      setErrMsg("Molimo popunite sva polja");
    }
  };

  return (
    <View>
      <ImageBackground source={Yellow} style={styles.imageBackground} />
      <View style={styles.login}>
        <Text style={styles.heading}>Prijavi se</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Lozinka"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Text style={styles.errMsg}>{errMsg}</Text>
        <TouchableOpacity style={styles.button} onPress={() => submitLogin()}>
          <Text style={styles.buttonText}>Prijavi se</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Nemaš nalog?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.link}>Registruj se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    width: "100%",
    height: 199,
    position: "absolute",
    top: 0,
    justifyContent: "center",
    flex: 1,
  },
  heading: {
    paddingTop: 140,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
  },
  input: {
    width: "80%",
    padding: 18,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#2a9d8f",
    paddingTop: 11,
    paddingBottom: 11,
    paddingHorizontal: 33,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  errMsg: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f7ba70",
  },
  link: {
    textDecorationLine: "underline",
  },
});
