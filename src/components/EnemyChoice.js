import React, {Component} from 'react'
import GAME_STATES from '../js/GameStates'
import { Link } from 'react-router'

import Card from './Card'
import Thinking from './Thinking'
import { Attack, Heavy, Counter , SKILL_IMAGES} from './MoveCards'



export default class EnemyChoice extends Component{


    showCard(){
        var rounds = this.props.Game.rounds.length;
        var result = (rounds > 0 )? this.props.Game.rounds[rounds - 1].result : null;

        if(this.props.Game.state === GAME_STATES.ENEMY_TURN || this.props.Game.state === GAME_STATES.ENEMY_INFO || this.props.Game.state === GAME_STATES.PLAYER_TURN)
          return <Card img= {`/assets/images/${this.props.Game.enemyName}.png`} active={(this.props.Game.state !== GAME_STATES.PLAYER_TURN)} title={this.props.Game.enemyName} description={(this.props.Game.state === GAME_STATES.PLAYER_TURN) ? `${this.props.Game.enemyName} has decided... Make your move` : <Thinking/>} />
        else if(this.props.Game.state === GAME_STATES.RESULT || this.props.Game.state === GAME_STATES.VICTORY || this.props.Game.state === GAME_STATES.LOSE){
            let choice = this.props.Game.nextMove;

            if(choice === 0 ) return <Attack win={(result !== "WIN" && result !== "TIE" )} />;
            else if(choice === 1) return <Heavy win={(result !== "WIN" && result !== "TIE" )} />;
            else if (choice === 2) return <Counter win={(result !== "WIN" && result !== "TIE" )} />;
        }

    }

    render(){
        return (
            <div id='enemyMove'>
                <h3 id="enemyStats">{this.props.Game.enemyName} - {this.props.Game.enemyHealth}HP</h3>
                {this.showCard()}
            </div>
        )
    }
}
