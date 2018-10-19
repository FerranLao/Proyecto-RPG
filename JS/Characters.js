function Character(game) {
  //valores personaje
  this.game = game;
  this.level = 1;
  this.maxHP = 50 + 10 * this.level;
  this.currentHP = this.maxHP;
  this.maxMP = 15 + 5 * this.level;
  this.currentMP = this.maxMP;
  this.strength = 10 + 2 * this.level;
  this.magStrength = 15 + 3 * this.level;
  this.currentExp = 0;
  this.needExp = 500 + 100 * this.level;
  this.def = false;
  this.dmgDone = 0;
  this.magOn = false;
  this.objects = {
    potion: 2,
    elixir: 0
  };
  //movimiento
  this.positionX = 490;
  this.positionY = 280;
  this.speed = 5;
  this.combatChance = 0;
  this.img = new Image();
  this.img.src = "./images/castlecrasher.png";
}
Character.prototype.print = function() {
  var ctx = this.game.ctx;
  var that = this;
  ctx.drawImage(that.img, that.positionX, that.positionY, 50, 50);
};

Character.prototype.attack = function() {
  var that = this;
  var counter = 0;
  var posx = this.game.combat.charPosX;
  var posy = this.game.combat.charPosY;
  var attackAnimation = setInterval(function() {
    that.game.combat.charPosX += 2;
    that.game.combat.charPosY -= 2;
    counter += 1;
    if (counter === 30) {
      clearInterval(attackAnimation);
      that.game.combat.charPosX = posx;
      that.game.combat.charPosY = posy;
    }
  }, 16);

  if (this.game.enemy.def) {
    this.game.enemy.currentHP =
      game.enemy.currentHP - Math.round(this.strength / 2);
    this.dmgDone = Math.round(this.strength / 2);
    this.game.enemy.def = false;
  } else {
    this.game.enemy.currentHP = game.enemy.currentHP - this.strength;
    this.dmgDone = this.strength;
  }
  this.game.combat.textBar("You done " + this.dmgDone + " points of damage");
};

Character.prototype.move = function(key) {
  switch (key) {
    case "w":
      this.positionY -= this.speed;
      if (this.positionY === -30) {
        this.positionY = 800;
        if (this.game.map.mapIndexY === 0) {
          this.game.map.mapIndexY = this.game.map.maps.length - 1;
          this.game.map.img.src = this.game.map.maps[this.game.map.mapIndexY][
            this.game.map.mapIndexX
          ].map;
          this.game.combat.battleBackground.src = this.game.map.maps[
            this.game.map.mapIndexY
          ][this.game.map.mapIndexX].battle;
        } else {
          this.game.map.mapIndexY -= 1;
          this.game.map.img.src = this.game.map.maps[this.game.map.mapIndexY][
            this.game.map.mapIndexX
          ].map;
          this.game.combat.battleBackground.src = this.game.map.maps[
            this.game.map.mapIndexY
          ][this.game.map.mapIndexX].battle;
        }
      }
      break;

    case "a":
      this.img.src = "./images/castlecrasher2.png";
      this.positionX -= this.speed;
      if (this.positionX === -30) {
        this.positionX = 1200;
        if (this.game.map.mapIndexX === 0) {
          this.game.map.mapIndexX = this.game.map.maps.length - 1;
          this.game.map.img.src = this.game.map.maps[this.game.map.mapIndexY][
            this.game.map.mapIndexX
          ].map;
          this.game.combat.battleBackground.src = this.game.map.maps[
            this.game.map.mapIndexY
          ][this.game.map.mapIndexX].battle;
        } else {
          this.game.map.mapIndexX -= 1;
          this.game.map.img.src = this.game.map.maps[this.game.map.mapIndexY][
            this.game.map.mapIndexX
          ].map;
          this.game.combat.battleBackground.src = this.game.map.maps[
            this.game.map.mapIndexY
          ][this.game.map.mapIndexX].battle;
        }
      }

      break;

    case "s":
      this.positionY += this.speed;
      if (this.positionY === 800) {
        this.positionY = -30;
        if (this.game.map.mapIndexY === this.game.map.maps.length - 1) {
          this.game.map.mapIndexY = 0;
          this.game.map.img.src = this.game.map.maps[this.game.map.mapIndexY][
            this.game.map.mapIndexX
          ].map;
          this.game.combat.battleBackground.src = this.game.map.maps[
            this.game.map.mapIndexY
          ][this.game.map.mapIndexX].battle;
        } else {
          this.game.map.mapIndexY += 1;
          this.game.map.img.src = this.game.map.maps[this.game.map.mapIndexY][
            this.game.map.mapIndexX
          ].map;
          this.game.combat.battleBackground.src = this.game.map.maps[
            this.game.map.mapIndexY
          ][this.game.map.mapIndexX].battle;
        }
      }
      break;

    case "d":
      this.img.src = "./images/castlecrasher.png";
      this.positionX += this.speed;
      if (this.positionX === 1200) {
        this.positionX = -30;
        if (this.game.map.mapIndexX === this.game.map.maps.length - 1) {
          this.game.map.mapIndexX = 0;
          this.game.map.img.src = this.game.map.maps[this.game.map.mapIndexY][
            this.game.map.mapIndexX
          ].map;
          this.game.combat.battleBackground.src = this.game.map.maps[
            this.game.map.mapIndexY
          ][this.game.map.mapIndexX].battle;
        } else {
          this.game.map.mapIndexX += 1;
          this.game.map.img.src = this.game.map.maps[this.game.map.mapIndexY][
            this.game.map.mapIndexX
          ].map;
          this.game.combat.battleBackground.src = this.game.map.maps[
            this.game.map.mapIndexY
          ][this.game.map.mapIndexX].battle;
        }
      }
      break;
  }
};

