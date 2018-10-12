function Map(game){
    this.game=game;
    this.safePointX1 = game.canvas.width/2 - 50;
    this.safePointX2 = game.canvas.width/2 +50;
    this.safePointY1 = game.canvas.height/2 -50;
    this.safePointY2 = game.canvas.height/2 + 50;
    this.img= new Image();
    this.img.src="./images/map2.png"


    
}
Map.prototype.printMap = function(){
    var ctx=this.game.ctx;
    ctx.drawImage(this.img, 0,0,this.game.canvas.width, this.game.canvas.height)
    // ctx.fillStyle="#3BFF00"
    // ctx.fillRect(0,0,this.game.canvas.width, this.game.canvas.height);
    // ctx.fillStyle = "#7D8B72";
    // ctx.fillRect(this.safePointX1,0, 60, this.game.canvas.height);
    // ctx.fillRect(0,this.safePointY1,this.game.canvas.width,60);

};

Map.prototype.mapTransition = function (){

}

