import {combineReducers} from 'redux'

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
        }
    }

    return (types[action.type]) ? types[action.type]() : state;
}

const allReducers = combineReducers({
    Game:game
});

export default allReducers
