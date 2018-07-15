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
    places: jsonPlaces.places,

    // Holds the chosen category,
    // used to filter out the markers and PlaceList by category
    categoryChosen: "all", // default is "all"

    // Holds the id of the selected marker/place,
    // used to display only selected places on PlaceList and Map
    selectedPlaceId: ""
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

  // Changes the state.selectedPlaceId
  // Make only selected marker visible on the map,
  // invokes displaying of foursquare details
  onMarkerClick = (props, marker, e) => {
    this.setState({selectedPlaceId: props.id });
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

    // Holds the places to be shown depending:
    // - chosen category
    let displayedPlaces;

    // Display only the chosen marker/place if selectedPlaceId has value
    if (this.state.selectedPlaceId) {
      displayedPlaces = this.state.places.filter((place) => place.foursqId === this.state.selectedPlaceId );
    }
     // Else there is no chosen marker, so display markers by category
     else {
      // If categoryChosen = all, add to displayedPlaces all places
      // Else - add to displayedPlaces those places which mach categoryChosen
      if (this.state.categoryChosen === "all") {
        displayedPlaces = this.state.places.map( (place) => place );
      } else {
        displayedPlaces = this.state.places.filter((place) => place.category === this.state.categoryChosen );
      }
    }

    return(
      <main>
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
         >
           {/* Map over displayedPlaces to display their markers */}
           {displayedPlaces.map( (place) => (
             <Marker
               onMouseover={this.onMouseoverMarker}
               onMouseout={this.onMouseoutMarker}
               onClick={this.onMarkerClick}
               key={place.foursqId}
               id={place.foursqId}
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
        <PlaceList />
      </main>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA8Zg1KCtmv_PZCsR_BhgIYmV4sep78eyw"
})(MapContainer)
