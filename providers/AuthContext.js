import React, { useEffect, useState } from "react";
import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storageKeys = {
  user: "User",
};
export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(async () => {
    if ((await AsyncStorage.getItem(storageKeys.user)) !== undefined || null) {
      setUser(JSON.parse(await AsyncStorage.getItem("User")));
    }
  }, []);

  const login = async (user) => {
    try {
      setUser(user);
      await AsyncStorage.setItem("User", JSON.stringify(user));
    } catch (err) {
      alert(err);
    }

    return AsyncStorage.getItem("User");
  };

  const logout = () => {
    setUser(null);
    AsyncStorage.removeItem("User");
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
