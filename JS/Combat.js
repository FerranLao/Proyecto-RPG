function Combat(game){
    this.game=game;
    this.charPosX= 50;
    this.charPosY= 50;
    this.charImg="";
    this.battleBackground="";
    this.enemyPosX;
    this.enemyPosY;
    this.menuOptions = []
    
}
Combat.prototype.print = function(){
    var canvas = this.game.canvas
    var ctx = this.game.ctx;
    ctx.fillStyle="#FFCC00";
    ctx.fillRect(0,0, canvas.width, canvas.height-200) 
    ctx.clearRect(0, canvas.height-200 , canvas.width, 200)
    document.querySelector(".combat_menu").className ="combat_menu on"
}
Combat.prototype.endCombat = function (){

}