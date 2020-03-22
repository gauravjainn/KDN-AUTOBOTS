import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginActivity from './components/LoginActivity';
import ProfileActivity from './components/ProfileActivity';
import SignupActivity from './components/SignupActivity';
import ForgotPasswordActivity from './components/ForgotPasswordActivity';
import OTPActivity from './components/OTPActivity';
import NavigationScreen from './leftDrawerComponents/NavigationScreen';
import HomeActivity from './leftDrawerComponents/HomeActivity';
import ResetPasswordActivity from './components/ResetPasswordActivity';
import SplashActivity from './components/SplashActivity';
import RestaurantList from './components/RestaurantList';
import AtmList from './components/AtmList';
import PaarkingList from './components/ParkingList';
import MovieHallList from './components/MovieHallList';
import ShoppingMallList from './components/ShoppingMallList';
import HospitalList from './components/HospitalList';


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
        Restaurant : { screen: RestaurantList },
        Atm : {screen : AtmList},
        Parking : {screen : PaarkingList},
        MovieHall : {screen : MovieHallList} ,
        ShoppingMall : {screen : ShoppingMallList} ,
        Hospital : {screen : HospitalList} ,
        Navigation : {screen : NavigationScreen} 
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

