import React, { Component } from 'react'
import {Link,IndexLink} from 'react-router'
import {TransitionMotion, spring, presets} from 'react-motion'

import {connect} from 'react-redux'

import Preloader from '../components/Preloader'

export default class App extends Component{

    constructor(){
      super();
      this.bgm = new Audio('/assets/sounds/bgm.mp3');
      this.bgm.loop = true;
      this.bgm.addEventListener("loadeddata",function(){
        this.play();
      })
      this.uiMove = new Audio('/assets/sounds/uimove.wav');


    }

    willLeave(){
        return {
            opacity:spring(0, presets.gentle)
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
                            s.map(({data, key, style})=><div className='container' key={key} style={style}>{React.cloneElement(data, {uiMove: this.uiMove})}</div>)
                        }
                    </span>
                }
            </TransitionMotion>

        )
    }
}
