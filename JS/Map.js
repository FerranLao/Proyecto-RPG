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
  this.img = new Image();
  this.mapIndexY = 0;
  this.mapIndexX = 0;
  this.img.src = this.maps[this.mapIndexY][this.mapIndexX].map;
  //boss images
  this.bossmap= new Image();
  this.bossmap.src="./images/Enemies/sleeping-dragon-png-3.png"
  this.bossmapX= this.game.canvas.width/2 - 150;
  this.bossmapY= this.game.canvas.height/2 - 100;
  //objects
  this.potionimg=new Image();
  this.potionimg.src="./images/healpotion.png";
  this.elixirimg=new Image();
  this.elixirimg.src="./images/Elixir_of_Life.png";

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
  ctx.drawImage(this.potionimg, 50,50,50,50);
  ctx.drawImage(this.elixirimg, 50, 100,50, 50);
  ctx.font = "25px Arial";
  ctx.fillText(this.game.char.objects.potion, 105,85);
  ctx.fillText(this.game.char.objects.elixir, 105,135);
  
  if(this.mapIndexX===2 && this.mapIndexY==2){
    ctx.drawImage(this.bossmap, this.bossmapX,this.bossmapY,190,140)
  }
  
  
};
