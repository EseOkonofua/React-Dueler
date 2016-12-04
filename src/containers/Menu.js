import React, { Component } from 'react'
import {Link } from 'react-router'

export default class Menu extends Component {
  render(){
    return(
        <div id="menu">
            <h1><Link to='/play'>Play game</Link></h1>
            <h2><Link to='/tutorial'>How to play</Link></h2>
        </div>
    )
  }
}
