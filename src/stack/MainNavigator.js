import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserContext from "../context/UserContext";
import SplashScreen from "../pages/SplashScreen";
import LoginScreen from "../pages/Auth/LoginScreen";
import SignUpScreen from "../pages/Auth/SignUpScreen";
import OtpVerifyScreen from "../pages/Auth/OtpVerifyScreen";
import HomeScreen from "../pages/Home/HomeScreen";
import AfterSignUp from "../pages/Auth/AfterSignUp";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const state = useContext(UserContext);
  if (state.isLoading === true) {
    return <SplashScreen />;
  }
  return (
    <Stack.Navigator>
      {state.isLoggedIn ? (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false, title: "Нүүр" }}
        />
      ) : (
        <>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <Stack.Screen
            name="OtpVerifyScreen"
            component={OtpVerifyScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <Stack.Screen
            name="AfterSignUp"
            component={AfterSignUp}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
