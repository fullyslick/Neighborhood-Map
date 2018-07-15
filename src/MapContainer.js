import React, {Component} from 'react'
// import GoogleApiWrapper Higher-Order component
// which will configure the request to Google Maps API
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react'
import PlaceList from './PlaceList'
// import the places data
import jsonPlaces from './data/places.json'
// import the map styles data
import jsonMapStyles from './data/mapStyles.json'

export class MapContainer extends Component {

  state = {
    // Holds all the places that will be rendered
    // Load them from a local .json file
    places: jsonPlaces.places
  }

  render(){
    // Set the map styles to const for easy access
    const style = jsonMapStyles.styles;

    return(
      <main>
        <PlaceList />
        <div className="map-holder">
         <Map
          google={this.props.google}
          initialCenter={{
            lat: 43.204257,
            lng: 27.922284
            }}
          zoom={16}
          styles= {style}
          gestureHandling={"none"}
         >
           {/* Map over all places to display their markers */}
           {this.state.places.map( (place) => (
             <Marker
               key={place.foursqId}
               title={place.name}
               name={place.name}
               position={place.position}
               icon={{
                     url: "./icons/pin-blue.png",
                     anchor: new this.props.google.maps.Point(32,32),
                     scaledSize: new this.props.google.maps.Size(32,32)
                   }}
               animation={this.props.google.maps.Animation.DROP} />
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
