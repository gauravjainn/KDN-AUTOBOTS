import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Picker,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class LandingScreenActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    static navigationOptions = {
        title: 'Landing Screen'
    };



    componentDidMount() {

    }



    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={styles.container}>

                    <Image source={require('../images/logo.png')}
                        style={styles.logoStyle} />

                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>

                        <View style={styles.leftSquareShapeView} >
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Navigation') }}>
                                <Image source={require('../images/Navigation-home-icon.png')}
                                    style={styles.ImageIconStyle} />
                                <Text style={{ color: 'white', textAlign: 'center' }}> Naviagtion </Text>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.rightSquareShapeView} >
                            <TouchableOpacity>

                                <Image source={require('../images/Friends-near-me-home-icon.png')}
                                    style={styles.ImageIconStyle} />

                                <Text style={{ color: 'white', textAlign: 'center' }}> Friend's near me </Text>

                            </TouchableOpacity>


                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>

                        <View style={styles.leftSquareShapeView} >
                            <TouchableOpacity>
                                <Image source={require('../images/car-pool-home-icon.png')}
                                    style={styles.ImageIconStyle} />
                                <Text style={{ color: 'white', textAlign: 'center' }}> Carpool </Text>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.rightSquareShapeView} >
                            <TouchableOpacity>

                                <Image source={require('../images/music-home-icon.png')}
                                    style={styles.ImageIconStyle} />

                                <Text style={{ color: 'white', textAlign: 'center' }}> Music </Text>

                            </TouchableOpacity>


                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>

                        <View style={styles.leftSquareShapeView} >
                            <TouchableOpacity>
                                <Image source={require('../images/events-home-icon.png')}
                                    style={styles.ImageIconStyle} />
                                <Text style={{ color: 'white', textAlign: 'center' }}> Events </Text>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.rightSquareShapeView} >
                            <TouchableOpacity>

                                <Image source={require('../images/settings-home-icon.png')}
                                    style={styles.ImageIconStyle} />

                                <Text style={{ color: 'white', textAlign: 'center' }}> Settings </Text>

                            </TouchableOpacity>


                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>

                        <View style={styles.leftSquareShapeView} >
                            <TouchableOpacity onPress={() => {
                                AsyncStorage.setItem('@is_login', "");
                                this.props.navigation.navigate('Splash')
                            }}>
                                <Image source={require('../images/logout-home-icon.png')}
                                    style={styles.ImageIconStyle} />
                                <Text style={{ color: 'white' }}> Logout </Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#01208b'
    },
    logoStyle: {
        marginTop: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    ImageIconStyle: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftSquareShapeView: {
        width: 180,
        height: 180,
        backgroundColor: '#1a3897',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 20
    },
    rightSquareShapeView: {
        width: 180,
        height: 180,
        marginLeft: 10,
        backgroundColor: '#1a3897',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 20

    },

});

export default LandingScreenActivity;
