import React, {Component} from 'react'
// import GoogleApiWrapper Higher-Order component
// which will configure the request to Google Maps API
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react'
import PlaceList from './PlaceList'

export class MapContainer extends React.Component {
  render(){
    return(
      <main>
        <PlaceList />
        <div className="map-holder">
         <Map
          google={this.props.google}
          initialCenter={{
            lat: 40.854885,
            lng: -88.081807
            }}
          zoom={15}
         />
        </div>
      </main>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA8Zg1KCtmv_PZCsR_BhgIYmV4sep78eyw"
})(MapContainer)
