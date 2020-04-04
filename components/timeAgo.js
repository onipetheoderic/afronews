import React, { Component } from 'react';
import { View, Text } from 'react-native';

import moment from 'moment';

class TimeAgo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
// constructor variables
    this.date = props.time
    this.user = props.user
  }

  render() {
    const time = moment( this.date || moment.now() ).fromNow()
    return (
      <Text style={{color:"#AEB5BC",fontFamily: "Candara",  fontSize:14, fontFamily:'Montserrat-Regular' }}>{time} by {this.user}</Text>

    );
  }
}

export default TimeAgo;
