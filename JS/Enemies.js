function Enemies(game){
    this.game=game;
    this.maxHP = 500//Math.round(Math.random()*(20-40)+20)+this.level*5;
    this.currentHP = this.maxHP;
    this.strenght = Math.round(Math.random()*(3-7));
    this.critChance = 5;
    this.level = Character.level;
    this.givenExp = Math.round(Math.random()*(200-300)+200);
    this.defense = false;
    this.nameArr = [];
    this.name = this.nameArr[Math.floor(Math.random()*(0-this.nameArr.length))]
    
}

Enemies.prototype.attack = function(){

}

Enemies.prototype.defense = function(){

}

Enemies.prototype.magic = function(){

}

Enemies.prototype.scape = function(){
    
}
