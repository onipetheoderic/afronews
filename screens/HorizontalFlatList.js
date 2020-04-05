import React,{Component} from 'react';
import {FlatList, View, Text, StatusBar, Platform} from 'react-native';
import Screen from './Screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AllFeedsData} from './AllFeedsData';


HorizontalFlatListItem = (props) => {

    console.log("hhhhh",props.item.icon_name)
    let iconName = props.item.icon_name === undefined? "user" :props.item.icon_name
    return(

    
    <View style={{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        width: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor:'grey',
        margin: 10,
    }}>
        <View style={{marginTop:20, marginBottom:5}}>
         <FontAwesome5 name={iconName} size={34} color="#07411D" />
         </View>
        <Text style={{fontSize:11, color:'#07411D', margin:5, fontWeight:'bold', textAlign:'center'}}>
        {props.item.name}
        </Text>

    </View>
)
}

export default HorizontalFlatListScreen = (props) => ( 
    
            <View styles={{
                flex:1, 
                flexDirection:'column', 
                marginTop:Platform.OS === 'ios'? 34:0
            }}>
                <View style={{height:120, marginTop:20}}>
                    <FlatList 
                    
                    horizontal={true}//means it can be scrolled horizontally
                    data={props.allCategories}
                    renderItem = {({ item, index }) => {
                        return (
                            <HorizontalFlatListItem item={item} index={index} parentFlatList={props.allCategories}>

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