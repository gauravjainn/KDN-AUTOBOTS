import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { View, Text, StyleSheet, Image, PermissionsAndroid, Platform, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { BottomSheet } from 'react-native-btr';
import SwipeablePanel from 'rn-swipeable-panel';
import getDirections from 'react-native-google-maps-directions'


const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

var directionData;
var _ = require('lodash');

export default class NavigationScreen extends Component {


  constructor(props) {
    super(props)
    // this._isMounted = false;

    this.mapView = null;
    this.state = {
      Alert_Visibility: false,
      showPlacesList: false,
      swipeablePanelActive: false,
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

      visible: false,
      TextValue: '',
    }
  }

  ShowCustomAlert(visible) {

    this.setState({ Alert_Visibility: visible });

  }




  handleGetDirections = () => {
    const data = {
      source: {
        latitude: this.state.currentLatitude,
        longitude: this.state.currentLongitude
      },
      destination: {
        latitude: this.state.destination.latitude,
        longitude: this.state.destination.longitude
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode
        }
      ],
      // waypoints: [
      //   {
      //     latitude: -33.8600025,
      //     longitude: 18.697452
      //   },
      //   {
      //     latitude: -33.8600026,
      //     longitude: 18.697453
      //   },
      //      {
      //     latitude: -33.8600036,
      //     longitude: 18.697493
      //   }
      // ]
    }

    getDirections(data)
  }

  openPanel = () => {
    this.setState({ swipeablePanelActive: true });
  };

  closePanel = () => {
    this.setState({ swipeablePanelActive: false });
  };

  _toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState({ visible: !this.state.visible });
  };


  componentDidMount = () => {
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

  callLocation(that) {
    //alert("callLocation Called");
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
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
        this.openPanel();

      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    that.watchID = Geolocation.watchPosition((position) => {
      //Will give you the location on location change
      console.log(position);
      const currentLongitude = JSON.stringify(position.coords.longitude);
      //getting the Longitude from the location json
      const currentLatitude = JSON.stringify(position.coords.latitude);
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
    var mapStyle = [{ "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#263c3f" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#6b9a76" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#746855" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#f3d19c" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#2f3948" }] }, { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#515c6d" }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#17263c" }] }];

    return (
      <View style={styles.MainContainer}>
        <View style={{ width: '100%', top: '15%', zIndex: 2, position: 'absolute', backgroundColor: 'transparent' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <GooglePlacesAutocomplete

              placeholder='Where to?'
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
              listViewDisplayed={this.state.showPlacesList}
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
                var lat = parseFloat(details.geometry.location.lat)
                var long = parseFloat(details.geometry.location.lng)

                var initialdestination = {
                  latitude: lat,
                  longitude: long,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                  title: data.description
                }

                directionData = {
                  latitude: lat,
                  longitude: long,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                  title: data.description
                }


                this.setState({ destination: initialdestination })
                this.mapView.animateToRegion(initialdestination, 2000);
                this.closePanel();
                this.displayDirectionPoly();
                this._toggleBottomNavigationView();

                console.log("lat===" + lat);
                console.log("long===" + long);


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
                  width: '100%'
                },
                description: {
                  color: 'white',
                  fontWeight: 'bold'
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                }
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

            {/* <View style={{ flex: 1, flexDirection: 'row' }}> */}
            <View style={styles.alternativeLayoutButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.openPanel();
                }}>

                <Image
                  source={require('../images/Explore.png')} />

              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.ShowCustomAlert(true);
                }}>

                <Image source={require('../images/Explore.png')} />

              </TouchableOpacity>
            </View>

          </View>
        </View>
        <View style={{ width: '100%', height: '100%', top: '0%', zIndex: 1, position: 'absolute' }} >
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
              apikey={'AIzaSyAAQ1Cppz62lgwYEJjzrkty7Nzi5ZYNCSM'} />

            <Marker
              coordinate={{
                latitude: this.state.destination.latitude,
                longitude: this.state.destination.longitude,
              }}
              // onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
              title={this.state.destination.title}
              //   onPress={this.displayDirectionPoly}
              onPress={this._toggleBottomNavigationView}
            //  description={'This is a description of the marker'}
            />

          </MapView>

          <BottomSheet
            visible={this.state.visible}
            //setting the visibility state of the bottom shee
            onBackButtonPress={this._toggleBottomNavigationView}
            //Toggling the visibility state on the click of the back botton
            onBackdropPress={this._toggleBottomNavigationView}
          //Toggling the visibility state on the clicking out side of the sheet
          >
            {/*Bottom Sheet inner View*/}
            <View style={styles.bottomNavigationView}>

              <TouchableOpacity
                style={styles.getDirectionButton}
                activeOpacity={.5}
                onPress={this.handleGetDirections}>
                <Text style={styles.directionText}> Start Navigation </Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
          <SwipeablePanel
            fullWidth={false}
            isActive={this.state.swipeablePanelActive}
            onClose={() => this.closePanel()}>
            <View style={styles.bottomNearestNavigationView}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>

                <Text style={{ textAlign: 'center', fontSize: 20 }}>
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
                      //  this.props.navigation.navigate('Restaurant')
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
  bottomNearestNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    marginTop: 0,
    width: 200
  },
  ImageIconStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
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
    borderRadius: 7,

  },
  alert_main_view: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#4c4e54",
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 7,

  },

  Alert_Title: {

    fontSize: 25,
    color: "#fff",
    textAlign: 'center',
    padding: 10,
    height: '28%'

  },

  Alert_Message: {

    fontSize: 22,
    color: "#fff",
    textAlign: 'center',
    padding: 10,
    height: '42%'

  },


  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    marginTop: 20
  },

  reportNameStyle: {
    color: '#b9c0c9',
    textAlign: 'center',
    fontSize: 18
  },
  reportBottomStyle: {
    color: '#6d7378',
    marginLeft: 20,
    marginRight: 20

  }

});  