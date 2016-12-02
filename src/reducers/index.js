import {combineReducers} from 'redux'
import Battles from '../js/Battles'

function game(state = null,action){
    var types = {
        "LOAD_GAME": function(){
            return action.game;
        },
        "GAME_STATE":function(){
            return Object.assign({},state,{state:action.state});
        },
        "SELECT_MOVE":function(){
            return Object.assign({},state,{selectedMove:action.move});
        },
        "ADD_ROUND":function(){
            return Object.assign({},state, {rounds: [...state.rounds, action.round]})
        },
        "UPDATE_HEALTH":function(){
          return Object.assign({}, state, {
            playerHealth: action.health.playerHealth,
            enemyHealth: action.health.enemyHealth
          })
        },
        "ENEMY_MOVE":function(){
          return Object.assign({},state,{nextMove:action.move});
        }
    }

    return (types[action.type]) ? types[action.type]() : state;
}

function app(state={levels: Battles.length},action){
  var types = {

  }
  return (types[action.type]) ? types[action.type]() : state;
}

const allReducers = combineReducers({
    Game:game,
    App:app
});

export default allReducers
