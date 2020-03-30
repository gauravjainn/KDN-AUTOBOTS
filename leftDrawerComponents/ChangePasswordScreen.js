import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';


class ChangePasswordScreen extends Component {

    constructor(props) {
        super(props);
        this.changePassword = this.changePassword.bind(this);
        this.state = {
            userId: '',
            JSONResult: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            baseUrl: 'http://kd.smeezy.com/api',
        };
    }

    static navigationOptions = {
        title: 'change Password'
    };

    componentDidMount() {
        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("Reset user id ====" + this.state.userId);
            }
        });
    }

    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    CheckTextInput = () => {
        //  Handler for the Submit onPress
        if (this.state.oldPassword != '') {
            //Check for the Name TextInput
            if (this.state.newPassword != '') {
                //Check for the Email TextInput
                if (this.state.confirmPassword != '') {
                    //Check for the Email TextInput
                    if (this.state.newPassword == this.state.confirmPassword) {
                        this.showLoading();
                        this.changePassword();
                    } else {
                        alert('New and Confirm Password not matched');
                    }
                } else {
                    alert('Please Enter Confirm Password');
                }
            } else {
                alert('Please Enter New Password');
            }
        } else {
            alert('Please Enter Old Password');
        }
    };

    changePassword() {

        let formdata = new FormData();
        formdata.append("methodName", 'change_password')
        formdata.append("user_id", this.state.userId)
        formdata.append("old_password", this.state.oldPassword)
        formdata.append("password", this.state.newPassword)

        console.log("user_id  ===" + this.state.userId)
        console.log("oldPassword  ===" + this.state.oldPassword)
        console.log("Password  ===" + this.state.newPassword)

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

                    alert(responseJson.replyMessage);
               

                } else {
                    alert(responseJson.replyMessage);
                }
               
              //  console.log("server MESSAGE  ===" + responseJson.replyMessage)
            
            }).catch(err => {
                this.hideLoading();
                console.log(err)
            })

    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#cee2ea', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('AccountInformation') }}>

                        <Image source={require('../images/back-icon-green.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={styles.TextStyleScreenHeading}> Change  Password </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={this.CheckTextInput} >

                        <Image source={require('../images/blue-tick.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>
                </View>

                <Divider style={{ backgroundColor: '#135165', height: 1 }} />


                <View style={{ flexDirection: 'column', margin: 15, backgroundColor: '#e9f5f8', height: 60 }}>


                    <TouchableOpacity style={{ flex: .50, justifyContent: 'flex-start' }}>

                        <Text style={styles.TextStyleOptionHeading}> Old Password </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', flex: .50 }}>

                        <TextInput
                            placeholder={'Enter Old Password'}
                            placeholderTextColor="#58666c"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            onChangeText={oldPassword => this.setState({ oldPassword })}
                        />


                    </TouchableOpacity>
                </View>

             

                <View style={{ flexDirection: 'column', margin: 15, backgroundColor: '#e9f5f8', height: 60 }}>


                    <TouchableOpacity style={{ flex: .50, justifyContent: 'flex-start' }}>

                        <Text style={styles.TextStyleOptionHeading}> New Password </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', flex: .50 }}>


                        <TextInput
                            placeholder={'Enter New password'}
                            placeholderTextColor="#58666c"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            onChangeText={newPassword => this.setState({ newPassword })}
                        />

                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', margin: 15, backgroundColor: '#e9f5f8', height: 60 }}>

                    <TouchableOpacity style={{ flex: .50, justifyContent: 'flex-start' }}>

                        <Text style={styles.TextStyleOptionHeading}> Confirm Password </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', flex: .50 }}>

                        <TextInput
                            placeholder={'Enter Confirm Password'}
                            placeholderTextColor="#58666c"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                        />

                    </TouchableOpacity>
                </View>

                {this.state.loading && (
                            <View style={styles.loading}>
                                <ActivityIndicator size="large" color="#58666c" />
                            </View>
                        )}

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
        backgroundColor: '#cee2ea'
    },
    TextStyleScreenHeading: {
        color: "#135165",
        fontSize: 22,
        fontWeight: 'bold'
    },
    TextStyleSettingOption: {
        color: "#4d4c4d",
        fontSize: 20,
        fontWeight: 'bold',
    },
    TextStyleOptionDetail: {
        color: "#9b9a9c",
        fontSize: 16,
    },
    ImageIconStyle: {
        marginTop: 3,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextStyleOptionHeading: {
        color: "#88a09f",
        fontSize: 18,
    },
    TextStyleOptionResult: {
        color: "#58666c",
        fontSize: 16,
    },
    input: {
        color: '#58666c',
        height: 40,
        fontSize: 16,
        backgroundColor: 'transparent'
    },
});

export default ChangePasswordScreen;
