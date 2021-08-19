//Import all necessary react components
import React from 'react';
import { View, Text, Image } from 'react-native';

//Import all necessary files used within this function
import AppColors from '../config/AppColors';

class SplashScreen extends React.Component {
  //Set time out (time that splash screen will be present)
  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.props.navigation.navigate('Auth');
    }
  }
  //File/Function for displaying the splash screen
  render() {
    return (
        <View style={styles.viewStyles}>
            <Image
            //App Icon
                source={require("../assets/App-Icon.png")}
                style = {{height: 75, width: 75,}}
            />
        <Text style={styles.textStyles}>
            TravelAround
        </Text>
      </View>
    );
  }
}

//Styles (Layout) for the view and text
const styles = {
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.appBackground,
    },
    textStyles: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    }
}

export default SplashScreen;