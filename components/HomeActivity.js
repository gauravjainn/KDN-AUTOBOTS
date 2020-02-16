import React, { Component } from 'react';
import {
  AppRegistry,
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  ImageBackground
} from 'react-native';

class HomeActivity extends Component {
  constructor(props) {
    super(props);
    this.otpCall = this.otpCall.bind(this);
    this.state = {
      JSONResult: '',
      otp: '',
      status: '',
      wholeResult: '',
      baseUrl: 'http://kd.smeezy.com/api',
    };
  }

  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.otp != '') {
      //  Check for the Email TextInput
      //  alert('Success');
      this.showLoading();
      this.otpCall();
      //   this.props.navigation.navigate('Login')

    } else {
      alert('Please Enter OTP');
    }
  };

  static navigationOptions = {
    title: 'Home Screen',
    // headerStyle: {
    //   backgroundColor: '#03A9F4',
    // },
    // headerTintColor: '#fff',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // },
  };

  otpCall() {

    let formdata = new FormData();
    formdata.append("methodName", 'match_otp')
    formdata.append("otp", this.state.otp)
    const { navigation } = this.props;
    const email = navigation.getParam('email', 'NO-Email');
    formdata.append("email", email)

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
        alert(responseJson.replyMessage);
        console.log("server response===" + JSON.stringify(responseJson))
        console.log("server STATUS  ===" + responseJson.replyStatus)
        console.log("server MESSAGE  ===" + responseJson.replyMessage)
        //console.log("server value  ===" + responseJson.data.email)
      }).catch(err => {
        this.hideLoading();
        console.log(err)
      })

  }

  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  render() {
    const { navigation } = this.props;
    const username = navigation.getParam('username', 'NO-USERNAME');
    return (
      <View style={styles.container}>

        <ImageBackground style={styles.imgBackground}
          resizeMode='cover'
          source={require('../images/bg.png')}>




          <Text style={styles.headerText}>Home Screen </Text>
          <View style={styles.container}>
            <Text style={styles.normalText}>Welcome {JSON.stringify(username)}</Text>



          </View>
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


  headerText: {
    marginTop: 40,
    fontSize: 22,
    textAlign: 'left',
    margin: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  normalText: {
    fontSize: 15,
    padding: 10,
    textAlign: 'center',
    margin: 20,
    color: '#FFFFFF'
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
});

export default HomeActivity;
