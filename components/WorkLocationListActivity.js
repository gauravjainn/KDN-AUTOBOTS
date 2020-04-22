import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

var destinationlat, destinationlong;
const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class WorkLocationListActivity extends Component {

    constructor(props) {
        super(props);
        // this.showPageData = this.showPageData.bind(this);
        this.state = {
            JSONResult: '',
            baseUrl: 'http://kd.smeezy.com/api',
            destination: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
                title: '',
            },
        };
    }

    static navigationOptions = {
        title: 'Home'
    };


    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }


    componentDidMount() {

        //  this.showLoading()
        //this.showPageData();

    }


    // showPageData() {

    //     let formdata = new FormData();
    //     formdata.append("methodName", 'getpagedata')
    //     formdata.append("slug", 'About-us')

    //     var that = this;
    //     var url = that.state.baseUrl;
    //     console.log('url:' + url);
    //     fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         body: formdata
    //     }).then((response) => response.json())
    //         .then(responseJson => {
    //             this.hideLoading();
    //             if (responseJson.replyStatus == 'success') {

    //                 this.setState({ screendata: responseJson.data.description });


    //             } else {
    //                 alert(responseJson.replyMessage);
    //             }
    //         }).catch(err => {
    //             this.hideLoading();
    //             console.log(err)
    //         })

    // }


    render() {
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#cee2ea', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Navigation') }}>

                        <Image source={require('../images/back-icon-green.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={styles.TextStyleScreenHeading}> Work </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}>


                    </TouchableOpacity>
                </View>

                <Divider style={{ backgroundColor: '#135165' }} />

                <View style={styles.locationsContainer}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#dae1e2', height: 60 }}>

                        <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { this.props.navigation.navigate('Navigation') }}>

                            <Image source={require('../images/current-location-icon.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .60 }}>

                            <Text style={styles.TextStyleCurrentLocation}> Current location </Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}>


                        </TouchableOpacity>
                    </View>




                    <Text style={styles.TextStyleFb}> Please select end location </Text>

                    <GooglePlacesAutocomplete
                        placeholder='select end location'
                        placeholderTextColor={'#838b8f'}
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                        listViewDisplayed={this.state.showPlacesListdestination}
                        enablePoweredByContainer={false}
                        onChangeText={ValueHolder => this.GetValueFunction(ValueHolder)}
                        textInputProps={{
                            onFocus: () => this.setState({ showPlacesListdestination: true }),
                            onBlur: () => this.setState({ showPlacesListdestination: false }),
                        }}

                        // listViewDisplayed='auto' 
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            console.log("data===" + JSON.stringify(data));
                            console.log("details===" + JSON.stringify(details));
                            console.log("geometry===" + JSON.stringify(details.geometry.location));
                            destinationlat = parseFloat(details.geometry.location.lat)
                            destinationlong = parseFloat(details.geometry.location.lng)

                            var initialdestination = {
                                latitude: destinationlat,
                                longitude: destinationlong,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                                title: data.description
                            }

                            this.setState({ destination: initialdestination })

                            console.log("destinationlat===" + destinationlat);
                            console.log("destinationlong===" + destinationlong);


                        }}


                        getDefaultValue={() => ''}

                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyAAQ1Cppz62lgwYEJjzrkty7Nzi5ZYNCSM',
                            language: 'en' // language of the results
                            //  types: 'geocode' // default: 'geocode'
                        }}

                        styles={{
                            textInputContainer: {
                                alignSelf: 'center',
                                width: '90%',
                                borderWidth: 0,
                                textAlign: 'center',
                                fontSize: 30,
                                marginTop:10,
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                backgroundColor: '#ffffff',

                            },
                            description: {
                                color: 'black',
                                fontWeight: 'bold'
                            },
                            predefinedPlacesDescription: {
                                color: '#9b999b'
                            },
                            row: {
                                padding: 13,
                                height: 50,
                                marginLeft: 10,
                                marginRight: 10,
                                flexDirection: 'row',
                            },
                            separator: {
                                height: StyleSheet.hairlineWidth,
                                backgroundColor: '#c8c7cc',
                                marginLeft: 20,
                                marginRight: 20,
                            },
                        }}

                        //  currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        //   currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            type: 'cafe'
                        }}

                        GooglePlacesDetailsQuery={{
                            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                            fields: 'geometry',
                        }}

                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        //  predefinedPlaces={[homePlace, workPlace]}

                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    //  renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
                    //   renderRightButton={() => <Text>Custom text after the input</Text>}
                    />



                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <TouchableOpacity style={{ flex: .5, justifyContent: 'center', alignItems: 'center' }}
                            activeOpacity={.5}
                            onPress={this.CheckTextInput}>

                            <View style={styles.saveButtonStyle}>
                                <Text style={{ color: 'white' }}>Save</Text>
                            </View>


                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: .5, alignItems: 'center', justifyContent: 'center' }}
                            activeOpacity={.5}
                            onPress={this.CheckTextInput}>

                            <View style={styles.goButtonStyle}>
                                <Text style={{ color: 'white' }}>Go</Text>
                            </View>



                        </TouchableOpacity>

                    </View>

                </View>

            </View>


        );
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5
    },
    container: {
        flex: 1,
        backgroundColor: '#dae1e2'
    },
    locationsContainer: {
        height: 300,
        backgroundColor: '#dae1e2'
    },
    TextStyleScreenHeading: {
        color: "#135165",
        fontSize: 22,
        fontWeight: 'bold'
    },
    ImageIconStyle: {
        height: 35,
        width: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextStyleFb: {
        color: "#838b8f",
        marginTop: 5,
        marginLeft: 20,
        marginTop: 20,
        fontSize: 18
    },
    TextStyleCurrentLocation: {
        color: "#838b8f",
        marginTop: 5,
        fontSize: 18
    },

    headerText: {
        fontSize: 18,
        color: 'white'
    },

    saveButtonStyle: {
        padding: 15,
        borderRadius: 20,
        width: 150,
        alignItems: 'center',
        backgroundColor: '#0096fe',
    },
    goButtonStyle: {
        padding: 15,
        borderRadius: 20,
        width: 150,
        backgroundColor: '#5d7a8a',
        borderRadius: 20,
        alignItems: 'center'
    },


});

export default WorkLocationListActivity;
