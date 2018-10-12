function Map(game){
    this.game=game;
    this.safePointX1 = 370;
    this.safePointX2 = 430;
    this.safePointY1 = 270;
    this.safePointY2 = 330;

    
}
Map.prototype.printMap = function(){
    var ctx=this.game.ctx;
    ctx.fillStyle="#3BFF00"
    ctx.fillRect(0,0,this.game.canvas.width, this.game.canvas.height);
    ctx.fillStyle = "#7D8B72";
    ctx.fillRect(this.safePointX1,0, 60, this.game.canvas.height);
    ctx.fillRect(0,this.safePointY1,this.game.canvas.width,60);

};

Map.prototype.mapTransition = function (){

}

