import React, {Component} from 'react';
import {
  AppRegistry,
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';


class HomeActivity extends Component {
 
 constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }

 CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.username != '') {
      //Check for the Name TextInput
      if (this.state.password != '') {
        //Check for the Email TextInput
       // alert('Success')
        this.props.navigation.navigate('Profile')
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
  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.headerText}>Login Screen</Text> */}
          <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Enter Username'}
          style={styles.input}
        />
          <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Enter Password'}
          style={styles.input}
          secureTextEntry={true}
        />
        {/* <Button
          title="Go to Profile screen"
          onPress={() => this.props.navigation.navigate('Profile')}
        /> */}
           <Button
             title="login"
             onPress={this.CheckTextInput}/>
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
   input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 20 
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
 fontWeight: 'bold'
  },
  
});

export default HomeActivity;