Character.prototype.defense = function() {
  this.game.combat.textBar("You adopted a defensive position");
  this.def = true;
};

Character.prototype.win = function() {
  if (this.game.enemy.currentHP <= 0) {
    this.game.enemy.currentHP = 0;
    return true;
  }
};

Character.prototype.lose = function() {
  if (this.currentHP <= 0) {
    document.querySelector(".combat_menu").className = "combat_menu off";
    this.currentHP = 0;
    this.game.gameOver = true;
    this.game.combatStatus = false;
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
  var that = this;
  var counter = 0;
  var posx = this.game.combat.fireballX;
  var posy = this.game.combat.fireballY;
  if (this.game.char.currentMP < 5) {
    this.game.combat.textBar(
      "You tried to cast a spell but didn't have enought mana"
    );
  } else {
    this.magOn = true;
    var attackAnimation = setInterval(function() {
      that.game.combat.fireballX += 8;
      that.game.combat.fireballY -= 8;
      counter += 1;
      if (counter === 30) {
        clearInterval(attackAnimation);
        that.game.combat.fireballX = posx;
        that.game.combat.fireballY = posy;
        that.magOn = false;
      }
    }, 16);

    if (this.game.enemy.def) {
      this.game.enemy.currentHP =
        game.enemy.currentHP - Math.round(this.magStrength / 2);
      this.dmgDone = Math.round(this.magStrength / 2);
      this.game.enemy.def = false;
    } else {
      this.game.enemy.currentHP = game.enemy.currentHP - this.magStrength;
      this.dmgDone = this.magStrength;
    }
    this.currentMP -= 5;
    this.game.combat.textBar(
      "Your spell did " + this.dmgDone + " points of damage"
    );
  }
};

Character.prototype.potion = function() {
  if (this.objects.potion > 0) {
    var heal = this.currentHP;
    this.currentHP += 100;
    if (this.currentHP > this.maxHP) {
      this.currentHP = this.maxHP;
    }
    heal = this.currentHP - heal;
    this.objects.potion -= 1;
    this.game.combat.textBar("Restored " + heal + " points of health");
    document.getElementById("objects_container").className = "off";
  }
};

Character.prototype.elixir = function() {
  if (this.objects.elixir > 0) {
    this.currentHP = this.maxHP;
    this.currentMP = this.maxMP;
    this.objects.elixir -= 1;
    this.game.combat.textBar("Fully restored");
    document.getElementById("objects_container").className = "off";
  }
};

Character.prototype.lvlUp = function() {
  this.maxHP = 50 + 10 * this.level;
  this.currentHP = this.maxHP;
  this.maxMP = 15 + 5 * this.level;
  this.currentMP = this.maxMP;
  this.strength = 10 + 2 * this.level;
  this.magStrength = 15 + 3 * this.level;
  this.needExp = 500 + 100 * this.level;
};

Character.prototype.Run = function() {
  var random = Math.round(Math.random() * 100);
  if (random <= 50) {
    return true;
  }
};
