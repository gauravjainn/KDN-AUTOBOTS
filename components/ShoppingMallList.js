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
var _ = require('lodash');

class ShoppingMallList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      pageToken: '',
      refreshing: false,
      siteTitle: ''
    };
  }

  static navigationOptions = {
    title: 'Restaurant List',

  };


  componentDidMount() {

    this.fetchData();
  }

  fetchData = () => {

    const { pageToken } = this.state;
    const urlFirst = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=24.5391,73.6883&radius=20000&type=shopping_mall&key=AIzaSyAAQ1Cppz62lgwYEJjzrkty7Nzi5ZYNCSM`
    const urlNext = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=24.5391,73.6883&radius=20000&type=shopping_mall&key=AIzaSyAAQ1Cppz62lgwYEJjzrkty7Nzi5ZYNCSM&pagetoken=${pageToken}`;

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
          siteTitle: "Shopping Mall Near By",
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
    return (<Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 20, marginBottom: 10}}>{this.state.siteTitle}</Text>)
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

export default ShoppingMallList;