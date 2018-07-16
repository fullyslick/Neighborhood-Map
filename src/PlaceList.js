import React, {Component} from 'react'
import Filter from './Filter'
import Place from './Place'
import PlaceDetails from './PlaceDetails'
// Check if properties passed are of required type
import PropTypes from 'prop-types'

class PlaceList extends Component {
  // Here you define what the props passed to the component type should be,
  // and wheter the property is required in order to work with the PlaceList component.
  // If these props are not passed a message will be logged in console.
  // Now you know that the app brakes because of incorrect props passed to the component.
  static propTypes = {
    places: PropTypes.array.isRequired,
    selectedPlace: PropTypes.string.isRequired,
    showDetails: PropTypes.func.isRequired,
    closeDetails: PropTypes.func.isRequired,
    setCategory: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired
  }

  render() {

    return (
         <sidebar className="place-list">
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
               <Filter
                 setCategory={this.props.setCategory}
                 category={this.props.category}
                />
               {this.props.places.map((place) => (
                 <Place
                   key={place.foursqId}
                   id={place.foursqId}
                   title={place.name}
                   showDetails={this.props.showDetails}
                 />
               ))}
             </div>
           }
         </sidebar>
   )
  }
}

export default PlaceList;
