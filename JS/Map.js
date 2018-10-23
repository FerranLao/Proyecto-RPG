function Map(game) {
  this.game = game;
  this.maps = [
    [
      {
        map: "./images/maps/snowmap.png",
        battle: "./images/maps/SNOWBATTLEBACK1.png"
      },
      {
        map: "./images/maps/pradera.png",
        battle: "./images/maps/Battleback_veldt_a.png"
      },
      {
        map: "./images/maps/beachmap.png",
        battle: "./images/maps/beachback.png"
      }
    ],
    [
      {
        map: "./images/maps/cityruins.png",
        battle: "./images/maps/cityback.jpg"
      },
      {
        map: "./images/maps/map2.png",
        battle: "./images/maps/Forest_1.png"
      },
      {
        map: "./images/maps/swampmap.png",
        battle: "./images/maps/Fetid_Swamp_Battle_Background.jpg"
      }
    ],
    [
      {
        map: "./images/maps/desertmap.png",
        battle: "./images/maps/desertback.png"
      },
      {
        map: "./images/maps/ruinsmap.png",
        battle: "./images/maps/ruinsback.png"
      },
      {
        map: "./images/maps/volvanicmap.png",
        battle: "./images/maps/volvanicback.jpg"
      }
    ]
  ];
  this.chest = [[], [], []];
  this.obstacles = [[], [], []];
  this.img = new Image();
  this.mapIndexY = 0;
  this.mapIndexX = 0;
  this.img.src = this.maps[this.mapIndexY][this.mapIndexX].map;
  //obstacle image
  this.obstacleimg = new Image();
  this.obstacleimg.src = "./images/obs.png";
  //boss images
  this.bossmap = new Image();
  this.bossmap.src = "./images/Enemies/sleeping-dragon-png-3.png";
  this.bossmapX = this.game.canvas.width / 2 - 150;
  this.bossmapY = this.game.canvas.height / 2 - 100;
  //objects
  this.potionimg = new Image();
  this.potionimg.src = "./images/healpotion.png";
  this.elixirimg = new Image();
  this.elixirimg.src = "./images/Elixir_of_Life.png";
  //legend map
  this.legendmapstatus = false;
  this.legendmapicon = new Image();
  this.legendmapicon.src = "./images/brujula.png";
  this.legendmap = new Image();
  this.legendmap.src = "./images/maplegend.png";
  this.legendmapdragon = new Image();
  this.legendmapdragon.src = "./images/dragon.png";
  this.legendmapchar = new Image();
  this.legendmapchar.src = "./images/mapchar.png";
}

Map.prototype.printMap = function() {
  var ctx = this.game.ctx;
  var obstacle1 = this.obstacles[this.mapIndexY][this.mapIndexX].obstacle1;
  var obstacle2 = this.obstacles[this.mapIndexY][this.mapIndexX].obstacle2;
  var charHealth = (this.game.char.currentHP / this.game.char.maxHP) * 215;
  var charMana = (this.game.char.currentMP / this.game.char.maxMP) * 215;
  var charXP = (this.game.char.currentExp / this.game.char.needExp) * 176;
  ctx.drawImage(
    this.img,
    0,
    0,
    this.game.canvas.width,
    this.game.canvas.height
  );
  //chest
  ctx.drawImage(
    this.chest[this.mapIndexY][this.mapIndexX].img,
    this.chest[this.mapIndexY][this.mapIndexX].positionX,
    this.chest[this.mapIndexY][this.mapIndexX].positionY,
    50,
    50
  );
  //UI
  ctx.fillStyle = "#ffffff";
  ctx.font = "25px Arial";
  ctx.fillText("E:", 30, 85);
  ctx.fillText("R:", 30, 135);
  ctx.fillText("M:", 1070, 750);
  ctx.fillText(this.game.char.objects.potion, 105, 85);
  ctx.fillText(this.game.char.objects.elixir, 105, 135);
  ctx.drawImage(this.potionimg, 50, 50, 50, 50);
  ctx.drawImage(this.elixirimg, 50, 100, 50, 50);
  ctx.fillStyle = "#FF0022";
  ctx.fillRect(85, 683, charHealth, 15);
  ctx.drawImage(this.game.combat.healthbar, 30, 650, 300, 90);
  ctx.fillStyle = "#000CFF";
  ctx.fillRect(90, 710, charMana, 10);
  ctx.drawImage(this.game.combat.manabar, 20, 700, 300, 30);
  ctx.fillStyle = "#C305C3";
  ctx.fillRect(125, 739, charXP, 10);
  ctx.drawImage(this.game.combat.xpbar, 0, 700, 350, 100);

  //obstacles
  ctx.fillStyle = "#FFCC00";
  ctx.drawImage(
    this.obstacleimg,
    obstacle1.positionX,
    obstacle1.positionY,
    obstacle1.width,
    obstacle1.height
  );
  ctx.drawImage(
    this.obstacleimg,
    obstacle2.positionX,
    obstacle2.positionY,
    obstacle2.width,
    obstacle2.height
  );
  //legendmap
  ctx.drawImage(this.legendmapicon, 1100, 700, 80, 80);
  if (this.legendmapstatus) {
    ctx.drawImage(this.legendmap, 800, 400, 400, 400);
    ctx.drawImage(this.legendmapdragon, 1050, 650, 70, 70);
    ctx.drawImage(
      this.legendmapchar,
      880 + 85 * this.mapIndexX,
      470 + this.mapIndexY * 85,
      70,
      70
    );
  }
  //boss
  if (this.mapIndexX === 2 && this.mapIndexY == 2) {
    ctx.drawImage(this.bossmap, this.bossmapX, this.bossmapY, 190, 140);
  }
};

