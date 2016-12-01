import Battle from '../js/Battle'
import Battles from '../js/Battles'

export function loadGame(level){
    let newBattle = new Battle(Battles[level]);

    return {
        type: "LOAD_GAME",
        game: new Battle( newBattle )
    }
}
