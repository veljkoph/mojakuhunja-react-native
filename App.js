import React from "react";

import { StatusBar, SafeAreaView } from "react-native";
import MainContainer from "./pages/MainContainer";
import { AuthProvider } from "./providers/AuthContext";
import { colors } from "./functions/Themes";
const backgroundColor = colors.background;
export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ backgroundColor: backgroundColor }}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor={backgroundColor}
        />
      </SafeAreaView>
      <MainContainer />
    </AuthProvider>
  );
}
