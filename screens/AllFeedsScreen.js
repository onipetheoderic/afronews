import React,{Component} from 'react';
import {FlatList, Image, View, StyleSheet, Text, StatusBar, Platform} from 'react-native';
import Screen from './Screen';
import HorizontalFlatList from './HorizontalFlatList';
import {AllFeedsData} from './AllFeedsData';

class FlatListItem extends Component {
    render(){
        return (
            <View style={{flex:1, flexDirection: 'row',
            backgroundColor:this.props.index % 2 == 0 ? '#EBEDEC': 'white'}}>
                <Image source={{uri: "http://penplusbytes.org/wp-content/uploads/2017/12/news.jpg"}}
                style={{width:120, height:100, margin:5, resizeMode:'stretch'}}
                >
                </Image>
                <View style={{flexDirection:'column'}}>
                <Text style={[styles.flatListItem, styles.topItem]}>{this.props.item.name}</Text>
                <Text style={styles.flatListItem}>{this.props.item.icon}</Text>
                </View>
            </View>
        )
    }
}
//http://penplusbytes.org/wp-content/uploads/2017/12/news.jpg
const styles = StyleSheet.create({
    flatListItem: {
        color: '#434e61',
        padding: 10,
        fontSize: 16
    },
    topItem: {
        marginTop:10
    }
})


export default class AllFeedsScreen extends Component {
    render() {
        return (
            <View>
                <HorizontalFlatList />
                <FlatList
          data={AllFeedsData}
          renderItem={({item, index}) => {
              return (
                <FlatListItem item={item} index={index} />
                  
                
                      
                         )
          }
          
        }
        />
            </View>
        )
    }
}

  
// export const AllFeedsScreen = () => ( 
//     <View>
//         <Text style={{fontSize:20, color:"black"}}>I am What I am</Text>
//     </View>
// );