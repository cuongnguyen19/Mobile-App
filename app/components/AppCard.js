//Import all necessary react components 
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

//Import all necessary files for use in this function
import AppColors from '../config/AppColors';
import AppText from './AppText';

/*File/Function for the cards of places in the app with the specified title (place name), subtitle (address),
category and image with all the specified styles */
function AppCard({category, title, subtitle, image, style}) {
    return (
        <View style={[styles.container, style]}>
            {isFinite(image)? <Image source={image} style={styles.image}/> : <Image source={{uri: image}} style={styles.image}/> }
            <AppText style={styles.title}> {title} - {category} </AppText>
            <AppText style={styles.subtitle}> {subtitle} </AppText>          
        </View>
    );
}

//Styles (Layout) for the title, subtitle, image
const styles = StyleSheet.create({
    container:{
        backgroundColor:AppColors.otherColorLite,
        borderRadius:30,
        overflow:"hidden",
        marginTop: 25,
        alignItems:"center",
    }, 
    image:{
        height: 200,
        width: "100%",
    },
    title:{
        fontWeight:"bold",
        fontSize:25,
    },
    subtitle:{
        fontSize:18,
    }
})

export default AppCard;