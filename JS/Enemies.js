function Enemies(game) {
  this.game = game;
  this.level = this.game.char.level;
  this.maxHP = Math.round(Math.random() * (40 - 20) + 20) + this.level * 5;
  this.currentHP = this.maxHP;
  this.strenght = Math.round(Math.random() * (7 - 3) + 3);
  this.critChance = 5;

  this.givenExp = Math.round(Math.random() * (200 - 300) + 200);
  this.def = false;
  this.nameArr = [];
  this.name = this.nameArr[
    Math.floor(Math.random() * (0 - this.nameArr.length))
  ];
}

Enemies.prototype.attack = function() {
  if ((this.game.char.def === false)) {
    this.game.char.currentHP = this.game.char.currentHP - this.strenght;
    
  } else {
    this.game.char.currentHP = this.game.char.currentHP - Math.round(this.strenght/2);
    this.game.char.def = false;
  }
};

Enemies.prototype.giveExp= function(){
    var oldExp=this.game.char.currentExp
    this.game.char.currentExp+=this.givenExp
    if(this.game.char.currentExp>=this.game.char.needExp){
        this.game.char.level+=1
        this.game.char.currentExp=oldExp + this.givenExp - this.game.char.needExp;
    }
    console.log(this.game.char.currentExp + "/" + this.game.char.needExp);
}

Enemies.prototype.defense = function() {};

Enemies.prototype.magic = function() {};

Enemies.prototype.scape = function() {};
