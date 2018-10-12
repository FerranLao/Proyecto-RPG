function Character(game) {
  //valores personaje
  this.game = game;
  this.maxHP = 100 //+ 20 * this.level; //+mods
  this.currentHP = this.maxHP;
  this.maxMP = 100 + 20 * this.level;
  this.currentMP = this.maxMP + 20 * this.level;
  this.strength = 10 //+ (2 * this.level);
  this.magStrength = 10 + 2 * this.level;
  this.level = 1;
  this.currentExp = 0;
  this.needExp = 500 + 100 * this.level;
  this.critChance = 5 + this.level;
  this.def = false;

  //movimiento
  this.positionX = 490;
  this.positionY = 280;
  this.speed = 5;
  this.combatChance = 1; //frecuencia combate
  this.img = new Image();
  this.img.src = "./images/patricio.png";
}
Character.prototype.print = function() {
  var ctx = this.game.ctx;
  var that = this;
  ctx.drawImage(that.img, that.positionX, that.positionY, 50, 50);
};

Character.prototype.attack = function() {
  game.enemy.currentHP= game.enemy.currentHP -this.strength;
  console.log(this.game.enemy.currentHP)
};

Character.prototype.move = function(key) {
  switch (key) {
    case "w":
      this.positionY -= this.speed;
      if (this.positionY === -30) {
        this.positionY = 800;
      }
      break;

    case "a":
      this.positionX -= this.speed;
      if (this.positionX === -30) {
        this.positionX = 1200;
      }
      break;

    case "s":
      this.positionY += this.speed;
      if (this.positionY === 800) {
        this.positionY = -30;
      }
      break;

    case "d":
      this.positionX += this.speed;
      if (this.positionX === 1200) {
        this.positionX = -30;
      }
      break;
  }
};

Character.prototype.defense = function() {};

Character.prototype.lvlUp = function() {};

Character.prototype.win = function() {
  if(this.game.enemy.currentHP<=0){
    return true;
  }
};

Character.prototype.lose = function() {};

Character.prototype.combatStart = function() {
  var random = Math.round(Math.random() * 100);
  if (random <= this.combatChance) {
    this.game.combatStatus = true;
    console.log("combat");
    return true;
  }
};

Character.prototype.Spells = function() {};
