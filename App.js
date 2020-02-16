import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginActivity from './components/LoginActivity';
import ProfileActivity from './components/ProfileActivity';
import SignupActivity from './components/SignupActivity';
import ForgotPasswordActivity from './components/ForgotPasswordActivity';
import OTPActivity from './components/OTPActivity';
import HomeActivity from './components/HomeActivity';
import ResetPasswordActivity from './components/ResetPasswordActivity';
import SplashActivity from './components/SplashActivity';

const NavStack = createStackNavigator(
    {
        Login: { screen: LoginActivity },
        Profile: { screen: ProfileActivity },
        Signup: { screen: SignupActivity },
        ForgotPassword: { screen: ForgotPasswordActivity },
        Otp: { screen: OTPActivity },
        Home: { screen: HomeActivity },
        ResetPassword: { screen: ResetPasswordActivity },
        Splash: { screen: SplashActivity },
    },
    {
        initialRouteName: 'Splash',
        headerMode: 'none'
    }

);


const Apps = createAppContainer(NavStack);

export default class App extends React.Component {
    render() {
        return <Apps />;
    }
}

