import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
} from 'react-native';
import SoundPlayer from 'react-native-sound-player'
import AsyncStorage from '@react-native-community/async-storage';



class SplashActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    static navigationOptions = {
        title: 'Splash'
    };

    componentDidMount() {

        this.props.navigation.addListener('willFocus', this.load)
      
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
    }

    load = () => {

        try {
            // play the file tone.mp3
            SoundPlayer.playSoundFile('carstartgarage', 'mp3')
            // or play from url
            //    SoundPlayer.playUrl('https://example.com/music.mp3')
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }


        this.timeoutHandle = setTimeout(() => {
            // Add your logic for the transition

            AsyncStorage.getItem('@is_login').then((isLogin) => {
                if (isLogin == undefined || isLogin == "0") {
                    this.props.navigation.navigate('Login')
                } else if (isLogin == "1") {
                    this.props.navigation.navigate('LandingScreen')
                }
            });

        }, 4000);
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
