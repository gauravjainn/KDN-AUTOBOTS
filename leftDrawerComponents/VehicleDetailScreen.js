import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Divider } from 'react-native-elements';


class VehicleDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            JSONResult: '',
            vehicleType: '',
            colour: '',
            brand: '',
            number: ''
        };
    }

    static navigationOptions = {
        title: 'vehicle detail'
    };


    render() {
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#cee2ea', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Settings') }}>

                        <Image source={require('../images/back-icon-green.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={styles.TextStyleScreenHeading}> Vehicle details </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Settings') }}>

                        <Image source={require('../images/blue-tick.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>
                </View>

                <Divider style={{ backgroundColor: '#135165', height: 1 }} />


                <View style={{ flexDirection: 'row', margin: 15, alignItems: 'center', justifyContent: 'center', marginTop: 30, backgroundColor: 'white', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('VehicleType') }}>

                        <Image source={require('../images/vehicle.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .50, justifyContent: 'flex-start' }}
                        onPress={() => { this.props.navigation.navigate('VehicleType') }}>

                        <Text style={styles.TextStyleSettingOption}> Vehicle type </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', flex: .30, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('VehicleType') }}>

                        <Text style={styles.TextStyleOptionDetail}>Private </Text>
                        <Image source={require('../images/forward_arrow_left_drawer.png')}
                            style={styles.ImageIconStyle}
                        />

                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', margin: 15, backgroundColor: '#e9f5f8', height: 60 }}>


                    <TouchableOpacity style={{ flex: .50, justifyContent: 'flex-start' }}>

                        <Text style={styles.TextStyleOptionHeading}> Vehicle colour </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', flex: .50 }}>

                        <TextInput
                            placeholder={'Enter Vehicle Colour'}
                            placeholderTextColor="#58666c"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            onChangeText={color => this.setState({ color })}
                        />
                        {/* <Text style={styles.TextStyleOptionResult}> Black </Text> */}

                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', margin: 15, backgroundColor: '#e9f5f8', height: 60 }}>


                    <TouchableOpacity style={{ flex: .50, justifyContent: 'flex-start' }}>

                        <Text style={styles.TextStyleOptionHeading}> Vehicle brand </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', flex: .50 }}>

                        {/* <Text style={styles.TextStyleOptionResult}> Honda </Text> */}

                        <TextInput
                            placeholder={'Enter Vehicle brand'}
                            placeholderTextColor="#58666c"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            onChangeText={brand => this.setState({ brand })}
                        />

                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', margin: 15, backgroundColor: '#e9f5f8', height: 60 }}>


                    <TouchableOpacity style={{ flex: .50, justifyContent: 'flex-start' }}>

                        <Text style={styles.TextStyleOptionHeading}> Vehicle number </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', flex: .50 }}>

                        {/* <Text style={styles.TextStyleOptionResult}> RJ27-SB-2345 </Text> */}

                        <TextInput
                            placeholder={'Enter Vehicle number'}
                            placeholderTextColor="#58666c"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            onChangeText={brand => this.setState({ brand })}
                        />

                    </TouchableOpacity>
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#cee2ea'
    },
    TextStyleScreenHeading: {
        color: "#135165",
        fontSize: 22,
        fontWeight: 'bold'
    },
    TextStyleSettingOption: {
        color: "#4d4c4d",
        fontSize: 20,
        fontWeight: 'bold',
    },
    TextStyleOptionDetail: {
        color: "#9b9a9c",
        fontSize: 16,
    },
    ImageIconStyle: {
        marginTop: 3,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextStyleOptionHeading: {
        color: "#88a09f",
        fontSize: 18,
    },
    TextStyleOptionResult: {
        color: "#58666c",
        fontSize: 16,
    },
    input: {
        color: '#58666c',
        height: 40,
        fontSize: 16,
        backgroundColor: 'transparent'
    },
});

export default VehicleDetailScreen;
