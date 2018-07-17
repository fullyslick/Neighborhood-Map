import React, {Component} from 'react'
// Check if properties passed are of required type
import PropTypes from 'prop-types'

class Place extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    showDetails: PropTypes.func.isRequired
  }

  // invokes showDetails in master MapContainer
  showDetails = () => {

    // Assign the id of the place choosen
    const placeId = this.props.id;

    // Call showDetails method with the id of the place choosen
    this.props.showDetails(placeId);
  }

  render() {
    return (
      <button className="place-in-list" type="button" tabindex="2" onClick={this.showDetails}>{this.props.title}</button>
    )
  }
}

export default Place;
