//Import all necessary react components 
import { createSwitchNavigator } from "@react-navigation/compat";

//Import all necessary screens and navigators for use within the navigator between screens
import AuthNavigator from "./AuthNavigator";
import SplashScreen from "../screens/SplashScreen";
import HomeNavigator from "./HomeNavigator";

/*Function for switch navigation that is used to build the splash screen 
(for switching between splash screen and welcome screen*/
const InitialNavigator = createSwitchNavigator({
    "Splash": { screen: SplashScreen, },
    "Auth": AuthNavigator,
    "Home": HomeNavigator,
},
{
    initialRouteName: "Splash",
});

export default InitialNavigator;