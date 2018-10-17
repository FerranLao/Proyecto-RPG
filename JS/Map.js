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
  this.mapIndexY = 1;
  this.mapIndexX = 1;
  this.img.src = this.maps[this.mapIndexY][this.mapIndexX].map;
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
};
