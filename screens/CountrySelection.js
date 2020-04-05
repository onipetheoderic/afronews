import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, StatusBar, ImageBackground, Animated} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TypingAnimation } from 'react-native-typing-animation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage'

import { countryKey } from '../Helpers/Constant';



export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            typing_email: false,
            typing_password: false,
            animation_login: new Animated.Value(width-40),
            enable: true,
        }
    }

    _foucus(value){
        if(value==="email"){
            this.setState({
                typing_email:true,
                typing_password:false
            })
        }
        else {
            this.setState({
                typing_email:false,
                typing_password:true
            })
        }
    }

    _typing(){
        return(
            <TypingAnimation 
                dotColor="#07411D"
                style={{marginRight:25}}
               
            />
        )
    }

    _animation(){
        Animated.timing(
            this.state.animation_login,
            {
                toValue: 40,
                duration: 250,
            }
        ).start();
        setTimeout(()=> {
            this.setState({
                enable:false,
                typing_email:false,
                typing_password:false
            })
        }, 150)
    }
   
NigeriaNews = () => {
    this.props.navigation.navigate('Home')
}
GhanaNews = () => {
    this.props.navigation.navigate('Home')
}
KenyaNews = () => {
    this.props.navigation.navigate('Home')
}
SetCountry = (countryCode, countryName, baseUrl, currency) => {
    let store = async () => await AsyncStorage.setItem('@CountryObj', JSON.stringify({
        countryCode: countryCode,
        countryName: countryName,
        baseUrl: baseUrl,
        currency: currency
    }))
    store().then(() => {
        this.props.navigation.navigate('Home')
    })
}

//https://ng.afronews.org/images/afronews-logo.png
    render(){
        console.log("this are the prrops",this.props)
        const width = this.state.animation_login;
        return(
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.header}>
                <ImageBackground source={require("../assets/images/Untitled-1.png")}
                style={styles.imageBackground}>
                    <Image source={{uri: "https://ng.afronews.org/images/afronews-logo.png"}}
                style={{width:220, height:90, margin:5, resizeMode:'stretch'}}
                >
                </Image>
                
                    <Text style={{fontFamily:'Audiowide-Regular',color:'white', fontSize:20}}>Welcome Back</Text>
                    <Text style={{fontFamily:'Audiowide-Regular', color:'yellow', fontSize:10}}>Quickly Select the Country of your choice</Text>
                </ImageBackground>
                </View>

            <View style={{flex:1, flexDirection: 'row', backgroundColor:'white', marginTop:20}}>
                <TouchableOpacity onPress={()=>this.SetCountry("NG", "Nigeria", "https://ng.afronews.org/", "₦")} style={{height:100, width: '100%', flexDirection: 'row'}}>
                <View style={{flexDirection:'column', flex:1, marginTop:20, marginLeft:10}}>
                <Text style={{fontFamily:'Audiowide-Regular', fontSize:25}}>Nigeria</Text>
                <Text style={[styles.flatListItem, {fontFamily:'Candara'}]}>Select Nigeria News</Text>
                </View>
                <Image source={require("../assets/images/Nigerian-flag.jpg")}
                style={{width:200, height:90, marginRight:10, resizeMode:'stretch'}}
                >
                </Image>
                </TouchableOpacity>
              
                
            </View>
            <View style={{flex:1, flexDirection: 'row', backgroundColor:'white', marginTop:-80}}>
                <TouchableOpacity onPress={()=>this.SetCountry("GH", "Ghana", "https://gh.afronews.org/", "GH₵")} style={{height:100, width: '100%', flexDirection: 'row'}}>
                <View style={{flexDirection:'column', flex:1, marginTop:20, marginLeft:10}}>
                <Text style={{fontFamily:'Audiowide-Regular', fontSize:25}}>Ghana</Text>
                <Text style={[styles.flatListItem, {fontFamily:'Candara'}]}>Select Ghana News</Text>
                </View>
                <Image source={require("../assets/images/ghana.jpg")}
                style={{width:200, height:90, marginRight:10, resizeMode:'stretch'}}
                >
                </Image>
                </TouchableOpacity>              
                
            </View>

            <View style={{flex:1, flexDirection: 'row', backgroundColor:'white', marginTop:-80}}>
                <TouchableOpacity onPress={()=>this.SetCountry("KE", "Kenya", "https://ke.afronews.org/", "KSH")} style={{height:100, width: '100%', flexDirection: 'row'}}>
                <View style={{flexDirection:'column', flex:1, marginTop:20, marginLeft:10}}>
                <Text style={{fontFamily:'Audiowide-Regular', fontSize:25}}>Kenya</Text>
                <Text style={[styles.flatListItem, {fontFamily:'Candara'}]}>Select Kenya News</Text>
                </View>
                <Image source={require("../assets/images/kenya.jpg")}
                style={{width:200, height:90, marginRight:10, resizeMode:'stretch'}}
                >
                </Image>
                </TouchableOpacity>              
                
            </View>
           
           
            </View>
        )
        
    }
}

const width = Dimensions.get("screen").width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: 'center'
    },
    header: {
        flex: 1,
        marginBottom:20
    },
    footer: {
        flex: 2,
        
        padding: 20
    },
    imageBackground: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    title: {
        color: 'black',
        
        fontFamily:'Audiowide-Regular',
    },
    action: {
        flexDirection: 'row',
        borderBottomWidth:1,
        borderBottomColor: '#f2f2f2'
    },
    textInput: {
        flex: 1, 
        marginTop:5,
        paddingBottom:5,
        color: 'gray'
    },
    button_container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    animation: {
        backgroundColor: "#07411D",
        paddingVertical:10,
        marginTop:30,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLogin: {
        fontFamily:'Audiowide-Regular',
        color: 'white',
       
        fontSize: 18,
        
    },
    signUp: {
        flexDirection:'row',
        fontFamily:'Audiowide-Regular',
        justifyContent: 'center',
        marginTop:20,
    }

})