import React, { Component } from 'react';
import { NavigationActions } from "react-navigation";
import {
    StyleSheet,
    View,
    ImageBackground,
} from 'react-native';

class SplashActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

   

    static navigationOptions = {
        title: 'Splash',
        // headerStyle: {
        //   backgroundColor: '#03A9F4',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
    };

    componentDidMount(){
        // Start counting when the page is loaded
        this.timeoutHandle = setTimeout(()=>{
             // Add your logic for the transition
             this.props.navigation.navigate('Login')
        }, 5000);
   }

   componentWillUnmount(){
        clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
   }


    render() {
        return (
            <View style={styles.container}>

                <ImageBackground style={styles.imgBackground}
                    resizeMode='cover'
                    source={require('../images/splash_bg.png')}>


                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    image: {
        height: 50,
        marginTop: 50,
        justifyContent: "space-around",    //  <-- you can use "center", "flex-start",
        resizeMode: "contain",             //      "flex-end" or "space-between" here
    },
});

export default SplashActivity;
