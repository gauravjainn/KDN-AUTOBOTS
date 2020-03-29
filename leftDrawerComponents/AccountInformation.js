import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Divider } from 'react-native-elements';


class AccountInformation extends Component {

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
            onPress={() => { this.props.navigation.navigate('Settings') }}>

            <Image source={require('../images/back-icon-green.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'center', alignItems: 'center' }}>

            <Text style={styles.TextStyleScreenHeading}> Account & login </Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Navigation') }}>

            <Image source={require('../images/close-green-icon.png')}
              style={styles.ImageIconStyle} />

          </TouchableOpacity>
        </View>

        <Divider style={{ backgroundColor: '#135165', height: 1 }} />


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, backgroundColor: 'white', height: 60 }}>

          <TouchableOpacity style={{ flex: .80, justifyContent: 'flex-start', marginLeft: 20 }}
          onPress={() => { this.props.navigation.navigate('Profile') }}>

            <Text style={styles.TextStyleSettingOption}> Profile </Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Profile') }}>

            <Image source={require('../images/forward_arrow_left_drawer.png')}
              style={styles.ImageIconStyle}
            />

          </TouchableOpacity>
        </View>

        <Divider style={{ backgroundColor: '#135165' }} />


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 60 }}>

          <TouchableOpacity style={{ flex: .80, justifyContent: 'flex-start', marginLeft: 20 }}
          onPress={() => { this.props.navigation.navigate('ChangePassword') }}>

            <Text style={styles.TextStyleSettingOption}> Change Password </Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('ChangePassword') }}>

            <Image source={require('../images/forward_arrow_left_drawer.png')}
              style={styles.ImageIconStyle}
            />

          </TouchableOpacity>
        </View>

        <Divider style={{ backgroundColor: '#135165' }} />


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 60 }}>

          <TouchableOpacity style={{ flex: .80, justifyContent: 'flex-start', marginLeft: 20 }}>

            <Text style={styles.TextStyleSettingRedOption}> Delete account </Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {

            }}>

          

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
  TextStyleSettingRedOption: {
    color: "#FF0000",
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

export default AccountInformation;
