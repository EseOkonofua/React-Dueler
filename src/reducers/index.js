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



function unlockedLevels(){
  let unlocked = Battles.length - 1;
  if(typeof(Storage) !== 'undefined'){
    if(localStorage.unlocked){
      return Number(localStorage.unlocked);
    }
    else{
      localStorage.unlocked = 0;
      return 0;
    }
  }
  else return unlocked;
}

function app(state={levels: Battles.length, unlocked: unlockedLevels()},action){
  var types = {
    "UNLOCK_LEVEL":function(){
      return Object.assign({},state,{unlocked:Number(action.level)})
    }
  }
  return (types[action.type]) ? types[action.type]() : state;
}



const allReducers = combineReducers({
    Game:game,
    App:app
});

export default allReducers
