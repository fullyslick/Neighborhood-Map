import React, {Component} from 'react'
// Check if properties passed are of required type
import PropTypes from 'prop-types'

class PlaceDetails extends Component {
  static propTypes = {
    placeId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    closeDetails: PropTypes.func.isRequired
  }

  state = {
    // Turns to true when error occures with the fetch request
    hasError: false,
    // Turns to false if request is succesful
    loading: true,
    // Holds the response from fetch request
    fetchedPlace: []
  }
  // Fetch the place's details from foursquare
  fetchDetails = (placeId) => {
    const clientId = "2W33ALUML5UVZMFH5UWT0MLMQWXFJCRIICNCHAVADOK4FAUP"
    const clientSecret = "XP5APABV2VN1ZVRVTAIKORAJVHGY4Y5BJIUHUBGOEKQ51JBF"
    const version = 20180716
    const url = `https://api.foursquare.com/v2/venues/${placeId}?&client_id=${clientId}&client_secret=${clientSecret}&v=${version}`

    fetch(url)
    .then(response => {
      // If there is problem with the response,
      // change hasError
      if (!response.ok) {
        this.setState({hasError: true})
      }
      // if there is no error return the json response
      return response.json()
    })
    .then((json) => {
      // set the json response to fetchedPlace
      this.setState({fetchedPlace: json})
    })
    .then(() => {
      // set loading to false, to remove loading dialog from screen
      this.setState({loading: false})
    })
    .catch(error => {
      // if any error occures, change hasError to display error message to UI
      this.setState({hasError: true})
    })
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
    console.log(this.state.fetchedPlace);
    // Refers to closing details (back) button
    const backButton = <button className="close-details" type="button" onClick={this.closeDetails}>X</button>;
    return (
       <div className="PlaceDetails">
        {/* Check if the request is complete */}
         {this.state.loading ?
           // Show loading screen untill fetch request is complete
           <div className="loading-screen">
             {backButton}
             <div className="load-spinner"></div>
           </div>
           // If there is error with the fetch request inform user
         : this.state.hasError ?
         <div className="error-screen">
           {backButton}
           <p className="error-message">Oops! Could not get details from foursquare.</p>
         </div>
         :
         // If everything is ok with the request display the details
         <div>
           {backButton}
           <h2>{this.props.title}</h2>
           <p>{this.props.placeId}</p>
         </div>
         }
       </div>
   )
  }
}

export default PlaceDetails;
