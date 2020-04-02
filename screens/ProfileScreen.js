import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView, Image, Text, View, StatusBar} from 'react-native';
import Screen from './Screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ProfileScreen(){
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <FontAwesome5 name="angle-left" size={24} color="#52575d" />
                    <FontAwesome5 name="ellipsis-v" size={24} color="#52575d" />
                </View>
                <View style={{alignSelf:"center"}}>
                    <View style={styles.profileImage}>
                        <Image source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"}} style={styles.image} resizeMode="center"></Image>
                    </View>

                    {/* <View style={styles.dm}>
                     <FontAwesome5 name="stack-exchange" size={24} color="#52575d" />
                    </View> */}

                    <View style={styles.active}></View>

                    <View style={styles.add}>
                        <FontAwesome5 name="plus" size={24} color="#dfd8c8" style={{marginTop:6, marginLeft:2}} />
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.text, {fontWeight:"200", fontSize:36, }]}>Julie</Text>
                    <Text style={[styles.text, {color:"#AEB5BC", fontSize:14, }]}>Photography</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, {fontSize:24}]}>420</Text>
                        <Text style={[styles.text, styles.subText]}>Posts</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor:'#DFD8C8', borderLeftWidth: 1, borderRightWidth:1}]}>
                        <Text style={[styles.text, {fontSize:24}]}>420</Text>
                        <Text style={[styles.text, styles.subText]}>Posts</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, {fontSize:24}]}>420</Text>
                        <Text style={[styles.text, styles.subText]}>Posts</Text>
                    </View>
                </View>
                <View style={{marginTop:32}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.mediaImageContainer}>
                            <Image source={{uri: "https://i.pinimg.com/236x/78/9e/51/789e510b82cd4d2ddb56bc3d2510fc83.jpg"}} style={styles.image} resizeMode="cover"></Image>
                        
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={{uri: "https://i.pinimg.com/236x/80/5e/cb/805ecb3e5fe79db5812574c44a929ce0.jpg"}} style={styles.image} resizeMode="cover"></Image>
                        
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={{uri: "https://i.pinimg.com/236x/58/dd/99/58dd99e84d2f3f2d19911a27ed05fed9--reading-fc-poster-design.jpg"}} style={styles.image} resizeMode="cover"></Image>    
                        </View>
                    </ScrollView>
                    <View style={styles.mediaCount}>
                        <Text style={[styles.text, {fontSize:20,color:"#DFD8C8",fontWeight:"300"}]}>70</Text>
                        <Text style={[styles.text, {fontSize:20,color:"#DFD8C8",textTransform:"uppercase"}]}>Media</Text>
                    </View>
                    <View style={styles.mediaCount2}>
                        <Text style={[styles.text, {fontSize:20,color:"#DFD8C8",fontWeight:"300"}]}>70</Text>
                        <Text style={[styles.text, {fontSize:20,color:"#DFD8C8",textTransform:"uppercase"}]}>Media</Text>
                    </View>
                    <View style={styles.mediaCount3}>
                        <Text style={[styles.text, {fontSize:20,color:"#DFD8C8",fontWeight:"300"}]}>70</Text>
                        <Text style={[styles.text, {fontSize:20,color:"#DFD8C8",textTransform:"uppercase"}]}>Media</Text>
                    </View>
                </View>
            <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
            <View style={{alignItems:'center'}}>
                <View style={styles.recentItem}>
                    <View style={styles.recentItemIndicator}></View>
                    <View style={{width:250}}>
                        <Text style={[styles.text, {color:"#41444b", fontWeight:"300"}]}>
                            Started Following 
                        <Text style={{fontWeight:'400'}}>Theoderic Onipe and 
                        <Text style={{fontWeight:'400'}}>DesignIntoCode</Text></Text></Text>
                    </View>
                </View>
                <View style={styles.recentItem}>
                    <View style={styles.recentItemIndicator}></View>
                    <View style={{width:250}}>
                        <Text style={[styles.text, {color:"#41444b", fontWeight:"300"}]}>
                            Started Following 
                        <Text style={{fontWeight:'400'}}>Theoderic Onipe and 
                        <Text style={{fontWeight:'400'}}>DesignIntoCode</Text></Text></Text>
                    </View>
                </View>
                <View style={styles.recentItem}>
                    <View style={styles.recentItemIndicator}></View>
                    <View style={{width:250}}>
                        <Text style={[styles.text, {color:"#41444b", fontWeight:"300"}]}>
                            Started Following 
                        <Text style={{fontWeight:'400'}}>Theoderic Onipe and 
                        <Text style={{fontWeight:'400'}}>DesignIntoCode</Text></Text></Text>
                    </View>
                </View>

            </View>
            </ScrollView>
        </SafeAreaView>
    )
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