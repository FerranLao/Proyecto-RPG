function Map(game){
    this.game=game;
    this.img= new Image();
    this.img.src="./images/map2.png"


    
}
Map.prototype.printMap = function(){
    var ctx=this.game.ctx;
    ctx.drawImage(this.img, 0,0,this.game.canvas.width, this.game.canvas.height)
};

Map.prototype.mapTransition = function (){

}

