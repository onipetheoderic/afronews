import React,{Component} from 'react';
import {StyleSheet, SafeAreaView, ScrollView, Image, Text, View, StatusBar} from 'react-native';
import Screen from './Screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage'
import { baseUrl, iconUrl, countryKey, sessionKey } from '../Helpers/Constant'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation'
import { fetchUserReferrals, fetchUserEarnings, fetchUserPosts, deleteUserPost, fetchUserProfile } from '../Helpers/ApiService'
export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoggedInTrue:false,
            isLoading: true,
            referralList: [],
            isRefreshing: false,
            earningList:null,
            userData: null,
            postList: [],
        }
    }
    componentDidMount() {
   
            this.initReferrals();
            this.initEarnings();
           
        
    }
    
    initEarnings = () => {
        let session = async () => await AsyncStorage.getItem(sessionKey)
        session().then((val) => {
          if (val) {
            let sess = JSON.parse(val)
            console.log("detailsssss", sess)
            fetchUserEarnings(this.props.baseUrl, sess.token).then((data) => {
                console.log("EEEEEEEE",data)
              this.setState({
                isLoading: false,
                earningList: data,
                userData:sess
              })
              fetchUserPosts(this.props.baseUrl, 1, sess.token).then((data) => {
                console.log("PPPPPPPPPPP",data.data)
                let posts = data.data
                this.setState({
                    postList: posts,
                    currentPage: data.current_page,
                    lastPage: data.last_page,
                    isLoading: false
                })
                
            }).catch((e) => {
                console.warn(e.message)
            })

            }).catch((e) => {
              console.log(e.message)
            })
          } else {
            this.clearAsyncStorage()
          }
        }).catch((e) => {
          console.warn(e.message)
        })
      }
    clearAsyncStorage = () => {
        let store = async () => await AsyncStorage.removeItem(sessionKey)
        store().then(() => {
            console.warn('Logout successfully')
           
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: "Home"
                    })
                ]
            });
            this.props.navigation.dispatch(resetAction);
        }).catch((err) => {
            console.warn('Logout failed', err.message)
        })
    }

    initReferrals = () => {
        let session = async () => await AsyncStorage.getItem(sessionKey)
        session().then((val) => {
          if (val) {
            let sess = JSON.parse(val)
            fetchUserReferrals(this.props.baseUrl, sess.token).then((data) => {
                console.log("RRRRRRRRRR", data)
              this.setState({
                isLoading: false,
                referralList: data
              })
            }).catch((e) => {
              console.log(e.message)
            })
          } else {
            this.clearAsyncStorage()
          }
        }).catch((e) => {
          console.warn(e.message)
        })
      }


    render(){
        const { goBack } = this.props.navigation;
        const earning = this.state.earningList===null ? 0 : this.state.earningList.total_earned
        const paidout = this.state.earningList===null ? 0 : this.state.earningList.paid_out;
        const current_balance = this.state.earningList===null ? 0 : this.state.earningList.cur_bal;
        console.log("this is the userData", this.state.userData)
        const first_name = this.state.userData === null? "" : this.state.userData.firstName;
        const last_name = this.state.userData === null? "" : this.state.userData.lastName;
        const avatar = this.state.userData === null? "" : `${this.props.baseUrl}/${this.state.userData.avatar}`;
        return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <FontAwesome5 name="angle-left" size={24} color="#52575d" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.clearAsyncStorage()}>
                        <FontAwesome5 name="power-off" size={24} color="#52575d" />
                    </TouchableOpacity>
                </View>
                <View style={{alignSelf:"center"}}>
                    <View style={styles.profileImage}>
                        <Image source={{uri: avatar}} style={styles.image} resizeMode="center"></Image>
                    </View>

                   
                    <View style={styles.active}></View>

                    <View style={styles.add}>
                        <FontAwesome5 name="plus" size={24} color="#dfd8c8" style={{marginTop:6, marginLeft:2}} />
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.text, {fontWeight:"200", fontSize:36 }]}>{first_name}</Text>
                    <Text style={[styles.text, {color:"#AEB5BC", fontSize:14, fontFamily:'Montserrat-Regular' }]}>{last_name}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, {fontSize:24}]}>{this.state.referralList.length}</Text>
                        <Text style={[styles.text, styles.subText]}>Referals</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor:'#DFD8C8', borderLeftWidth: 1, borderRightWidth:1}]}>
                <Text style={[styles.text, {fontSize:24}]}>{earning}</Text>
                        <Text style={[styles.text, styles.subText]}>Total Earned</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor:'#DFD8C8', borderLeftWidth: 1, borderRightWidth:1}]}>
                        <Text style={[styles.text, {fontSize:24}]}>{current_balance}</Text>
                        <Text style={[styles.text, styles.subText]}>Balance</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, {fontSize:24}]}>{paidout}</Text>
                        <Text style={[styles.text, styles.subText]}>Paid Out</Text>
                    </View>
                  
                </View>
                <View style={{marginTop:32}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {this.state.postList.map((post, index) => {
            let imgPath = (post.images.length < 1) ? iconUrl : `${this.props.baseUrl}${post.images[0].path}`
                        return(
                        <View style={styles.mediaImageContainer}>
                            <Image source={{uri:imgPath}} style={styles.image} resizeMode="cover"></Image>
                        <Text>{post.topic}</Text>
                        </View>
                         )})}
                       
                    </ScrollView>
                   
                </View>
            <Text style={[styles.subText, styles.recent]}>Recent Posts</Text>
            <View style={{alignItems:'center'}}>
            {this.state.postList.map((post, index) => {
                return(
                    <View style={styles.recentItem}>
                    <View style={styles.recentItemIndicator}></View>
                    <View style={{width:250}}>
                        <Text style={[styles.text, {color:"#41444b", fontWeight:"300"}]}>
                            {post.topic}                            
                       </Text>
                       <Text> <FontAwesome5 name="thumbs-up" size={14} color="blue" />
                       <Text style={{marginLeft:5}}> {post.comments_count}</Text>
                       </Text> 
                    </View>
                </View>
                
                )})}
                
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#fff"
    },
    text: {
        fontFamily: "Candara",
        color: "#52575D"
    },
    image: {
        flex:1,
        width: undefined,
        height: undefined,
    },
    subText: {
        fontSize: 12,
        color: '#AEB5BC',
        textTransform: 'uppercase',
        fontWeight: '500'
    },  
    titleBar: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    profileImage: {
        width:200,
        height:200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: 'absolute',
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    active: {
        backgroundColor: '#34ffb9',
        position: 'absolute',
        bottom: 28,
        left: 10,
        padding: 4, 
        height: 20,
        width: 20,
        borderRadius: 10,
    },
    add: {
        backgroundColor: "#41444B",
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 16
    },
    statsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 32,

    },
    statsBox: {
        alignItems: 'center',
        flex: 1
    },
    mediaImageContainer: {
        width: 200,
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: '#41444b',
        position: 'absolute',
        top: '50%',
        marginTop: -50,
        marginLeft: 20,
        width: 80,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: {width: 0, height:10},
        shadowRadius: 20,
        shadowOpacity: 1,
    },
    mediaCount2: {
        backgroundColor: '#41444b',
        position: 'absolute',
        top: '50%',
        marginTop: -50,
        marginLeft: 140,
        width: 80,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: {width: 0, height:10},
        shadowRadius: 20,
        shadowOpacity: 1,
    },
    mediaCount3: {
        backgroundColor: '#41444b',
        position: 'absolute',
        top: '50%',
        marginTop: -50,
        marginLeft: 250,
        width: 80,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: {width: 0, height:10},
        shadowRadius: 20,
        shadowOpacity: 1,
    },

    recent: {
        marginLeft:32,
        marginTop:32,
        marginBottom: 6,
        fontSize: 10,
    },

    recentItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,

    },
    recentItemIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height:12,
        width:12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20,

    }


})