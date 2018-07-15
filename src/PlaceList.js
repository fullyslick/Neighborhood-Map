import React, {Component} from 'react'
import Filter from './Filter'
import Place from './Place'
import PlaceDetails from './PlaceDetails'

class PlaceList extends Component {
  render() {

    return (
         <div className="place-list">
           {/* Render place's details if there is place selected */}
           { this.props.selectedPlace ?
             // Pass placeId to prompt foursq API, and hardcoded title of place
             <PlaceDetails
               placeId={this.props.selectedPlace}
               title={this.props.places[0].name}
               closeDetails={this.props.closeDetails}
               /> :
             // Render places list if there is no place selected
             <div>
               <p>Place List</p>
               <Filter/> {this.props.places.map((place) => (
                 <Place
                   key={place.foursqId}
                   id={place.foursqId}
                   title={place.name}
                   showDetails={this.props.showDetails}
                 />
               ))}
             </div>
           }
         </div>
   )
  }
}

export default PlaceList;
