import React, {Component} from 'react'
import GAME_STATES from '../js/GameStates'

import Card from './Card'
import MoveCards, { SKILL_IMAGES } from './MoveCards'

const Thinking = ()=>{
    return (
        <div className='thinking'>
            <div className='thinking-1'></div>
            <div className ='thinking-2'></div>
        </div>
    )
}

export default class EnemyChoice extends Component{
    constructor(){
        super();
        this.showCard = this.showCard.bind(this)

    }

    showCard(){
        var rounds = this.props.Game.rounds.length;
        var result = (rounds > 0 )? this.props.Game.rounds[rounds - 1].result : null;

        if(this.props.Game.state === GAME_STATES.ENEMY_TURN || this.props.Game.state === GAME_STATES.ENEMY_INFO) return React.createElement(Card, {img: SKILL_IMAGES.ENEMY,active:true,title:this.props.Game.enemyName,description:React.createElement(Thinking)});
        else if(this.props.Game.state === GAME_STATES.PLAYER_TURN) return React.createElement(Card, {img: SKILL_IMAGES.ENEMY,title:this.props.Game.enemyName,description:"Enemy has decided... Make your move!"});
        else if(this.props.Game.state === GAME_STATES.RESULT) return React.cloneElement(MoveCards[this.props.Game.nextMove],{win:(result !== "WIN" && result !== "TIE" )} )
    }

    render(){
        return (
            <div id='enemyMove'>
                {this.showCard()}
            </div>
        )
    }
}
