import React,{Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Animated} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const icon = <FontAwesome5 name={'plus'} size={24} color="#fff"/>;
export default class AddButton extends Component {
    

    buttonSize = new Animated.Value(1)
    mode = new Animated.Value(0 )

    handlePress = () => {
        Animated.sequence([
            Animated.timing(this.buttonSize,{
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(this.buttonSize,{
                toValue: 1,
                useNativeDriver: true
               
            }),
            Animated.timing(this.mode,{
                toValue: this.mode._value === 0 ? 1:0,
               
                         
            })
        ]).start();
    }
    render() {
        const sizeStyle = {
            transform:[{scale: this.buttonSize}]
        }
        const rotation = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "45deg"]
        })
        const thermometerX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, -100]
        })
        const thermometerY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -100]
        })
        const timeX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, -24]
        })
        const timeY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -150]
        })
        const pulseX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, 50]
        })
        const pulseY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -100]
        })
        return (
            <View style={{position:"absolute", alignItems:"center"}}>
                <Animated.View style={{positon:"absolute", left:thermometerX, top:thermometerY}}>
                    <View style={styles.secondaryButton}>
                    <FontAwesome5 name="thermometer" size={24} color="#fff" />
                    </View>
                </Animated.View>
                <Animated.View style={{positon:"absolute", left:timeX, top:timeY}}>
                    <View style={styles.secondaryButton}>
                    <FontAwesome5 name="clock" size={24} color="#fff" />
                    </View>
                </Animated.View>
                <Animated.View style={{positon:"absolute", left:pulseX, top:pulseY}}>
                    <View style={styles.secondaryButton}>
                    <FontAwesome5 name="user" size={24} color="#fff" />
                    </View>
                </Animated.View>
                <Animated.View style={[styles.button, sizeStyle]}>
                    <TouchableHighlight onPress={this.handlePress} underlayColor="#07411D">
                        <Animated.View style={{transform: [{rotate: rotation}]}}>
                        <FontAwesome5 name="plus" size={24} color="#fff" />
                        </Animated.View>
                    </TouchableHighlight>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#07411D",
        alignItems: "center",
        justifyContent: "center",
        width: 72,
        height: 72,
        borderRadius: 36,
        position:'absolute',
        top: -60,
        shadowColor: "#07411D",
        shadowRadius: 5,
        shadowOffset: {height:10},
        shadowOpacity: 0.3,
        borderWidth: 3,
        borderColor: "#fff",

    },
    secondaryButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#07411D"
    }
})