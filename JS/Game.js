var game;
function Game() {
  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.map = new Map(this);
  this.char = new Character(this);
  this.combat = new Combat(this);
  this.enemy = new Enemies(this);
  this.gameoverimg = new Image();
  this.gameoverimg.src = "./images/tittle screen.png";
  this.combatStatus = true;
  this.gameOver = true;
  this.finalBoss = false;
  //sounds and music
  this.song = new Audio("./sounds/song.mp3");
  this.song.volume = 0.3;
  this.song.loop = true;
  this.battletheme = new Audio("./sounds/battle-Theme.mp3");
  this.battletheme.volume = 0.3;
  this.battletheme.loop = true;
  this.chestsound = new Audio("./sounds/door.wav");
  this.drinksound = new Audio("./sounds/bubble2.wav");
  this.fireballsound = new Audio("./sounds/fireball.wav");
  this.nelson = new Audio("./sounds/the-simpsons-nelsons-haha.mp3");
  this.attacksound = new Audio("./sounds/punch.mp3");
  this.wincombat = new Audio("./sounds/12_3.mp3");
  this.chargesound = new Audio(
    "./sounds/Power_Up_Ray-Mike_Koenig-800933783.mp3"
  );
  this.defsound = new Audio(
    "./sounds/Swords_Collide-Sound_Explorer-2015600826.mp3"
  );
  this.bosstheme = new Audio("./sounds/16-one-winged-angel.mp3");
  this.bosstheme.volume = 0.5;
  this.victorytheme = new Audio("./sounds/victory_fanfare.mp3");
  this.wingssound = new Audio("./sounds/wings.mp3");
  this.roarsound = new Audio("./sounds/Roar.mp3");
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
    this.wincombat.play();
    this.enemy.loot();
    this.enemy.giveExp();
    setTimeout(function() {
      if (that.finalBoss) {
        that.bosstheme.pause();
        that.victorytheme.play();
        that.gameOver = true;
        that.gameoverimg.src = "./images/victory.jpg";
      } else {
        that.newEnemy();
        that.combatStatus = false;
        that.battletheme.pause();
        that.song.play()
      }
      document.querySelector(".combat_menu").className = "combat_menu off";
    }, 1500);
  } else {
    setTimeout(function() {
      that.enemy.behavior();
      if (that.char.lose()) {
      }
    }, 1500);
  }
  this.enemy.bossFases();
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
