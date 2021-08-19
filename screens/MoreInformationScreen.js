//Import all necessary react components
import React, {useState} from 'react';
import { StyleSheet, FlatList, View, Image, Alert, Button } from 'react-native';
import Hyperlink from "react-native-hyperlink";

//Import all necessary files for use within this function
import AppScreen from '../components/AppScreen';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import AppColors from '../config/AppColors';
import AppTextInput from '../components/AppTextInput';

import MoreInfoManager from '../config/MoreInfoManager';
import DataManager from '../config/DataManager';
import PlaceManager from '../config/PlaceManager';

//Get all information of places in the app
const getAllInfo = () => {
    let commonData = MoreInfoManager.getInstance();
    return commonData.getAllInfo();
}

const filterDeletedPlace = (place) => {
    let commonData = PlaceManager.getInstance();
    return commonData.filterPlaces(place);
}

//File/Function for the display of pieces of information of places in the app 
function MoreInformationScreen({navigation, route}) {
    const[editable, setEditable] = useState(false);
    const[editted, setEditted] = useState(false);
    const[change, setChange] = useState(false);
    const[unchange, setUnchange] = useState(false);
    const[edittedValue, setEdittedValue] = useState("");
    /*Filter the items in the data collection based on the passed (provided) criteria 
    (such as selectedItem)*/
    const filterItems = (data, selectedItem) => {
        let newData = data;
        if (selectedItem) {
            newData = newData.filter(
                function (item) {
                const itemData = item.title
                    ? item.title.toUpperCase()
                    : ''.toUpperCase();
                const textData = selectedItem.title.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
        }
        return newData;
    }

    //Add a new specific place to the specified user data if the user wants to add it to his list of favourite places
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
            image: item.imageCard,
        };
        commonData.addPlace(newPlace);
    }

    //Add a new specific place, which has no information, to the specified user data if the user wants to add it to his list of favourite places
    const addPlaceWithNoInfo = (item) => {
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

    //Check if the item's information is there in the database or not. Display it if it is; Otherwise, not
    const notExist = (item) => {
        if(filterItems(getAllInfo(), item).length == 0) {
            return true;
        }
        else{
            return false;
        }
    } 

    /*Check if the item's information is opened from the listing screen or the my places sceen. 
    Display the 'Add to my places' button if it is opened from the listing screen. Otherwise, not*/
    const accessed = () => {
        if(route.params.paramStatus) {
            return true;
        }
        else {
            return false;
        }
    }

    //Confirm before the users want to add a specific item, which has no information, to their list of favourite places
    const confirmAddPlaceWithNoInfo = (item) => {
        Alert.alert(
            "Note",
            "Are you sure you want to add this item to 'My Places'?",
            [
              {
                text: "Yes",
                onPress: () => {
                  addPlaceWithNoInfo(item);
                  navigation.navigate("Listing");
                  Alert.alert("Added successfully. Please check your 'My Places'. You may want to sign out and sign in again to see 'My Places' gets updated");
                },
                style: "cancel",
              },
              { text: "No"},
            ],
            { cancelable: false }
          );
    }

    //Confirm before the users want to add a specific item to their list of favourite places
    const confirmAddPlace = (item) => {
        Alert.alert(
            "Note",
            "Are you sure you want to add this item to 'My Places'?",
            [
              {
                text: "Yes",
                onPress: () => {
                  addPlace(item);
                  navigation.navigate("Listing");
                  Alert.alert("Added successfully. Please check your 'My Places'. You may want to sign out and sign in again to see 'My Places' gets updated");
                },
                style: "cancel",
              },
              { text: "No"},
            ],
            { cancelable: false }
          );
    }

    //Confirm before the users want to delete a specific item from the listing
    const confirmDeletePlace = (item) => {
        Alert.alert(
            "Note",
            "Are you sure you want to delete this item from the listing?",
            [
              {
                text: "Yes",
                onPress: () => {
                    navigation.navigate("Listing", {  
                        paramItemList: filterDeletedPlace(item),
                  });
                  Alert.alert("Deleted successfully. Please check your listing.");
                },
                style: "cancel",
              },
              { text: "No"},
            ],
            { cancelable: false }
          );
    }

    //Confirm before the users want to change a specific item's description text
    const confirmChange = () => {
        Alert.alert(
            "Note",
            "Are you sure you want to make this change?",
            [
              {
                text: "Yes",
                onPress: () => {
                    setEditted(true); 
                    setEditable(false); 
                    setChange(false); 
                    setUnchange(false)
                },
                style: "cancel",
              },
              { text: "No"},
            ],
            { cancelable: false }
          );
    }

    /*The More Information screen that displays the place's logo, photo and information along with its link and its own 'Add to my places' button*/
    return (
        <AppScreen>
            <FlatList
            //Flat list to display a list of all information (if exists) of a specific place that is passed when users click on in the app.
                data={filterItems(getAllInfo(), route.params.paramItem)}
                keyExtractor = {info => info.infoNum.toString()}
                renderItem = {({item}) => 
                <View >
                    <View style={styles.titleContainer}>
                        {item.logo?<Image source = {item.logo} style = {{ height: item.logoHeight, width: item.logoWidth}}/> : <AppText style={{justifyContent:'center', textAlign:'center', fontWeight:'bold', fontSize: 25}}>{item.title.toUpperCase()}</AppText>}
                    </View>
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <Image source = {item.image} style = {{height: 300, width: 500}}/>
                        <Button 
                            title="Edit Text" 
                            onPress={() => {setEditable(true); setChange(true); setUnchange(true); setEditted(false)}}
                        />
                        {editable && <AppTextInput
                                autoCapitalize="none"
                                autoCorrect={false}  
                                value={edittedValue}
                                onChangeText={setEdittedValue}
                                blurOnSubmit={true}
                                multiline = {true}
                        />}
                        {change && <AppButton 
                                style = {{top: 20, right: 110, width: 200}}
                                title = "Change"
                                color = "signinButton"
                                textStyle = {{color: AppColors.white}}
                                onPress ={() => {confirmChange()}}
                        />}
                        {unchange && <AppButton 
                                style = {{bottom: 30, left: 110, width: 200}}
                                color = "black"
                                title = "Don't Change"
                                textStyle = {{color: AppColors.white}}
                                onPress ={() => {setEditable(false); setChange(false); setUnchange(false)}}
                        />}
                        {editted ? <AppText style = {{justifyContent:'center', textAlign:'center'}}>
                                            {edittedValue}
                                    </AppText>
                        : <AppText style = {{justifyContent:'center', textAlign:'center'}}>
                            {item.detail} 
                          </AppText>
                        }
                        <AppText style = {{justifyContent:'center', textAlign:'center', fontSize: 25, fontWeight:'bold',}}>
                            For more information, please visit: 
                        </AppText> 
                        <Hyperlink 
                        //Link for users to click on to get more information
                            linkDefault
                            linkStyle={{ color: "#2980b9", fontSize: 25 }}
                            linkText={(url) =>
                            url === item.link ? item.title.toUpperCase() : url
                            }
                        >
                            <AppText style={{justifyContent:'center', textAlign:'center', fontWeight:'bold',}}>
                            {item.link}
                            </AppText>
                        </Hyperlink> 
                        {accessed() && //If it is accessed from the 'Listing' screen, display the 'Add to My Plcaes' button. Otherwise, not
                        <View>
                            <AppButton 
                                style = {{top: 10, right: 110, width: 200}}
                                title = "Add to my places"
                                color = "darkblue"
                                textStyle = {{color: AppColors.black}}
                                onPress ={() => {confirmAddPlace(item)}}
                            />
                            <AppButton 
                                style = {{bottom: 38, left: 110, width: 200}}
                                title = "Delete"
                                color = "lightred"
                                textStyle = {{color: AppColors.black}}
                                onPress ={() => {confirmDeletePlace(item)}}
                            />
                        </View>
                        }
                    </View>
                </View>
                }
            />
            {notExist(route.params.paramItem) && 
            //If the item's information does not exist, display the text and tell users to go back to choose another one
            <View style = {{bottom: 350}}>
                <Button 
                    title="Edit Text" 
                    onPress={() => {setEditable(true); setChange(true); setUnchange(true); setEditted(false)}}
                />
                {editable && <AppTextInput
                        autoCapitalize="none"
                        autoCorrect={false}  
                        value={edittedValue}
                        onChangeText={setEdittedValue}
                        blurOnSubmit={true}
                        multiline = {true}
                />}
                {change && <AppButton 
                        style = {{top: 20, left: 5, width: 200}}
                        title = "Change"
                        color = "signinButton"
                        textStyle = {{color: AppColors.white}}
                        onPress ={() => {confirmChange()}}
                />}
                {unchange && <AppButton 
                        style = {{bottom: 30, left: 220, width: 200}}
                        color = "black"
                        title = "Don't Change"
                        textStyle = {{color: AppColors.white}}
                        onPress ={() => {setEditable(false); setChange(false); setUnchange(false)}}
                />}
                {editted ? <AppText style = {{justifyContent:'center', textAlign:'center'}}>
                                    {edittedValue}
                            </AppText>
                : <AppText style = {{justifyContent:'center', textAlign:'center', fontWeight: 'bold',}}>
                        There is no information of this place. Please choose another one!
                </AppText> 
                }
                {accessed() && 
                <View>
                    <AppButton 
                        style = {{top: 10, left: 5, width: 200}}
                        title = "Add to my places"
                        color = "darkblue"
                        textStyle = {{color: AppColors.black}}
                        onPress ={() => {confirmAddPlaceWithNoInfo(route.params.paramItem)}}
                    />
                    <AppButton 
                        style = {{bottom: 38, left: 220, width: 200}}
                        title = "Delete"
                        color = "lightred"
                        textStyle = {{color: AppColors.black}}
                        onPress ={() => {confirmDeletePlace(route.params.paramItem)}}
                    />
                </View>
                }
            </View>}
        </AppScreen>
    );
}

//Styles (Layout) for the view
const styles = StyleSheet.create({
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        flexDirection: "row",
        backgroundColor: "white",

      },
})

export default MoreInformationScreen;