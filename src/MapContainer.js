import React, {Component} from 'react'
// import GoogleApiWrapper Higher-Order component
// which will configure the request to Google Maps API
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react'
import PlaceList from './PlaceList'
// import the places data from local .json file
import jsonPlaces from './data/places.json'
// import the map's styles data from local .json file
import jsonMapStyles from './data/mapStyles.json'
// importing pins icons to use on maps
import bluePin from './icons/pin-blue.png'
import orangePin from './icons/pin-orange.png'

export class MapContainer extends Component {

  state = {
    // Holds all the places that will be rendered,
    // loaded from local .json file
    places: jsonPlaces.places,

    // Holds the chosen category,
    // used to filter out the markers and places by category
    categoryChosen: "all", // default is "all"

    // Holds the id of the selected marker/place,
    // used to display only selected places on PlaceList and on map
    selectedPlaceId: "",

    // Changes to true if there is some error with google maps component
    hasError: false
  }

  // If component is unable to mounth there is some problem with google maps component
  componentDidCatch(error, info) {
      this.setState({ hasError: true });
      console.log(error);
  }

  // Changes the color of marker on mouse over event
  onMouseoverMarker = (props, marker, e) => {
    let markerImage = {
      url: orangePin,
      anchor: new this.props.google.maps.Point(32, 32),
      scaledSize: new this.props.google.maps.Size(32, 32)
    }

    marker.setIcon(markerImage);
  }

  // Changes the color of marker on mouse out event
  onMouseoutMarker = (props, marker, e) => {
    let markerImage = {
      url: bluePin,
      anchor: new this.props.google.maps.Point(32, 32),
      scaledSize: new this.props.google.maps.Size(32, 32)
    }

    marker.setIcon(markerImage);
  }

  // Calls showDetails() method on click of a marker
  onMarkerClick = (props, marker, e) => {
    this.showDetails(props.id);
  }

  // Changes the selected place,
  // displays the details of the place,
  // leaves only one marker on map
  showDetails = (placeId) => {
    this.setState({selectedPlaceId: placeId });
  }

  // Sets selectedPlaceId to empty string,
  // and cause displaying of all or categorized markers,
  // and cause removal of details view
  closeDetails = () => {
      this.setState({selectedPlaceId: "" });
  }

  // Sets the category in the state,
  // cause re-render and displaying only of
  // places with this categoryChosen
  setCategory = (category) => {
    this.setState({categoryChosen: category});
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

    // Holds the places to be shown depending on chosen category or selected marker/place id
    let displayedPlaces;

    // Holds the marker icon image, depending if it is selected or not,
    // by default its blue icon
    let markerColor = bluePin;

    // Display only the chosen marker/place if selectedPlaceId has value
    if (this.state.selectedPlaceId) {
      displayedPlaces = this.state.places.filter((place) => place.foursqId === this.state.selectedPlaceId );
      // Change marker icon to be ornage (selected)
      markerColor = orangePin;
    }
     // Else there is no chosen marker, so display markers by category
     else {
      // If categoryChosen = all, store all places in displayedPlaces,
      // else store those places which mach categoryChosen in displayedPlaces
      if (this.state.categoryChosen === "all") {
        displayedPlaces = this.state.places.map( (place) => place );
      } else {
        displayedPlaces = this.state.places.filter((place) => place.category === this.state.categoryChosen );
      }
    }

    // If there is error with the google maps component display a message
    if (this.state.hasError) {
      return(
        <div className="google-maps-error">There is some problem with google maps!</div>
      )
    }
    return(
      <main>
        <div
          className="map-holder"
          aria-label="Area Map"
          role="application"
          aria-hidden="true">
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
               // Allow hover effects only if there is no selected place/ marker clicked
               onMouseover={!this.state.selectedPlaceId && this.onMouseoverMarker}
               onMouseout={!this.state.selectedPlaceId && this.onMouseoutMarker}
               // Allow clicking on marker only is there is no selected place / marker clicked
               onClick={!this.state.selectedPlaceId && this.onMarkerClick}
               key={place.foursqId}
               id={place.foursqId}
               title={place.name}
               name={place.name}
               position={place.position}
               icon={{
                     url: markerColor,
                     anchor: new this.props.google.maps.Point(32,32),
                     scaledSize: new this.props.google.maps.Size(32,32)
                   }}
               // Show animation only is there is a selected place / marker clicked
               animation={this.state.selectedPlaceId && this.props.google.maps.Animation.DROP} />
           ))}
         </Map>
        </div>
        <PlaceList
          places={displayedPlaces}
          selectedPlace={this.state.selectedPlaceId}
          showDetails={this.showDetails}
          closeDetails={this.closeDetails}
          setCategory={this.setCategory}
          category={this.state.categoryChosen}
          />
      </main>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA8Zg1KCtmv_PZCsR_BhgIYmV4sep78eyw"
})(MapContainer)
