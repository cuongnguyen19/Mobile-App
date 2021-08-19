//Import all necessary react components
import React from "react";
import { View, StyleSheet, Image } from "react-native";
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

import DataManager from "../config/DataManager";
import UserManager from "../config/UserManager";

//Functions to get all the user data in the app
const getAllUsers = () => {
  let commonData = UserManager.getInstance();
  return commonData.getAllUsers();
}

const users = getAllUsers();

//Validation schema that specifies the requirements for each field
const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).max(8).label("Password"),
});

//Validate if typed user data matches with the current existing data in the database
const validateUser = ({email, password}) => {
  return(
      users.filter((user) => user.email === email && user.password === password).length>0
  );
};

//Get user with the provided (specified) email
const getUser = ({email}) => {
  return users.find((user) => user.email === email);
}

//Create user with the specified email
const createUser = ({email}) => {
  let commonData = DataManager.getInstance();
  let userID = getUser({email}).id;
  commonData.setUserID(userID);
}

//File/Function for users to signin
function SigninScreen({navigation, onClick}) {
  return (
    <AppScreen style={styles.container}>
     <View style={styles.welcomeContainer}>
         <Image //App Icon
           source={require("../assets/App-Icon.png")}
           style = {{height: 75, width: 75,}}
         />
    </View>
      <Formik
      //Navigate to Home screen if the typed user email and password match with the ones in the database
        initialValues={{ email: "", password: "" }}
        onSubmit = {(values, {resetForm})=> {
          //Check the validation of users and navigate to Home screen with passed username, email, and image photo
          if(validateUser(values)){ 
            if(onClick) {onClick()};
              createUser(values);
              navigation.navigate("Home", {
                screen: "Home",
                params: {
                  screen: "Home",
                  params: {
                    paramEmail: values.email,
                    paramName: getUser(values).name,
                    paramImage: getUser(values).image,
                  },
                },
              });
          }
          else{
              resetForm();
              alert("Invalid signin details. Please try to signin again")
          }
      }}
      validationSchema={schema}
      >
        {({ values, handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          //The Formik functions embedded into each text input to check the vaidations of it
          <>
            <View style={styles.textInputContainer}>
              <AppTextInput
              //Text input for email address
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                placeholder="Email Address"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={values.email}
                onBlur={() => setFieldTouched("email")}
                onChangeText={handleChange("email")}
              />
              {touched.email && (//Display error if the requirement for email is not satisfied
                <AppText style={{ color: "red" }}>{errors.email}</AppText>
              )}
            </View>
            <View style={styles.textInputContainer}>
              <AppTextInput
              //Text input for password
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                placeholder="Password"
                secureTextEntry
                textContentType="password"
                value={values.password}
                onBlur={() => setFieldTouched("password")}
                onChangeText={handleChange("password")}
              />
              {touched.password && (//Display error if the requirement for password is not satisfied
                <AppText style={{ color: "red" }}>{errors.password}</AppText>
              )}
            </View>
            <View style = {{marginTop: 100}}>
              <AppButton
                style = {{width: "100%"}}
                textStyle={{fontSize: 20}}
                title="Signin"
                color="signinButton"
                onPress={handleSubmit}
                testid = "signin" />
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
    marginTop: 70,
  },
  textInputContainer: {
    marginVertical: 30,
  },
});

export default SigninScreen;
