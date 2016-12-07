
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

function counterMostUsedMoveAggressive(moves){
  //Attack->Heavy->Counter
  let choice = 0;

  if(moves.player[choice] <= moves.player[1]) choice = 1;
  if(moves.player[choice] <= moves.player[2]) choice = 2;
  return counter(choice);
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
            if(pHealthPercent <= 0.5){
              return counterMostUsedMoveAggressive(moves);
            }
            return counter(lastRound.playerMove);
          }
        }
    },
    {
        name:"Atum",
        health:5,
        description: "",
        getMove:function(env){
            let rounds = env.rounds.length;
            //Mushrooms alternate between attacks and defends
            if((rounds % 2) == 0) return 0;
            else return 2;
        }
    }
];

export default Battles
