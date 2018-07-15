import React, { Component } from 'react'

class Place extends Component{
  render(){
    return(
      <div className="Place">{this.props.title}</div>
    )
  }
}

export default Place;
