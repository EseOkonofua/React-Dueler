export default class Battle {
    constructor(options){
        //Player stuff
        this.playerHealth = 5;
        this.playerMoves = [];

        //enemy stuff
        this.enemyName = options.name;
        this.enemyHealth = options.health;
        this.getMove = options.getMove.bind(this);
        this.nextMove = this.getMove();
        this.enemyMoves = [];

    }
}
