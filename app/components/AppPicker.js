//Import all necessary react components 
import React, {useState} from 'react';
import { View, StyleSheet, Modal, Button, TouchableWithoutFeedback, FlatList } from 'react-native';
//Import the icon library for use within the app
import {MaterialCommunityIcons} from '@expo/vector-icons';

//Import all necessary files for use within this function
import AppText from './AppText';
import AppScreen from './AppScreen';
import AppPickerItem from './AppPickerItem';

/*File/Function for the list of items that the users can pick from 
when they click on the modal view (the search function) in the app.
It is just similar to the dropdown list, which displays items that users can choose from*/
function AppPicker({data, icon, placeholder, numColumns, selectedItem, onSelectItem, onPress}) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        //Function for users to click on to see the dropdown list
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.container}>
                    {icon && <MaterialCommunityIcons name={icon} size={24}/>}
                    <AppText style={styles.text}> {selectedItem? selectedItem.label : placeholder} </AppText>
                    <MaterialCommunityIcons name="chevron-down" size={24}/>
                </View>
            </TouchableWithoutFeedback>

            <Modal visible={modalVisible} animationType="slide">
                <AppScreen>
                    <Button title="Close" onPress={() => setModalVisible(false)}/>
                    <FlatList
                    //Flat list to display a list of items in the modal (dropdown list)
                        numColumns={numColumns}
                        data={data}
                        keyExtractor={item => item.value.toString()}
                        renderItem = {({item}) => 
                        /*Each item in the modal (dropdown list) with its own 
                        label, image or icon, and color that users can choose to click*/
                        <AppPickerItem
                            onPress={()=> {
                                {onPress && onPress()};
                                setModalVisible(false);
                                onSelectItem(item);
                                    }
                                }
                            image = {item.image}
                            label={item.label}
                            icon={item.icon}
                            backgroundColor={item.backgroundColor}
                            />}
                    />
                </AppScreen> 
            </Modal>
        </>
    );
}

//Styles (Layout) for the texts and view in the app
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
})
export default AppPicker;