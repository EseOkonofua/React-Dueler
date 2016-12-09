function getMostUsedMove(moves){
  //Attack->Heavy->Counter
  var choices = [];
  Object.keys(moves).forEach(move=>{
    if(choices.length <= 0) choices.push(move);
    else{
      console.log("Moves move: "+moves[move])
      console.log("choices[0]: " +choices[0])
      if(moves[move] > Number( moves[choices[0]] ) ) choices = [Number(move)];
      else if(moves[move] == Number( moves[choices[0]] )) choices.push(Number(move));
    }
  })

  var num = choices.length;
  if(num == 1) return choices[0]
  else return choices[Math.floor(Math.random() * num)];

}

console.log(getMostUsedMove({0:0,1:2,2:2}));
