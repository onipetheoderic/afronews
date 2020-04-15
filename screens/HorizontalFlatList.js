import React,{Component} from 'react';
import {FlatList, View, Text, TouchableOpacity, StatusBar, Platform} from 'react-native';
import Screen from './Screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AllFeedsData} from './AllFeedsData';


HorizontalFlatListItem = (props) => {
    console.log("navigation", props.navigation)
    console.log("hhhhh",props.item)
    
    let iconName = props.item.icon_name === undefined? "user" :props.item.icon_name
    return(

    
    <TouchableOpacity 
        onPress={() => props.navigation.navigate('CategoryScreen', {
            id: props.item.id,
            title: props.item.name,
        })}
      
        style={{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        width: 80,
        borderRadius: 80,
        borderWidth: 1,
        borderColor:'grey',
        margin: 4,
    }}>
        <View style={{marginTop:15, marginBottom:5}}>
         <FontAwesome5 name={iconName} size={30} color="#07411D" />
         </View>
        <Text style={{fontSize:8, color:'#07411D', margin:5, fontWeight:'bold', textAlign:'center'}}>
        {props.item.name}
        </Text>

    </TouchableOpacity>
)
}

export default HorizontalFlatListScreen = (props) => ( 
    
            <View styles={{
                flex:1, 
                flexDirection:'column', 
                marginTop:Platform.OS === 'ios'? 34:0
            }}>
                <View style={{height:90, marginTop:10}}>
                    <FlatList 
                    
                    horizontal={true}//means it can be scrolled horizontally
                    data={props.allCategories}
                    renderItem = {({ item, index }) => {
                        return (
                            <HorizontalFlatListItem item={item} index={index} parentFlatList={props.allCategories} navigation={props.navigation}>

                            </HorizontalFlatListItem>
                        )
                    }}
                    >
                    

                    </FlatList>
                </View>

            </View>
)

// export const AllFeedsScreen = () => ( 
//     <View>
//         <Text style={{fontSize:20, color:"black"}}>I am What I am</Text>
//     </View>
// );