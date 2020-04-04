import React,{Component} from 'react';
import {StyleSheet, SafeAreaView, ScrollView, Image, Text, View, StatusBar} from 'react-native';
import Screen from './Screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import ProfileScreen from './ProfileScreen';
import LoginScreen from './LoginScreen';
import { baseUrl, iconUrl, countryKey, sessionKey } from '../Helpers/Constant'


export default class User extends Component {
    constructor(props) {
        super(props);
        this.state={
            isUserLoggedIn:false,
            baseUrl: null,
            currency:null,
        }
    }
    componentDidMount() {
        let store = async () => await AsyncStorage.getItem('@CountryObj')
        store().then((val) =>{
        if(val){
        let data = JSON.parse(val)
        console.log("this si the datassss", data.baseUrl)
        this.setState({
          baseUrl: data.baseUrl,
          currency: data.currency
        }, () => {
        let session = async () => await AsyncStorage.getItem(sessionKey)
        session().then((val) => {
            console.log("this is the value",val)
            if(val == null){
                this.setState({isUserLoggedIn:false})
            }
            else {
                this.setState({isUserLoggedIn:true})
            }
        })
    })
}
    })
    
}

handleConfirmLogin = (session) => {
    let store = async () => await AsyncStorage.setItem('@SessionObj', JSON.stringify(session))
    store().then(() => {
      this.setState({
        session: session,
        isUserLoggedIn: true
      })
    }).catch((e) => {
      console.warn(e.message)
    })    
  }

    render(){
        console.log("HHHHHH",this.state.baseUrl)
        if(this.state.isUserLoggedIn != null){
            if(this.state.isUserLoggedIn){
              return <ProfileScreen baseUrl={this.state.baseUrl} navigation={this.props.navigation} currency={this.state.currency} />
            }
        
            if(!this.state.isUserLoggedIn){
              return <LoginScreen doHandleConfirmLogin={this.handleConfirmLogin} baseUrl={this.state.baseUrl} navigation={this.props.navigation} currency={this.state.currency} />
            }
          }
}
}