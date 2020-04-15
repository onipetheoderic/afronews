import React from 'react';
import {Alert, View,ScrollView,ToastAndroid, Image,Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, ImageBackground, Animated} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TypingAnimation } from 'react-native-typing-animation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl, iconUrl, countryKey, sessionKey } from '../Helpers/Constant'
import { doRegister } from '../Helpers/ApiService'
export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            typing_email: false,
            typing_password: false,
            animation_login: new Animated.Value(width-40),
            enable: true,
            username:"",
            first_name:"",
            last_name:"",
            phone_number:"",
            email:"",
            ref:"",
            password:"",
            password_confirmation:"",
            baseUrl:null
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
    componentDidMount() {
        let store = async () => await AsyncStorage.getItem(countryKey)
        store().then((val) => {    
          let data = JSON.parse(val)    
          this.setState({
            baseUrl: data.baseUrl
          })
        })
    }
    showToastWithGravity = (msg) => {
        ToastAndroid.showWithGravity(
          msg,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      };

    createTwoButtonAlert = () =>
      Alert.alert(
        "Registration Complete",
        "You can proceed to Payment or Login Page",
        [
          {
            text: "Cancel",
            onPress: () => this.props.navigation.navigate("LoginScreen"),
            style: "cancel"
          },
          { text: "OK", onPress: () => this.props.navigation.navigate("PaymentScreen"),
        } 
        ],
        { cancelable: false }
      );

    _animation(){
        
        console.log("this is the base url",this.state.baseUrl)
        const {username, email, password, first_name, last_name, 
            phone_number, password_confirmation, ref} = this.state;


            console.log("this KKKKK", username, email, password, first_name, last_name, 
            phone_number, password_confirmation, ref)
            let formData = new FormData(); 
           formData.append('username', username);
           formData.append('email', email);
           formData.append('password', password);
           formData.append('first_name', first_name);
           formData.append('last_name', last_name);
           formData.append('phone', phone_number);
           formData.append('password_confirmation', password_confirmation);
           formData.append('ref', ref);
           
           doRegister(this.state.baseUrl,formData).then((data)=>{
               console.log("this is hte registration data", data)
               if(data.hasOwnProperty('activated')){
                this.showToastWithGravity('registration successful')
                this.createTwoButtonAlert()
               }
               else{
                for (const key in data.errors) {
                    if (data.errors.hasOwnProperty(key)) {
                      const element = data.errors[key];
                     
                        console.log(key+": ", element[0]);
                        this.showToastWithGravity(element[0])
                    }
                  }
                  
               }
        })
       
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
               
                    <Text style={[styles.title, {marginTop:20, fontFamily:'Audiowide-Regular',}]}>First Name</Text>
                    <View style={styles.action}>
                        <TextInput 
                        placeholder="First Name" 
                        style={styles.textInput}
                        onChangeText={first_name => {this.setState({ first_name });}}
                        value={this.state.first_name}
                        
                        />
                        
                    </View>
                    <Text style={[styles.title, {marginTop:20, fontFamily:'Audiowide-Regular',}]}>Last Name</Text>
                    <View style={styles.action}>
                        <TextInput 
                        placeholder="Last Name" 
                        style={styles.textInput}
                        onChangeText={last_name => {this.setState({last_name });}}
                        value={this.state.last_name}
                        
                        />
                       
                    </View>
                    
                    <Text style={[styles.title, {marginTop:20, fontFamily:'Audiowide-Regular',}]}>Phone Number</Text>
                    <View style={styles.action}>
                        <TextInput 
                        placeholder="Phone Number" 
                        keyboardType = 'numeric'
                        style={styles.textInput}
                        onChangeText={phone_number => {this.setState({phone_number});}}
                        value={this.state.phone_number}
                        
                        />
                       
                    </View>
                    <Text style={[styles.title, {marginTop:20, fontFamily:'Audiowide-Regular',}]}>Email</Text>
                    <View style={styles.action}>
                        <TextInput 
                        placeholder="Your Email" 
                        style={styles.textInput}
                        onChangeText={email => {this.setState({ email });}}
                        value={this.state.email}
                      
                        />
                       
                    </View>
                    <Text style={[styles.title, {marginTop:20, fontFamily:'Audiowide-Regular',}]}>Username</Text>
                    <View style={styles.action}>
                        <TextInput 
                        placeholder="Your Username" 
                        style={styles.textInput}
                        onChangeText={username => {this.setState({ username });}}
                        value={this.state.username}
                   
                       
                        />
                                         </View>
                    <Text style={[styles.title, {marginTop:20, fontFamily:'Audiowide-Regular',}]}>Password</Text>
                    <View style={styles.action}>
                        <TextInput 
                        secureTextEntry
                        placeholder="Your Password" 
                        style={styles.textInput}
                        onChangeText={password => {this.setState({ password });}}
                        value={this.state.password}
                       
                        />
                        
                    </View>

                    <Text style={[styles.title, {marginTop:20, fontFamily:'Audiowide-Regular',}]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <TextInput 
                        secureTextEntry
                        placeholder="Confirm Password" 
                        style={styles.textInput}
                        onChangeText={password_confirmation => {this.setState({ password_confirmation });}}
                        value={this.state.password_confirmation}
                   
                        />
                      
                    </View>
                    
                    <Text style={[styles.title, {marginTop:20, fontFamily:'Audiowide-Regular',}]}>Referral Username</Text>
                    <View style={styles.action}>
                        <TextInput 
                        placeholder="Referral Number" 
                        style={styles.textInput}
                        keyboardType = 'numeric'
                        onChangeText={ref => {this.setState({ref});}}
                        value={this.state.ref}
                      
                        />
                        
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