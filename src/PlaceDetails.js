import React, { Component } from 'react'

class PlaceDetails extends Component{
  render(){
    return(
      <div className="PlaceDetails">{this.props.placeId} title:{this.props.title}</div>
    )
  }
}

export default PlaceDetails;
