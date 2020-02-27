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

class OTPActivity extends Component {
    constructor(props) 
    {
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

          //this.props.navigation.navigate('ResetPassword')

            //   this.props.navigation.navigate('Login')

        } else {
            alert('Please Enter OTP');
        }
    };

    static navigationOptions = {
        title: 'OTP',
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
            //    alert(responseJson.replyMessage);
                if (responseJson.replyStatus == 'success') {
                    this.saveResetUserId(responseJson.data.id.toString());  
                    this.props.navigation.navigate('ResetPassword')

                } else {
                    alert(responseJson.replyMessage);
                }
                console.log("server response===" + JSON.stringify(responseJson))
                console.log("server STATUS  ===" + responseJson.replyStatus)
                console.log("server MESSAGE  ===" + responseJson.replyMessage)
                //console.log("server value  ===" + responseJson.data.email)
            }).catch(err => {
                this.hideLoading();
                console.log(err)
            })

    }

    async saveResetUserId(value) {
        try {
          await AsyncStorage.setItem('@reset_user_id', value);
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
        const { navigation } = this.props;
        const email = navigation.getParam('email', 'NO-Email');
        return (
            <View style={styles.container}>

                <ImageBackground style={styles.imgBackground}
                    resizeMode='cover'
                    source={require('../images/bg.png')}>


                    <TouchableOpacity

                        onPress={() => this.props.navigation.navigate('ForgotPassword')} >

                        <Image source={require('../images/back_icon.png')}
                            style={styles.image}>
                        </Image>
                    </TouchableOpacity>


                    <Text style={styles.headerText}>OTP</Text>
                    <View style={styles.container}>
                        <Text style={styles.headerText}>Verification Code</Text>
                        <Text style={styles.normalText}>Please type the verification code sent to
                        your {JSON.stringify(email)}</Text>

                        <TextInput
                            placeholderTextColor="#7f8ec5"
                            underlineColorAndroid='transparent'
                            onChangeText={otp => this.setState({ otp })}
                            placeholder={'Enter  OTP'}
                            style={styles.input}
                            keyboardType={'numeric'}
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

                            <Text style={styles.TextStyle}> SUBMIT </Text>
                        </TouchableOpacity>



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
    ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
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
    image: {
        height: 50,
        marginTop: 50,
        justifyContent: "space-around",    //  <-- you can use "center", "flex-start",
        resizeMode: "contain",             //      "flex-end" or "space-between" here
    },
});

export default OTPActivity;
