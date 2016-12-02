export default class Battle {
    constructor(options){
        //Player stuff
        this.playerHealth = 5;

        //enemy stuff
        this.enemyName = options.name;
        this.enemyHealth = options.health;
        this.getMove = options.getMove.bind(this);
        this.nextMove = this.getMove();

        //GUI-Controls stuff
        this.state = "ENEMY_INFO"
        this.selectedMove = null;
        this.rounds = [];
    }
}
