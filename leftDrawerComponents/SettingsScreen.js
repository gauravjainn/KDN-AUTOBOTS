import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Divider } from 'react-native-elements';


class SettingsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      JSONResult: ''
    };
  }



  static navigationOptions = {
    title: 'SettingsScreen'
  };


  render() {
    return (
      <View style={styles.container}>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#cee2ea', height: 60 }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {this.props.navigation.navigate('Navigation')}}>
            
            <Image source={require('../images/back-icon-green.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'center', alignItems: 'center' }}>

            <Text style={styles.TextStyleScreenHeading}> Settings </Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}>



          </TouchableOpacity>
        </View>

        <Divider style={{ backgroundColor: '#135165', height: 1 }} />


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, backgroundColor: 'white', height: 60 }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => {this.props.navigation.navigate('AccountInformation')}}>

            <Image source={require('../images/account_n_login.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'flex-start' }}
           onPress={() => {this.props.navigation.navigate('AccountInformation')}}>

            <Text style={styles.TextStyleSettingOption}> Account & login </Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {this.props.navigation.navigate('AccountInformation')}}>

            <Image source={require('../images/forward_arrow_left_drawer.png')}
              style={styles.ImageIconStyle}
            />

          </TouchableOpacity>
        </View>


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', marginTop: 20, height: 60 }}>
          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}>

            <Image source={require('../images/vehicle.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'flex-start' }}
           onPress={() => {this.props.navigation.navigate('VehicleDetail')}}>

            <Text style={styles.TextStyleSettingOption}> Vehicle details </Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {

            }}>

            <Image source={require('../images/forward_arrow_left_drawer.png')}
              style={styles.ImageIconStyle}
            />

          </TouchableOpacity>
        </View>


        <Divider style={{ backgroundColor: '#135165' }} />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 60 }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}>

            <Image source={require('../images/music.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'flex-start' }}>

            <Text style={styles.TextStyleSettingOption}> Audio Player </Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {

            }}>

            <Image source={require('../images/forward_arrow_left_drawer.png')}
              style={styles.ImageIconStyle}
            />

          </TouchableOpacity>
        </View>

        <Divider style={{ backgroundColor: '#135165' }} />


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 60 }}>
          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}>

            <Image source={require('../images/notification.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'flex-start' }}>

            <Text style={styles.TextStyleSettingOption}> Notifications </Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {

            }}>

            <Image source={require('../images/forward_arrow_left_drawer.png')}
              style={styles.ImageIconStyle}
            />

          </TouchableOpacity>
        </View>



        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 60, marginTop: 30 }}>
          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                   onPress={() => { this.props.navigation.navigate('About') }}>

            <Image source={require('../images/about.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'flex-start' }}
           onPress={() => { this.props.navigation.navigate('About') }}>

            <Text style={styles.TextStyleSettingOption}> About </Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
           onPress={() => { this.props.navigation.navigate('About') }}>

            <Image source={require('../images/forward_arrow_left_drawer.png')}
              style={styles.ImageIconStyle}
            />

          </TouchableOpacity>
        </View>

        <Divider style={{ backgroundColor: '#135165' }} />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 60 }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => { this.props.navigation.navigate('Privacy')}} >

            <Image source={require('../images/privacy.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'flex-start' }}
          onPress={() => { this.props.navigation.navigate('Privacy')}} >

            <Text style={styles.TextStyleSettingOption}>Privacy</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
              onPress={() => { this.props.navigation.navigate('Privacy')}} >

            <Image source={require('../images/forward_arrow_left_drawer.png')}
              style={styles.ImageIconStyle}
            />

          </TouchableOpacity>
        </View>

        <Divider style={{ backgroundColor: '#135165' }} />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 60 }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}>

            <Image source={require('../images/share.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'flex-start' }}>

            <Text style={styles.TextStyleSettingOption}>Share</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {

            }}>

            <Image source={require('../images/forward_arrow_left_drawer.png')}
              style={styles.ImageIconStyle}
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
  ImageIconStyle: {
    marginTop: 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsScreen;
