import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {MeasureScreen, TreatmentScreen} from './screens';
import AllFeedsScreen from './screens/AllFeedsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddButton from './components/AddButton';

const TabNavigator = createBottomTabNavigator(
 
  {
    AllFeeds: {
      screen: AllFeedsScreen,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name={'th-list'} size={24} color="#07411D" />,
       
      }
    },
    Measures: {
      screen: MeasureScreen,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name={'heartbeat'} size={24} color="#07411D"  />,
        
      }
    },
    Add: {
      screen: () => null,
      navigationOptions: {
        tabBarIcon: <AddButton />
      }
    },
    Treatment: {
      screen: TreatmentScreen,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name={'band-aid'} size={24} color="#07411D" />,
       
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name={'user'} size={24} color="#07411D"  />,
        
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
)

export default createAppContainer(TabNavigator);