import React , {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Game extends Component{
    render(){
        console.log(this.props);
        return (
            <div id="game">

            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps)(Game)
