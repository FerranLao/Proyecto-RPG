function Enemies(game) {
  this.game = game;
  this.level = this.game.char.level;
  this.maxHP = Math.round(Math.random() * (40 - 20) + 20) + this.level * 5;
  this.currentHP = this.maxHP;
  this.strenght = Math.round(Math.random() * (7 - 3) + 3);
  this.critChance = 5;
  this.givenExp =
    Math.round(Math.random() * (300 - 200) + 200) + 30 * this.level;
  this.enemyImgArr = [
    "./images/Enemies/Floating_Eye-enemy-ffx.png",
    "./images/Enemies/FFXIII_enemy_Flanborg.png",
    "./images/Enemies/SW.png",
    "./images/Enemies/Gigant Shadow.png",
    "./images/Enemies/khx-possessor.png",
    "./images/Enemies/patricio.png",
    "./images/Enemies/350px-Darkling_KHX.png",
    "./images/Enemies/Aeroplane_KHX.png",
    "./images/Enemies/khx-possessor.png",
    "./images/Enemies/khx-soldier.png",
    "./images/Enemies/mad_dog.png",
    "./images/Enemies/heartless08 - power wild.png"
  ];
  this.enemyimage = new Image();
  this.enemyimage.src = this.enemyImgArr[
    Math.floor(Math.random() * this.enemyImgArr.length)
  ];
  this.charging = false;
  this.def = false;
  this.dmgDone = 0;
}

Enemies.prototype.attack = function() {
  var that = this;
  var counter = 0;
  var posx = this.game.combat.enemyPosX;
  var posy = this.game.combat.enemyPosY;
  var attackAnimation = setInterval(function() {
    that.game.combat.enemyPosX -= 2;
    that.game.combat.enemyPosY += 2;
    counter += 1;
    if (counter === 30) {
      clearInterval(attackAnimation);
      that.game.combat.enemyPosX = posx;
      that.game.combat.enemyPosY = posy;
    }
  }, 16);

  if (this.game.char.def === false) {
    this.game.char.currentHP = this.game.char.currentHP - this.strenght;
    this.dmgDone = this.strenght;
  } else {
    this.game.char.currentHP =
      this.game.char.currentHP - Math.round(this.strenght / 2);
    this.game.char.def = false;
    this.dmgDone = Math.round(this.strenght / 2);
  }

  this.game.combat.textBar("You recived " + this.dmgDone + " points of damage");
};

Enemies.prototype.giveExp = function() {
  var oldExp = this.game.char.currentExp;
  this.game.char.currentExp += this.givenExp;
  if (this.game.char.currentExp >= this.game.char.needExp) {
    this.game.char.level += 1;
    this.game.char.currentExp = oldExp + this.givenExp - this.game.char.needExp;
    this.game.char.lvlUp();
  }
};

Enemies.prototype.defense = function() {
  this.def = true;
  this.game.combat.textBar("The enemy adopted a defensive position");
};

Enemies.prototype.magic = function() {
  if (this.charging) {
    var counter = 0;
    var that = this;
    var posx = this.game.combat.enemyPosX;
    var posy = this.game.combat.enemyPosY;
    var attackAnimation = setInterval(function() {
      that.game.combat.enemyPosX -= 2;
      that.game.combat.enemyPosY += 2;
      counter += 1;
      if (counter === 30) {
        clearInterval(attackAnimation);
        that.game.combat.enemyPosX = posx;
        that.game.combat.enemyPosY = posy;
      }
    }, 16);
    if (this.game.char.def) {
      this.game.char.currentHP =
        this.game.char.currentHP - Math.round(this.strenght * 1.5);
      this.dmgDone = Math.round(this.strenght * 1.5);
      this.charging = false;
    } else {
      this.game.char.currentHP = this.game.char.currentHP - this.strenght * 3;
      this.dmgDone = this.strenght * 3;
      this.charging = false;
    }
    this.game.combat.textBar(
      "You recived " + this.dmgDone + " points of damage"
    );
  } else {
    this.charging = true;
    this.game.combat.textBar("The enemy is charging energy");
  }
};

Enemies.prototype.behavior = function() {
  var random = Math.floor(Math.random() * 100);

  if (this.charging) {
    this.magic();
  } else {
    if (random <= 70) {
      this.attack();
    } else if (random <= 80 && random > 70) {
      this.defense();
    } else {
      this.magic();
    }
  }
};
