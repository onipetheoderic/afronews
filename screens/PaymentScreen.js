import React,{Component} from 'react';
import { ActivityIndicator, TouchableOpacity, RefreshControl, FlatList, Image, View, StyleSheet, Text, StatusBar, Platform} from 'react-native';
import Screen from './Screen';
import HorizontalFlatList from './HorizontalFlatList';
import {AllFeedsData} from './AllFeedsData';
import { getFeeds, getCategories, getPostsByCategory } from '../Helpers/ApiService'
import AsyncStorage from '@react-native-community/async-storage'
import { baseUrl, iconUrl, countryKey } from '../Helpers/Constant';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Rave from 'react-native-rave';


export default class PaymentScreen extends Component {
    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
        this.onClose = this.onClose.bind(this);
      }
    
      onSuccess(data) {
        console.log("success", data);
        // You can get the transaction reference from successful transaction charge response returned and handle your transaction verification here
    
      }
    
      onFailure(data) {
        console.log("error", data);
      }
    
      onClose() {
        //navigate to the desired screen on rave close
    
      }

      render() {
        return (
          <Rave 
              amount="500" 
              country="NG" 
              currency="NGN" 
              paymentOption="card,account"
              email="test@mail.com" 
              firstname="Oluwole" 
              lastname="Adebiyi" 
              publickey="FLWPUBK-**************************-X" 
              encryptionkey="****************"
              meta={[{ metaname: "color", metavalue: "red" }, { metaname: "storelocation", metavalue: "ikeja" }]}
              onSuccess={res => this.onSuccess(res)} 
              onFailure={e => this.onFailure(e)}
              onClose={e => this.onClose(e)}
              />
        );
      }


}

