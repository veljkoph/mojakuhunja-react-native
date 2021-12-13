import * as React from "react";
import { Platform, StatusBar } from "react-native";

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//ICons
import Ionicons from "react-native-vector-icons/Ionicons";
//Screens
import Home from "./Home";
import Profile from "./Profile";
import Settings from "./Settings";
import AddRecipe from "./AddRecipe";
//Components
import RecipeModal from "../components/RecipeModal";
import Register from "../components/Register";
import Search from "./Search";
import { colors } from "../functions/Themes";

const RootStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const checkOS = (OS) => {
  if (OS === "ios") {
    return "modal";
  } else {
    return "card";
  }
};

const RootStackScreen = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: checkOS(Platform.OS),
      }}
    >
      <RootStack.Screen name="HomeScreen" component={Home} />
      <RootStack.Screen name="RecipeModalScreen" component={RecipeModal} />
    </RootStack.Navigator>
  );
};
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{ headerShown: false, presentation: checkOS(Platform.OS) }}
    >
      <ProfileStack.Screen name="ProfileScreen" component={Profile} />
      <ProfileStack.Screen name="RecipeModalScreen" component={RecipeModal} />
      <ProfileStack.Screen name="RegisterScreen" component={Register} />
    </ProfileStack.Navigator>
  );
};
//Bottom Navigation
const Tabs = createBottomTabNavigator();

//MAIN root
const MainContainer = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#2a9d8f",
          tabBarInactiveTintColor: colors.tabInicative,
          tabBarStyle: {
            backgroundColor: colors.background,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let style;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name == "AddRecipe") {
              iconName = focused ? "add" : "add";
              style = {
                position: "absolute",
                top: -25,
                backgroundColor: focused ? "#2a9d8f" : "#f7ba70",
                width: 50,
                height: 50,
                borderRadius: 11,
                color: "white",
                fontSize: 48,
                paddingTop: 0,
                paddingLeft: 2.5,
                elevation: 5,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
              };
            } else if (route.name == "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name == "Profile") {
              iconName = focused ? "bookmark" : "bookmark-outline";
            } else if (route.name == "Settings") {
              iconName = focused ? "settings-sharp" : "settings-outline";
            }
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
                style={style}
              />
            );
          },
        })}
      >
        <Tabs.Screen name="Home" component={RootStackScreen} />
        <Tabs.Screen name="Search" component={Search} />
        <Tabs.Screen name="AddRecipe" component={AddRecipe} />
        <Tabs.Screen name="Profile" component={ProfileStackScreen} />
        <Tabs.Screen name="Settings" component={Settings} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
