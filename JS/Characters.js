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
    potion: 0,
    elixir: 0
  };
  //movimiento
  this.positionX = 490;
  this.positionY = 280;
  this.width = 70;
  this.height = 70;
  this.direction;
  this.speed = 5;
  this.combatChance = 0;
  this.img = new Image();
  this.img.src = "./images/altairmapd.png";
  this.moveright = [
    "./images/altairmap1d.png",
    "./images/altairmap2d.png",
    "./images/altairmap1d.png",
    "./images/altairmap3d.png"
  ];
  this.moveleft = [
    "./images/altairmap1i.png",
    "./images/altairmap2i.png",
    "./images/altairmap1i.png",
    "./images/altairmap3i.png"
  ];
  this.right = 0;
  this.left = 0;
  this.orientation = "d";
  this.movecounter = 0;
}
Character.prototype.print = function() {
  var ctx = this.game.ctx;
  var that = this;
  ctx.drawImage(
    that.img,
    that.positionX,
    that.positionY,
    this.width,
    this.width
  );
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
  this.game.attacksound.play();
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

Character.prototype.mapInteraction = function(key) {
  var positionX = this.positionX;
  var positionY = this.positionY;
  switch (key) {
    case "w":
      this.positionY -= this.speed;
      this.direction = "w";
      this.combatStart();
      break;

    case "a":
      this.direction = "a";
      this.orientation = "a";

      this.positionX -= this.speed;
      this.combatStart();
      break;

    case "s":
      this.direction = "s";
      this.positionY += this.speed;
      this.combatStart();
      break;

    case "d":
      this.direction = "d";
      this.orientation = "d";

      this.positionX += this.speed;
      this.combatStart();
      break;

    case "e":
      this.potion();
      break;

    case "r":
      this.elixir();
      break;

    case "m":
      if (this.game.map.legendmapstatus) {
        this.game.map.legendmapstatus = false;
      } else {
        this.game.map.legendmapstatus = true;
      }
      break;

    case "i":
      if (this.game.map.openinventory) {
        this.game.map.openinventory = false;
      } else {
        this.game.map.openinventory = true;
      }
  }
  this.game.map.mapChange();
  this.openChest();
  this.move();
  if (this.obstacleCollision()) {
    this.positionX = positionX;
    this.positionY = positionY;
  }
};

Character.prototype.defense = function() {
  this.game.combat.textBar("You adopted a defensive position");
  this.game.defsound.play();
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
    var that = this;
    document.querySelector(".combat_menu").className = "combat_menu off";
    this.currentHP = 0;
    this.game.combat.textBar("YOU DIED!");
    setTimeout(function() {
      that.game.song.pause();
      that.game.bosstheme.pause();
      that.game.nelson.play();
      that.game.gameoverimg.src = "./images/gameover.jpg";
      that.game.gameOver = true;
    }, 1000);
    return true;
  }
};

Character.prototype.combatStart = function() {
  var random = Math.round(Math.random() * 100);
  if (random <= this.combatChance) {
    this.game.combatStatus = true;
    this.game.song.pause();
    this.game.battletheme.play();
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
    this.game.fireballsound.play();
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
    this.game.drinksound.play();
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
    this.game.drinksound.play();
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
    document.querySelector(".combat_menu").className = "combat_menu off";
    this.game.battletheme.pause();
    this.game.song.play();
    return true;
  }
};
Character.prototype.openChest = function() {
  var current = this.game.map.chest[this.game.map.mapIndexY][
    this.game.map.mapIndexX
  ];
  if (this.game.collisions(this, current)) {
    if (!current.open) {
      this.game.chestsound.play();
      this.game.map.chestLoot();
      current.open = true;
      current.img.src = "./images/openchest.png";
    }
  }
};
Character.prototype.obstacleCollision = function() {
  var obstacle1 = this.game.map.obstacles[this.game.map.mapIndexY][
    this.game.map.mapIndexX
  ].obstacle1;
  var obstacle2 = this.game.map.obstacles[this.game.map.mapIndexY][
    this.game.map.mapIndexX
  ].obstacle2;
  if (
    this.game.collisions(this, obstacle1) ||
    this.game.collisions(this, obstacle2)
  ) {
    return true;
  }
};
Character.prototype.move = function() {
  this.movecounter += 1;
  if (this.movecounter === 3) {
    if (this.orientation === "d") {
      this.right += 1;
      this.img.src = this.moveright[this.right];
      if (this.right === 3) {
        this.right = 0;
      }
    }
    if (this.orientation === "a") {
      this.left += 1;
      this.img.src = this.moveleft[this.left];
      if (this.left === 3) {
        this.left = 0;
      }
    }
    this.movecounter = 0;
  }
};
Character.prototype.stand = function() {
  if (this.orientation === "d") {
    this.img.src = "./images/altairmapd.png";
  } else {
    this.img.src = "./images/altairmapi.png";
    }
};
