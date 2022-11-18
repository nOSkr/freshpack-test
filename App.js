import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/stack/MainNavigator";
import { UserStore } from "./src/context/UserContext";
const App = () => {
  return (
    <NavigationContainer>
      <UserStore>
        <MainNavigator />
      </UserStore>
    </NavigationContainer>
  );
};

export default App;
