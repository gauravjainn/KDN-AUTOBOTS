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

class SignupActivity extends Component {
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
        // headerStyle: {
        //   backgroundColor: '#03A9F4',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
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

                    <Image source={require('../images/back_icon.png')}
                        style={styles.image}>
                    </Image>

                    <Text style={styles.headerText}>Sign Up</Text>
                    <View style={styles.container}>

                        <TextInput
                            //   value={this.state.username}
                            placeholderTextColor="#7f8ec5"
                            underlineColorAndroid='transparent'
                            onChangeText={username => this.setState({ username })}
                            placeholder={'Enter Username'}
                            style={styles.input}
                        />
                        <TextInput
                            //   value={this.state.password}
                            placeholder={'Enter Email'}
                            placeholderTextColor="#7f8ec5"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            onChangeText={email => this.setState({ email })}
                        />

                        <TextInput
                            //   value={this.state.password}
                            placeholder={'Enter Password'}
                            placeholderTextColor="#7f8ec5"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={password => this.setState({ password })}
                        />


<TextInput
                            //   value={this.state.password}
                            placeholder={'Enter Gender'}
                            placeholderTextColor="#7f8ec5"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            
                            onChangeText={gender => this.setState({ gender })}
                        />


<TextInput
                            //   value={this.state.password}
                            placeholder={'Enter Mobile Number'}
                            placeholderTextColor="#7f8ec5"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                        
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

                        <Text style={styles.normalText}  onPress={() => this.props.navigation.goBack()}> 
                            Already have an account? SIGN IN</Text>



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
        height: 44,
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
    image: {
        height: 50,
        marginTop: 50,
        justifyContent: "space-around",    //  <-- you can use "center", "flex-start",
        resizeMode: "contain",             //      "flex-end" or "space-between" here
    },
});

export default SignupActivity;
