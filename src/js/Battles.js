const Battles = [
    {
        name:"Sly",
        health:2,
        getMove:function(env){
            return 0;
        }
    },
    {
        name:"Harvest",
        health:3,
        getMove:function(env){
            let healthPercent = (env.enemyHealth/env.enemyMaxHealth)*100.0;
            if(healthPercent < 50.0 ){
                return 1;
            }
            else return 0;
        }
    },
    {
        name:"Atum",
        health:4,
        getMove:function(env){
            let rounds = env.rounds.length;
            //Mushrooms alternate between attacks and defends
            if((rounds % 2) == 0) return 0;
            else return 2;
        }
    }
];

export default Battles
