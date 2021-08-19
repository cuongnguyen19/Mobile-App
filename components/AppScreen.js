//Import all necessary react components 
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

//File/Function foe each of the screens in the app that is wrapped in a safe area view
function AppScreen({ children, style }) {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}

//Style (Layout) for the screen
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default AppScreen;
