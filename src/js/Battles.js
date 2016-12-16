
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
  else return choices;
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

  if(num == 1) return choices[0]
  else return choices;
}

function getEnemyOldestUsedMove(moves, history){
  var historyLen = history.length;
  for(var i = historyLen - 1; i >= 0; i--){
    if(moves.length == 1) return moves[0];
    var index = moves.indexOf(history[i].enemyMove);
    if(index !== -1){
      moves.splice(index,1);
    }
  }
  return Math.floor( Math.random() * moves.length );
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
              var mostUsedMove = getMostUsedMove(moves.player);
              if( !Array.isArray(mostUsedMove) ) return counter(mostUsedMove);
              else{
                var len = mostUsedMove.length;
                return counter(mostUsedMove[ Math.floor( Math.random() * len ) ]);
              }
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
                var lUsedMove = getLeastUsedMove(moves.enemy);
                if( !Array.isArray(lUsedMove) ) return lUsedMove;
                else{
                  var len = lUsedMove.length;
                  return lUsedMove[ Math.floor( Math.random() * len ) ];
                }
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
      description: "He knows only one thing. Death. He feeds of the fear of his enemies and rage of his foes.",
      getMove:function(env){
        let rounds = env.rounds.length;
        let eHealthPercent = env.enemyHealth/env.enemyMaxHealth;
        let pHealthPercent = env.playerHealth/3;
        let moves = moveCount(env.rounds);

        if(rounds === 0) return 1;
        else{
          if(moves.player[1] > moves.player[2]) return 0;
          else if(moves.player[1] < moves.player[2]) return 1;
          else {
            if(moves.player[0]%2 === 0) return 0;
            else return 1;
          }
        }
        return 0;

      }
    },
    {
      name:"Cream",
      health:5,
      playerHealth:2,
      description: 'My advice to you is...don\'t get hit.',
      getMove:function(env){
        let rounds = env.rounds.length;
        let eHealthPercent = env.enemyHealth/env.enemyMaxHealth;
        let pHealthPercent = env.playerHealth/3;
        let moves = moveCount(env.rounds);

        if(rounds === 0) return 1;
        else{
          if(rounds%2 === 0){
            var mUsedMove = getMostUsedMove(moves.enemy);
            console.log(mUsedMove);
            if( !Array.isArray(mUsedMove) ) return mUsedMove;
            else return getEnemyOldestUsedMove(mUsedMove, env.rounds);
          }
          else{
            var lUsedMove = getLeastUsedMove(moves.enemy);
            if( !Array.isArray(lUsedMove)  ) return lUsedMove;
            else return getEnemyOldestUsedMove(lUsedMove, env.rounds);
          }
        }
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
        else{
          var lUsedMove = getLeastUsedMove(moves.enemy);
          if( !Array.isArray( lUsedMove ) ) return lUsedMove;
          else return getEnemyOldestUsedMove(lUsedMove, env.rounds)
        }
      }
    },
    {
      name:"Killer Queen",
      health:7,
      description: "\"I will strike thee first! Address me with respect or feel the wrath of my Bites Za dust!\" - Killer Queen",
      getMove:function(env){
        let rounds = env.rounds.length;
        let eHealthPercent = env.enemyHealth/env.enemyMaxHealth;
        let pHealthPercent = env.playerHealth/3;
        let moves = moveCount(env.rounds);

        if(rounds === 0) return 0;
        else{
          var firstRound = env.rounds[0];

            if(rounds % 2 !== 0){

              if(firstRound.result === "WIN" || firstRound.result === "TIE") return Math.floor( Math.random() * 3 );
              else{
                console.log("countering counter");
                return counter(counter(env.rounds[rounds - 1].playerMove));
              }
            }
            else {
              var lUsedMove =  getLeastUsedMove(moves.enemy);
              if( !Array.isArray(lUsedMove) ) return lUsedMove;
              else{
                return getEnemyOldestUsedMove(lUsedMove, env.rounds);
              }
            }


        }
        return 0;
      }
    }
];

export default Battles
