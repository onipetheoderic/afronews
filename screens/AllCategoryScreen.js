import React,{Component} from 'react';
import {SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl, FlatList, Image, View, StyleSheet, Text, StatusBar, Platform} from 'react-native';
import Screen from './Screen';
import HorizontalFlatList from './HorizontalFlatList';
import {AllFeedsData} from './AllFeedsData';
import { getFeeds, getCategories } from '../Helpers/ApiService'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import { baseUrl, iconUrl, countryKey } from '../Helpers/Constant'
// import {baseUrl} from '../Helpers/axiosService';


export default class AllFeedsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            baseUrl: baseUrl,
            isRefreshing: false,
            session: null,      
            newsList: [],
            currentPage: null,
            lastPage: null,
            allCategory:[]
        };
      }
     
    fetchFeeds() {
        let store = async () => await AsyncStorage.getItem(countryKey)
        store().then((val) => {
          if (val) {
            let _data = JSON.parse(val)
             console.log("val", val)
            getFeeds(_data.baseUrl, 1).then((data) => {
              console.log("this are all the datas",data)
              let news = data.data
              console.log(news)
              this.fetchCategory(_data.baseUrl)
              this.setState({
                baseUrl: _data.baseUrl,
                newsList: news,
                currentPage: data.current_page,
                lastPage: data.last_page,
                isLoading: false
              })
            }).catch((e) => {
              console.warn(e.message)
            })
    
          }
        }).catch((err) => {
          console.warn(err.message)
        })
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
        this.fetchFeeds()
      }
    
    handleInfiniteScroll = () => {
        if (this.state.currentPage < this.state.lastPage) {
          this.setState({
            isRefreshing: true,
            currentPage: this.state.currentPage + 1,
          }, () => {
            getFeeds(this.state.baseUrl, this.state.currentPage).then((data) => {
              let news = data.data
              this.setState({
                newsList: [...this.state.newsList, ...news],
                // currentPage: data.current_page,
                isRefreshing: false
              })
              console.log(this.state.currentPage)
            }).catch((e) => {
              this.setState({
                isRefreshing: false
              })
              console.warn(e.message)
            })
          })
        }
    }
    viewSinglePost = (id, title) => {
        this.props.navigation.navigate('SinglePost', {
          id: id,
          title: title,
        })
      }

    render() {
    
      let navigation = this.props.navigation
      console.log("this si Navi", navigation)
        if (this.state.isLoading) {
            return (
              <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#07411D" />
              </View>
            )
          }
        
        return (
            <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
            {this.state.allCategory.map((category, index) => {
                let imgPath = `${this.state.baseUrl}${category.avatar}`
                return(
                    <View style={{flex:1, flexDirection: 'row', backgroundColor:'white', marginTop:20}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CategoryScreen', {
                id: category.id,
                title: category.name,
              })} style={{height:100, width: '100%', flexDirection: 'row'}}>
                    <View style={{flexDirection:'column', flex:1, marginTop:20, marginLeft:10}}>
                    <Text style={{fontFamily:'Candara', fontSize:25}}>{category.name}</Text>
                    <Text style={[styles.flatListItem, {fontFamily:'Candara'}]}>Select Nigeria News</Text>
                    </View>
                    <Image source={{uri: imgPath}}
                    style={{width:100, height:90, marginRight:10, resizeMode:'stretch'}}
                    >
                    </Image>
                    </TouchableOpacity>
                
                    
                </View>
                )
            })}
                   
                
                
              </ScrollView>
            </SafeAreaView>
        )
    }
}
//http://penplusbytes.org/wp-content/uploads/2017/12/news.jpg
const styles = StyleSheet.create({
    flatListItem: {
        color: '#434e61',
        padding: 10,
        fontFamily:'Montserrat-Regular',
        fontSize: 13
    },
    topItem: {
        marginTop:10,
        fontFamily:'Montserrat-Regular'
    }
})


  
// export const AllFeedsScreen = () => ( 
//     <View>
//         <Text style={{fontSize:20, color:"black"}}>I am What I am</Text>
//     </View>
// );