import {combineReducers} from 'redux'

function game(state = null,action){
    var types = {
        "LOAD_GAME": function(){
            return action.game;
        }
    }
    return (types[action.type]) ? types[action.type]() : state;
}

const allReducers = combineReducers({
    Game:game
});

export default allReducers
