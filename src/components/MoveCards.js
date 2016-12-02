import React from 'react'
import Card from './Card'
export const SKILL_IMAGES = {
    ENEMY: '/assets/images/sly.png',
    ATTACK: '/assets/images/saber-slash.png',
    HEAVY: '/assets/images/spiked-mace.png',
    COUNTER: '/assets/images/shield-reflect.png'
};

const MoveCards = {
    0: React.createElement(Card, {img: SKILL_IMAGES.ATTACK, title:"Attack",description:"Use a light attack to defend against a heavy attack."}),
    1: React.createElement(Card, {img: SKILL_IMAGES.HEAVY,title:"Heavy",description:"Use a heavy attack to bash through an enemy counter."}),
    2: React.createElement(Card, {img: SKILL_IMAGES.COUNTER,title:"Counter",description:"Use a counter attack to reflect the damage of a light attack."})
};

export default MoveCards
