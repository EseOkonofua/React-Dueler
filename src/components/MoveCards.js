import React, {Component} from 'react'
import Card from './Card'

export const SKILL_IMAGES = {
    ENEMY: '/assets/images/sly.png',
    ATTACK: '/assets/images/saber-slash.png',
    HEAVY: '/assets/images/spiked-mace.png',
    COUNTER: '/assets/images/shield-reflect.png'
};


export class Attack extends Component{
  render(){
    return <Card img={SKILL_IMAGES.ATTACK} title="Attack" description="Use a light attack to defend against a heavy attack." {...this.props} />
  }
}

export class Heavy extends Component{

  render(){
    return <Card img={SKILL_IMAGES.HEAVY} title="Heavy" description="Use a heavy attack to bash through an enemy counter." {...this.props} />
  }
}

export class Counter extends Component{

  render(){
    return <Card img={SKILL_IMAGES.COUNTER} title="Counter" description="Use a counter attack to reflect the damage of a light attack." {...this.props} />
  }
}
