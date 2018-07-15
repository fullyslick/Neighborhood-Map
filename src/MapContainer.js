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

  // Change color of marker on mouse over event
  onMouseoverMarker = (props, marker, e) => {
    let markerImage = {
      url: "./icons/pin-orange.png",
      anchor: new this.props.google.maps.Point(32, 32),
      scaledSize: new this.props.google.maps.Size(32, 32)
    }

    marker.setIcon(markerImage);
  }

  // Change color of marker on mouse out event
  onMouseoutMarker = (props, marker, e) => {
    let markerImage = {
      url: "./icons/pin-blue.png",
      anchor: new this.props.google.maps.Point(32, 32),
      scaledSize: new this.props.google.maps.Size(32, 32)
    }

    marker.setIcon(markerImage);
  }

  // When the map loads, make sure it fit the bounds of the markers
  fitBounds = (mapProps, map) => {

    // Make the google object easy to access
    const {google} = mapProps;

    // Aggragates the position of markers to
    // adjust the center and zoom of the map.
    var bounds = new google.maps.LatLngBounds();

    // Loop over all markers positions and add them to bounds
    for (var i = 0; i < this.state.places.length; i++) {
      bounds.extend(this.state.places[i].position);
    }

    // Make the markers to be within the bounds of the map
    map.fitBounds(bounds);
  }

  render(){
    // Set the map styles to const for easy access
    const style = jsonMapStyles.styles;

    return(
      <main>
        <PlaceList />
        <div className="map-holder">
         <Map
          style={{width: '100%', height: '100%', position: 'relative'}}
          google={this.props.google}
          onReady={this.fitBounds}
          initialCenter={{
            lat: 43.201,
            lng: 27.922
            }}
          styles= {style}
          gestureHandling={"none"}
         >
           {/* Map over all places to display their markers */}
           {this.state.places.map( (place) => (
             <Marker
               onMouseover={this.onMouseoverMarker}
               onMouseout={this.onMouseoutMarker}
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
