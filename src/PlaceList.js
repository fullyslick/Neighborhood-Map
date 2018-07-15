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
          <Place/>
        </div>
        <PlaceDetails/>
      </div>
   )
  }
}

export default PlaceList;
