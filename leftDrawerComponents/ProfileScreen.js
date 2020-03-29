import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Picker,
    ActivityIndicator
} from 'react-native';
import { Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';


class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            JSONResult: '',
            userId: '',
            gender: '',
            user: '',
            username: '',
            fullname: '',
            email: '',
            mobileNumber: ''
        };
    }

    static navigationOptions = {
        title: 'Profile Screen'
    };


    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    updateUser = (user) => {
        this.setState({ user: user })
    }

    componentDidMount() {
        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("Reset user id ====" + this.state.userId);
            }
        });

        this.showLoading()
        this.showProfileData();
    }


    showProfileData() {

        let formdata = new FormData();
        formdata.append("methodName", 'get_profile_data')
        formdata.append("user_id", this.state.userId)

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




                    //  this.props.navigation.navigate('AccountInformation')

                } else {
                    alert(responseJson.replyMessage);
                }
                console.log("server response===" + JSON.stringify(responseJson))
                console.log("server STATUS  ===" + responseJson.replyStatus)
                console.log("server MESSAGE  ===" + responseJson.replyMessage)

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

                        <Text style={styles.TextStyleScreenHeading}> Profile </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('AccountInformation') }}>

                        <Image source={require('../images/blue-tick.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>
                </View>

                <Divider style={{ backgroundColor: '#135165', height: 1 }} />



                <View style={{ flexDirection: 'row', margin: 15, height: 60 }}>


                    <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-start' }}>


                        <Image source={require('../images/edit_profile.png')}
                            style={styles.ImageIconStyle} />


                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'column', margin: 15, backgroundColor: '#e9f5f8', height: 60 }}>


                    <TouchableOpacity style={{ flex: .50, justifyContent: 'flex-start' }}>

                        <Text style={styles.TextStyleOptionHeading}> Full Name </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', flex: .50 }}>

                        <TextInput
                            placeholder={'Enter Full Name'}
                            placeholderTextColor="#58666c"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            onChangeText={fullname => this.setState({ fullname })}
                        />

                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', margin: 15, backgroundColor: '#e9f5f8', height: 60 }}>


                    <TouchableOpacity style={{ flex: .50, justifyContent: 'flex-start' }}>

                        <Text style={styles.TextStyleOptionHeading}> Username </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', flex: .50 }}>


                        <TextInput
                            placeholder={'Enter username'}
                            placeholderTextColor="#58666c"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            onChangeText={username => this.setState({ username })}
                        />

                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', margin: 15, backgroundColor: '#e9f5f8', height: 60 }}>


                    <TouchableOpacity style={{ flex: .50, justifyContent: 'flex-start' }}>

                        <Text style={styles.TextStyleOptionHeading}> Email </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', flex: .50 }}>


                        <TextInput
                            placeholder={'Enter email'}
                            placeholderTextColor="#58666c"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            editable={false}
                            onChangeText={email => this.setState({ email })}
                        />

                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', margin: 15, backgroundColor: '#e9f5f8', height: 60 }}>



                    <Text style={styles.TextStyleOptionHeading}> Gender </Text>

                    <Picker style={styles.input}
                        selectedValue={this.state.user}
                        onValueChange={this.updateUser}>
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                        <Picker.Item label="Other" value="other" />
                    </Picker>


                </View>




                <View style={{ flexDirection: 'column', margin: 15, backgroundColor: '#e9f5f8', height: 60 }}>


                    <TouchableOpacity style={{ flex: .50, justifyContent: 'flex-start' }}>

                        <Text style={styles.TextStyleOptionHeading}> Mobile Number </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', flex: .50 }}>


                        <TextInput
                            placeholder={'Enter Mobile Number'}
                            placeholderTextColor="#58666c"
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            onChangeText={mobileNumber => this.setState({ mobileNumber })}
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

export default ProfileScreen;
