import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { Divider } from 'react-native-elements';


class VehicleTypeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            JSONResult: '',
            showprivateCar: false,
            showtaxi: false,
            showMotorCycle: false
        };
    }



    static navigationOptions = {
        title: 'vehicle type'
    };

    componentDidMount = () => {
        this.props.navigation.addListener('willFocus', this.load)
    }


    load = () => {

        const { navigation } = this.props;
        const vehicleType = navigation.getParam('type', 'NO-Type');
        if (vehicleType === 'private') {
            this.setState({ showprivateCar: true });
        } else if (vehicleType === 'taxi') {
            this.setState({ showtaxi: true });
        } else if (vehicleType === 'motorcycle') {
            this.setState({ showMotorCycle: true });
        } else {
            // do nothing
        }

        console.log("vehicle type====" + vehicleType)

    }



    render() {
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#cee2ea', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('VehicleDetail') }}>

                        <Image source={require('../images/back-icon-green.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={styles.TextStyleScreenHeading}> Vehicle type </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Navigation') }}>

                        <Image source={require('../images/close-green-icon.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>
                </View>

                <Divider style={{ backgroundColor: '#135165', height: 1 }} />


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, backgroundColor: 'white', height: 85, margin: 20, borderRadius: 10 }}
                >

                    <TouchableOpacity style={{ flex: .30, justifyContent: 'flex-start' }}
                        onPress={() => {
                            this.props.navigation.navigate('VehicleDetail', {
                                type: 'private'
                            })
                        }}>

                        <Image source={this.state.showprivateCar === true ?
                            require('../images/private-car-active.png') :
                            require('../images/private-car-dactive.png')}
                        />


                    </TouchableOpacity>


                    <TouchableOpacity style={{ lexDirection: 'column', flex: .70, justifyContent: 'flex-start' }}
                        onPress={() => {
                            this.props.navigation.navigate('VehicleDetail', {
                                type: 'private'
                            })
                        }}>


                        <Text style={styles.TextStyleSettingOption}>Private </Text>

                        <Text style={styles.TextStyleOptionDetail}>For cars with no special restrictions </Text>

                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, backgroundColor: 'white', height: 85, margin: 20, borderRadius: 10 }}>

                    <TouchableOpacity style={{ flex: .30, justifyContent: 'flex-start' }}
                        onPress={() => {
                            this.props.navigation.navigate('VehicleDetail', {
                                type: 'taxi'
                            })
                        }}>


                        <Image source={this.state.showtaxi === true ?
                            require('../images/taxi-car-active.png') :
                            require('../images/taxi-car-dactive.png')}
                        />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ lexDirection: 'column', flex: .70, justifyContent: 'flex-start' }}
                        onPress={() => {
                            this.props.navigation.navigate('VehicleDetail', {
                                type: 'taxi'
                            })
                        }}>

                        <Text style={styles.TextStyleSettingOption}>Taxi </Text>

                        <Text style={styles.TextStyleOptionDetail}>Get routes great for taxis </Text>

                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, backgroundColor: 'white', height: 85, margin: 20, borderRadius: 10 }}>

                    <TouchableOpacity style={{ flex: .30, justifyContent: 'flex-start' }}
                        onPress={() => {
                            this.props.navigation.navigate('VehicleDetail', {
                                type: 'motorcycle'
                            })
                        }}>


                        <Image source={this.state.showMotorCycle === true ?
                            require('../images/bike-active.png') :
                            require('../images/bike-dactive.png')}
                        />


                    </TouchableOpacity>


                    <TouchableOpacity style={{ lexDirection: 'column', flex: .70, justifyContent: 'flex-start' }}
                        onPress={() => {
                            this.props.navigation.navigate('VehicleDetail', {
                                type: 'motorcycle'
                            })
                        }}>

                        <Text style={styles.TextStyleSettingOption}>Motorcycle </Text>

                        <Text style={styles.TextStyleOptionDetail}>Get routes great for Motorcycle  </Text>

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
        color: "#494749",
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
});

export default VehicleTypeScreen;
