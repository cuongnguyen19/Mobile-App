//Import all necessary react components
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Alert, ScrollView, Button } from 'react-native';
//Import the icon library for use wihthin the app
import {MaterialCommunityIcons} from '@expo/vector-icons';
//Import imagepicker for users to pick an image from the phone's photo library
import * as ImagePicker from 'expo-image-picker';

//Import all necessary files for use within this function
import AppColors from '../config/AppColors';
import AppPicker from '../components/AppPicker';
import AppScreen from '../components/AppScreen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppCard from '../components/AppCard';

import CategoryManager from '../config/CategoryManager';
import DataManager from '../config/DataManager';
import PlaceManager from '../config/PlaceManager';

//Functions to get all the categories in the app
const getAllCategories = () => {
    let commonData = CategoryManager.getInstance();
    return commonData.getAllCategories();
}

//File/Function for users to make a new customized place and add it to the lists
function NewPlaceScreen() {
    //All the useState variables to set the country, city, title, subtitle, category image and their corresponding errors
    const[country, setCountry] = useState("");
    const[city, setCity] = useState("");
    const[title, setTitle] = useState("");
    const[subtitle, setSubtitle] = useState("");
    const[category, setCategory] = useState("");
    const[image, setImage] = useState(null);

    const[countryError, setCountryError] = useState("");
    const[cityError, setCityError] = useState("");
    const[titleError, setTitleError] = useState("");
    const[subtitleError, setSubtitleError] = useState("");
    const[categoryError, setCategoryError] = useState("");
    const[imageError, setImageError] = useState("");

    //Add the place to the user's list of favourite places
    const addPlace = () => {
        let commonData = DataManager.getInstance();
        let user = commonData.getUserID();

        const places = commonData.getPlaces(user);
        const placeID = places.length+1;
        const newPlace = {
            title: title,
            subtitle: subtitle,
            category: category.label,
            placeid: placeID,
            userid: user,
            image: image.path,
            country: country,
            city: city,
        };

        commonData.addPlace(newPlace);
    }

    //Add the place to the initial listing
    const addListing = () => {
        let commonData = PlaceManager.getInstance();

        const placeNum = commonData.getAllPlaces().length+1;
        const newPlace = {
            title: title,
            subtitle: subtitle,
            category: category.label,
            placeNum: placeNum,
            image: image.path,
            country: country,
            city: city,
        };

        commonData.addPlace(newPlace);
    }

    //Confirm before adding the place to the specified list
    const confirm = (func) => {
        Alert.alert(
            "Note",
            "Are you sure you want to add this item to the specified list?",
            [
              {
                text: "Yes",
                onPress: () => {
                  func;
                  Alert.alert("Added successfully. Please check your specific list. You may want to sign out and sign in again to see it gets updated");
                },
                style: "cancel",
              },
              { text: "No"},
            ],
            { cancelable: false }
          );
    }

    //Function for getting access to open user's phone's photo library
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        setImage({path: pickerResult.uri});
      }

    //Check all the errors before trying to add an item
    const checkError = () => {
        setCountryError(country.length>0 ? "" : "Please set a valid country");
        setCityError(city.length>0 ? "" : "Please set a valid city");
        setTitleError(title.length>0 ? "" : "Please set a valid place");
        setSubtitleError(subtitle.length>0 ? "" : "Please set a valid location");
        setCategoryError(category? "" : "Please choose a category from the list");
        setImageError(image? "" : "Please choose an image");
        return ((country.length>0) && (city.length>0) && (title.length>0) && (subtitle.length>0) && (category) && (image)? true : false)
    }

    return (
        <AppScreen style={{backgroundColor:AppColors.appBackground}}>
            <ScrollView style = {{backgroundColor: AppColors.appBackground}}>
                <Button 
                //Button that lets users clear all the typed information to reset the initial state
                    color = 'blue'
                    title="Clear All" 
                    onPress={() => {
                        setCountry("");
                        setCity("");
                        setTitle("");
                        setSubtitle("");
                        setCategory("");
                        setImage(null);
                }}/>
                <AppTextInput
                //Text input for country
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon = "flag-variant"
                    placeholder = "Country"
                    value = {country}
                    onChangeText = {(inputText) => setCountry(inputText)}
                />
                {countryError.length>0 ? <AppText style = {{margin: 5, color: "red", fontSize: 20}}> {countryError}</AppText> : <></>}

                <AppTextInput
                //Text input for city
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon = "city"
                    placeholder = "City"
                    value = {city}
                    onChangeText = {(inputText) => setCity(inputText)}
                />
                {cityError.length>0 ? <AppText style = {{margin: 5, color: "red", fontSize: 20}}> {cityError}</AppText> : <></>}
                
                <AppTextInput
                //Text input for place name
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon = "domain"
                    placeholder = "Place Name"
                    value = {title}
                    onChangeText = {(inputText) => setTitle(inputText)}
                />
                {titleError.length>0 ? <AppText style = {{margin: 5, color: "red", fontSize: 20}}> {titleError}</AppText> : <></>}
                
                <AppTextInput
                //Text input for address
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon = "map-marker"
                    placeholder = "Address"
                    value = {subtitle}
                    onChangeText = {(inputText) => setSubtitle(inputText)}
                />
                {subtitleError.length>0 ? <AppText style = {{margin: 5, color: "red", fontSize: 20}}> {subtitleError}</AppText> : <></>}
                
                <AppPicker
                //Dropdown list for categories
                    selectedItem={category}
                    onSelectItem = {item => setCategory(item)}
                    data={getAllCategories()} 
                    icon="apps" 
                    placeholder="Categories" 
                    numColumns={3}/>
                {categoryError.length>0 ? <AppText style = {{margin: 5, color: "red", fontSize: 20}}> {categoryError}</AppText> : <></>}

                <TouchableOpacity style = {styles.imageButton} onPress = {openImagePickerAsync}>
                    <View style = {styles.container}>
                    <MaterialCommunityIcons name="image" size={24}/>
                    <AppText style = {{color: "#000", flex: 1}}> {image? image.path : "Please choose an image photo for your place"} </AppText>
                    <MaterialCommunityIcons name="magnify" size={24}/>
                    </View>
                </TouchableOpacity>
                
                <AppText style = {styles.previewText}> PREVIEW </AppText>
                {image && <AppCard
                                style = {{marginTop: 10}}
                                title = {title}
                                subtitle = {subtitle}
                                image = {image.path}
                                category = {category.label}
                            />}
                {imageError.length>0 ? <AppText style = {{margin: 5, color: "red", fontSize: 20}}> {imageError}</AppText> : <></>}
                <View style = {{flexDirection:'row', marginTop: 90}}>
                    <AppButton 
                        color = "darkblue"
                        title = "Add to my places"
                        textStyle = {{color: AppColors.black}}
                        onPress ={() => {
                        if (checkError()) {
                            confirm(addPlace());
                        }}}/>
                    <AppButton 
                        style = {{marginLeft: 30,}}
                        color = "darkblue"
                        title = "Add to the listing"
                        textStyle = {{color: AppColors.black}}
                        onPress ={() => {
                        if (checkError()) {
                            confirm(addListing());
                        }}}/>
                </View>
            </ScrollView>
        </AppScreen>
        
    );
}

//Styles (Layout) for the texts, views
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e0e0eb",
        flexDirection: "row",
        borderRadius: 25,
        padding: 10,
        marginVertical: 20,
        width: "100%",
      },
    imageButton: {
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection: 'row',
    },
    previewText: {
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
    }
})

export default NewPlaceScreen;