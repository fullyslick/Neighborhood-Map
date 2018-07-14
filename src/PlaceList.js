import React, { Component } from 'react'
import Filter from './Filter'
import Place from './Place'
import PlaceDetails from './PlaceDetails'

class PlaceList extends Component{
  render(){
    return(
      <div className="place-list">
        <p>Place List</p>
        <Filter />
        <Place />
        <PlaceDetails />
      </div>
    )
  }
}

export default PlaceList;