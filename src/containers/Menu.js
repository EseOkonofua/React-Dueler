import React, { Component } from 'react'
import {Link } from 'react-router'

export default class Menu extends Component {
  render(){
    return(
        <div id="menu">
            <Link to='/play'><h1>Play game</h1></Link>
            <Link to='/tutorial'><h2>Tutorial</h2></Link>
        </div>
    )
  }
}
