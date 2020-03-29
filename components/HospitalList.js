import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  AppRegistry,
  StyleSheet
} from 'react-native';

import { List, ListItem } from "react-native-elements";
var currentLatitude ,currentLongitude;
var _ = require('lodash');

class HospitalList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      pageToken: '',
      refreshing: false,
      siteTitle: '',
      cancel: '',
    };
  }

  static navigationOptions = {
    title: 'Hospital List',

  };


  componentDidMount() {
    const { navigation } = this.props;  
    currentLatitude = navigation.getParam('currentLatitude', 'NO-User'); 
    currentLongitude = navigation.getParam('currentLongitude', 'NO-User'); 

    this.fetchData();
  }

  fetchData = () => {

    const { pageToken } = this.state;
    const urlFirst = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLatitude},${currentLongitude}&radius=20000&type=hospital&key=AIzaSyAAQ1Cppz62lgwYEJjzrkty7Nzi5ZYNCSM`
    const urlNext = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLatitude},${currentLongitude}&radius=20000&type=hospital&key=AIzaSyAAQ1Cppz62lgwYEJjzrkty7Nzi5ZYNCSM&pagetoken=${pageToken}`;

   // restaurant
   // atm
   // parking

    let url = pageToken === '' ? urlFirst : urlNext
    console.log(url);
    console.log("url");
    this.setState({ loading: true });
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(res => {

        const arrayData = _.uniqBy( [...this.state.data, ...res.results] , 'id' )
        console.log("RESULTS ====" + JSON.stringify(res.results));
        this.setState({
          siteTitle: "Hospital Near By",
          cancel: "Cancel",
          data: pageToken === '' ? res.results : arrayData,
          loading: false,
          refreshing: false,
          pageToken: res.next_page_token
        });

      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };
  renderSeparator = () => {
   return (
     <View
       style={{
         height: 1,
         width: "100%",
         backgroundColor: "#CED0CE",
       }}
     />
   );
  };
  renderHeader = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 20, marginBottom: 10, marginLeft: 10, flex: .7, color: '#2b303c' }}>
          {this.state.siteTitle}</Text>
        <Text onPress={() => this.props.navigation.goBack()} style={{ alignSelf: "center", fontWeight: "bold", fontSize: 20, marginBottom: 10, flex: .3, color: '#2b303c' }}>
          {this.state.cancel} </Text>
      </View>
    )
  };
  renderFooter = () => {

    if (this.state.pageToken === undefined) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleRefresh = () => {
    this.setState(
      {
        pageToken: '',
        refreshing: true
      },
      () => {
        this.fetchData();
      }
    );
  };

  handleLoadMore = () => {
    this.fetchData();
  };


  render() {
    return (
      <View style={styles.MainContainer}>    
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        renderItem={({ item }) =>{
   
          const rating = item.rating ? item.rating : 'na'

          return (<View>
            <ListItem
              roundAvatar
              title={`${item.name}`+" ("+`${rating}`+")"}
              subtitle={`${item.vicinity}` }
              avatar={{ uri: item.icon }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => {
                console.log("destination name ==" + item.name)
                console.log("destination lat ==" + item.geometry.location.lat)
                this.props.navigation.navigate('Navigation', {

                  destinationLatitude: item.geometry.location.lat,
                  destinationLongitude: item.geometry.location.lng,
                  destinationName: item.name
                })
              }}
            />
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#CED0CE",
                marginLeft: "0%"
              }}
            /></View>
          )
        }}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={50}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
      flex: 1  
  }
});  

export default HospitalList;