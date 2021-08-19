//Import all necessary react components
import React, {useState} from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, TouchableWithoutFeedback, Modal, Button } from 'react-native';
//Import the icon library for use wihthin the app
import {MaterialCommunityIcons} from '@expo/vector-icons';

//Import all necessary files for use within this function
import AppCard from '../components/AppCard';
import AppScreen from '../components/AppScreen';
import AppColors from '../config/AppColors';
import AppIcon from '../components/AppIcon';
import AppListItem from '../components/AppListItem';
import AppPicker from '../components/AppPicker';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';

import CountryManager from '../config/CountryManager';
import CityManager from '../config/CityManager';
import CategoryManager from '../config/CategoryManager';
import DataManager from '../config/DataManager';

//Functions to get all the countries, cities, categories, and places of specific users in the app
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

const getPlaces = () => {
    let commonData = DataManager.getInstance();
    let userID = commonData.getUserID();
    return commonData.getPlaces(userID);
}

//File/Function for the display of all places (existing ones and newly added ones) of any specific user in the app 
function MyPlacesScreen({navigation}) {
    //All the useState variables to set the country, city, category and visibility of the modal (dropdown list)
    const[modalVisible, setModalVisible] = useState(false);
    const[country, setCountry] = useState("");
    const[city, setCity] = useState("");
    const[category, setCategory] = useState("");

    //All the useState variables to set the places, refreshing status of the list of places
    const placeList = getPlaces();
    const[refreshing, setRefreshing] = useState(false);
    const[places, setPlaces] =  useState(placeList);

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

    //Function to handle delete an item in the list of existing places if the users want to delete any speicified one
    const handleDelete = (place) => {
        const newPlaceList =  places.filter (item => item.placeid !== place.placeid);
        setPlaces(newPlaceList);
    }

    return (
        //Function for user to perform search/filter with a dropdown list containing other dropdown lists
        <AppScreen style={styles.container}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.filterContainer}>
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
            /*Flat list to display a list of all places (cards of places) of a specific user in the app.
            The users can also click on any specific item to see more information of it (if exists)*/
                data = {filterItems(places, country, city, category)}
                keyExtractor = {place => place.placeid.toString()}
                refreshing={refreshing}
                onRefresh={() => setPlaces(placeList)}
                renderItem = {({item}) => 
                /*Each item in the modal (dropdown list) with its own 
                title, subtitle, image and category that users can choose to click to see more information of it (if exists)*/
                    <AppListItem
                        AppComponent = {
                            <TouchableOpacity onPress={() => 
                                navigation.navigate("MoreInfo", {  
                                        paramItem: item,
                                  })}>
                            <AppCard
                            //Each card of place
                                title = {item.title}
                                subtitle = {item.subtitle}
                                image = {item.image}
                                category = {item.category}
                            />
                             </TouchableOpacity>
                        }
                        //Users can swipe left to choose perform a deletion on an item
                        onSwipeLeft={ () => (
                            <View style={styles.deleteView}>
                                <TouchableOpacity onPress={() => handleDelete(item)}>
                                    <AppIcon name="trash-can" iconColor={AppColors.lightred} size = {60} backgroundColor={AppColors.lightgray}/> 
                                </TouchableOpacity>
                            </View>)}
                    />
                }
            />
        </AppScreen>
    );
}

//Styles (Layout) for the views and text
const styles = StyleSheet.create({
    container:{
        backgroundColor:AppColors.appBackground,
        flex:1,
    },
    filterContainer:{
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
    deleteView:{
        backgroundColor: AppColors.otherColorLite,
        marginTop: 25,
        borderRadius:30,
        width:75,   
        justifyContent:"center",
        alignItems:"center",
    },
})

export default MyPlacesScreen;