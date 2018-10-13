function Combat(game) {
  this.game = game;
  this.charPosX = 50;
  this.charPosY = 300;
  this.enemyPosX = 700;
  this.enemyPosY = 80;
  this.backgrounds = [
    "./images/battle_background_help_1_by_faria4-d4i6gca.jpg",
    "./images/Battleback_veldt_a.png"
  ];
  this.charImg = new Image();
  this.charImg.src = "./images/altair.png";
  this.battleBackground = new Image();
  this.battleBackground.src = "./images/Battleback_veldt_a.png";
  this.healthbar = new Image();
  this.healthbar.src = "./images/health-bar.png";
  this.enemyimage = new Image();
  this.enemyimage.src = "./images/Floating_Eye-enemy-ffx.png";
}

Combat.prototype.print = function() {
  var canvas = this.game.canvas;
  var ctx = this.game.ctx;
  var enemyHealth =
    (this.game.enemy.currentHP / this.game.enemy.maxHP) * 100 * 3.6;
  var charHealth =
    (this.game.char.currentHP / this.game.char.maxHP) * 100 * 3.6;
  document.querySelector(".combat_menu").className = "combat_menu on";
  ctx.drawImage(this.battleBackground, 0, 0, canvas.width, canvas.height - 150);
  ctx.fillStyle = "#FD1629";
  ctx.fillRect(120, 105, enemyHealth, 25);
  ctx.fillRect(640, 555, charHealth, 25);
  ctx.drawImage(this.healthbar, 30, 50, 500, 150);
  ctx.drawImage(this.healthbar, 550, 500, 500, 150);
  ctx.drawImage(this.enemyimage, this.enemyPosX, this.enemyPosY, 300, 300);
  ctx.drawImage(this.charImg, this.charPosX, this.charPosY, 500, 700);
};

Combat.prototype.endCombat = function() {};
