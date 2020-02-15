import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator  } from 'react-navigation-stack';
import { createAppContainer  } from 'react-navigation';
import LoginActivity from './components/LoginActivity';
import ProfileActivity from './components/ProfileActivity';
import SignupActivity from './components/SignupActivity';

const NavStack  = createStackNavigator(
{
  Login: { screen: LoginActivity },
  Profile: { screen: ProfileActivity },
  Signup: { screen: SignupActivity },
},
{
    initialRouteName: 'Login',
    headerMode: 'none'
}

);


const Apps = createAppContainer(NavStack);

export default class App extends React.Component {
    render() {
        return <Apps />;
    }
}

