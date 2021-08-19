//Import all necessary react components 
import React from 'react';
import { View } from 'react-native';
//Import the icon library for use within the app
import {MaterialCommunityIcons} from '@expo/vector-icons';

//File/Function for the icons in the app with the specified name, size and color.
function AppIcon({name, size=40, iconColor="black", backgroundColor}) {
    return (
        <View style={{width: size, height: size, backgroundColor, borderRadius: size/2, alignItems:"center", justifyContent:"center"}}>
            <MaterialCommunityIcons name={name} size={size*0.6} color={iconColor}/>
        </View>
    );
}

export default AppIcon;