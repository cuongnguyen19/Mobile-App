//Import all necessary react components 
import React from "react";
import { View, StyleSheet, TextInput, Platform } from "react-native";
//Import the icon, library for use within the app
import { MaterialCommunityIcons } from "@expo/vector-icons";

/*File/Function for the text input, where users can type in their information within the app, 
with the specified icon and other properties that are put in*/
function AppTextInput({ icon, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && <MaterialCommunityIcons name={icon} size={22} />}
      <TextInput style={styles.textInput} {...otherProps} />
    </View>
  );
}

//Styles (Layout) for the view and text input in the app
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0e0eb",
    flexDirection: "row",
    borderRadius: 25,
    padding: 10,
    marginVertical: 20,
    width: "100%",
  },
  textInput: {
    fontSize: 20,
    fontFamily: Platform.OS == "android" ? "monospace" : "Avenir-Roman",
    color: "#000",
    marginLeft: 10,
    flex: 1,
  },
});

export default AppTextInput;
