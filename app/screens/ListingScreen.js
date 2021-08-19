//Import all necessary react components
import React, { useState } from 'react';
import { StyleSheet, FlatList, View, TouchableWithoutFeedback, Modal, Button, TouchableOpacity, Alert } from 'react-native';
//Import the icon library for use within the app
import {MaterialCommunityIcons} from '@expo/vector-icons';

//Import all necessary files for use within this function
import AppColors from '../config/AppColors';
import AppCard from '../components/AppCard';
import AppScreen from '../components/AppScreen';
import AppPicker from '../components/AppPicker';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';

import CountryManager from '../config/CountryManager';
import CityManager from '../config/CityManager';
import CategoryManager from '../config/CategoryManager';
import PlaceManager from '../config/PlaceManager';
import DataManager from '../config/DataManager';

//Functions to get all the countries, cities, categories, and places in the app
const getAllCountries = () => {
    let commonData = CountryManager.getInstance();
    return commonData.getAllCountries();
}

const getAllCities = () => {
    let commonData = CityManager.getInstance();
    return commonData.getAllCities();
}

const getAllCategories = () => {
    let commonData = CategoryManager.getInstance();
    return commonData.getAllCategories();
}

const getAllPlaces = () => {
    let commonData = PlaceManager.getInstance();
    return commonData.getAllPlaces();
}

//File/Function for the list of all places that users may want to have a look at
function ListingScreen({navigation, route}) {
    //All the useState variables to set the country, city, category and visibility of the modal (dropdown list)
    const[modalVisible, setModalVisible] = useState(false);
    const[country, setCountry] = useState("");
    const[city, setCity] = useState("");
    const[category, setCategory] = useState("");

    /*Filter the items in the data collection based on the passed (provided) criteria 
    (such as selectedCountry, selectedCity, selectedCategory)*/
    const filterItems = (data, selectedCountry, selectedCity, selectedCategory) => {
        let newData = data;
        if (selectedCountry) {
            newData = newData.filter(
                function (item) {
                const itemData = item.country
                    ? item.country.toUpperCase()
                    : ''.toUpperCase();
                const textData = selectedCountry.label.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
        }
        if (selectedCity) {
            newData = newData.filter(
                function (item) {
                const itemData = item.city
                    ? item.city.toUpperCase()
                    : ''.toUpperCase();
                const textData = selectedCity.label.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
        }
        if (selectedCategory) {
            newData = newData.filter(
                function (item) {
                const itemData = item.category
                    ? item.category.toUpperCase()
                    : ''.toUpperCase();
                const textData = selectedCategory.label.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
        }
        return newData;
    }   

    //Add a new specific place the specified user data if the user wants to add it to his list of favourite places
    const addPlace = (item) => {
        let commonData = DataManager.getInstance();
        let user = commonData.getUserID();

        const places = commonData.getPlaces(user);
        const placeID = places.length+1;
        const newPlace = {
            title: item.title,
            subtitle: item.subtitle,
            category: item.category,
            placeid: placeID,
            userid: user,
            image: item.image,
        };
        commonData.addPlace(newPlace);
    }

    //Confirm before the users add the place to the list
    const confirm = (item) => {
        Alert.alert(
            "Note",
            "Are you sure you want to add this item to 'My Places'?",
            [
              {
                text: "Yes",
                onPress: () => {
                  addPlace(item);
                  Alert.alert("Added successfully. Please check your 'My Places'. You may want to sign out and sign in again to see 'My Places' gets updated");
                },
                style: "cancel",
              },
              { text: "No"},
            ],
            { cancelable: false }
          );
    }

    /*The listing screen that displays the filter/search function for all the places in the app
    and also all the cards of places with their information*/
    return (
        //Function for user to perform search/filter with a dropdown list containing other dropdown lists
        <AppScreen style={{backgroundColor:AppColors.appBackground}}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.container}>
                    <MaterialCommunityIcons name="feature-search" size={24}/>
                    <AppText style={styles.text}> Filter/Search </AppText>
                    <MaterialCommunityIcons name="chevron-down" size={24}/>
                </View>
            </TouchableWithoutFeedback>
            
            <Modal visible={modalVisible} animationType="slide">
                <AppScreen>
                    <Button 
                    //Button that lets users clear all the chosen ones to reset the initial state
                    title="Clear All" 
                    onPress={() => {
                        setCountry(null);
                        setCity(null);
                        setCategory(null);
                    }}/>
                    <AppPicker 
                    //Dropdown list for countries
                        selectedItem={country}
                        onSelectItem = {item => setCountry(item)}
                        data={getAllCountries()} 
                        icon="flag-variant" 
                        placeholder="Select your country" 
                        onPress={()=> {
                            setCity(null);
                            setCategory(null);
                            }
                        }
                        numColumns={3}/>
                    
                    <AppPicker 
                    //Dropdown list for cities
                        selectedItem={city}
                        onSelectItem = {item => setCity(item)}
                        data={filterItems(getAllCities(), country)} 
                        icon="city" 
                        placeholder="Select your city" 
                        onPress={()=> {setCategory(null);}}
                        numColumns={3}/>
                        
                    <AppPicker
                    //Dropdown list for categories
                        selectedItem={category}
                        onSelectItem = {item => setCategory(item)}
                        data={getAllCategories()} 
                        icon="apps" 
                        placeholder="Seclect your place" 
                        numColumns={3}/>

                    <AppButton
                        style = {{marginTop: 100, borderRadius:100}}
                        textStyle = {{fontSize: 15, color: AppColors.white}}
                        title="Apply"
                        color="signinButton"
                        onPress={() => setModalVisible(false)}
                    />
                </AppScreen>
             </Modal>
            
            <FlatList
            /*Flat list to display a list of all places (cards of places) (filtered ones) in the app.
            The users can also click on any specific item to see more information of it (if exists)*/
                data={filterItems(getAllPlaces(), country, city, category)}
                keyExtractor = {place => place.placeNum.toString()}
                renderItem = {({item}) => 
                /*Each item in the modal (dropdown list) with its own 
                title, subtitle, image and category that users can choose to click to see more information of it (if exists)*/
                    <View>
                        <TouchableOpacity onPress={() => 
                                navigation.navigate("MoreInfo", {  
                                        paramItem: item,
                                        paramStatus: true,
                                  })}>
                                      
                        <AppCard
                        //Each card place
                            title = {item.title}
                            subtitle = {item.subtitle}
                            image = {item.image}
                            category = {item.category}
                        />
                        </TouchableOpacity>

                        <AppButton 
                            style = {{top: 10}}
                            title = "Add to my places"
                            color = "darkblue"
                            textStyle = {{color: AppColors.black}}
                            onPress ={() => {confirm(item);}}
                        />
                    </View>
                }
           />
        </AppScreen>
    );
}

//Styles (Layout) for the view, text and button 
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#e0e0eb",
        flexDirection: 'row',
        borderRadius: 25, 
        padding: 10,
        marginVertical: 20,
        width:'100%',
    },
    text:{
        flex:1,
    },
    imageButton: {
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection: 'row',
    },
})

export default ListingScreen;