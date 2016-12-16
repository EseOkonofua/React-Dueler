import React from 'react'
import { render } from 'react-dom'
import { Router, Redirect, Route, browserHistory, IndexRoute, Link , IndexLink} from 'react-router'
import {Provider} from 'react-redux'
import { createStore , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import allReducers from './reducers'

import { loadGame  } from './actions'

import App from './containers/app'
import Menu from './containers/Menu'
import Tutorial from './containers/Tutorial'
import Game from './containers/Game'

import Preloader from './components/Preloader'
import Battles from './js/Battles'

require('./styles.scss');

const store = createStore(allReducers, applyMiddleware(thunk));

var images = ['/assets/images/Sly.png',
              '/assets/images/Atum.png',
              '/assets/images/Harvest.png',
              '/assets/images/saber-slash.png',
              '/assets/images/spiked-mace.png',
              '/assets/images/shield-reflect.png',
            '/assets/images/Cream.png',
          '/assets/images/Death Thirteen.png',
        '/assets/images/Killer Queen.png',
      '/assets/images/Red Hot Chili Pepper.png'];

function handleEnterGame(nextState, replace){
    //Handle have you unlocked enemy??
    let state = store.getState();
    let level = nextState.params.level;
    if(level > Battles.length - 1) replace('*');
    if( state.App.unlocked >= level )
      store.dispatch( loadGame(level) );
    else
      replace(`/play/${level}/notunlocked`);
}

function handleEnterNotUnlocked(nextState, replace){
  //If you have unlocked an enemy just redirect to that enemy

  let state = store.getState();
  let level = nextState.params.level;
  if(level > Battles.length - 1) replace('*');
  if(state.App.unlocked >= level )
    replace(`/play/${level}`);
}

function handleAssetsLoaded(assets){
  console.log("assets loaded");
}

const NotUnlocked = (props)=>{
  return (
    <div id="notunlocked">
        <h1>{`You have not unlocked level ${props.params.level}`}</h1>
        <IndexLink to='/' >Back to Menu</IndexLink>
    </div>
  )
}

const Enemies = (props)=>{
  let state = store.getState();

  var MapEnemies = ()=>{
    return Battles.map((battle,index)=>{
      return (
        <div  key={index}>
        {
          (state.App.unlocked >= index) ?
          <div className='enemy-item' >
            <img src={`assets/images/${battle.name}.png`}></img>
            <div className='enemy-desc'>
              <h2>{`${battle.name}|${battle.health}HP`}</h2>
              <p>{battle.description}</p>
              <Link to={`/play/${index}`}>Battle</Link>
            </div>

          </div> :
          <div className='enemy-item hidden'>
            <h1>?</h1>
            <p>???</p>
          </div>
        }
        </div>
      )
    })
  }

  return (
    <div id="enemies">
        <Link to='/'>X</Link>
        <h1>Enemies</h1>
        {MapEnemies()}
    </div>
  )
}

const NotFound =()=>{
  return (
    <div  style={{position:'absolute',bottom:'0',top:'0', right:'0',left:'0',display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
      <h1>ERROR!</h1>
      <h2>This page does not exist!</h2>
      <Link to='/'>Main menu</Link>
    </div>
  )
}
render(

    <Provider store={store}>
      <Preloader onLoad={handleAssetsLoaded} images = {images}>
        <Router history = {browserHistory}>
            <Route path='/' component= {App}>
              <IndexRoute component={Menu}/>
              <Route path='/tutorial' component={Tutorial} />
              <Route path='/play/:level' onEnter={ handleEnterGame }  component={Game} />
              <Route path='/play/:level/notunlocked' onEnter={handleEnterNotUnlocked} component={NotUnlocked} />
              <Route path='/enemies' component={Enemies} />
              <Redirect from='/play' to='/play/0' />
            </Route>
            <Route path="*" component={NotFound} />
        </Router>
      </Preloader>
    </Provider>

, document.getElementById('app'));
