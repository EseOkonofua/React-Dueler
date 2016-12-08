import React, { Component } from 'react'
import {Link } from 'react-router'

export default class Menu extends Component {
  render(){
    return(
        <div id="menu">
            <h1 style={{textAlign:'center'}}>DUELER</h1>
            <h2><Link to='/play'>Play</Link></h2>
            <h4><Link to='/tutorial'>How to play</Link></h4>
        </div>
    )
  }
}
