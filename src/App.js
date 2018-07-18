import React, {Component} from 'react'
import MapContainer from './MapContainer'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <header>
          <h1>Neighborhood Map</h1>
        </header>
        <MapContainer/>
      </div>
    );
  }
}

export default App;
