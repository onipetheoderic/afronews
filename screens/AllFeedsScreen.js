import React,{Component} from 'react';
import { ActivityIndicator, TouchableOpacity, RefreshControl, FlatList, Image, View, StyleSheet, Text, StatusBar, Platform} from 'react-native';
import Screen from './Screen';
import HorizontalFlatList from './HorizontalFlatList';
import {AllFeedsData} from './AllFeedsData';
import { getFeeds } from '../Helpers/ApiService'
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
            lastPage: null
        };
      }
     
    fetchFeeds() {
        let store = async () => await AsyncStorage.getItem(countryKey)
        store().then((val) => {
          if (val) {
            let _data = JSON.parse(val)
             
            getFeeds(_data.baseUrl, 1).then((data) => {
              let news = data.data
              console.log(news)
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
        if (this.state.isLoading) {
            return (
              <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#07411D" />
              </View>
            )
          }
        
        return (
            <View>
                <HorizontalFlatList />
                <FlatList
          data={this.state.newsList}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({item, index}) => {
              return (
                <FlatListItem item={item} index={index} 
                navigation={this.props.navigation}/>
            )}}
            refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={() => {
                    this.setState({ isRefreshing: true })
                    this.fetchFeeds()
                    this.setState({ isRefreshing: false })
                  }}
                />
              }
              onEndReached={() => { this.handleInfiniteScroll() }}
            onEndReachedThreshold={0.01}
            scrollEnabled={!this.state.isLoading}
        />
            </View>
        )
    }
}
class FlatListItem extends Component {
    //http://penplusbytes.org/wp-content/uploads/2017/12/news.jpg
    render(){
        const { topic, images, id, comments_count } = this.props.item
        let imgPath = (images.length < 1) ? iconUrl : `${baseUrl}${images[0].path}`
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('SingleScreen', {
                id: id,
                title: topic,
              })}>
            <View style={{flex:1, flexDirection: 'row',
            backgroundColor:this.props.index % 2 == 0 ? '#EBEDEC': 'white'}}>
                <Image source={{uri: imgPath}}
                style={{width:120, height:100, margin:5, resizeMode:'stretch'}}
                >
                </Image>
                <View style={{flexDirection:'column', width:'65%'}}>
                <Text style={[styles.flatListItem, styles.topItem]}>{topic}</Text>
                <Text style={styles.flatListItem}>{this.props.item.icon}</Text>
                </View>
            </View>
            </TouchableOpacity>
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