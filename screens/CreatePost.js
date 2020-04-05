import React from 'react';
import {View,Button, ScrollView,Picker, ToastAndroid, Image,Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, ImageBackground, Animated} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TypingAnimation } from 'react-native-typing-animation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import DocumentPicker from 'react-native-document-picker';
import { getSinglePost, 
    getPostComments, 
    getSinglePostAuthed,
    createPost,
    createFilePost,
    getCategories,
    doLikePost, 
    doPostComment,    
    doUnlikePost } from '../Helpers/ApiService';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'
import { baseUrl, iconUrl, countryKey, sessionKey } from '../Helpers/Constant'

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            typing_email: false,
            typing_password: false,
            typing_category: false,
            typing_content: false,
            typing_title: false,
            animation_login: new Animated.Value(width-40),
            enable: true,
            session: null,
            baseUrl: baseUrl,
            isLoading: true,
            file: [],
            allCategory:[],
            selectedCategory: null,
            images:[],
            title: null,
        }
    }

    _foucus(value){
        if(value==="title"){
            this.setState({
                typing_title:true,
                typing_category:false,
                typing_content:false
            })
        }
        else if(value=="content"){
            this.setState({
                typing_title:false,
                typing_category:false,
                typing_content:true,
            })
        }
        else if(value=="category"){
            this.setState({
                typing_title:false,
                typing_category:true,
                typing_content:false,
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
   
    fetchCategory(baseUrl){
        console.log("geeting cateories")
        getCategories(baseUrl).then((data) => {
            console.log("categorys", data)
            if (data.length>=1) {
                console.log("its a success")
              this.setState({
                allCategory:data
              })
            }
          }).catch((e) => {
            console.warn(e)
          })
    }
    componentDidMount() {
        let store = async () => await AsyncStorage.getItem(countryKey)
        store().then((val) => {
    
          let data = JSON.parse(val)
            console.log(data.baseUrl)
          this.setState({
            baseUrl: data.baseUrl
          }, () => {    
            this.fetchCategory(this.state.baseUrl)
            let session = async () => await AsyncStorage.getItem(sessionKey)
            session().then((val) => {
              if (val) {
                let sess = JSON.parse(val)
                // console.warn(sess.token)
                this.setState({
                  session: sess
                }, () => {
                
                })
              }
            }).catch((e) => {
              console.warn(e.message)
            })
    
          })
    
    
        }).catch((e) => {
          console.warn(e.message)
        })
      }

      
ImageSelector = () => {
    const options = {
      title: 'Select File',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
     
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
     
        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  
MultipleUploader = async () => {
    
    try {
        const results = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.images],
        });
        console.log("this iis ithe result",results)
        // for (const res of results) {
        //   console.log(
        //     res.uri,
        //     res.type, // mime type
        //     res.name,
        //     res.size
        //   );
        // }
        this.setState({ file: results});
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }

}

showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

nextPressed() {
    const {title, content, selectedCategory} = this.state;
    if (title.length < 10 || content.length < 10) {
        // alert('Both username/password are required')
        this.showToastWithGravity("The Title and content must be more than 10 characters")
    } 
    else {
        console.log("session token",this.state.session.token)
        let image = this.state.file
        var newFile = new FormData();
        newFile.append('title', title);
        newFile.append('content',content);
        newFile.append('category',selectedCategory);
        console.log("this is the file first",this.state.file[0].uri)
       
        
        RNFetchBlob.fetch('POST', `${this.state.baseUrl}api/writePost`, {
          
            Authorization : `Bearer ${this.state.session.token}`,
            'Content-Type' : 'application/json',
            'Accept': 'application/json'

        }, [
                   // part file from storage
            { name : 'image[]', filename : this.state.file[0].name, type:'image/jpeg', data: RNFetchBlob.wrap(this.state.file[0].uri)},
            // elements without property `filename` will be sent as plain text
            {name: "title", data: "this isthe titlee"},
            {name: "content", data: "this is thte content"},
            {name: "category", data: "7"}
            
        
        ]).then((resp) => {
            console.log("this is the response", JSON.stringify(resp))
        }).catch((err) => {
            console.log("this is the error", JSON.stringify(err))
        })
       
   
    }
   

}

/*
let data = new FormData()
data.append('image', {uri: 'content://path/to/content', type: 'image/png', name: 'name'})
const response = await fetch(url, {
      method: 'POST',
      body: data
    })
*/ 
    render(){
        const width = this.state.animation_login;
        const session =  this.state.session;
        const userLoggedIn = session!=null?true:false
        console.log("SSSSSSSSSSS",userLoggedIn, session)
        // console.log("all render cats",this.state.allCategory)
        const allCategory = this.state.allCategory
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
                    <Text style={{fontFamily:'Audiowide-Regular',color:'white', fontSize:20}}>Post Creation</Text>
                    <Text style={{fontFamily:'Audiowide-Regular', color:'yellow'}}>Quickly Create A Post</Text>
                </ImageBackground>
                </View>
                <ScrollView style={styles.footer}>
                    <Text style={[styles.title, {marginTop:20, fontFamily:'Audiowide-Regular',}]}>Title</Text>
                    <View style={styles.action}>
                        <TextInput 
                        placeholder="title" 
                        value={this.state.title}
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({ title: text })}
                        onFocus = {()=>this._foucus("title")}
                        />
                        {this.state.typing_title ?
                        this._typing() : null
                    }
                    </View>
                    
                    <Text style={[styles.title, {marginTop:20, fontFamily:'Audiowide-Regular',}]}>Content of Post</Text>
                    <View style={styles.action}>
                        <TextInput 
                        value={this.state.content}
                        placeholder="Content" 
                        style={styles.textInput}
                        onFocus = {()=>this._foucus("content")}
                        onChangeText={(text) => this.setState({ content: text })}
                        />
                        {this.state.typing_content ?
                        this._typing() : null
                    }
                    </View>
                    <Text style={[styles.title, {marginTop:20, fontFamily:'Audiowide-Regular',}]}>Select Category</Text>
                    <View style={styles.action}>
                    <Picker
                       selectedValue={this.state.selectedCategory}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({selectedCategory:itemValue})}>
                        {allCategory.map((category, index)=>{
                            console.log(category)
                            return(
                                <Picker.Item label={category.name} value={category.id} /> 
                            )
                        })}
                      
                    </Picker>
                   
                    </View>
                    {/* <Button title="ImageSelector" onPress={()=>this.ImageSelector()} />  */}
                    <Button title="Multiple Image Upload" onPress={()=>this.MultipleUploader()} />
                   
                    {userLoggedIn &&
                    <TouchableOpacity onPress={()=>this.nextPressed()}>
                        <View style={styles.button_container}>
                            <Animated.View style={[styles.animation,{width}]}>
                                { this.state.enable ?
                                <Text style={styles.textLogin}>Create Post</Text>
                                :
                                <Animatable.View animation="bounceIn" delay={50}>
                                    <FontAwesome5 name="check" size={20} color="white" />
                                </Animatable.View>
                            }
                            </Animated.View>
                        </View>
                    </TouchableOpacity>
                    }
                     <View style={styles.signUp}></View>
                    {!userLoggedIn &&
                    <View style={styles.signUp}>
                          <TouchableOpacity onPress={()=>this.props.navigation.navigate("SignUpScreen")}>
                        <Text style={{fontFamily:'Audiowide-Regular', color:'#07411D'}}>Quickly SignUp to Post </Text>
                      
                        </TouchableOpacity>
                    </View>
                    }
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
        marginBottom: 80,
    }

})