//Import all necessary react components
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Import all necessary files for use within the tab navigator
import AppColors from '../config/AppColors';
import AppIcon from '../components/AppIcon';

//Import all necessary screens and navigators for use within the navigator between screens in the tab
import NewPlaceScreen from '../screens/NewPlaceScreen';
import HomeNavigator from './HomeNavigator';
import ListingNavigator from './ListingNavigator';
import MyPlacesNavigator from './MyPlacesNavigator';

//File/Function for a tab navigator instance
const AppTab = createBottomTabNavigator();
const TabNavigator = () => (
    //All Screens used in the tab navigator (appears at the bottom of the screen), with the specified name, and options
    <AppTab.Navigator tabBarOptions={{activeTintColor:AppColors.otherColor, activeBackgroundColor:AppColors.primaryColor}}>
        <AppTab.Screen name="Home" component={HomeNavigator} options={{tabBarIcon: () => <AppIcon size={30} name="home" backgroundColor={AppColors.otherColor}/>}}/>
        <AppTab.Screen name="New Place" component={NewPlaceScreen} options={{tabBarIcon: () => <AppIcon size={30} name="plus-box" backgroundColor={AppColors.otherColor}/>}}/>
        <AppTab.Screen name="Listing" component={ListingNavigator} options={{tabBarIcon: () => <AppIcon size={30} name="view-list" backgroundColor={AppColors.otherColor}/>}}/>
        <AppTab.Screen name="My Places" component={MyPlacesNavigator} options={{tabBarIcon: () => <AppIcon size={30} name="map-marker-radius" backgroundColor={AppColors.otherColor}/>}}/>
    </AppTab.Navigator>
)

export default TabNavigator;