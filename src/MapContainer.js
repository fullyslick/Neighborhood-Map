import React, {Component} from 'react'
// import GoogleApiWrapper Higher-Order component
// which will configure the request to Google Maps API
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react'

export class MapContainer extends React.Component {
  render(){
    return(
      <div>
        <Map
         google={this.props.google}
         initialCenter={{
           lat: 40.854885,
           lng: -88.081807
         }}
         zoom={15}
       />
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA8Zg1KCtmv_PZCsR_BhgIYmV4sep78eyw"
})(MapContainer)
