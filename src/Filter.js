import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Filter extends Component{
  static propTypes = {
    setCategory: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired
  }

  state = {
    // Holds the value selected in the options
    value: this.props.category
  }

  // Displays the category in the option,
  // calls a method on the master MapContainer to change category,
  // which cause showing only to places from selected category
  handleChange = (event) => {
    this.setState({value: event.target.value});
    this.props.setCategory(event.target.value);
  }

  render(){
    return(
      <label>
         Category:
         <select
           tabIndex="1"
           aria-label= "Select Category"
           value={this.state.value}
           onChange={this.handleChange}>
           <option value="all">All</option>
           <option value="sights">Sights</option>
           <option value="bars">Bars</option>
           <option value="restaurants">Restaurants</option>
         </select>
       </label>
    )
  }
}

export default Filter;
