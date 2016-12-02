import React , {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeGameState , selectMove , addRound } from '../actions'

import GAME_STATES from '../js/GameStates'

import MoveCards from '../components/MoveCards'
import EnemyChoice from '../components/EnemyChoice'

var Info = (props)=>{
    return (
        //TODO: Animate info to slide up
        <div id="info">
            <div>
                <p>Your duel is about to start</p>
                <button onClick={props.onClick}>Play</button>
            </div>

        </div>
    )
}
/*
GAMEEEEE

//MOVES
ATTACK : 0  ... 0 == 0, 0 > 1, 0 < 2
HEAVY: 1    ... 1 == 1, 1 < 0, 1 > 2
COUNTER: 2  ... 2 == 2, 2 > 0, 2 < 1

*/
class Game extends Component{
    constructor(){
        super();
        this.enemyTurn = this.enemyTurn.bind(this)
    }

    enemyTurn(){
        this.props.changeGameState(GAME_STATES.ENEMY_TURN);
        setTimeout( this.props.changeGameState.bind(null,GAME_STATES.PLAYER_TURN) , 3500);
    }

    calcMove(move){
        var enemyHealth = this.props.Game.enemyHealth;
        var playerHealth = this.props.Game.playerHealth;
        var result = "TIE";
        var moves = {
            0: ()=>{
                if(this.props.Game.nextMove === 0) {enemyHealth--; playerHealth--;}
                else if(this.props.Game.nextMove === 1){enemyHealth--; result = "WIN"}
                else if(this.props.Game.nextMove === 2){playerHealth--; result = "LOSE"}
            },
            1: ()=>{
                if(this.props.Game.nextMove === 0) { playerHealth--; result = "LOSE"}
                else if(this.props.Game.nextMove === 1){enemyHealth--; playerHealth--}
                else if(this.props.Game.nextMove === 2){enemyHealth--; result = "WIN"}
            },
            2: ()=>{
                if(this.props.Game.nextMove === 0) {enemyHealth--; result = "WIN"}
                else if(this.props.Game.nextMove === 1){playerHealth--; result = "LOSE"}
                else if(this.props.Game.nextMove === 2){playerHealth--; enemyHealth--;}
            }
        }
        moves[move]();

        //show results
        var round = { enemyMove: this.props.Game.nextMove , playerMove: move, result };
        console.log(round);
        this.props.addRound(round);

        this.props.changeGameState(GAME_STATES.RESULT);
    }

    handleSelectMove(move){
        if(this.props.Game.state === GAME_STATES.PLAYER_TURN){
            if(this.props.Game.selectedMove != move ){
                this.props.selectMove(move);
            }
            else {
                this.calcMove(move);
            }
        }
    }

    render(){
        var rounds = this.props.Game.rounds.length;
        var result = (rounds > 0 ) ? this.props.Game.rounds[rounds - 1].result : null;

        console.log(this.props.Game.rounds)
        return (
            <div id="game">

                <h1>{this.props.Game.enemyName} - {this.props.Game.enemyHealth}HP</h1>
                <EnemyChoice Game = {this.props.Game} />
                <div id="playerMoves">
                    {React.cloneElement(MoveCards[0], {
                        onClick:this.handleSelectMove.bind(this, 0),
                        active: (this.props.Game.state === GAME_STATES.PLAYER_TURN),
                        selected: (this.props.Game.selectedMove === 0),
                        win: (result === null || this.props.Game.state !== GAME_STATES.RESULT) ? null :  (result === "WIN" )
                    })}
                    {React.cloneElement(MoveCards[1],{
                        onClick:this.handleSelectMove.bind(this, 1),
                        active: (this.props.Game.state === GAME_STATES.PLAYER_TURN),
                        selected: (this.props.Game.selectedMove === 1),
                        win: (result === null || this.props.Game.state !== GAME_STATES.RESULT) ? null :  (result === "WIN")
                    })}
                    {React.cloneElement(MoveCards[2],{
                        onClick:this.handleSelectMove.bind(this, 2),
                        active: (this.props.Game.state === GAME_STATES.PLAYER_TURN),
                        selected: (this.props.Game.selectedMove === 2),
                        win: (result === null || this.props.Game.state !== GAME_STATES.RESULT) ? null :  (result === "WIN")
                    })}
                </div>
                {(this.props.Game.state === GAME_STATES.ENEMY_INFO) ? <Info onClick={ this.enemyTurn }/> : null}
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeGameState, selectMove, addRound}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Game)
