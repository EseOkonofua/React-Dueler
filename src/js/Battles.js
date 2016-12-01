const Battles = [
    {
        name:"Ratt",
        health:2,
        getMove:function(player = null){
            return 0;
        }
    },
    {
        name:"Harvest",
        health:3,
        getMove:function(player = null){
            let healthPercent = (this.health/this.maxHealth)*100.0;
            if(healthPercent < 50.0 ){
                return 1;
            }
            else return 0;
        }
    },
    {
        name:"Atum",
        health:4,
        getMove:function(player = null){
            //Mushrooms alternate between attacks and defends
            if((this.round % 2) == 0) return 0;
            else return 2;
        }
    }
];

export default Battles
