//Import all necessary react components
import React from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
//Import Formik form
import { Formik } from "formik";
//Import yup validation
import * as Yup from "yup";

//Import all necessary files for use within this function
import AppTextInput from "../components/AppTextInput";
import AppScreen from "../components/AppScreen";
import AppColors from "../config/AppColors";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";

//Validation schema that specifies the requirements for each field
const schema = Yup.object().shape({
  fullName: Yup.string().required().label("Full Name"),
  phoneNumber: Yup.number().required().label("Phone Number"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).max(8).label("Password"),
});

//File/Function for users to signup
function SignupScreen({navigation}) {
    //Confirm before submitting the form
    const confirm = () => {
        Alert.alert(
            "Note",
            "Are you sure you want to submit?",
            [
              {
                text: "Yes",
                onPress: () => {
                  //Navigate back to Welcome screen when the form has been submiteed
                  Alert.alert("Submitted successfully. Please check your email.");
                  navigation.navigate("Welcome");
                },
                style: "cancel",
              },
              { text: "No"},
            ],
            { cancelable: false }
          );
    }
    
  return (
    <AppScreen style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={require("../assets/App-Icon.png")}
          style = {{height: 75, width: 75,}}
        />
      </View>
  
      <Formik
        initialValues={{ fullName: "", phoneNumber: "", email: "", password: "", confirmPassword: ""}}
        onSubmit={confirm}
        validate = {values => {
          //Check the confirm password to see if it matches the typed password field
          const errors = {};
          if(values.password != values.confirmPassword) {
            errors.confirmPassword = "Password must be the same as above"
          }
          return errors;
        }}
        validationSchema={schema}
      >
  
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          //The Formik functions embedded into each text input to check the vaidations of it
          <>
          <View style={styles.textInputContainer}>
              <AppTextInput
              //Text input for name
                autoCapitalize="none"
                autoCorrect={false}
                icon="account"
                placeholder="Full Name"
                onBlur={() => setFieldTouched("fullName")}
                onChangeText={handleChange("fullName")}
              />
              {touched.fullName && (//Display error if the requirement for name is not satisfied
                <AppText style={{ color: "red" }}>{errors.fullName}</AppText>
              )}
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
              <AppTextInput
              //Text input for password
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                placeholder="Password"
                secureTextEntry
                textContentType="password"
                onBlur={() => setFieldTouched("password")}
                onChangeText={handleChange("password")}
              />
              {touched.password && (//Display error if the requirement for password is not satisfied
                <AppText style={{ color: "red" }}>{errors.password}</AppText>
              )}
              <AppTextInput
              //Text input for confirm password
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                placeholder="Confirm Password"
                secureTextEntry
                onBlur={() => setFieldTouched("confirmPassword")}
                onChangeText={handleChange("confirmPassword")}
              />
              {touched.confirmPassword && (//Display error if the requirement for confirm password is not satisfied
                <AppText style={{ color: "red" }}>{errors.confirmPassword}</AppText>
              )}
            </View>
            <View style = {{marginTop: 55}}>
              <AppButton
                style = {{width: "100%"}}
                textStyle={{fontSize: 20}}
                title="Signup"
                onPress={handleSubmit} />
            </View>
          </>
        )}
      </Formik>
    </AppScreen>
  );
}

//Styles (Layout) for the texts, views
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
    marginVertical: 5,
  },
});

export default SignupScreen;
