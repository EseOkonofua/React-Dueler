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
console.log(getMostUsedMove({0:2,1:2,2:2}));
