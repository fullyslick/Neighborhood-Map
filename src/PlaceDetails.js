import React, {Component} from 'react'

class PlaceDetails extends Component {
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
