//Import all necessary react components 
import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

//File/Function for all the texts in the app
function AppText({ children, style }) {
  return <Text style={[styles.text, style]}> {children}</Text>;
}

//Style for the text in the app
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: Platform.OS == "android" ? "monospace" : "Avenir-Roman",
  },
});

export default AppText;
