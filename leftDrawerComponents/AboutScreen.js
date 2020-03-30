import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Picker,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { Divider } from 'react-native-elements';
import HTML from 'react-native-render-html';


class AboutScreen extends Component {

    constructor(props) {
        super(props);
        this.showPageData = this.showPageData.bind(this);
        this.state = {
            JSONResult: '',
            screendata: '',
            baseUrl: 'http://kd.smeezy.com/api',
        };
    }

    static navigationOptions = {
        title: 'About Screen'
    };


    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }


    componentDidMount() {

        this.showLoading()
        this.showPageData();

    }



    showPageData() {

        let formdata = new FormData();
        formdata.append("methodName", 'getpagedata')
        formdata.append("slug", 'About-us')

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

                    this.setState({ screendata: responseJson.data.description });
           

                } else {
                    alert(responseJson.replyMessage);
                }
            }).catch(err => {
                this.hideLoading();
                console.log(err)
            })

    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#cee2ea', height: 60 }}>

                        <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { this.props.navigation.navigate('Settings') }}>

                            <Image source={require('../images/back-icon-green.png')}
                                style={styles.ImageIconStyle} />

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .60, justifyContent: 'center', alignItems: 'center' }}>

                            <Text style={styles.TextStyleScreenHeading}> About </Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}>


                        </TouchableOpacity>
                    </View>

                    <Divider style={{ backgroundColor: '#135165' }} />

                

                    <ScrollView>

                    <View style={styles.Textcontainer}>
                    
                    <HTML html={this.state.screendata}></HTML> 
                        {/* <Text> {this.state.screendata} </Text> */}

                        {this.state.loading && (
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color="#58666c" />
                        </View>
                    )}

                    </View>


                    </ScrollView>



                </View>

            </ScrollView>

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
    Textcontainer: {
        flex: 1,
        backgroundColor: '#cee2ea',
        margin:10
    },

});

export default AboutScreen;
