import React, {Component} from 'react'

class Place extends Component {

  // invokes showDetails in master MapContainer
  showDetails = () => {

    // Assign the id of the place choosen
    const placeId = this.props.id;

    // Call showDetails method with the id of the place choosen
    this.props.showDetails(placeId);
  }

  render() {
    return (
      <button className="place-in-list" type="button" onClick={this.showDetails}>{this.props.title}</button>
    )
  }
}

export default Place;
