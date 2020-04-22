import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { View, Text, StyleSheet, Image, PermissionsAndroid, Platform, Dimensions, TouchableOpacity, Modal, TextInput, NativeModules } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import SwipeablePanel from 'rn-swipeable-panel';
import { Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
var destinationlat, destinationlong;
var currentLatitude, currentLongitude;
var directionData;
var _ = require('lodash');
console.disableYellowBox = true;
const { ToastModule } = NativeModules;

export default class NavigationScreen extends Component {

  constructor(props) {
    super(props)
    this.mapView = null;
    this.state = {
      Alert_Visibility: false,
      showPlacesList: false,
      swipeablePanelActive: false,
      swipeablePanelNaviagtion: false,
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      destination: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
        title: '',
      },
      directionDetails: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
        title: '',
      },

      // visible: false,
      isVisible: false,
      TextValue: '',
    }
  }



  ShowCustomAlert(visible) {
    this.setState({ Alert_Visibility: visible });
  }

  ShowSavedLocationsAlert() {
    this.setState({ isVisible: true });
  }

  HideSavedLocationsAlert() {
    this.setState({ isVisible: false });
  }

  openPanel = () => {
    this.setState({ swipeablePanelActive: true });
  };

  closePanel = () => {
    this.setState({ swipeablePanelActive: false });
  };

  openNaviagtionPanel = () => {
    this.setState({ swipeablePanelNaviagtion: true });
  };

  closeNaviagtionPanel = () => {
    this.setState({ swipeablePanelNaviagtion: false });
  };

  // _toggleBottomNavigationView = () => {
  //   //Toggling the visibility state of the bottom sheet
  //   this.setState({ visible: !this.state.visible });
  // };

  _showToast() {

    ToastModule.showToast(currentLatitude, currentLongitude, destinationlat, destinationlong);
  }

  componentDidMount = () => {
    this.props.navigation.addListener('willFocus', this.load)
    var that = this;
    //Checking for the permission just after component loaded
    if (Platform.OS === 'ios') {
      //  this._isMounted = true;
      this.callLocation(that);
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            'title': 'Location Access Required',
            'message': 'This App needs to Access your location'
          }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            // this._isMounted = true;
            that.callLocation(that);
          } else {
            alert("Permission Denied");
          }
        } catch (err) {
          alert("err", err);
          console.warn(err)
        }
      }
      requestLocationPermission();
    }
  }


  load = () => {

    const { navigation } = this.props;
    destinationlat = parseFloat(navigation.getParam('destinationLatitude', ''))
    destinationlong = parseFloat(navigation.getParam('destinationLongitude', ''))
    var destinationName = navigation.getParam('destinationName', '')

    console.log("lat=====" + destinationlat)
    console.log("destinationName=====" + destinationName)
    if (destinationName == '') {

    } else {
      var initialdestination = {
        latitude: destinationlat,
        longitude: destinationlong,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
        title: destinationName
      }

      directionData = {
        latitude: destinationlat,
        longitude: destinationlong,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
        title: destinationName
      }

      this.setState({ destination: initialdestination })
      this.mapView.animateToRegion(initialdestination, 2000);
      this.closePanel();
      this.displayDirectionPoly();
      this.openNaviagtionPanel();

    }

  }


  callLocation(that) {
    //alert("callLocation Called");
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {

        currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        that.setState({ currentLongitude: currentLongitude });
        //Setting state Longitude to re re-render the Longitude Text
        that.setState({ currentLatitude: currentLatitude });
        //Setting state Latitude to re re-render the Longitude Text

        console.log("longitude1 ====" + this.state.currentLongitude)
        console.log("lattitude 1====" + this.state.currentLatitude)

        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)

        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }

        this.setState({ initialPosition: initialRegion })
        this.mapView.animateToRegion(initialRegion, 2000);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    that.watchID = Geolocation.watchPosition((position) => {
      //Will give you the location on location change
      console.log(position);

      currentLongitude = JSON.stringify(position.coords.longitude);
      //getting the Longitude from the location json
      currentLatitude = JSON.stringify(position.coords.latitude);
      //getting the Latitude from the location json
      that.setState({ currentLongitude: currentLongitude });
      //Setting state Longitude to re re-render the Longitude Text
      that.setState({ currentLatitude: currentLatitude });
      console.log("longitude ====" + this.state.currentLongitude)
      console.log("lattitude ====" + this.state.currentLatitude)

      //Setting state Latitude to re re-render the Longitude Text
    });
  }
  componentWillUnmount = () => {
    //  this._isMounted = false;
    Geolocation.clearWatch(this.watchID);
  }

  displayDirectionPoly = () => {

    //   this._toggleBottomNavigationView();
    this.setState({ directionDetails: directionData })

  };

  GetValueFunction = (ValueHolder) => {

    var Value = ValueHolder.length.toString();
    this.setState({ TextValue: Value });


    console.log("length====" + ValueHolder.length)

  }


  render() {
    var mapStyle = [{ "elementType": "geometry", "stylers": [{ "color": "#475fd0" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#7f8dc3" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#475fd0" }] },
    { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#00228c" }] },
    { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#00228c" }] },
    { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#1c8352" }] },
    { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#6b9a76" }] },
    { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#242F3E" }] },
    { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] },
    { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] },
    { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#00228c" }] },
    { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] },
    { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#f3d19c" }] },
    { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#1787d1" }] },
    { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#7f8dc3" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#173ad4" }] },
    { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#c3c9d3" }] },
    { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#173ad4" }] }];

    return (
      <View style={styles.MainContainer}>
        <View style={{ width: '100%', top: '15%', zIndex: 2, position: 'absolute', backgroundColor: 'transparent' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <GooglePlacesAutocomplete
              placeholder='Where to?'
              placeholderTextColor={'#7f8dc3'}
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
              listViewDisplayed={this.state.showPlacesList}
              enablePoweredByContainer={false}
              onChangeText={ValueHolder => this.GetValueFunction(ValueHolder)}
              textInputProps={{
                onFocus: () => this.setState({ showPlacesList: true }),
                onBlur: () => this.setState({ showPlacesList: false }),
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

                directionData = {
                  latitude: destinationlat,
                  longitude: destinationlong,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                  title: data.description
                }


                this.setState({ destination: initialdestination })
                this.mapView.animateToRegion(initialdestination, 2000);
                this.closePanel();
                this.displayDirectionPoly();
                this.openNaviagtionPanel();

                console.log("lat===" + destinationlat);
                console.log("long===" + destinationlong);


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
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  backgroundColor: '#ffffff',

                },
                description: {
                  color: 'white',
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
          </View>
        </View>
        <View style={{ width: '100%', height: '90%', top: '0%', zIndex: 1, position: 'absolute' }} >
          <MapView
            style={styles.mapStyle}
            showsUserLocation={true}
            zoomEnabled={true}
            zoomControlEnabled={true}
            showsMyLocationButton={true}
            minZoomLevel={3}
            maxZoomLevel={12}

            ref={ref => {
              this.mapView = ref;
            }}
            customMapStyle={mapStyle}
            initialRegion={this.state.initialPosition}>


            <MapViewDirections
              origin={this.state.initialPosition}
              destination={this.state.directionDetails}
              strokeWidth={5}
              strokeColor="#24a0ed"
              apikey={'AIzaSyAAQ1Cppz62lgwYEJjzrkty7Nzi5ZYNCSM'}
            />


            <Marker
              coordinate={{
                latitude: this.state.destination.latitude,
                longitude: this.state.destination.longitude,
              }}
              // onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
              title={this.state.destination.title}
              //   onPress={this.displayDirectionPoly}
              onPress={this.openNaviagtionPanel}
            //  description={'This is a description of the marker'}
            />

          </MapView>

          <SwipeablePanel
            fullWidth
            isActive={this.state.swipeablePanelNaviagtion}
            closeOnTouchOutside={false}
            showCloseButton={true}
            noBackgroundOpacity={true}
            onClose={() => this.closeNaviagtionPanel()}>
            <View style={styles.bottomNearestNavigationView}>



            </View>

          </SwipeablePanel>


          <SwipeablePanel
            fullWidth
            isActive={this.state.swipeablePanelActive}
            closeOnTouchOutside={true}
            showCloseButton={true}
            noBackgroundOpacity={true}
            onClose={() => this.closePanel()}>
            <View style={styles.bottomNearestNavigationView}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>

                <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 20 }}>
                  Explore
              </Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>

                  <TouchableOpacity
                    onPress={() => {
                      this.closePanel();
                      this.props.navigation.navigate('Restaurant', {
                        currentLatitude: this.state.currentLatitude,
                        currentLongitude: this.state.currentLongitude
                      })


                    }}>

                    <Image source={require('../images/food.png')}
                      style={styles.ImageIconStyle} />
                    <Text style={styles.headline}> Restaurants </Text>

                  </TouchableOpacity>


                  <TouchableOpacity
                    onPress={() => {
                      this.closePanel();
                      this.props.navigation.navigate('Atm', {
                        currentLatitude: this.state.currentLatitude,
                        currentLongitude: this.state.currentLongitude
                      })
                      //   this.props.navigation.navigate('Atm')
                    }}>

                    <Image source={require('../images/Atm.png')}
                      style={styles.ImageIconStyle} />

                    <Text style={styles.headline}> Atm's </Text>

                  </TouchableOpacity>





                </View>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.closePanel();
                      this.props.navigation.navigate('MovieHall', {
                        currentLatitude: this.state.currentLatitude,
                        currentLongitude: this.state.currentLongitude
                      })
                    }}>

                    <Image source={require('../images/Cinema.png')}
                      style={styles.ImageIconStyle} />

                    <Text style={styles.headline}> Cinema </Text>

                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.closePanel();
                      this.props.navigation.navigate('ShoppingMall', {
                        currentLatitude: this.state.currentLatitude,
                        currentLongitude: this.state.currentLongitude
                      })
                      //this.props.navigation.navigate('ShoppingMall')
                    }}>

                    <Image source={require('../images/shopping.png')}
                      style={styles.ImageIconStyle} />

                    <Text style={styles.headline}> Shopping Mall </Text>

                  </TouchableOpacity>



                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>

                  <TouchableOpacity
                    onPress={() => {
                      this.closePanel();
                      //  this.props.navigation.navigate('Parking')
                      this.props.navigation.navigate('Parking', {
                        currentLatitude: this.state.currentLatitude,
                        currentLongitude: this.state.currentLongitude
                      })
                    }}>

                    <Image source={require('../images/Parking.png')}
                      style={styles.ImageIconStyle} />

                    <Text style={styles.headline}> Parking </Text>

                  </TouchableOpacity>


                  <TouchableOpacity
                    onPress={() => {
                      this.closePanel();
                      this.props.navigation.navigate('Hospital', {
                        currentLatitude: this.state.currentLatitude,
                        currentLongitude: this.state.currentLongitude
                      })

                      //    this.props.navigation.navigate('Hospital')
                    }}>
                    <Image source={require('../images/Hospital.png')} style={styles.ImageIconStyle} />

                    <Text style={styles.headline}> Hospital </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SwipeablePanel>

          <View>


            <Dialog
              visible={this.state.isVisible}
              onTouchOutside={() => {
                this.setState({ isVisible: false });
              }}
              width={320}
              height={220} >


              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30 }}>

                <TouchableOpacity style={{ flex: .3 }}>

                </TouchableOpacity>

                <TouchableOpacity style={{ flex: .5, alignItems: 'center', justifyContent: 'center' }}>

                </TouchableOpacity>


                <TouchableOpacity style={{ flex: .2, alignItems: 'center' }}
                  onPress={() => { this.setState({ isVisible: false }) }}>

                  <Image source={require('../images/close_red_icon.png')}
                    style={styles.ImageStyle} />

                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 60 }}>

                <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => {
                    this.setState({ isVisible: false })
                    this.props.navigation.navigate('HomeLocationList')
                  }}>

                  <Image source={require('../images/home_blue_icon.png')}
                    style={styles.ImageIconStyle} />

                </TouchableOpacity>


                <TouchableOpacity style={{ flex: .60 }}
                  onPress={() => {
                    this.setState({ isVisible: false })
                    this.props.navigation.navigate('HomeLocationList')
                  }}>

                  <Text style={styles.TextStyleOptionUpperHeading}> Home </Text>

                </TouchableOpacity>

                

                <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                   onPress={() => {
                    this.setState({ isVisible: false })
                    this.props.navigation.navigate('HomeLocationList')
                  }}>

                  <Image source={require('../images/forward_arrow_left_drawer.png')}
                    style={styles.ImageIconStyle}
                  />

                </TouchableOpacity>

              </View>

              <Divider style={{ backgroundColor: 'black' }} />

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 60 }}>
                <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                 onPress={() => {
                  this.setState({ isVisible: false })
                  this.props.navigation.navigate('WorkLocationList')
                }}>

                  <Image source={require('../images/work_blue_icon.png')}
                    style={styles.ImageIconStyle} />

                </TouchableOpacity>


                <TouchableOpacity style={{ flex: .60 }}
                 onPress={() => {
                  this.setState({ isVisible: false })
                  this.props.navigation.navigate('WorkLocationList')
                }}>


                  <Text style={styles.TextStyleOptionUpperHeading}> Work </Text>

                </TouchableOpacity>

                <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => {
                    this.setState({ isVisible: false })
                    this.props.navigation.navigate('WorkLocationList')
                  }}>


                  <Image source={require('../images/forward_arrow_left_drawer.png')}
                    style={styles.ImageIconStyle}
                  />

                </TouchableOpacity>
              </View>

              <Divider style={{ backgroundColor: 'black' }} />

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 60 }}
              >

                <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}>

                  <Image source={require('../images/favorites_blue_icon.png')}
                    style={styles.ImageIconStyle} />

                </TouchableOpacity>


                <TouchableOpacity style={{ flex: .60 }}>

                  <Text style={styles.TextStyleOptionUpperHeading}> Favorites </Text>

                </TouchableOpacity>

                <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}>

                  <Image source={require('../images/forward_arrow_left_drawer.png')}
                    style={styles.ImageIconStyle}
                  />

                </TouchableOpacity>

              </View>


            </Dialog>


            <Modal

              visible={this.state.Alert_Visibility}

              transparent={true}

              animationType={"fade"}

              onRequestClose={() => { this.ShowCustomAlert(!this.state.Alert_Visibility) }} >


              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


                <View style={styles.AlertMainView}>


                  <Text style={styles.Alert_Title}>Send a report</Text>


                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: .33 }}
                      onPress={() => { this.ShowCustomAlert(!this.state.Alert_Visibility) }}>

                      <Image source={require('../images/traffic.png')}
                        style={styles.ImageIconStyle} />
                      <Text style={styles.reportNameStyle}> Traffic </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .33 }}
                      onPress={() => { this.ShowCustomAlert(!this.state.Alert_Visibility) }}>

                      <Image source={require('../images/police.png')}
                        style={styles.ImageIconStyle} />
                      <Text style={styles.reportNameStyle}> Police </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .33 }}
                      onPress={() => { this.ShowCustomAlert(!this.state.Alert_Visibility) }}>

                      <Image source={require('../images/crash.png')}
                        style={styles.ImageIconStyle} />
                      <Text style={styles.reportNameStyle}> Accident </Text>

                    </TouchableOpacity>

                  </View>



                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: .33 }}
                      onPress={() => { this.ShowCustomAlert(!this.state.Alert_Visibility) }}>

                      <Image source={require('../images/Hazard.png')}
                        style={styles.ImageIconStyle} />
                      <Text style={styles.reportNameStyle}> Hazard </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .33 }}
                      onPress={() => { this.ShowCustomAlert(!this.state.Alert_Visibility) }}>

                      <Image source={require('../images/chat.png')}
                        style={styles.ImageIconStyle} />
                      <Text style={styles.reportNameStyle}> Map chat </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .33 }}
                      onPress={() => { this.ShowCustomAlert(!this.state.Alert_Visibility) }}>

                      <Image source={require('../images/map_issue.png')}
                        style={styles.ImageIconStyle} />
                      <Text style={styles.reportNameStyle}> Map Issue </Text>

                    </TouchableOpacity>

                  </View>

                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: .33 }}
                      onPress={() => { this.ShowCustomAlert(!this.state.Alert_Visibility) }}>

                      <Image source={require('../images/place.png')}
                        style={styles.ImageIconStyle} />
                      <Text style={styles.reportNameStyle}> Place </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .33 }}
                      onPress={() => { this.ShowCustomAlert(!this.state.Alert_Visibility) }}>

                      <Image source={require('../images/road_side_help.png')}
                        style={styles.ImageIconStyle} />
                      <Text style={styles.reportNameStyle}> Roadside help </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .33 }}
                      onPress={() => { this.ShowCustomAlert(!this.state.Alert_Visibility) }}>

                      <Image source={require('../images/closure.png')}
                        style={styles.ImageIconStyle} />
                      <Text style={styles.reportNameStyle}> Closure </Text>

                    </TouchableOpacity>

                  </View>



                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={styles.reportBottomStyle}> Reports are public. your KDN username will appear with your report. </Text>

                    <TouchableOpacity
                      onPress={() => { this.ShowCustomAlert(!this.state.Alert_Visibility) }}
                    >


                      <Text style={styles.TextStyle}> CLOSE </Text>

                    </TouchableOpacity>


                  </View>
                </View>
              </View>
            </Modal>
          </View>

        </View>
        <View style={styles.bottomView}>
          <View style={{ flex: 1, flexDirection: 'row' }}>

            <TouchableOpacity style={{ flex: .5, flexDirection: 'column' }}
              onPress={() => { this.openPanel(); }}>

              <Image source={require('../images/explore_blue.png')}
                style={styles.ImageIconStyle} />
              <Text style={styles.reportNameStyle}> Explore </Text>

            </TouchableOpacity>

            <TouchableOpacity style={{ flex: .5 }}
              // onPress={() => { this.ShowSavedLocationsAlert(!this.state.isVisible) }}
              onPress={() => { this.setState({ isVisible: true }) }}>

              <Image source={require('../images/location_blue.png')}
                style={styles.ImageIconStyle} />
              <Text style={styles.reportNameStyle}>  Locations </Text>

            </TouchableOpacity>



            {/* 
            <TouchableOpacity style={{ flex: .33 }}
              onPress={() => { this.ShowCustomAlert(!this.state.Alert_Visibility) }}>

              <Image source={require('../images/report_map.png')}
                style={styles.ImageIconStyle} />
              <Text style={styles.reportNameStyle}> Report </Text>

            </TouchableOpacity> */}

          </View>
        </View>

      </View>


    );
  }
}

