import React, {Component} from 'react';
import {
  AppRegistry,
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native';

class HomeActivity extends Component {
  constructor(props) {
    super(props);
    this.registerCall = this.registerCall.bind(this);
    this.state = {
      JSONResult: '',
      username: '',
      password: '',
      status: '',
      wholeResult: '',
      baseUrl: 'http://172.31.1.101:1080',
    };
  }

  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.username != '') {
      //Check for the Name TextInput
      if (this.state.password != '') {
        //  Check for the Email TextInput
        //  alert('Success');
        this.showLoading();
        this.registerCall();
        // this.props.navigation.navigate('Profile')
      } else {
        alert('Please Enter Password');
      }
    } else {
      alert('Please Enter Username');
    }
  };

  static navigationOptions = {
    title: 'Login Screen',
    headerStyle: {
      backgroundColor: '#03A9F4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  registerCall() {
    var that = this;
    var url = that.state.baseUrl + '/publicrest/rest/authenticate_storekeeper';
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: this.state.username,
        password: this.state.password,
        deviceId: '123',
        deviceToken: '123',
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
      //  this.props.navigation.navigate('Profile')
         alert(JSON.stringify(responseData));
        console.log('response object:', responseData);
      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }

  showLoading() {
    this.setState({loading: true});
  }

  hideLoading() {
    this.setState({loading: false});
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.headerText}>Login Screen</Text> */}
        <TextInput
          //   value={this.state.username}
          onChangeText={username => this.setState({username})}
          placeholder={'Enter Username'}
          style={styles.input}
        />
        <TextInput
          //   value={this.state.password}
          placeholder={'Enter Password'}
          style={styles.input}
          secureTextEntry={true}
          onChangeText={password => this.setState({password})}
        />

        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

        {/* <Button
          title="Go to Profile screen"
          onPress={() => this.props.navigation.navigate('Profile')}
        /> */}
        <Button title="login" onPress={this.CheckTextInput} />
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
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  }
});

export default HomeActivity;
