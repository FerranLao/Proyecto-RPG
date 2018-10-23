var game;
function Game() {
  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.map = new Map(this);
  this.char = new Character(this);
  this.combat = new Combat(this);
  this.enemy = new Enemies(this);
  this.gameoverimg = new Image();
  this.gameoverimg.src = "./images/gameover.jpg";
  this.combatStatus = false;
  this.gameOver = false;
}

Game.prototype.start = function() {
  window.requestAnimationFrame(print);
};

Game.prototype.newEnemy = function() {
  this.enemy = new Enemies(this);
  this.enemy.def = false;
  this.enemy.charging = false;
};

Game.prototype.combatFlow = function() {
  var that = this;
  if (this.char.win()) {
    //this.char.currentHP = this.char.maxHP;
    this.enemy.loot();
    this.enemy.giveExp();
    setTimeout(function() {
      that.newEnemy();
      that.combatStatus = false;
      document.querySelector(".combat_menu").className = "combat_menu off";
    }, 1500);
  } else {
    setTimeout(function() {
      that.enemy.behavior();
      if (that.char.lose()) {
      }
    }, 1500);
  }
};

Game.prototype.collisions = function(object1, object2) {
  if (
    object1.positionX + object1.width >= object2.positionX &&
    object1.positionX < object2.positionX + object2.width &&
    object1.positionY < object2.positionY + object2.height &&
    object1.positionY + object1.height > object2.positionY
  ) {
    return true;
  }
};

function print() {
  if (!game.combatStatus) {
    game.map.printMap();
    game.char.print();
    game.enemy.bossFight();
  } else {
    game.combat.print();
  }
  window.requestAnimationFrame(print);
}
