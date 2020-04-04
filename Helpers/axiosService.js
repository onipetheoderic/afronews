import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'

export const baseUrl = async () => {
  try {
    const value = await AsyncStorage.getItem('@CountryObj')
    console.log("XXXXXXX",value)
    if(value !== null) {
      // value previously stored
      let parsedValue = JSON.parse(value)
      console.log("this is the val", parsedValue.baseUrl)
      return parsedValue
    }
  } catch(e) {
      console.log(e.message)
    // error reading value
  }
}


