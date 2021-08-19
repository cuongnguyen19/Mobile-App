//Import all necessary react components
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Import all necessary screens and navigators for use within the navigator between screens
import MyPlacesScreen from '../screens/MyPlacesScreen';
import MoreInformationScreen from "../screens/MoreInformationScreen";

//File/Function for a stack navigator instance
const AppStack = createStackNavigator();
const MyPlacesNavigator = () => (
  //All Screens used in the navigator in the my places screen, with the specified name, and options
  <AppStack.Navigator>
    <AppStack.Screen name="MyPlaces" 
      component={MyPlacesScreen}
      options={{ headerShown: false }}
    />

    <AppStack.Screen name="MoreInfo" 
      component={MoreInformationScreen}
    />
  </AppStack.Navigator>

);

export default MyPlacesNavigator;
