import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, Link , IndexLink} from 'react-router'
import {Provider} from 'react-redux'
import { createStore , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import allReducers from './reducers'

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

render(
  <Provider store={store}>
    <Router history = {browserHistory}>
      <Route path='/' component= {App}>
        <IndexRoute component={Menu}/>
        <Route path='/tutorial' component={Tutorial} />
        <Route path='/play' component={Game} />
      </Route>
    </Router>
  </Provider>
, document.getElementById('app'));
