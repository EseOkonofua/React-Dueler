import React , {Component} from 'react'

const moves = {
    width:'80px',
    height:'100px'

}

export default class Game extends Component{
    render(){
        return (
            <div id="game">
                {/*Enemy deck*/}
                <div></div>
                {/*Choices*/}
                <div style={{position:'relative',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                    <div style={{backgroundColor:'#ccc',   ...moves}}></div>
                    <div style={{backgroundColor:'lightblue',...moves}}></div>
                </div>
                {/*Player deck*/}
                <div id="movesList">
                    <img className='moves' src='/assets/images/saber-slash.png'/>
                    <img className='moves' src='/assets/images/spiked-mace.png'/>
                    <img className='moves' src='/assets/images/shield-reflect.png'/>
                </div>
            </div>
        )
    }
}
