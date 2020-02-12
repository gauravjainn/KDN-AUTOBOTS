import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator  } from 'react-navigation-stack';
import { createAppContainer  } from 'react-navigation';
import HomeActivity from './components/HomeActivity';
import ProfileActivity from './components/ProfileActivity';

const NavStack  = createStackNavigator(
{
  Home: { screen: HomeActivity },
  Profile: { screen: ProfileActivity },
},
{
    initialRouteName: 'Home',
}

);


const Apps = createAppContainer(NavStack);

export default class App extends React.Component {
    render() {
        return <Apps />;
    }
}

