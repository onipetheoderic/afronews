import React,{Component} from 'react';
import {FlatList, View, Text, StatusBar, Platform} from 'react-native';
import Screen from './Screen';
import HorizontalFlatList from './HorizontalFlatList';

export default class AllFeedsScreen extends Component {
    render() {
        return (
            <View>
                <HorizontalFlatList />
            </View>
        )
    }
}

// export const AllFeedsScreen = () => ( 
//     <View>
//         <Text style={{fontSize:20, color:"black"}}>I am What I am</Text>
//     </View>
// );