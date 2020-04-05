import React,{Component} from 'react';
import {ToastAndroid, StyleSheet, TextInput, Dimensions, ActivityIndicator, TouchableOpacity, SafeAreaView, ScrollView, Image, Text, View, StatusBar} from 'react-native';
import Screen from './Screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableHighlight } from 'react-native-gesture-handler';
const entities = require("entities");
import HTML from 'react-native-render-html';
import TimeAgo from '../components/timeAgo';
import AsyncStorage from '@react-native-community/async-storage'
const webViewHeight = Dimensions.get('window').height;
import { getSinglePost, 
    getPostComments, 
    getSinglePostAuthed,
    doLikePost, 
    doPostComment,    
    doUnlikePost } from '../Helpers/ApiService'
import { baseUrl, iconUrl, countryKey, sessionKey } from '../Helpers/Constant'



export default class AllFeedsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id: null,
          title: null,
          myComment: null,
          post: null,
          user: null,
          createdAt: null,
          likes: null,
          slug: null,
          isLiked: false,
          isCommentLiked:false,
          commentsLiked: [],
          commentsData: null,
          commentsCount: null,
          session: null,
          baseUrl: baseUrl,
          isLoading: true
        };
    }


    componentDidMount() {
        let store = async () => await AsyncStorage.getItem(countryKey)
        store().then((val) => {
    
          let data = JSON.parse(val)
    
          this.setState({
            baseUrl: data.baseUrl
          }, () => {
    
            let session = async () => await AsyncStorage.getItem(sessionKey)
            session().then((val) => {
              if (val) {
                let sess = JSON.parse(val)
                // console.warn(sess.token)
                this.setState({
                  session: sess
                }, () => {
                  this.fetchPostAuthed()
                })
              } else {
                this.fetchPost()
              }
            }).catch((e) => {
              console.warn(e.message)
            })
    
          })
    
    
        }).catch((e) => {
          console.warn(e.message)
        })
      }
    
      fetchPost = () => {
        const { baseUrl,session } = this.state
        const { navigation } = this.props
        let id = navigation.getParam('id', null)
        let title = navigation.getParam('title', null)
        this.fetchPostComments(id, baseUrl, session)
        getSinglePost(baseUrl, id).then((data) => {
          let post = entities.decodeHTML(data.text)
          if (data.images.length > 0) {
            data.images.forEach((item) => {
              post += `<p><img src="${baseUrl}${item.path}" /> <br /></p>`
            })
          }
    
          this.setState({
            id: id,
            title: title,
            baseUrl: baseUrl,
            post: post,
            user: data.user.username,
            createdAt: data.created_at,
            likes: data.likes,
            slug: data.slug,
            isLoading: false
          })
    
    
          // this.fetchPostComments()
    
        }).catch((e) => {
          console.warn(e.message)
        })
      }
    
      fetchPostAuthed = () => {
        const { baseUrl, session } = this.state
        const { navigation } = this.props
        let id = navigation.getParam('id', null)
        let title = navigation.getParam('title', null)
        // console.warn(`id : ${id}`)
        // return
    
        getSinglePostAuthed(baseUrl, id, session.token).then((data) => {
          let post = entities.decodeHTML(data.text)
          if (data.images.length > 0) {
            data.images.forEach((item) => {
              post += `<p><img src="${baseUrl}${item.path}" /> <br /></p>`
            })
          }
    
          this.setState({
            id: id,
            title: title,
            baseUrl: baseUrl,
            post: post,
            user: data.user.username,
            createdAt: data.created_at,
            likes: data.likes,
            slug: data.slug,
            isLiked: data.liked,
            isLoading: false,
            commentsLiked: data.commentsLiked
          })
    
          // this.fetchPostComments()
    
        }).catch((e) => {
          console.warn(e.message)
        })
      }    
      handleShare = () => {
        const { title, slug, baseUrl } = this.state
        message = `${title}\n\nRead more... ${baseUrl}${slug}\n\n${appName}`
    
        return Share.share(
          { title, message, url: message },
          { dialogTitle: `Share ${title}` }
        );
      }
    
      handleLike = () => {
        const { id, baseUrl, isLiked, session, likes } = this.state
        let formData = new FormData();
        formData.append('postId', id);
    
        if (session != null) {
          if (isLiked) {
    
            doUnlikePost(baseUrl, formData, session.token).then((data) => {
              if (data.success) {
                this.setState({
                  isLiked: false,
                  likes: likes - 1
                })
              }
            }).catch((e) => {
              console.warn(e)
            })
    
          } else {
    
            doLikePost(baseUrl, formData, session.token).then((data) => {
              if (data.success) {
                this.setState({
                  isLiked: true,
                  likes: likes + 1
                })
              }
            }).catch((e) => {
              console.warn(e)
            })
    
          }
        }
    
      }
      

      handleCommentsLike = () => {
        const { id, baseUrl, isLiked, session, likes } = this.state
        let formData = new FormData();
        formData.append('postId', id);
    
        if (session != null) {
          if (isLiked) {
    
            doUnlikePost(baseUrl, formData, session.token).then((data) => {
              if (data.success) {
                this.setState({
                  isLiked: false,
                  likes: likes - 1
                })
              }
            }).catch((e) => {
              console.warn(e)
            })
    
          } else {
    
            doLikePost(baseUrl, formData, session.token).then((data) => {
              if (data.success) {
                this.setState({
                  isLiked: true,
                  likes: likes + 1
                })
              }
            }).catch((e) => {
              console.warn(e)
            })
    
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
      commentOnPost = () => {
        console.log("this is the user comment",this.state.myComment)
      
        const { id, baseUrl, myComment, session } = this.state

        this.setState({
            isBtnDisabled: true,
            isPosting: true
        })

        if (myComment.trim().length < 1) {
            this.setState({
                isPosting: false
            })
            return
        }

        let formData = new FormData();
        formData.append('postId', id);
        formData.append('comment', myComment);

        doPostComment(baseUrl, formData, session.token).then((data) => {
            if (data) {
                // console.warn(data)
                if (data.success) {
                  this.showToastWithGravity('Comment posted successfully')
                
                    this.setState({
                        isPosting: false,
                        myComment: ''
                    }, () => {
                        this.fetchPostComments(id, baseUrl, session)
                    })
                } else if (data.errors) {
                    if (data.errors.comment) {
                      this.showToastWithGravity(data.errors.comment)
                    } else {
                      this.showToastWithGravity('Your comment cannot be posted at the moment')
                       
                    }
                    this.setState({
                        isBtnDisabled: false,
                        isPosting: false
                    })
                }
                else {
                  this.showToastWithGravity('Your comment cannot be posted at the moment')
                      
                    this.setState({
                        isBtnDisabled: false,
                        isPosting: false
                    })
                }
            } else {
              this.showToastWithGravity('Your comment cannot be posted at the moment')
            }
        }).catch((e) => {
            console.warn(e.message)
            this.setState({
                isBtnDisabled: false,
                isPosting: false
            })
        })
      }
      
      fetchPostComments = (postId, baseUrl, session) => {
        this.setState({
            isLoading: true,
            isBtnClicked: true
        })
        getPostComments(baseUrl, postId, 1).then((data) => {
          console.log("XXXXXXXXXXXXXXXXXXX",data)
          console.log("JJJJJJJJJJJJ", data.data)
            this.setState({
                commentsData: data.data,
                commentsCount: data.total,
                currentPage: data.current_page,
                lastPage: data.last_page,
                isLoading: false,
                // baseUrl: baseUrl,
                postId: postId,
                // commentsLiked: commentsLiked,
                session: session
            })
        }).catch((e) => {
            console.warn(e.message)
        })
    }


    render(){
const { goBack } = this.props.navigation;
const {commentsData, commentsCount, isLoading, isCommentLiked, createdAt, user, title, likes, id, post, baseUrl, isLiked, commentsLiked, session} = this.state
if (isLoading) {
  return (
    <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#07411D" />
    </View>
  )
}    
let likeImg = (isLiked) ? <FontAwesome5 name="heart" size={17} color="red" /> : <FontAwesome5 name="heart" size={17} color="#52575d" />
// isCommentLiked
let likeComment = (isCommentLiked) ? <FontAwesome5 name="thumbs-up" size={14} color="red" /> : <FontAwesome5 name="thumbs-up" size={14} color="#52575d" />
let isCommentData = commentsData == null?false:true
let sessionPresent = session !=null?true:false
return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <TouchableOpacity onPress={() => goBack()}>
                      <FontAwesome5 name="angle-left" size={24} color="#52575d"/>
                    </TouchableOpacity>
                    {/* <FontAwesome5 name="ellipsis-v" size={24} color="#52575d" /> */}
                </View>
               
               
                <View style={styles.infoContainer}>
                    <Text style={[styles.text, {margin:25, marginBottom:10,fontWeight:"200", textTransform:'uppercase', fontSize:26, textAlign:'center' }]}>{title}</Text>
                    <TimeAgo time={createdAt} user={user} />
                    <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.handleLike()}>
                      {likeImg}
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 3, marginRight:10 }}>{likes}</Text>
                    <Text> <FontAwesome5 name="rocketchat" size={17} color="#52575d"/> {commentsCount}</Text>
                  </View>
                </View>
              <View style={{marginLeft:15}}>
                <HTML
                  decodeEntities
                  html={post}
                  imagesMaxWidth={Dimensions.get('window').width}
                  onLinkPress={(event, href) => { Linking.openURL(href) }}
                />
              </View>
              
            <Text style={[styles.subText, styles.recent]}>User Comments</Text>
           

            <View style={{alignItems:'center'}}>
            {sessionPresent &&
            <View style={{flex:1, flexDirection: 'row',}}>
              <TextInput 
                placeholder="Enter your Comment here" 
                style={{borderWidth:1, width:'60%'}}
                onChangeText={(text) => this.setState({ myComment: text })}
              />
              <TouchableOpacity style={{backgroundColor:"green", width:'20%'}} onPress={()=>this.commentOnPost()}>
              <FontAwesome5 style={{margin:20}} name="angle-double-right" size={27} color="white"/>
              </TouchableOpacity>
            </View>
            }
            {!sessionPresent &&
            <View>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('LoginScreen')}><Text>Not Logged In? Login to Comment</Text></TouchableOpacity>
            </View>
            }
            {isCommentData &&
            <View>
              {commentsData.map((comment, index) => {
                  let imgPath = (comment.user.profile.avatar.length < 1) ? iconUrl : `${this.state.baseUrl}${comment.user.profile.avatar}`
                return  (
                  <View style={{flex:1, flexDirection: 'row',
                  backgroundColor:this.props.index % 2 == 0 ? '#EBEDEC': 'white'}}>
                      <Image source={{uri: imgPath}}
                      style={{width:60, height:60, margin:5, resizeMode:'stretch'}}
                      >
                      </Image>
                      <View style={{flexDirection:'column', width:'70%',marginLeft:20, marginTop:10}}>
                      <Text style={[styles.flatListItem]}>{comment.comment}</Text>
                      <TouchableOpacity onPress={() => this.handleLike(comment.id,)} >
                      {likeComment}
                    </TouchableOpacity>
                      </View>
                  </View>
                 )})}
              </View>
              }
              
             
                
               
               

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
    flatListItem: {
      color: '#434e61',
      fontFamily:'Montserrat-Regular',
      fontSize: 13
  },
    subText: {
        fontSize: 14,
        color: '#434e61',
        textTransform: 'uppercase',
        fontWeight: '700'
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
        flex:1,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 6
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