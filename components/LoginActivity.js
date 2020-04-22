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
import AsyncStorage from '@react-native-community/async-storage';

class LoginActivity extends Component {
  constructor(props) {
    super(props);
    this.loginCall = this.loginCall.bind(this);
    this.state = {
      JSONResult: '',
      username: '',
      password: '',
      status: '',
      wholeResult: '',
      baseUrl: 'http://kd.smeezy.com/api',
    };
  }

  CheckTextInput = () => {
 //Handler for the Submit onPress
    if (this.state.username != '') {
      //Check for the Name TextInput
      if (this.state.password != '') {
         //Check for the Email TextInput
        // alert('Success');
        this.showLoading();
        this.loginCall();
      } else {
        alert('Please Enter Password');
      }
    } else {
      alert('Please Enter Username');
    }
  };

  static navigationOptions = {
    title: 'Login Screen',
    // headerStyle: {
    //   backgroundColor: '#03A9F4',
    // },
    // headerTintColor: '#fff',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // },
  };

  // loginCall() {
  //   var that = this;
  //   var url = that.state.baseUrl; 
  //   console.log('url:' + url);
  //   fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       methodName:'login',
  //       email: this.state.username,
  //       password: this.state.password
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(responseData => {
  //       this.hideLoading();
  //       //  this.props.navigation.navigate('Profile')
  //       alert(JSON.stringify(responseData));
  //       console.log('response object:', responseData);
  //     })
  //     .catch(error => {
  //       this.hideLoading();
  //       console.error(error);
  //     })

  //     .done();
  // }

  loginCall() {

    let formdata = new FormData();
    formdata.append("methodName", 'login')
     formdata.append("email", this.state.username)
   formdata.append("password", this.state.password)
  //  formdata.append("email", "gaurav@yopmail.com")
   //formdata.append("password", "12345")

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
     
          this.saveLoginUserId(responseJson.data.id.toString());
      
          this.props.navigation.navigate('LandingScreen')

         // this.props.navigation.navigate('Navigation')
          // this.props.navigation.navigate('Home', {
          //     username: responseJson.data.email
          // })
      } else {
          alert(responseJson.replyMessage);
      }
        console.log("server response===" + JSON.stringify(responseJson))
        console.log("server STATUS  ===" + responseJson.replyStatus)
        console.log("server MESSAGE  ===" + responseJson.replyMessage)
        console.log("server value  ===" + responseJson.data.email)
      }).catch(err => {
        this.hideLoading();
        console.log(err)
      })

  }

  async saveLoginUserId(value) {
    try {
      await AsyncStorage.setItem('@user_id', value);
      await AsyncStorage.setItem('@is_login', "1");
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

 
 
  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <View style={styles.container}>

        <ImageBackground style={styles.imgBackground}
          resizeMode='cover'
          source={require('../images/bg.png')}>

          <Text style={styles.headerText}>Login</Text>
          <View style={styles.container}>

            <TextInput
              placeholderTextColor="#7f8ec5"
              underlineColorAndroid='transparent'
              onChangeText={username => this.setState({ username })}
              placeholder={'Enter Username'}
              style={styles.input}
            />
            <TextInput
              placeholder={'Enter Password'}
              placeholderTextColor="#7f8ec5"
              underlineColorAndroid='transparent'
              style={styles.input}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />

            {this.state.loading && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}

            <TouchableOpacity
              style={styles.SubmitButtonStyle}
              activeOpacity={.5}
              onPress={this.CheckTextInput} >

              <Text style={styles.TextStyle}> LOGIN </Text>
            </TouchableOpacity>

            <Text style={styles.normalText} onPress={() => this.props.navigation.navigate('ForgotPassword')}>Forgot Password?</Text>



            <Image source={require('../images/or_icon.png')}
              style={{ width: 200, height: 30, margin: 16 }} />

            <TouchableOpacity style={styles.FbButtonStyle} activeOpacity={0.5}>

              <Image
                source={require('../images/fb_login_icon.png')}
                style={styles.ImageIconStyle}
              />

              {/* <View style={styles.SeparatorLine} /> */}

              <Text style={styles.TextStyleFb}> Login Using Facebook </Text>

            </TouchableOpacity>

             <Text style={styles.multiColorText} >
              Don't have an account? 
             <Text style={styles.normalText} onPress={() => this.props.navigation.navigate('Signup')}>
                 Sign Up
             </Text>
            </Text>
            {/* <Text style={styles.normalText} onPress={() => this.props.navigation.navigate('Signup')}>Don't have an account? Sign Up</Text> */}
          </View>
        </ImageBackground>
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
    opacity: 0.5,
    //backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  input: {
    color: '#7f8ec5',
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 0,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: '#384D9C'
  },
  SubmitButtonStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    padding: 10,
    backgroundColor: '#71C488',
    borderRadius: 20,
    alignItems: 'center'
  },
  FbButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: .5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  headerText: {
    marginTop: 100,
    fontSize: 22,
    textAlign: 'left',
    margin: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  fbText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white'
  },
  normalText: {
    fontSize: 15,
    textAlign: 'center',
    margin: 20,
    color: '#71C488'
  },
  multiColorText: {
    fontSize: 15,
    textAlign: 'center',
    margin: 20,
    color: '#809aba'
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  SeparatorLine: {

    backgroundColor: '#fff',
    width: 1,
    height: 40

  },
  TextStyleFb: {
    color: "#fff",
    marginBottom: 4,
    marginRight: 20,

  },
  image: {
    height: 50,
    marginTop: 50,
    justifyContent: "space-around",    //  <-- you can use "center", "flex-start",
    resizeMode: "contain",             //      "flex-end" or "space-between" here
  },
});

export default LoginActivity;
