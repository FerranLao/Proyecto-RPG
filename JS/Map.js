function Map(game) {
  this.game = game;
  //maps and battle backgounds
  this.maps = [
    [
      {
        map: "./images/maps/snowmap.png",
        battle: "./images/maps/SNOWBATTLEBACK1.png",
        obstacle: "./images/iceobstacle2.png"
      },
      {
        map: "./images/maps/pradera.png",
        battle: "./images/maps/Battleback_veldt_a.png",
        obstacle:"./images/obstacle.png"
      },
      {
        map: "./images/maps/beachmap.png",
        battle: "./images/maps/beachback.png",
        obstacle:"./images/obs.png"
      }
    ],
    [
      {
        map: "./images/maps/cityruins.png",
        battle: "./images/maps/cityback.jpg",
        obstacle:"./images/ruined_wall_4_by_cgartiste-d6fq8v8.png"
      },
      {
        map: "./images/maps/map2.png",
        battle: "./images/maps/Forest_1.png",
        obstacle: "./images/obstacle.png"
      },
      {
        map: "./images/maps/swampmap.png",
        battle: "./images/maps/Fetid_Swamp_Battle_Background.jpg",
        obstacle: "./images/Evil-Treant.png"
      }
    ],
    [
      {
        map: "./images/maps/desertmap.png",
        battle: "./images/maps/desertback.png",
        obstacle: "./images/Tauntaun-skull-and-bones.png"
      },
      {
        map: "./images/maps/ruinsmap.png",
        battle: "./images/maps/ruinsback.png",
        obstacle: "./images/obs.png"
      },
      {
        map: "./images/maps/volvanicmap.png",
        battle: "./images/maps/volvanicback.jpg",
        obstacle: "./images/Tauntaun-skull-and-bones.png"

      }
    ]
  ];
  this.img = new Image();
  this.mapIndexY = 0;
  this.mapIndexX = 0;
  this.img.src = this.maps[this.mapIndexY][this.mapIndexX].map;
  //chest and obstacles generated
  this.chest = [[], [], []];
  this.obstacles = [[], [], []];
  //obstacle image
  this.obstacleimg = new Image();
  this.obstacleimg.src = this.maps[this.mapIndexY][this.mapIndexX].obstacle;
  //boss images
  this.bossmap = new Image();
  this.bossmap.src = "./images/Enemies/funko-pop!deathwing.png";
  this.bossmapX = this.game.canvas.width / 2 - 150;
  this.bossmapY = this.game.canvas.height / 2 - 100;
  //objects
  this.potionimg = new Image();
  this.potionimg.src = "./images/healpotion.png";
  this.elixirimg = new Image();
  this.elixirimg.src = "./images/Elixir_of_Life.png";
  //inventory
  this.bagicon = new Image();
  this.bagicon.src = "./images/inventory/bag-512.png";
  this.openinventory = false;
  this.inventory = new Image();
  this.inventory.src = "./images/inventory/Inventory.png";
  //inventory items
  this.items = ["sword", "breastplate", "shield", "helmet"];
  this.sword = new Image();
  this.sword.src = "./images/inventory/MasterSword.png";
  this.haveSword = false;
  this.breastplate = new Image();
  this.breastplate.src = "./images/inventory/armor.png";
  this.haveBreastplate = false;
  this.shield = new Image();
  this.shield.src = "./images/inventory/hyruleshield.png";
  this.haveShield = false;
  this.helmet = new Image();
  this.helmet.src = "./images/inventory/helmet.png";
  this.haveHelmet = false;
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
  ctx.fillText("I:", 1075, 65);
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
  };
  //inventory
  ctx.fillStyle = "#ffffff";
  ctx.drawImage(this.bagicon, 1100, 20, 70, 70);
  if (this.openinventory) {
    ctx.drawImage(this.inventory, 800, 0, 400, 400);
    ctx.fillText("Strength:" + this.game.char.strength, 810, 50);
    ctx.fillText("Spell:" + this.game.char.magStrength, 810, 90);
    if (this.haveSword) {
      ctx.drawImage(this.sword, 825, 150, 60, 135);
    }
    if (this.haveBreastplate) {
      ctx.drawImage(this.breastplate, 930, 140, 140, 150);
    }
    if (this.haveShield) {
      ctx.drawImage(this.shield, 1120, 150, 60, 135);
    }
    if (this.haveHelmet) {
      ctx.drawImage(this.helmet, 965, 10, 70, 90);
    }
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
      this.game.char.positionY=785;
    } else {
      this.mapIndexY += 1;
    }
  }
  if (char.positionX <= -30 && char.direction === "a") {
    char.positionX = 1200;
    if (this.mapIndexX == 0) {
      this.game.char.positionX=-25;
    } else {
      this.mapIndexX -= 1;
    }
  }
  if (char.positionY <= -30 && char.direction === "w") {
    char.positionY = 800;
    if (this.mapIndexY === 0) {
      this.game.char.positionY=-25;
    } else {
      this.mapIndexY -= 1;
    }
  }
  if (char.positionX >= 1200 && char.direction === "d") {
    char.positionX = -30;
    if (this.mapIndexX === this.maps.length - 1) {
      this.game.char.positionX=1195;
    } else {
      this.mapIndexX += 1;
    }
  }
  this.mapSelect(this.mapIndexX, this.mapIndexY);
};

Map.prototype.mapSelect = function(indexX, indexY) {
  this.img.src = this.maps[indexX][indexY].map;
  this.game.combat.battleBackground.src = this.maps[indexX][indexY].battle;
  this.obstacleimg.src = this.maps[indexX][indexY].obstacle;
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
  var random2 = Math.floor(Math.random() * 100);
  var that = this;
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
  setTimeout(function() {
    if (random2 < 70) {
      that.itemApply(that.items);
    }
  }, 1500);
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
          this.obstacles[i].push(obstacle);
        }
      } while (
        this.game.collisions(obstacle.obstacle1, this.chest[i][j]) ||
        this.game.collisions(obstacle.obstacle2, this.chest[i][j]) ||
        this.game.collisions(obstacle.obstacle1, this.game.char)
      );
    }
  }
};

Map.prototype.itemApply = function(itemArr) {
  itemArr.sort(function(a, b){return 0.5 - Math.random()});
  switch (itemArr[0]) {
    case "sword":
      this.haveSword = true;
      this.game.char.strength += 10;
      this.game.char.magStrength += 5;
      this.game.combat.textBar("You got a sword!");
      break;

    case "breastplate":
      this.haveBreastplate = true;
      this.game.char.maxHP += 15;
      this.game.char.currentHP += 15;
      this.game.combat.textBar("You got a breastplate!");
      break;

    case "helmet":
      this.haveHelmet = true;
      this.game.char.magStrength += 5;
      this.game.char.maxHP += 5;
      this.game.char.currentHP += 5;
      this.game.combat.textBar("You got a helmet!");
      break;

    case "shield":
      this.haveShield = true;
      this.game.char.maxHP += 10;
      this.game.char.currentHP += 10;
      this.game.char.strength += 5;
      this.game.combat.textBar("You got a shield!");
      break;
  }
  itemArr.shift();
};
