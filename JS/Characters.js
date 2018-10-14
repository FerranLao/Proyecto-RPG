function Character(game) {
  //valores personaje
  this.game = game;
  this.level = 1;
  this.maxHP = 50 + 10 * this.level; //+mods
  this.currentHP = this.maxHP;
  this.maxMP = 15 + 5 * this.level;
  this.currentMP = this.maxMP + 20 * this.level;
  this.strength = 10 + 2 * this.level;
  this.magStrength = 15 + 3 * this.level;
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
  this.img.src = "./images/castlecrasher.png";
}
Character.prototype.print = function() {
  var ctx = this.game.ctx;
  var that = this;
  ctx.drawImage(that.img, that.positionX, that.positionY, 50, 50);
};

Character.prototype.attack = function() {
  var that = this
  var counter = 0;
  var posx= this.game.combat.charPosX;
  var posy= this.game.combat.charPosY;
  var attackAnimation = setInterval(function(){
    
    that.game.combat.charPosX+=2;
    that.game.combat.charPosY-=2;
    counter+=1
    if(counter===30){
      clearInterval(attackAnimation);
      that.game.combat.charPosX= posx;
      that.game.combat.charPosY=posy;
    }
  },16)
  if ((this.game.enemy.def = true)) {
    this.game.enemy.currentHP = game.enemy.currentHP - this.strength / 2;
  } else {
    this.game.enemy.currentHP = game.enemy.currentHP - this.strength;
  }
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
      this.img.src = "./images/castlecrasher2.png";
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
      this.img.src = "./images/castlecrasher.png";
      this.positionX += this.speed;
      if (this.positionX === 1200) {
        this.positionX = -30;
      }
      break;
  }
};

Character.prototype.defense = function() {
  this.def = true;
};

Character.prototype.win = function() {
  if (this.game.enemy.currentHP <= 0) {
    document.querySelector(".combat_menu").className = "combat_menu off";
    return true;
  }
};

Character.prototype.lose = function() {
  if (this.game.char.currentHP <= 0) {
    alert("YOU LOSE");
    return true;
  }
};

Character.prototype.combatStart = function() {
  var random = Math.round(Math.random() * 100);
  if (random <= this.combatChance) {
    this.game.combatStatus = true;
    return true;
  }
};

Character.prototype.fireBall = function() {
  if ((this.game.enemy.def = true)) {
    this.game.enemy.currentHP = game.enemy.currentHP - this.magStrength / 2;
  } else {
    this.game.enemy.currentHP = game.enemy.currentHP - this.magStrength;
  }
  this.currentMP -= 5;
  console.log(this.currentMP);
};

Character.prototype.lvlUp = function() {
  this.maxHP = 50 + 10 * this.level; //+mods
  this.currentHP = this.maxHP;
  this.maxMP = 100 + 20 * this.level;
  this.currentMP = this.maxMP + 20 * this.level;
  this.strength = 10 + 2 * this.level;
  this.magStrength = 10 + 2 * this.level;
  this.needExp = 500 + 100 * this.level;
  this.critChance = 5 + this.level;
};

Character.prototype.Run = function() {
  var random = Math.round(Math.random() * 100);
  if (random <= 50) {
    document.querySelector(".combat_menu").className = "combat_menu off";
    return true;
  }
};
