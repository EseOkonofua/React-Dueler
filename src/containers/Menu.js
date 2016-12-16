import React, { Component } from 'react'
import {Link } from 'react-router'

import { connect } from 'react-redux'

class Menu extends Component {
  render(){
    return(
        <div id="menu">
            <h1 style={{textAlign:'center'}}>DUELER</h1>
            <h2><Link to='/play'>Play</Link></h2>
            <h4><Link to='/tutorial'>How to play</Link></h4>
            <h4><Link to='/enemies'>Enemies</Link></h4>

            <div style={{position:'absolute',top:'1em',left:'1em'}}>
              <i  onClick={this.props.bgmChange.bind(null, !this.props.soundSettings.bgm)} className='fa fa-music' style={{cursor:'pointer',color:(this.props.soundSettings.bgm)?'#8e44ad':'white',marginRight:'15px'}}></i>
              <i onClick ={this.props.soundChange.bind(null, !this.props.soundSettings.sounds)} className='fa fa-volume-up' style={{cursor:'pointer',color:(this.props.soundSettings.sounds)?'#8e44ad':'white'}}></i>
            </div>
        </div>
    )
  }
}

function mapStateToProps(state){
  return {
    soundSettings: state.App.soundSettings
  }
}

export default connect(mapStateToProps)(Menu)
