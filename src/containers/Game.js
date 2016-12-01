import React , {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Game extends Component{
    render(){
        return (
            <div id="game">
              <h1>{this.props.Game.enemyName}</h1>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps)(Game)
