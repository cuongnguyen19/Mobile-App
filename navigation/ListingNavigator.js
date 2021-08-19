//Import all necessary react components 
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Import all necessary screens and navigators for use within the navigator between screens
import MoreInformationScreen from "../screens/MoreInformationScreen";
import ListingScreen from "../screens/ListingScreen";

//File/Function for a stack navigator instance
const AppStack = createStackNavigator();
const ListingNavigator = () => (
  //All Screens used in the navigator in the listing screen, with the specified name, and options
  <AppStack.Navigator>
    <AppStack.Screen name="Listing" 
      component={ListingScreen}
      options={{headerShown: false}}
    />

    <AppStack.Screen name="MoreInfo" 
      component={MoreInformationScreen}
    />
  </AppStack.Navigator>

);

export default ListingNavigator;
