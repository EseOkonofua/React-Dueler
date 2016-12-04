import React , {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link , browserHistory} from 'react-router'
import { changeGameState , selectMove , addRound, updateHealth , updateNextMove} from '../actions'

import GAME_STATES from '../js/GameStates'

import {Attack, Heavy, Counter} from '../components/MoveCards'
import EnemyChoice from '../components/EnemyChoice'


// TODO:
// Add a restart battle action - reset states to defaults
// Asset preloader
// Switch card component to take image nodes
// Add a menu/settings button within Battle
// How to play page
// Animate info to slide up
// Write more enemies

var Info = (props)=>{
    return (

        <div className="info">
            <div>
                <p>Your duel is about to start</p>
                <button onClick={props.onClick}>Play</button>
            </div>

        </div>
    )
}

var HandleWinLoss = (props)=>{
  function getLinks(){
    var to ='';
    if(props.result === GAME_STATES.WIN){
      if( Number(props.currentLevel)+ 1 === props.levels) return <Link to='/'>Back to menu</Link>
      else return <Link to={`/play/${Number(props.currentLevel) + 1}`}>Next level</Link>
    }
  }

  return (
    <div className="info">
      <div>
        <h1>{(props.result === GAME_STATES.WIN)? 'You win!' : 'You lose!'}</h1>
        {(props.result === GAME_STATES.WIN)? <p>You are victorious!</p> : <p>You lose!</p>}
        {(props.result === GAME_STATES.WIN)? getLinks() : <Link to='/'>Go back to home menu</Link>}
      </div>
    </div>
  )
}

/*
GAMEEEEE LOGICUHHHHHHHHH
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
        this.props.selectMove(null);
        this.props.updateNextMove( this.props.Game.getMove(this.getEnv()) );
        setTimeout( this.props.changeGameState.bind(null,GAME_STATES.PLAYER_TURN) , 3500);
    }

    getEnv(){
      let env  = {
        enemyHealth: this.props.Game.enemyHealth,
        enemyMaxHealth: this.props.Game.enemyMaxHealth,
        playerHealth: this.props.Game.playerHealth,
        rounds: this.props.Game.rounds
      };
      return env
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

        this.props.addRound(round);
        this.props.updateHealth({playerHealth,enemyHealth});
        this.props.changeGameState(GAME_STATES.RESULT);

        if(playerHealth === 0 ){
          this.props.changeGameState(GAME_STATES.LOSE);
        }
        else if(enemyHealth === 0){
          this.props.changeGameState(GAME_STATES.WIN)
        }
    }

    handleSelectMove(move){

        if(this.props.Game.state === GAME_STATES.PLAYER_TURN){
            if(this.props.Game.selectedMove != move ){
                this.props.selectMove(move);
                this.props.uiMove.play();
            }
            else {
                this.calcMove(move);
            }
        }
    }

    render(){

        var rounds = this.props.Game.rounds.length;
        var result = (rounds > 0 ) ? this.props.Game.rounds[rounds - 1].result : null;

        var cardStates = {
          active: (this.props.Game.state === GAME_STATES.PLAYER_TURN),
          win: (result === null || this.props.Game.state !== GAME_STATES.RESULT  ) ? null :  (result === "WIN")
        }

        return (
            <div id="game">
                <EnemyChoice Game = {this.props.Game} />
                <div id="playerMoves">
                  <Attack
                      onClick={this.handleSelectMove.bind(this, 0)}
                      selected={(this.props.Game.selectedMove === 0)}
                      {...cardStates}/>
                    <Heavy
                        onClick={this.handleSelectMove.bind(this, 1)}
                        selected={(this.props.Game.selectedMove === 1)}
                        {...cardStates}/>
                    <Counter
                        onClick={this.handleSelectMove.bind(this, 2)}
                        selected={(this.props.Game.selectedMove === 2)}
                        {...cardStates}/>
                    <h3 id="playerStats">Player - {this.props.Game.playerHealth}HP</h3>
                    { (this.props.Game.state === GAME_STATES.RESULT) ? <button onClick = { this.enemyTurn } id="nextRound">Next round</button> : null }
                </div>
                {(this.props.Game.state === GAME_STATES.ENEMY_INFO) ? <Info onClick={ this.enemyTurn }/> : null}
                {(this.props.Game.state === GAME_STATES.WIN || this.props.Game.state === GAME_STATES.LOSE)? <HandleWinLoss currentLevel = {this.props.params.level} levels={this.props.App.levels} result={this.props.Game.state} /> : null}
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeGameState, selectMove, addRound, updateHealth, updateNextMove}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Game)
