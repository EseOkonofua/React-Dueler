import React from 'react'
import { render } from 'react-dom'
import { Router, Redirect, Route, browserHistory, IndexRoute, Link , IndexLink} from 'react-router'
import {Provider} from 'react-redux'
import { createStore , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import allReducers from './reducers'

import { loadGame  } from './actions'

import App from './containers/App'
import Menu from './containers/Menu'
import Tutorial from './containers/Tutorial'
import Game from './containers/Game'

import Preloader from './components/Preloader'

require('./styles.scss');

const store = createStore(allReducers, applyMiddleware(thunk));


function handleEnterGame(nextState, replace){
    store.dispatch( loadGame(nextState.params.level) );
}


var images = ['/assets/images/Sly.png',
              '/assets/images/Atum.png',
              '/assets/images/Harvest.png',
              '/assets/images/saber-slash.png',
              '/assets/images/spiked-mace.png',
              '/assets/images/shield-reflect.png'];

function handleAssetsLoaded(assets){
  console.log("assets loaded")
}

render(

    <Provider store={store}>
      <Preloader onLoad={handleAssetsLoaded} images = {images}>
        <Router history = {browserHistory}>
            <Route path='/' component= {App}>
              <IndexRoute component={Menu}/>
              <Route path='/tutorial' component={Tutorial} />
              <Route path='/play/:level' onEnter={ handleEnterGame }  component={Game} />
              <Redirect from='/play' to='/play/0' />
            </Route>
        </Router>
      </Preloader>
    </Provider>

, document.getElementById('app'));
