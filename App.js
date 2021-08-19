import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import InitialNavigator from "./app/navigation/InitialNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <InitialNavigator/>
    </NavigationContainer>


  );
}
