export default class Battle {
    constructor(options){
        //Player stuff
        this.playerHealth = options.playerHealth || 3;

        //enemy stuff
        this.enemyName = options.name;
        this.enemyHealth = options.health;
        this.enemyMaxHealth = options.health;
        this.enemyDescription = options.description;
        this.getMove = options.getMove;
        this.nextMove = null;
        //GUI-Controls stuff
        this.state = "ENEMY_INFO"
        this.selectedMove = null;
        this.rounds = [];
    }
}
