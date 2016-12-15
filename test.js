function getMostUsedMove(moves){
  var choices = [];
  Object.keys(moves).forEach(move=>{
    if(choices.length <= 0) choices.push(move);
    else{
      if(moves[move] > Number( moves[choices[0]] ) ) choices = [Number(move)];
      else if(moves[move] == Number( moves[choices[0]] )) choices.push(Number(move));
    }
  })

  var num = choices.length;
  if(num == 1) return choices[0]
  else return choices[Math.floor(Math.random() * num)];

}

function getEnemyOldestUsedMove(moves, history){
  var historyLen = history.length;
  for(int i = historyLen - 1; i >= 0; i--){
    if(moves.length == 1) return moves[0];
    var index = moves.indexOf(history[i].enemyMove);
    if(index !== -1){
      moves.splice(index,1);
    }
  }
}
