//Import all necessary react components 
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Import all necessary screens and navigators for use within the navigator between screens
import WelcomeScreen from "../screens/WelcomeScreen";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import TabNavigator from "./TabNavigator";

//File/Function for a stack navigator instance
const AppStack = createStackNavigator();
const AuthNavigator = () => (
  //All Screens used in the navigator in the welcome screen, with the specified name, and options
  <AppStack.Navigator>
    <AppStack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />

    <AppStack.Screen
      name="Signin"
      component={SigninScreen}
      options={{headerTitle: "Signin"}}
    />

    <AppStack.Screen name="Signup" 
      component={SignupScreen}
      options={{headerTitle: "Signup"}}
    />

    <AppStack.Screen name="Home" 
      component={TabNavigator}
      options={{headerShown: false}}
    />

    <AppStack.Screen name="ForgotPassword" 
      component={ForgotPasswordScreen}
      options={{headerTitle: "Password Recovery"}}
    />
  </AppStack.Navigator>
);

export default AuthNavigator;
