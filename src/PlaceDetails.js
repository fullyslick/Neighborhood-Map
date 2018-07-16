import React, {Component} from 'react'
// Check if properties passed are of required type
import PropTypes from 'prop-types'

class PlaceDetails extends Component {
  static propTypes = {
    placeId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    closeDetails: PropTypes.func.isRequired
  }

  // Closes the details view,
  // By calling closeDetails on master MapContainer
  closeDetails = () => {
    this.props.closeDetails();
  }

  render() {
    return (
       <div className="PlaceDetails">
         <button className="close-details" type="button" onClick={this.closeDetails}>X</button>
         <h2>{this.props.title}</h2>
         <p>{this.props.placeId}</p>
       </div>
   )
  }
}

export default PlaceDetails;
