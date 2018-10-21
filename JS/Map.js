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
  this.img = new Image();
  this.mapIndexY = 0;
  this.mapIndexX = 0;
  this.img.src = this.maps[this.mapIndexY][this.mapIndexX].map;
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
}
Map.prototype.printMap = function() {
  var ctx = this.game.ctx;
  ctx.drawImage(
    this.img,
    0,
    0,
    this.game.canvas.width,
    this.game.canvas.height
  );
  ctx.drawImage(this.potionimg, 50, 50, 50, 50);
  ctx.drawImage(this.elixirimg, 50, 100, 50, 50);
  ctx.font = "25px Arial";
  ctx.fillText(this.game.char.objects.potion, 105, 85);
  ctx.fillText(this.game.char.objects.elixir, 105, 135);
  ctx.drawImage(this.chest[this.mapIndexY][this.mapIndexX].img,this.chest[this.mapIndexY][this.mapIndexX].positionX,this.chest[this.mapIndexY][this.mapIndexX].positionY,50,50 )

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
  var that=this;
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      var chest={
        positionX: Math.floor(Math.random()*(1100-50)+50),
        positionY: Math.floor(Math.random()*(700-50)+50),
        height: 50,
        width: 50,
        open: false, 
        img: new Image(),
      }
      chest.img.src="./images/closedchest.png"
      this.chest[i].push(chest)
      }
  }
  console.log(this.chest)
};
Map.prototype.chestLoot= function(){
  var random = Math.floor(Math.random() * 100);
  if(random<70){
    var number=Math.floor(Math.random()*(3-1)+1)
    this.game.char.objects.potion+=number
    this.game.combat.textBar("The chest contains "+ number + " health potions");
    this.chest[this.mapIndexY][this.mapIndexX].open=true;
 
  }else{
    var number=Math.floor(Math.random()*(2-1)+1);
    this.game.char.objects.elixir+=number
    this.game.combat.textBar("The chest contains  "+ number + " elixir");
    
  }
}
