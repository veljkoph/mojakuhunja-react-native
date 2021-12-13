import { Appearance } from "react-native";

export const themes = {
  light: {
    input: "#fff",
    background: "#fafafa",
    textColor: "#2e2828",
    recipeBackground: "#fff",
    shadow: "#000",
    saveBorder: "#e3e3e3",
    tabInicative: "grey",
    loader: "#79266b",
  },
  dark: {
    input: "#545454",
    background: "#2e2828",
    textColor: "#fcfcfc",
    recipeBackground: "#404040",
    shadow: "#fafafa",
    saveBorder: "#fafafa",
    tabInicative: "#fef4f4",
    loader: "#fef4f4",
  },
};

export const colorScheme = Appearance.getColorScheme();
export const colors = themes[colorScheme];
