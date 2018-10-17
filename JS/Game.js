var game;
function Game() {
  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.map = new Map(this);
  this.char = new Character(this);
  this.combat = new Combat(this);
  this.enemy = new Enemies(this);
  this.combatStatus = false;
}

Game.prototype.start = function() {
  window.requestAnimationFrame(print);
};

Game.prototype.newEnemy = function() {
  this.enemy = new Enemies(this);
};

function print() {
  if (!game.combatStatus) {
    game.map.printMap();
    game.char.print();
  } else {
    game.combat.print();
  }
  window.requestAnimationFrame(print);
}
