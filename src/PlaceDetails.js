import React, {Component} from 'react'
// Check if properties passed are of required type
import PropTypes from 'prop-types'

class PlaceDetails extends Component {
  static propTypes = {
    placeId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    closeDetails: PropTypes.func.isRequired
  }

  // Fetch the place's details from foursquare
  fetchDetails = (placeId) => {
    const clientId = "2W33ALUML5UVZMFH5UWT0MLMQWXFJCRIICNCHAVADOK4FAUP"
    const clientSecret = "XP5APABV2VN1ZVRVTAIKORAJVHGY4Y5BJIUHUBGOEKQ51JBF"
    const version = 20180716
    const url = `https://api.foursquare.com/v2/venues/${placeId}?&client_id=${clientId}&client_secret=${clientSecret}&v=${version}`

    fetch(url).then(response => {
      if (!response.ok) {
        console.log("error occured");
      }
      return response.json()
    }).then((json) => {
      console.log(json)
    }).catch(error => console.log("Error is " + error))
  }

  // Closes the details view,
  // By calling closeDetails on master MapContainer
  closeDetails = () => {
    this.props.closeDetails();
  }

  // When component is mounted fecth the details about the place
  componentDidMount = () => {
    this.fetchDetails(this.props.placeId);
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
