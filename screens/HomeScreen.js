//Import all necessary react components
import React from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';

//Import all necessary files for use within this function
import AppColors from '../config/AppColors';
import AppIcon from '../components/AppIcon';
import AppListItem from '../components/AppListItem';
import AppScreen from '../components/AppScreen';
import AppButton from '../components/AppButton';

function HomeScreen({navigation, route}) {
    //Confirm when users want to signout if the wish to
    const confirm = () => {
        Alert.alert(
            "Note",
            "Are you sure you want to sign out?",
            [
              {
                text: "Yes",
                onPress: () => {
                    navigation.navigate("Welcome");
                },
                style: "cancel",
              },
              { text: "No"},
            ],
            { cancelable: false }
          );
    }

    //The Home Screen that displays the user information and the list of favourite if users want to see
    return (
        <AppScreen style={styles.container}>
                <View style={styles.welcomeContainer}>
                <Image
                //App Icon
                    source={require("../assets/App-Icon.png")}
                    style = {{height: 100, width: 100,}}
                />
                </View>

                <View style={styles.profileContainer}>
                    <AppListItem style = {styles.areaContainer} status = {true} image={route.params.paramImage} title={route.params.paramName} subtitle={route.params.paramEmail}/>
                </View>

                <View style={styles.linksContainer}>
                    <AppListItem style = {styles.areaContainer} status = {true} title="My Places"
                        AppComponent={<AppIcon name="map-marker-radius" size={50} iconColor={AppColors.black} backgroundColor={AppColors.primaryColor}/>} onPress={() => navigation.navigate("MyPlaces")}/>
                    <AppListItem style = {styles.areaContainer} status = {true} title="My Setting" AppComponent={<AppIcon name="cog-transfer-outline" size={50} iconColor={AppColors.black} backgroundColor={AppColors.primaryColor}/> } />
                </View>

                <View>
                <AppButton
                    style = {{width: '100%', top: 30}}
                    title="Signout"
                    color = 'signout'
                    testid = "signout"
                    onPress={() => confirm()}
                />
                </View>
        </AppScreen>
    );
}

//Styles (Layout) for the view, texts in the app
const styles = StyleSheet.create({
    container:{
        backgroundColor:AppColors.appBackground,
    },
    welcomeContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    }, 
    profileContainer:{
        marginTop: 50,
        backgroundColor:AppColors.otherColorLite,
        justifyContent:"center",
    },
    linksContainer:{
        marginVertical:75,
        backgroundColor:AppColors.otherColorLite,
        justifyContent:"space-between",
        paddingLeft: 10,
    },
    areaContainer:{
        flexDirection:"row",
        padding:10,
    },
})

export default HomeScreen;