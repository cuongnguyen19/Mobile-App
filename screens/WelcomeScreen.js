//Import all necessary react components
import React from "react";
import { View, StyleSheet, ImageBackground, Image } from "react-native";

//Import all necessary files for use within this function
import AppScreen from "../components/AppScreen";
import AppText from "../components/AppText";
import AppColors from "../config/AppColors";
import AppButton from "../components/AppButton";

//File/Function to display the welcome screen when users access the app
function WelcomeScreen({ navigation }) {
  return (
    <AppScreen>
        <ImageBackground
        source={require("../assets/Background-Image.jpg")}
        style={styles.background}
        >
        <View style={styles.welcomeContainer}>
         <Image
           source={require("../assets/App-Icon.png")}
           style = {{height: 75, width: 75,}}
         />
        </View>
        <View style={styles.welcomeContainer}>
          <AppText
            style={styles.welcomeText}>
            Welcome to TravelAround
          </AppText>
        </View>
        <View style={styles.welcomeContainer}>
          <AppText
            style={styles.welcomeText}>
            We will get you from place to place just by one tap
          </AppText>
          
        </View>  
        <View style={styles.buttonContainer}>
          <AppButton
            textStyle = {{fontSize: 20}}
            title="Signin"
            color="signinButton"
            testid = "signin"
            onPress={() => navigation.navigate("Signin")}
          />
        </View>
        <View style = {{bottom: 75, flexDirection: 'row'}}>
          <AppButton
            style = {{width: '200%'}}
            title="Signup"
            onPress={() => navigation.navigate("Signup")}
          />
          <AppButton
            style = {{width: '80%', marginLeft: 100}}
            title="Forgot Password?"
            color = 'otherColor'
            onPress={() => navigation.navigate("ForgotPassword")}
          />
        </View>
      </ImageBackground>
    </AppScreen>
  );
}

//Styles (Layout) for the view, button, and texts
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  welcomeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  welcomeText:{
    color: AppColors.white, 
    fontWeight: "bold", 
    fontSize: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 250,
    height: 150,
  },
});

export default WelcomeScreen;
