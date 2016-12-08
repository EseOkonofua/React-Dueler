import React from 'react'
import {Link, IndexLink} from 'react-router'

import Card from '../components/Card'
import { Attack , Heavy, Counter } from '../components/MoveCards'
import Thinking from '../components/Thinking'

const Tutorial = ()=> (
    <div id="tutorial">
        <div>
                <IndexLink to='/' >X</IndexLink>   <h1>How to play</h1>

        </div>
        <section>
          <p>Dueler is a Rock, Paper Scissors - esque dueling game. The purpose of the game is to outsmart each opponent and drop their health points to 0 before your's hits 0. </p>
        </section>
        <section>
          <p style={{textAlign:'center'}}>The moves in Dueler include:</p>
          <div className='playerMoves'>
            <Attack />
            <Heavy />
            <Counter />
          </div>
        </section>
        <section style={{textAlign:'center'}}>
          <h1>- Attack <small>beats</small> Heavy -</h1>
          <h1>- Heavy <small>beats</small> Counter -</h1>
          <h1>- Counter <small>beats</small> Attack -</h1>
          <p>In the occassion that you and the enemy make the same choice, you will both take damage.</p>
        </section>
        <section style={{textAlign:'center'}}>
          <Card description={<Thinking />} img='/assets/images/Sly.png' title='Sly'/>
          <p>At the start of the round the enemy will think about what move he is going to make based on what has transpired in the battle.</p>
          <p>After your enemy has made it's choice, then you can make yours.</p>
        </section>
        <section  style={{textAlign:'center'}}>
          <hr/>
          <h1>Controls</h1>
          <p style={{marginBottom:'20px'}}>Click a on a card once to select it. Click it again to use that move for this round.</p>
          <hr/>
        </section>
        <section  style={{textAlign:'center'}}>
          <p>All the enemies in Dueler have unique behaviours. Use their descriptions to gain a upper hand.</p>
          <h3><Link to='/play'>Start Game</Link></h3>
        </section>
    </div>
)

export default Tutorial
