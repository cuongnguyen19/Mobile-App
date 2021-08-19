//Import all necessary react components 
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Import all necessary screens and navigators for use within the navigator between screens
import HomeScreen from "../screens/HomeScreen";
import MyPlacesScreen from '../screens/MyPlacesScreen';
import MoreInformationScreen from "../screens/MoreInformationScreen";

//File/Function for a stack navigator instance
const AppStack = createStackNavigator();
const HomeNavigator = () => (
  //All Screens used in the navigator in the home screen, with the specified name, and options
  <AppStack.Navigator>
    <AppStack.Screen name="Home" 
      component={HomeScreen}
      options={{headerShown: false}}
    />

    <AppStack.Screen name="MyPlaces" 
      component={MyPlacesScreen}
    />

    <AppStack.Screen name="MoreInfo" 
      component={MoreInformationScreen}
    />
  </AppStack.Navigator>
);

export default HomeNavigator;
