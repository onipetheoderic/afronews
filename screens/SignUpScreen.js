import React from 'react';
import {View,ScrollView, Image,Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, ImageBackground, Animated} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TypingAnimation } from 'react-native-typing-animation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';

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
                    <Text style={{fontFamily:'Audiowide-Regular',color:'white', fontSize:20}}>Welcome to Afronews</Text>
                    <Text style={{fontFamily:'Audiowide-Regular', color:'yellow'}}>Quickly Sign up</Text>
                </ImageBackground>
                </View>
                <ScrollView style={styles.footer}>
                    <Text style={[styles.title, {marginTop:20, fontFamily:'Audiowide-Regular',}]}>Email</Text>
                    <View style={styles.action}>
                        <TextInput 
                        placeholder="Your Email" 
                        style={styles.textInput}
                        onFocus = {()=>this._foucus("email")}
                        />
                        {this.state.typing_email ?
                        this._typing() : null
                    }
                    </View>
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
                                <Text style={styles.textLogin}>Sign Up</Text>
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
                        <Text style={{fontFamily:'Audiowide-Regular', color:"#07411D"}}>Sign Up</Text>
                    </View>
                </ScrollView>
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
        flex: 1
    },
    footer: {
        flex: 4,
        
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