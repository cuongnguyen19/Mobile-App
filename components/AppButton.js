//Import all necessary react components 
import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

//Import all necessary files for use in this function
import AppColors from "../config/AppColors";

//File/Function for the buttons in the app with the specified styles, title, and passed onpress function to handle
function AppButton({ title, style, textStyle, color = "primaryColor", onPress, testid }) {
  return (
    <TouchableOpacity onPress={onPress} testID = {testid}>
      <View style={[styles.button, style, { backgroundColor: AppColors[color] }]}>
        <Text style={[styles.text, textStyle]}> {title}</Text>
      </View>
    </TouchableOpacity>
  );
}

//Styles (Layout) for the components in the app buttons
const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 20,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    bottom: 50,
  },
  text: {
    color: AppColors.black,
    fontSize: 15,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
