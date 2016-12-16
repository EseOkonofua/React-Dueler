import React, { Component } from 'react'
import {Link,IndexLink} from 'react-router'
import {TransitionMotion, spring, presets} from 'react-motion'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import { setBgm , setSound} from '../actions'
import Preloader from '../components/Preloader'

class App extends Component{

    constructor(){
      super();
      this.bgm = new Audio('/assets/sounds/bgm.mp3');
      this.bgm.loop = true;

      this.uiMove = new Audio('/assets/sounds/uimove.wav');
      this.hit = new Audio('/assets/sounds/hit.wav');
      this.enemyHit = new Audio('/assets/sounds/enemyhit.wav');

      this.bgmChange = this.bgmChange.bind(this);
      this.soundChange = this.soundChange.bind(this);
    }

    soundChange(status){
      this.props.setSound(status);
    }

    bgmChange(status){
      this.props.setBgm(status);
      if(status){
        this.bgm.play();
      }
      else this.bgm.pause();
    }

    componentDidMount(){
      if(this.props.soundSettings.bgm){
        this.bgm.play();
        if(this.bgm.paused) this.bgmChange(false);
      }

    }

    willLeave(){
        return {
            opacity:spring(0, presets.stiff)
        }
    }

    willEnter(){
        return {
            opacity:0
        }
    }

    getStyles(){
        return (this.props.children) ? [{
            key:this.props.location.pathname,
            style:{
                opacity:spring(1, presets.gentle)
            },
            data:this.props.children
        }] : []
    }

    render(){


        return (
            <TransitionMotion
                willEnter = {this.willEnter}
                willLeave = {this.willLeave}
                styles={this.getStyles()}>
                {s=><span>
                        {
                            s.map(({data, key, style})=><div className='container' key={key} style={style}>{React.cloneElement(data, {
                              uiMoveSound: this.uiMove,
                              hitSound: this.hit,
                              enemyHitSound: this.enemyHit,
                              bgmChange: this.bgmChange,
                              soundChange: this.soundChange
                            })}</div>)
                        }
                    </span>
                }
            </TransitionMotion>

        )
    }
}

function mapStateToProps(state){
  return {
    soundSettings:state.App.soundSettings
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({ setBgm, setSound }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(App)
