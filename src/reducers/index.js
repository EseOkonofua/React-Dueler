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

function soundSettings(){
  if(typeof(Storage) !== 'undefined'){
    if(localStorage.soundSettings){
      return JSON.parse( localStorage.soundSettings )
    }
    else{
      localStorage.soundSettings = JSON.stringify({
        bgm:true,
        sounds:true
      })
    }
  }
  else return {
    bgm: true,
    sounds: true
  }
}

function app(state={levels: Battles.length, unlocked: unlockedLevels(), soundSettings: soundSettings() },action){
  var types = {
    "UNLOCK_LEVEL":function(){
      return Object.assign({},state,{unlocked:Number(action.level)})
    },
    "SET_BGM":function(){
      var newSettings = {
        bgm: action.status,
        sounds:state.soundSettings.sounds
      };
      if(typeof(Storage) !== 'undefined'){
        localStorage.soundSettings = JSON.stringify(newSettings);
      }
      return Object.assign({},state,{
        soundSettings:newSettings
      })
    },
    "SET_SOUND":function(){
      var newSettings = {
        bgm: state.soundSettings.bgm,
        sounds:action.status
      };
      if(typeof(Storage) !== 'undefined'){
        localStorage.soundSettings = JSON.stringify(newSettings);
      }
      return Object.assign({},state,{
        soundSettings:newSettings
      })
    }
  }
  return (types[action.type]) ? types[action.type]() : state;
}



const allReducers = combineReducers({
    Game:game,
    App:app
});

export default allReducers
