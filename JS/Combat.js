function Combat(game) {
  this.game = game;
  this.charPosX = 50;
  this.charPosY = 350;
  this.enemyPosX = 700;
  this.enemyPosY = 80;
  this.charImg = new Image();
  this.charImg.src = "./images/altair.png";
  this.battleBackground = new Image();
  this.battleBackground.src = this.game.map.maps[this.game.map.mapIndexY][
    this.game.map.mapIndexX
  ].battle;
  this.healthbar = new Image();
  this.healthbar.src = "./images/health-bar.png";
  this.manabar = new Image();
  this.manabar.src = "./images/mana-bar.png";
  this.xpbar = new Image();
  this.xpbar.src = "./images/xpbar.png";
  this.shield = new Image();
  this.shield.src = "./images/shield.png";
  this.fireball = new Image();
  this.fireball.src = "./images/fireball-clipart-comet-14.png";
  this.fireballX = 350;
  this.fireballY = 450;
  this.chargeAura = new Image();
  this.chargeAura.src = "./images/chargeUp.png";
}
Combat.prototype.textBar = function(message) {
  var textArea = document.querySelector(".textArea");
  textArea.innerText = message;
  textArea.classList.add("show");
  setTimeout(function() {
    textArea.classList.remove("show");
  }, 1500);
};

Combat.prototype.print = function() {
  var canvas = this.game.canvas;
  var ctx = this.game.ctx;
  var enemyHealth = (this.game.enemy.currentHP / this.game.enemy.maxHP) * 360;
  var charHealth = (this.game.char.currentHP / this.game.char.maxHP) * 360;
  var charMana = (this.game.char.currentMP / this.game.char.maxMP) * 360;
  document.querySelector(".combat_menu").className = "combat_menu on";
  ctx.drawImage(this.battleBackground, 0, 0, canvas.width, canvas.height - 150);
  ctx.fillStyle = "#FD1629";
  ctx.fillRect(120, 105, enemyHealth, 25);
  ctx.fillRect(640, 555, charHealth, 25);
  ctx.fillStyle = "#000CFF";
  ctx.fillRect(700, 585, charMana, 20);

  ctx.drawImage(this.healthbar, 30, 50, 500, 150);
  ctx.drawImage(this.healthbar, 550, 500, 500, 150);
  ctx.drawImage(this.manabar, 580, 560, 500, 70);
  ctx.fillStyle = "#000000";
  ctx.font = "25px Arial";
  ctx.fillText(
    this.game.enemy.currentHP + "/" + this.game.enemy.maxHP,
    250,
    127
  );
  ctx.fillText(this.game.char.currentMP + "/" + this.game.char.maxMP, 830, 604);
  ctx.fillText(this.game.char.currentHP + "/" + this.game.char.maxHP, 780, 577);
  ctx.fillText("Level:" + game.enemy.level, 500, 127);
  ctx.fillText("Level:" + game.char.level, 1020, 577);
  ctx.drawImage(
    this.game.enemy.enemyimage,
    this.enemyPosX,
    this.enemyPosY,
    300,
    300
  );
  ctx.drawImage(this.charImg, this.charPosX, this.charPosY, 500, 700);
  if (this.game.char.def) {
    ctx.drawImage(this.shield, 480, 500, 80, 80);
  }
  if (this.game.enemy.def) {
    ctx.drawImage(this.shield, 585, 80, 80, 80);
  }
  if (this.game.char.magOn) {
    ctx.drawImage(this.fireball, this.fireballX, this.fireballY, 180, 180);
  }
  if (this.game.enemy.charging) {
    ctx.drawImage(
      this.chargeAura,
      this.enemyPosX - 180,
      this.enemyPosY - 30,
      700,
      500
    );
  }
  if (this.game.gameOver) {
    ctx.drawImage(this.game.gameoverimg, 0, 0, 1200, 800);
    document.querySelector(".combat_menu").className = "combat_menu off";
  }
};
