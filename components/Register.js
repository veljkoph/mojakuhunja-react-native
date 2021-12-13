import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import axios from "react-native-axios";
//IMG
import Yellow from "../assets/global/yellow.png";
import { API_URL_USERS } from "@env";
export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const submitRegister = () => {
    if (email !== "" && password !== "" && name !== "" && confirmPass !== "") {
      axios
        .post(`${API_URL_USERS}/register`, {
          userName: name,
          userEmail: email,
          userPassword: password,
          userPasswordConf: confirmPass,
        })
        .then((response) => {
          setErrMsg(response.data.message);
        });
      setName("");
      setPassword("");
      setConfirmPass("");
      setEmail("");
    } else {
      setErrMsg("Molimo popunite sva polja");
    }
  };

  return (
    <ScrollView>
      <ImageBackground source={Yellow} style={styles.imageBackground} />
      <View style={styles.login}>
        <Text style={styles.heading}>Registruj se</Text>
        <TextInput
          style={styles.input}
          placeholder="Ime"
          onChangeText={(text) => setName(text)}
          value={name}
        />
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
        <TextInput
          style={styles.input}
          placeholder="Ponovi Lozinku"
          onChangeText={(text) => setConfirmPass(text)}
          value={confirmPass}
        />
        <Text style={styles.errMsg}> {errMsg}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => submitRegister()}>
            Registuj se
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}>Nemaš nalog?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Text style={styles.link}>Prijavi se</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  login: {
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 33,
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
    marginTop: 10,
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
  link: {
    textDecorationLine: "underline",
  },
  errMsg: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f7ba70",
  },
});
