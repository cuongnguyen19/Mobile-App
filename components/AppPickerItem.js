//Import all necessary react components 
import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

//Import all necessary files for use within this function
import AppIcon from './AppIcon';
import AppText from './AppText';

/*File/Function for each of the 'clickable' item in the dropdown list (modal) 
with its own label, icon, image, color and onpress function to handle*/
function AppPickerItem({onPress, label, icon, image, backgroundColor}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {image && <Image
                    source={image}
                    style = {styles.image}
                />}
            {icon && <AppIcon name={icon} iconColor="white" backgroundColor={backgroundColor}/>}
            <AppText> {label} </AppText>
        </TouchableOpacity>
    );
}

//Styles (Layout) for the view and image
const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        paddingVertical: 10,
        width:"33%",
        alignItems:"center",
    },
    image:{
        height: 50, 
        width: 50,
    }
})

export default AppPickerItem;