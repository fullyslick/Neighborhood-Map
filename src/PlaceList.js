import React, {Component} from 'react'
import Filter from './Filter'
import Place from './Place'
import PlaceDetails from './PlaceDetails'

class PlaceList extends Component {
  render() {

    return (
      <div className="place-list">
        <div>
          <p>Place List</p>
          <Filter/>
          {this.props.places.map( (place) => (
              <Place title={place.name}/>
          ))}
        </div>
        <PlaceDetails/>
      </div>
   )
  }
}

export default PlaceList;
