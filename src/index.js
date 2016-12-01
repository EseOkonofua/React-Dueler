import React from 'react'
import { render } from 'react-dom'
import { Router, Redirect, Route, browserHistory, IndexRoute, Link , IndexLink, hashHistory} from 'react-router'
import {Provider} from 'react-redux'
import { createStore , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import allReducers from './reducers'

import { loadGame } from './actions'

import App from './containers/App'
import Menu from './containers/Menu'
import Game from './containers/Game'


require('./styles.scss');

const store = createStore(allReducers, applyMiddleware(thunk));

const Tutorial = ()=> (
    <div id="tutorial">
        <div>
                <IndexLink to='/' >X</IndexLink>   <h1>Tutorial</h1>
        </div>

    </div>
)

function handleEnterGame(nextState, replace){
    store.dispatch( loadGame.bind(null, nextState.params.level))
}

render(
  <Provider store={store}>
    <Router history = {browserHistory}>
      <Route path='/' component= {App}>
        <IndexRoute component={Menu}/>
        <Route path='/tutorial' component={Tutorial} />
        <Route path='/play/:level' onEnter={ handleEnterGame }  component={Game} />
        <Redirect from='/play' to='/play/1' />
      </Route>
    </Router>
  </Provider>
, document.getElementById('app'));
