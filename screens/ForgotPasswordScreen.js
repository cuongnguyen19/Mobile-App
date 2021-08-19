//Import all necessary react components
import React from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

//Import all necessary files for use within this function
import AppTextInput from "../components/AppTextInput";
import AppScreen from "../components/AppScreen";
import AppColors from "../config/AppColors";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";

//Create a schema object for validation of the fields: name, phone number and email
const schema = Yup.object().shape({
  fullName: Yup.string().required().label("Full Name"),
  phoneNumber: Yup.number().required().label("Phone Number"),
  email: Yup.string().required().email().label("Email"),
});

//File/Function for the instance when the users forgot their password
function ForgotPasswordScreen({navigation}) {
  
  /*Alert when the users confirm 'Yes' to submit the 'forgot password' form 
  and navigate to the the welcome screen*/
  const accept = () => {
    Alert.alert("Recovery link sent to your email adress. Please check your email.");      
    navigation.navigate("Welcome"); 
  }
  
  //All The text inputs that users have to type in to get their password recovered
  return (
    <AppScreen style={styles.container}>
     <View style={styles.welcomeContainer}>
         <Image //App Icon
           source={require("../assets/App-Icon.png")}
           style = {{height: 75, width: 75,}}
         />
        </View>
    
      <Formik
        initialValues={{ fullName: "", phoneNumber: "", email: ""}}
        onSubmit={accept}
        validationSchema={schema}
      >
  
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          //The Formik functions embedded into each text input to check the vaidations of it
          <>
          <View style={styles.textInputContainer}>
              <AppTextInput
              //Text input for full name
                autoCapitalize="none"
                autoCorrect={false}
                icon="account"
                placeholder="Full Name"
                onBlur={() => setFieldTouched("fullName")}
                onChangeText={handleChange("fullName")}
              />
              {touched.fullName && (//Display error if the requirement for full name is not satisfied
                <AppText style={{ color: "red" }}>{errors.fullName}</AppText>
              )}
              </View>
              <View style={styles.textInputContainer}>
              <AppTextInput
              //Text input for phone number
                autoCapitalize="none"
                autoCorrect={false}
                icon="cellphone"
                placeholder="Phone Number"
                keyboardType="phone-pad"
                onBlur={() => setFieldTouched("phoneNumber")}
                onChangeText={handleChange("phoneNumber")}
              />
              {touched.phoneNumber && (//Display error if the requirement for phone number is not satisfied
                <AppText style={{ color: "red" }}>{errors.phoneNumber}</AppText>
              )}
              </View>
              <View style={styles.textInputContainer}>
              <AppTextInput
              //Text input for email address
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                placeholder="Email Adress"
                keyboardType="email-address"
                textContentType="emailAddress"
                onBlur={() => setFieldTouched("email")}
                onChangeText={handleChange("email")}
              />
              {touched.email && (//Display error if the requirement for email is not satisfied
                <AppText style={{ color: "red" }}>{errors.email}</AppText>
              )}
              
            </View>
            <View style = {{marginTop: 90}}>
              <AppButton
                style = {{width: "100%"}}
                textStyle={{fontSize: 20}}
                title="Submit"
                color="otherColor"
                onPress={handleSubmit} />
            </View>
          </>
        )}
      </Formik>
    </AppScreen>
  );
}

//Styles (Layout) for the view and text inputs
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.appBackground,
    padding: 25,
  },
  welcomeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  textInputContainer: {
    marginVertical: 30,
  },
});

export default ForgotPasswordScreen;
