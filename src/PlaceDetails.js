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

  // Fetch the place's details from Foursquare API
  fetchDetails = (placeId) => {
    const clientId = "2W33ALUML5UVZMFH5UWT0MLMQWXFJCRIICNCHAVADOK4FAUP"
    const clientSecret = "HHEWFTDT5LZRKJQNDL2J5X2B4TE20J33KMBUM0A2EVPXQFJX"
    const version = 20180718
    const url = `https://api.foursquare.com/v2/venues/${placeId}?&client_id=${clientId}&client_secret=${clientSecret}&v=${version}`

    fetch(url).then(response => {
      // If there is problem with the response,
      // change hasError
      if (!response.ok) {
        this.setState({hasError: true})
      }
      // If there is no error return the json response
      return response.json()
    }).then((json) => {
      // Set the json response to fetchedPlace
      this.setState({fetchedPlace: json.response})
    }).then(() => {
      // Set loading to false, to remove loading dialog from screen
      this.setState({loading: false})
    }).catch(error => {
      // If any error occures, change hasError to display error message to UI
      this.setState({hasError: true})
      console.log(error);
    })
  }

  // Closes the details view,
  // by calling closeDetails on master MapContainer
  closeDetails = () => {
    this.props.closeDetails();
  }

  // When component is mounted fecth the details about the selected place
  componentDidMount = () => {
    this.fetchDetails(this.props.placeId);
  }

  render() {

    // Stores to closing details (back) button
    const backButton = <button className="close-details" type="button" tabIndex="1" onClick={this.closeDetails}>X</button>;

    // Stores the response from Foursquare server
    const details = this.state.fetchedPlace.venue;

    return (
       <div className="place-details-panel">
        {/* Check if the request is complete */}
         {this.state.loading ?
           // Show loading screen if the fetch request is not completed
           <div className="loading-screen">
             {backButton}
             <div className="load-spinner"></div>
           </div>
           // If there is error with the fetch request inform user
         : this.state.hasError ?
         <div className="error-screen">
           {backButton}
           <p className="error-message">Oops! Could not get details for {this.props.title} from foursquare.</p>
         </div>
         :
         // If everything is ok with the request display the details
         <div className="details-wrapper">
           {backButton}
           <h2 className="place-title">{this.props.title}</h2>
             {/* If there is photo available from Foursquare response display it, else inform the user */}
             {details.bestPhoto ?
               <img className='place-photo' alt={this.props.title} src={details.bestPhoto.prefix+'300x300'+details.bestPhoto.suffix} />
             : <span className="no-image-found">No Image available</span> }
               <div className="place-details-content" >
                 <p className="details-label">Address:</p>
                 <p className="place-address">{details.location.formattedAddress ? details.location.formattedAddress : "Not found"}</p>
                 <p className="details-label">Phone:</p>
                 <p className="place-phone">{details.contact.formattedPhone ? details.contact.formattedPhone :  "Not found"}</p>
                 <p className="details-label">About:</p>
                 <p className="place-description">{details.description ? details.description : "Not found"}</p>
                 <p className="details-label reviews-heading">Reviews</p>
                 <ul>
                 {/* Check if there are reviews for this place and if there are map over all reviews availbale */}
                 { details.tips ?
                   details.tips.groups[0].items.map((review) =>
                    <li className="review" key={review.id}>
                      <p className="reviewer-name"> {review.user.firstName} {review.user.lastName}: </p>
                      <p className="review-text">{review.text}</p>
                    </li>
                    )
                   :
                   // If there are no reviews inform the user
                   <span className="no-reviews">There are no reviews for this place yet!</span>
                  }
                 </ul>
                 <span className=" attribution">Powered by <a className="foursquare-link" href="https://foursquare.com/" target="_blank" rel="noopener noreferrer">foursquare</a></span>
                </div>
          </div>
        }
       </div>
   )
  }
}

export default PlaceDetails;
