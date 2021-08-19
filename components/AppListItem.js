//Import all necessary react components 
import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

//Import all necessary files for use in this function
import AppColors from '../config/AppColors';
import AppText from './AppText';

/*File/Function for the User Experience of the app.
With this function, the users can either click on an item (a card) 
to see more information about it, or swipe left to delete it*/
function AppListItem({image, title, subtitle, AppComponent, onPress, onSwipeLeft, style, status = false}) {
    return (
        //Function for swiping and touching
        <Swipeable renderRightActions={onSwipeLeft}>
            <TouchableHighlight onPress={onPress} underlayColor={AppColors.otherColorLite}>
                <View style = {style}>
                    {AppComponent}
                    {image && <Image source={image} style={styles.image}/>}
                    {status && <View style={styles.textContainer}>
                        <AppText style={styles.title}> {title} </AppText>
                        {subtitle && <AppText style={styles.subtitle}> {subtitle} </AppText>}
                    </View>}
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}

//Styles (Layout) for all the texts and image in the app
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        padding:10,
    },
    image:{
        height: 75,
        width: 75,
        borderRadius: 37,
        marginLeft: 10,
    },
    textContainer:{
        flexDirection:"column",
        marginLeft: 20,
    },
    title:{
        fontWeight:"bold",
        marginVertical: 5,
    },
    subtitle:{
        fontSize:15,
        marginLeft: 5,
    }
    
})

export default AppListItem;