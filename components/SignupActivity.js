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
    ImageBackground,
    Picker
} from 'react-native';


class SignupActivity extends Component {
    constructor(props) {
        super(props);
        this.registerCall = this.registerCall.bind(this);
        this.state = {
            JSONResult: '',
            name: '',
            username: '',
            email: '',
            password: '',
            mobilenumber: '',
            status: '',
            wholeResult: '',
            baseUrl: 'http://kd.smeezy.com/api',
            user: ''
        };

    }

    updateUser = (user) => {
        this.setState({ user: user })
    }

    CheckTextInput = () => {
        if (this.state.name != '') {
            if (this.state.username != '') {
                if (this.state.email != '') {
                    if (this.state.password != '') {
                        if (this.state.mobilenumber != '') {
                            this.showLoading();
                            this.registerCall();
                        }
                        else {
                            alert('Please Enter Mobile Number');
                        }
                        // } else {
                        //     console.log("gender value====" + this.state.user);
                        //     alert('Please Select Gender');
                        // }
                    } else {
                        alert('Please Enter Password');
                    }
                } else {
                    alert('Please Enter email');
                }
            } else {
                alert('Please Enter username');
            }
        } else {
            alert('Please Enter name');
        }
    };

    static navigationOptions = {
        title: 'Register Screen',
        // headerStyle: {
        //   backgroundColor: '#03A9F4',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
    };

    registerCall() {

        console.log("gender---" + this.state.user)
        let formdata = new FormData();
        formdata.append("methodName", 'signup')
        formdata.append("email", this.state.email)
        formdata.append("password", this.state.password)
        formdata.append("name", this.state.name)
        formdata.append("user_name", this.state.username)
        formdata.append("gender", this.state.user)
        formdata.append("mobileno", this.state.mobilenumber)

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
                // console.log("server value  ===" + responseJson.data.email)
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

                    <Text style={styles.headerText}>Sign Up</Text>
                    <View style={styles.container}>

                        <TextInput
                            placeholderTextColor="#7f8ec5"
                            underlineColorAndroid='transparent'
                            onChangeText={name => this.setState({ name })}
                            placeholder={'Enter Full Name'}
                            style={styles.input}
                        />

                        <TextInput
                            placeholderTextColor="#7f8ec5"
                            underlineColorAndroid='transparent'
                            onChangeText={username => this.setState({ username })}
                            placeholder={'Enter Username'}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder={'Enter Email'}
                            placeholderTextColor="#7f8ec5"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            onChangeText={email => this.setState({ email })}
                        />

                        <TextInput
                            placeholder={'Enter Password'}
                            placeholderTextColor="#7f8ec5"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={password => this.setState({ password })}
                        />



                        <Picker style={styles.input}
                            selectedValue={this.state.user}
                            onValueChange={this.updateUser}>
                            <Picker.Item label="Please Select Gender" value="" />
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                            <Picker.Item label="Other" value="other" />
                        </Picker>



                        <TextInput
                            placeholder={'Enter Mobile Number'}
                            placeholderTextColor="#7f8ec5"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            keyboardType={'numeric'}

                            onChangeText={mobilenumber => this.setState({ mobilenumber })}
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

                            <Text style={styles.TextStyle}> SIGN UP </Text>
                        </TouchableOpacity>

                        <Text style={styles.multiColorText} >
                            Already have an account?
             <Text style={styles.normalText} onPress={() => this.props.navigation.navigate('Login')}>
                                SIGN IN
             </Text>
                        </Text>




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
        textAlign: 'center',
        margin: 20,
        color: '#71C488'
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
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
    image: {
        height: 50,
        marginTop: 50,
        justifyContent: "space-around",    //  <-- you can use "center", "flex-start",
        resizeMode: "contain",             //      "flex-end" or "space-between" here
    }
});

export default SignupActivity;