const styles = StyleSheet.create({
  ListContainer: {
    flex: 1
  },
  MainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#475fd0',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomView: {
    width: '100%',
    height: '10%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  bottomNearestNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // bottomNavigationView: {
  //   backgroundColor: '#fff',
  //   width: '100%',
  //   height: 300,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  getDirectionButton: {
    marginTop: 20,
    width: 300,
    height: 40,
    padding: 10,
    backgroundColor: '#24a0ed',
    borderRadius: 10,
    alignItems: 'center'
  },
  getNearestButton: {
    marginTop: 20,
    width: 100,
    height: 40,
    padding: 10,
    backgroundColor: '#24a0ed',
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    alignItems: 'center'
  },

  directionText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white'
  },
  blacklargetext: {
    fontSize: 15,
    textAlign: 'left',
    color: 'black'
  },
  image: {
    height: 40,
    marginTop: 40
  },
  headline: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 15,
    color: 'grey',
    marginTop: 0,
    width: 200
  },
  ImageIconStyle: {
    marginTop: 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  AlertMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#494e53",
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 7
  },
  Alert_Title: {
    fontSize: 25,
    color: "#fff",
    textAlign: 'center',
    padding: 10,
    height: '28%'
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    marginTop: 20
  },

  reportNameStyle: {
    color: '#032085',
    textAlign: 'center',
    fontSize: 16
  },
  reportBottomStyle: {
    color: '#6d7378',
    marginLeft: 20,
    marginRight: 20

  },
  NavDrawerHeaderView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#ffffff",
    height: '50%',
    width: '100%',
    flex: .1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
    // borderWidth: 1,
    // borderColor: 'transparent'

  },
  NavDrawerBottomView: {
    backgroundColor: "#fffeff",
    height: '50%',
    width: '100%',
    flex: .7,
    // borderWidth: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
    // borderColor: 'transparent'

  },
  TextStyleProfileName: {
    color: "#135165",
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  TextStyleOptionUpperHeading: {
    color: "#4c4b4c",
    fontSize: 16
  },

  inputWhereto: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#dae0e9',
    height: 40,
    fontSize: 20,
    borderRadius: 5,
    borderRadius: 30,
    margin: 10
  },


  ImageStyle: {
    margin: 5,
    height: 15,
    width: 15,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    resizeMode: 'stretch',
    alignItems: 'flex-start'
  },



});  