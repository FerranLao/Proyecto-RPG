function Enemies(game){
    this.game=game;
    this.level = this.game.char.level;
    this.maxHP = Math.round(Math.random()*(40 - 20)+20)+this.level*5;
    this.currentHP = this.maxHP;
    this.strenght = Math.round(Math.random()*(7-3)+3);
    this.critChance = 5;
    
    this.givenExp = Math.round(Math.random()*(200-300)+200);
    this.defense = false;
    this.nameArr = [];
    this.name = this.nameArr[Math.floor(Math.random()*(0-this.nameArr.length))]
    
}

Enemies.prototype.attack = function(){
    this.game.char.currentHP = this.game.char.currentHP - this.strenght;

}

Enemies.prototype.defense = function(){

}

Enemies.prototype.magic = function(){

}

Enemies.prototype.scape = function(){
    
}
