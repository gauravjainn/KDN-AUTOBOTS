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
import AsyncStorage from '@react-native-community/async-storage';

class VehicleDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId:'',
            JSONResult: '',
            vehicleType: '',
            colour: '',
            brand: '',
            number: '',
            baseUrl: 'http://kd.smeezy.com/api',
        };
    }

    static navigationOptions = {
        title: 'vehicle detail'
    };

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.load)
       
        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("Reset user id ====" + this.state.userId);
                this.showLoading()
                this.showVehicleData();
            }
        });
    }

    load = () => {

        const { navigation } = this.props;
        const vehicleType = navigation.getParam('type', 'NO-Type');
        this.setState({ vehicleType: vehicleType});
        console.log("vehicle type====" + vehicleType)
    
      }
    
    

    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    showVehicleData() {

        let formdata = new FormData();
        formdata.append("methodName", 'get_vehicle_list')
        formdata.append("user_id", this.state.userId)

        var that = this;
        var url = that.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata
        }).then((response) => response.json())
            .then(responseJson => {
                this.hideLoading();
                if (responseJson.replyStatus == 'success') {

                    this.setState({ vehicleType: responseJson.data.vehicle_type });
                     this.setState({ colour: responseJson.data.vehicle_color });
                     this.setState({ brand : responseJson.data.vehicle_brand });
                    this.setState({ number: responseJson.data.vehicle_number_plate });


                } else {
                    alert(responseJson.replyMessage);
                }
            }).catch(err => {
                this.hideLoading();
                console.log(err)
            })

    }



    CheckTextInput = () => {
        //  Handler for the Submit onPress
        // if (this.state.vehicleType != '') {
            //Check for the Name TextInput
            if (this.state.colour != '') {
                //Check for the Email TextInput
                if (this.state.brand != '') {
                    //Check for the Email TextInput
            
                    this.showLoading();
                    this.SaveVehicleData();

                } else {
                    alert('Please Enter Vehicle brand');
                }
            } else {
                alert('Please Enter Vehicle Colour');
            }
        // } else {
        //     alert('Please Select Vehicle Type');
        // }
    };

    SaveVehicleData() {

      
        let formdata = new FormData();
        formdata.append("methodName", 'save_vehicle_detail')
        formdata.append("user_id", this.state.userId)
        formdata.append("vehicle_type", this.state.vehicleType)
        formdata.append("vehicle_color", this.state.colour)
        formdata.append("vehicle_brand", this.state.brand)
        formdata.append("vehicle_number_plate", this.state.number)



        var that = this;
        var url = that.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata
        }).then((response) => response.json())
            .then(responseJson => {
                this.hideLoading();
                if (responseJson.replyStatus == 'success') {

                    alert(responseJson.replyMessage);
               

                } else {
                    alert(responseJson.replyMessage);
                }
               
              //  console.log("server MESSAGE  ===" + responseJson.replyMessage)
            
            }).catch(err => {
                this.hideLoading();
                console.log(err)
            })

    }


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
                        onPress={() => { this.CheckTextInput() }}>

                        <Image source={require('../images/blue-tick.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>
                </View>

                <Divider style={{ backgroundColor: '#135165', height: 1 }} />


                <View style={{ flexDirection: 'row', margin: 15, alignItems: 'center', justifyContent: 'center', marginTop: 30, backgroundColor: 'white', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('VehicleType', {
                            type: this.state.vehicleType
                        })}}>



                        <Image source={require('../images/vehicle.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .50, justifyContent: 'flex-start' }}
                        onPress={() => { this.props.navigation.navigate('VehicleType', {
                            type: this.state.vehicleType
                        })}}>

                        <Text style={styles.TextStyleSettingOption}> Vehicle type </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', flex: .30, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('VehicleType', {
                            type: this.state.vehicleType
                        })}}>
                        <Text style={styles.TextStyleOptionDetail}> {this.state.vehicleType} </Text>

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
                            value={this.state.colour}
                            onChangeText={colour => this.setState({ colour })}
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
                            value={this.state.brand}
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
                            value={this.state.number}
                            onChangeText={number => this.setState({ number })}
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
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        //backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
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
