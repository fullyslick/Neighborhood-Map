import React, {Component} from 'react'
// import GoogleApiWrapper Higher-Order component
// which will configure the request to Google Maps API
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react'
import PlaceList from './PlaceList'

export class MapContainer extends React.Component {

  state = {
    // Holds all the places that will be rendered
    places: [
      {
        name: "A1",
        position: {lat: 43.2050135, lng: 27.9197479}
      },
      {
        name: "A2",
        position: {lat: 43.2035932, lng: 27.9172729}
      }
    ]
  }

  render(){
    return(
      <main>
        <PlaceList />
        <div className="map-holder">
         <Map
          google={this.props.google}
          initialCenter={{
            lat: 43.2009149,
            lng: 27.9165577
            }}
          zoom={15}
         >
           {/* Map over all places to display their markers */}
           {this.state.places.map( (place) => (
             <Marker
               title={place.name}
               name={place.name}
               position={place.position} />
           ))}
         </Map>
        </div>
      </main>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA8Zg1KCtmv_PZCsR_BhgIYmV4sep78eyw"
})(MapContainer)
