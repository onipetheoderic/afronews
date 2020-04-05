import React from 'react';
import {View, ToastAndroid, Image, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, ImageBackground, Animated} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TypingAnimation } from 'react-native-typing-animation';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import { doLogin, fetchUserProfile } from '../Helpers/ApiService'
export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            typing_email: false,
            username:"",
            password:"",
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
    showToastWithGravity = (msg) => {
        ToastAndroid.showWithGravity(
          msg,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      };
    
    
      
      

      _animation(){
        
        const { username, password } = this.state
        console.log("login details",username, password)
        if (username.length < 1 || password.length < 1) {
            // alert('Both username/password are required')
            this.showToastWithGravity("Username and Password is required")
        } 
        else {
            let formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
        
            this.setState({
                isLoggingIn: true
            }, () => {
                doLogin(this.props.baseUrl, formData).then((data) => {
                    if (data) {
                        if (data.token) {
                            fetchUserProfile(this.props.baseUrl, data.token).then((data2) => {
                                if(data2){
                                    let sess = {
                                        token: data.token,
                                        id: data.user.id,
                                        username: data.user.username,
                                        firstName: data.user.first_name,
                                        lastName: data.user.last_name,
                                        email: data.user.email,

                                        refLink: data2.referral_link,
                                        bio: data2.profile.bio,
                                        gender: data2.profile.gender,
                                        location: data2.profile.location,
                                        registeredOn: data.user.created_at,
                                        lastLogin: data.user.updated_at,
                                        avatar: data2.profile.avatar
                                    }
                                    this.props.doHandleConfirmLogin(sess)
                                }
                            }).catch((e) => {
                                console.warn(e.message)
                            })                            
                        }else{
                            this.showToastWithGravity(data.message)
                        }
                        // 

                        /*
                         This is the data {"token": "g04LBvv7HXVShfZUC1JSFaBbMxXWOKN38zEvyEiHJFpmZX7qEOTOLKkLQLLl", 
                         "user": {"activated": 1, "activated_email": 1, "admin_ip_address": null, 
                         "created_at": "2020-04-01 10:25:24", "deleted_at": null, 
                         "deleted_ip_address": null, "email": "test@afronews.org", 
                         "first_name": "Test", "id": 1263, "last_name": 
                         "Account", "promo": 0, "ref": null,
                          "signup_confirmation_ip_address": null,
                           "signup_ip_address": "2a02:8084:4ec1:2c80:700f:b755:2728:17da, 162.158.38.17", 
                           "signup_sm_ip_address": null, "updated_at": "2020-04-04 12:28:38", 
                           "updated_ip_address": "2a02:8084:4ec1:2c80:f870:24e5:ad38:5702, 162.158.38.53", 
                           "username": "testing"}}
                        */ 
                        if (data.token) {
                            console.log("This is the data", data)
                        }
                        // 
                    }else{
                        this.showToastWithGravity("Login Failed, Incorrect Login Details")

                        this.setState({
                            isLoggingIn: false
                        })
                    }
                    // console.warn(data)
                }).catch((e) => {
                    console.warn(e)
                })


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
        })
       
    }
}

    render(){
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
                    <Text style={{fontFamily:'Audiowide-Regular',color:'white', fontSize:30}}>Welcome Back</Text>
                    <Text style={{fontFamily:'Audiowide-Regular', color:'yellow'}}>Sign Up To Continue</Text>
                </ImageBackground>
                </View>
                <View style={styles.footer}>
                    <Text style={[styles.title, {marginTop:20, fontFamily:'Audiowide-Regular',}]}>Username</Text>
                    <View style={styles.action}>
                        <TextInput 
                        placeholder="Your Username" 
                        style={styles.textInput}
                        onFocus = {()=>this._foucus("email")}
                        onChangeText={(text) => this.setState({ username: text })}
                        />
                        {this.state.typing_email ?
                        this._typing() : null
                    }
                    </View>

                    <Text style={[styles.title, {marginTop:20, fontFamily:'Audiowide-Regular',}]}>Password</Text>
                    <View style={styles.action}>
                        <TextInput 
                        secureTextEntry
                        placeholder="Your Password" 
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({ password: text })}
                        onFocus = {()=>this._foucus("password")}
                        />
                        {this.state.typing_password ?
                            this._typing() : null
                        }
                    </View>
                    <TouchableOpacity onPress={()=>this._animation()}>
                        <View style={styles.button_container}>
                            <Animated.View style={[styles.animation,{width}]}>
                                { this.state.enable ?
                                <Text style={styles.textLogin}>Login</Text>
                                :
                                <Animatable.View animation="bounceIn" delay={50}>
                                    <FontAwesome5 name="check" size={20} color="white" />
                                </Animatable.View>
                            }
                            </Animated.View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.signUp}>
                        <Text style={{fontFamily:'Audiowide-Regular', color:'black'}}>New User? </Text>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("SignUpScreen")}>
                        <Text style={{fontFamily:'Audiowide-Regular', color:"#07411D"}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
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
        flex: 2
    },
    footer: {
        flex: 3,
        
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
        justifyContent: 'center',
        marginTop:20,
    }

})