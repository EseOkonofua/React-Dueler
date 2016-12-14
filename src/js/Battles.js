
function moveCount(rounds){
  let moves = {
    player:{
      0: 0,
      1:0,
      2:0
    },
    enemy:{
      0: 0,
      1:0,
      2:0
    }
  }

  rounds.forEach(round=>{
    moves.player[round.playerMove]++;
    moves.enemy[round.enemyMove]++;
  });

  return moves;
}

function counter(move){
  if(move === 0) return 2;
  else if(move === 1) return 0;
  else if (move=== 2) return 1;
}

function getMostUsedMove(moves){
  var choices = [];
  Object.keys(moves).forEach(move=>{
    if(choices.length <= 0) choices.push(Number(move));
    else{
      if(moves[move] > Number( moves[choices[0]] ) ) choices = [Number(move)];
      else if(moves[move] == Number( moves[choices[0]] )) choices.push(Number(move));
    }
  })

  var num = choices.length;
  if(num == 1) return choices[0]
  else return choices[Math.floor(Math.random() * num)];

}

function getLeastUsedMove(moves){
  var choices = [];
  Object.keys(moves).forEach(move=>{
    if(choices.length <= 0) choices.push(Number(move));
    else{
      if(moves[move] < Number( moves[choices[0]] ) ) choices = [Number(move)];
      else if(moves[move] == Number( moves[choices[0]] )) choices.push(Number(move));
    }
  })

  var num = choices.length;

  if(num == 1){ console.log(choices[0]); return choices[0] }
  else{
    var randChoice =choices[Math.floor(Math.random() * num)];
    console.log(randChoice);
    return randChoice;
  }

}


const Battles = [
    {
        name:"Sly",
        health:5,
        description: "Sly understands he is not the most powerful of warriors, He waits for the right time to strike, and is quick to retaliate.",
        getMove:function(env){
          let rounds = env.rounds.length;
          let eHealthPercent = env.enemyHealth/env.enemyMaxHealth;
          let pHealthPercent = env.playerHealth/3;
          if(rounds === 0 ) return 2;
          else{
            let lastRound = env.rounds[rounds-1];
            if(lastRound.result === "WIN"){
              if(eHealthPercent <= 0.5) return 2;
              return 0;
            }
            else if (lastRound.result === "TIE"){
              if(pHealthPercent <= 0.2) return 0;
              if(eHealthPercent <= 0.5) return 2;
              else return 0;
            }
            else if (lastRound.result === "LOSE"){
              if(pHealthPercent <= 0.5) return 0;
              else return 2
            }
          }
          return 0;
        }
    },
    {
        name:"Harvest",
        health:5,
        description:"Harvest is fearsome, he makes quick work of the lower ranked warriors, but against experienced fighters he always seems one move too late.",
        getMove:function(env){
          let rounds = env.rounds.length;
          let eHealthPercent = env.enemyHealth/env.enemyMaxHealth;
          let pHealthPercent = env.playerHealth/3;
          let moves = moveCount(env.rounds);

          if(rounds === 0) return Math.round(Math.random());
          else{
            let lastRound = env.rounds[rounds-1];

            if(eHealthPercent <= 0.5 && pHealthPercent > 0.5){
              return counter(getMostUsedMove(moves.player));
            }
            if(pHealthPercent <= 0.5){
              return 1;
            }
            return counter(lastRound.playerMove);
          }
        }
    },
    {
        name:"Atum",
        health:5,
        description: '" I\'ll tell you one thing... I\'m going to attack first... " - Atum',
        getMove:function(env){
            let rounds = env.rounds.length;
            let eHealthPercent = env.enemyHealth/env.enemyMaxHealth;
            let pHealthPercent = env.playerHealth/3;
            let lastRound = env.rounds[rounds - 1];
            let moves = moveCount(env.rounds);

            if(rounds == 0) return 0;
            else {
              if(eHealthPercent <= 0.5){
                return getLeastUsedMove(moves.enemy);
              }
              if(lastRound.result === "LOSE"){
                return lastRound.enemyMove;
              }
              else{
                return counter(lastRound.enemyMove);
              }
            }
        }
    },
    {
      name:"Death Thirteen",
      health:5,
      description: "Steals your dreams baby!",
      getMove:function(env){
        return 0;
      }
    },
    {
      name:"Cream",
      health:5,
      playerHealth:2,
      description: 'Scream n Shout',
      getMove:function(env){
        return 0;
      }
    },
    {
      name:"Red Hot Chili Pepper",
      health:5,
      description: '"Balance in all things!" - RHCP',
      getMove:function(env){
        let rounds = env.rounds.length;
        let eHealthPercent = env.enemyHealth/env.enemyMaxHealth;
        let pHealthPercent = env.playerHealth/3;
        let moves = moveCount(env.rounds);
        if(rounds < 2) return Math.floor(Math.random()*3);
        else return getLeastUsedMove(moves.enemy)
      }
    },
    {
      name:"Killer Queen",
      health:5,
      description: "Boom!",
      getMove:function(env){
        return 0;
      }
    }
];

export default Battles
