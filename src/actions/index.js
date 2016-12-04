import Battle from '../js/Battle'
import Battles from '../js/Battles'

export function loadGame(level){
    let newBattle = new Battle(Battles[level]);
    return {
        type: "LOAD_GAME",
        game: newBattle
    }
}

export function changeGameState(state){
    return {
        type: "GAME_STATE",
        state
    }
}

export function selectMove(move){
    return {
        type: "SELECT_MOVE",
        move
    }
}

export function addRound(round){
    return {
        type: "ADD_ROUND",
        round
    }
}

export function updateHealth(health){
  return {
    type: "UPDATE_HEALTH",
    health
  }
}

export function updateNextMove(move){
  return {
    type: "ENEMY_MOVE",
    move
  }
}