Map.prototype.mapChange = function() {
  var char = this.game.char;
  if (char.positionY >= 800 && char.direction === "s") {
    char.positionY = -30;
    if (this.mapIndexY === this.maps.length - 1) {
      this.mapIndexY = 0;
    } else {
      this.mapIndexY += 1;
    }
  }
  if (char.positionX <= -30 && char.direction === "a") {
    char.positionX = 1200;
    if (this.mapIndexX == 0) {
      console.log("jsdhf");
      this.mapIndexX = this.maps.length - 1;
    } else {
      this.mapIndexX -= 1;
    }
  }
  if (char.positionY <= -30 && char.direction === "w") {
    char.positionY = 800;
    if (this.mapIndexY === 0) {
      this.mapIndexY = this.maps.length - 1;
    } else {
      this.mapIndexY -= 1;
    }
  }
  if (char.positionX >= 1200 && char.direction === "d") {
    char.positionX = -30;
    if (this.mapIndexX === this.maps.length - 1) {
      this.mapIndexX = 0;
    } else {
      this.mapIndexX += 1;
    }
  }
  this.mapSelect(this.mapIndexX, this.mapIndexY);
};

Map.prototype.mapSelect = function(indexX, indexY) {
  this.img.src = this.maps[indexX][indexY].map;
  this.game.combat.battleBackground.src = this.maps[indexX][indexY].battle;
};

Map.prototype.chestGenerator = function() {
  var that = this;
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      var chest = {
        positionX: Math.floor(Math.random() * (1100 - 50) + 50),
        positionY: Math.floor(Math.random() * (700 - 50) + 50),
        height: 50,
        width: 50,
        open: false,
        img: new Image()
      };
      chest.img.src = "./images/closedchest.png";
      this.chest[i].push(chest);
    }
  }
};

Map.prototype.chestLoot = function() {
  var random = Math.floor(Math.random() * 100);
  if (random < 70) {
    var number = Math.floor(Math.random() * (3 - 1) + 1);
    this.game.char.objects.potion += number;
    this.game.combat.textBar(
      "The chest contains " + number + " health potions"
    );
    this.chest[this.mapIndexY][this.mapIndexX].open = true;
  } else {
    var number = Math.floor(Math.random() * (2 - 1) + 1);
    this.game.char.objects.elixir += number;
    this.game.combat.textBar("The chest contains  " + number + " elixir");
  }
};
Map.prototype.obstacleGenerator = function() {
  for (var j = 0; j < 3; j++) {
    for (var i = 0; i < 3; i++) {
      do {
        var obstacle = {
          obstacle1: {
            positionX: Math.round(Math.random() * (500 - 50) + 50),
            positionY: Math.round(Math.random() * (500 - 50) + 50),
            height: Math.round(Math.random() * (200 - 100) + 100),
            width: Math.round(Math.random() * (200 - 100) + 100)
          },
          obstacle2: {
            positionX: Math.round(Math.random() * (1100 - 600) + 600),
            positionY: Math.round(Math.random() * (600 - 50) + 50),
            height: Math.round(Math.random() * (200 - 100) + 100),
            width: Math.round(Math.random() * (200 - 100) + 100)
          }
        };
        if (
          !this.game.collisions(obstacle.obstacle1, this.chest[i][j]) &&
          !this.game.collisions(obstacle.obstacle2, this.chest[i][j]) &&
          !this.game.collisions(obstacle.obstacle1, this.game.char)
        ) {
          this.obstacles[j].push(obstacle);
        }
      } while (
        this.game.collisions(obstacle.obstacle1, this.chest[i][j]) ||
        this.game.collisions(obstacle.obstacle2, this.chest[i][j]) ||
        this.game.collisions(obstacle.obstacle1, this.game.char)
      );
    }
  }
};
