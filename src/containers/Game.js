import React , {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link , browserHistory} from 'react-router'
import { changeGameState , selectMove , addRound, updateHealth , updateNextMove, loadGame, unlockLevel} from '../actions'

import GAME_STATES from '../js/GameStates'

import {Attack, Heavy, Counter} from '../components/MoveCards'
import EnemyChoice from '../components/EnemyChoice'


// TODO:
// Write more enemies
// Sound settings


var Settings = ()=>{
  var style = {
    textAlign:'center',
    margin:'5px 0px'
  }

  return (
    <div style={style} id="settings">
      <Link to='/'>Main menu</Link>
    </div>
  )
}


var Info = (props)=>{
    return (

        <div className="info">
            <div className = 'info-menu'>
                <p>Your duel is about to start</p>
                <h2>{props.name}</h2>
                <p>{props.desc}</p>
                <button onClick={props.onClick}>Play</button>
                <Settings/>
            </div>

        </div>
    )
}

var HandleWinLoss = (props)=>{
  function getLinks(){
    var to ='';
    if(props.result === GAME_STATES.VICTORY){
      if( Number(props.currentLevel)+ 1 === props.levels) return <Link to='/'>Back to menu</Link>
      else return <Link to={`/play/${Number(props.currentLevel) + 1}`}>Next level</Link>
    }
  }

  return (
    <div className="info">
      <div className = "info-menu">
        <h1>{(props.result === GAME_STATES.VICTORY)? 'You win!' : 'You lose!'}</h1>
        {(props.result === GAME_STATES.VICTORY)? <p>You are victorious!</p> : <p>You lose!</p>}
        {(props.result === GAME_STATES.VICTORY)? getLinks() : <Link to='/'>Go back to home menu</Link>}
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
        this.handleLoadGame = this.handleLoadGame.bind(this);
        this.answerTimeout = null;
    }

    componentWillUnmount(){
      if(this.answerTimeout) clearTimeout(this.answerTimeout);
    }

    enemyTurn(){
        this.props.changeGameState(GAME_STATES.ENEMY_TURN);
        this.props.selectMove(null);
        this.props.updateNextMove( this.props.Game.getMove(this.getEnv()) );
        this.answerTimeout = setTimeout( this.props.changeGameState.bind(null,GAME_STATES.PLAYER_TURN) , 2500);
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
                if(this.props.Game.nextMove === 0) {enemyHealth--; playerHealth--; }
                else if(this.props.Game.nextMove === 1){enemyHealth--; result = "WIN"; }
                else if(this.props.Game.nextMove === 2){playerHealth--; result = "LOSE"; }
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



        //Sounds depending of if you've taken damage;
        if(playerHealth < this.props.Game.playerHealth) this.props.enemyHitSound.play();
        else this.props.hitSound.play();
        //show results
        var round = { enemyMove: this.props.Game.nextMove , playerMove: move, result };

        console.log(round);
        this.props.addRound(round);
        this.props.updateHealth({playerHealth,enemyHealth});
        this.props.changeGameState(GAME_STATES.RESULT);

        if(playerHealth === 0 ){
          this.props.changeGameState(GAME_STATES.LOSE);
        }
        else if(enemyHealth === 0){
          this.props.changeGameState(GAME_STATES.VICTORY);

          //If you defeat current enemy..then upgrade your unlocked levels
          if(typeof(Storage) !== 'undefined'){
            if(this.props.params.level < (this.props.App.levels - 1) ){
              localStorage.unlocked = Number(localStorage.unlocked) + 1;

              //upgrade it on the state
              this.props.unlockLevel(localStorage.unlocked);
            }
          }
        }
    }

    handleSelectMove(move){
        if(this.props.Game.state === GAME_STATES.PLAYER_TURN){
            if(this.props.Game.selectedMove != move ){
                this.props.selectMove(move);
                this.props.uiMoveSound.play();
            }
            else {
                this.calcMove(move);
            }
        }
    }

    handleLoadGame(){
      if(this.answerTimeout) clearTimeout(this.answerTimeout);
      this.props.loadGame(this.props.params.level)
    }

    render(){

        var rounds = this.props.Game.rounds.length;
        var state = this.props.Game.state;
        var result = (rounds > 0 ) ? this.props.Game.rounds[rounds - 1].result : null;

        var cardStates = {
          active: (state === GAME_STATES.PLAYER_TURN),
          win: (result !== null && (state === GAME_STATES.RESULT || state === GAME_STATES.LOSE || state === GAME_STATES.VICTORY)  ) ? (result === "WIN") : null
        }

        return (
            <div id="game">
              <EnemyChoice Game = {this.props.Game} />
              <div className="playerMoves">
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
              </div>
              <h3 id="playerStats">Player - {this.props.Game.playerHealth}HP</h3>
              <div id="game-actions"><Link to='/'><i  className="fa fa-home" aria-hidden="true"></i></Link> <i style={{cursor:'pointer'}} onClick={this.handleLoadGame} className="fa fa-refresh" aria-hidden="true"></i> </div>
              {(this.props.Game.state === GAME_STATES.RESULT) ? <button style={{backgroundColor:'black'}} onClick = { this.enemyTurn } id="nextRound">Next round</button> : null }
              {(this.props.Game.state === GAME_STATES.ENEMY_INFO) ? <Info name={this.props.Game.enemyName} desc={this.props.Game.enemyDescription} onClick={ this.enemyTurn }/> : null}
              {(this.props.Game.state === GAME_STATES.VICTORY || this.props.Game.state === GAME_STATES.LOSE)? <HandleWinLoss currentLevel = {this.props.params.level} levels={this.props.App.levels} result={this.props.Game.state} /> : null}
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeGameState, selectMove, addRound, updateHealth, updateNextMove, loadGame, unlockLevel }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Game)
