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

class ForgotPasswordActivity extends Component {
    constructor(props) {
        super(props);
        this.forgotCall = this.forgotCall.bind(this);
        this.state = {
            JSONResult: '',
            email: '',
            status: '',
            wholeResult: '',
            baseUrl: 'http://kd.smeezy.com/api',
        };
    }

    CheckTextInput = () => {
        //Handler for the Submit onPress
        if (this.state.email != '') {
            //  Check for the Email TextInput
            //  alert('Success');
            this.showLoading();
            this.forgotCall();
            //   this.props.navigation.navigate('Login')

        } else {
            alert('Please Enter Registered Email Address');
        }
    };

    static navigationOptions = {
        title: 'Forgot Password Screen',
        // headerStyle: {
        //   backgroundColor: '#03A9F4',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
    };

    forgotCall() {

        let formdata = new FormData();
        formdata.append("methodName", 'forgot_password')
        formdata.append("email", this.state.email)

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
                    this.props.navigation.navigate('Otp', {
                        email: this.state.email
                    })
                } else {
                    alert(responseJson.replyMessage);
                }


                //    this.props.navigation.navigate('Otp')
                console.log("server response===" + JSON.stringify(responseJson))
                console.log("server STATUS  ===" + responseJson.replyStatus)
                console.log("server MESSAGE  ===" + responseJson.replyMessage)
                console.log("server value  ===" + responseJson.data.email)
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
        return (
            <View style={styles.container}>

                <ImageBackground style={styles.imgBackground}
                    resizeMode='cover'
                    source={require('../images/bg.png')}>


                    <TouchableOpacity

                        onPress={() => this.props.navigation.navigate('Login')} >

                        <Image source={require('../images/back_icon.png')}
                            style={styles.image}>
                        </Image>
                    </TouchableOpacity>


                    <Text style={styles.headerText}>Forgot Password</Text>
                    <View style={styles.container}>

                        <Text style={styles.normalText}>Enter your registered email and we will
                        send you OTP, use that OTP while you reset your password.</Text>

                        <TextInput
                            placeholderTextColor="#7f8ec5"
                            underlineColorAndroid='transparent'
                            onChangeText={email => this.setState({ email })}
                            placeholder={'Enter Registered Email Address'}
                            style={styles.input}
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

                            <Text style={styles.TextStyle}> SEND EMAIL </Text>
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

export default ForgotPasswordActivity;
