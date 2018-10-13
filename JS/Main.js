var game;
window.onload = function() {
  game = new Game();
  game.start();

  window.onkeydown = function(e) {
    if (!game.combatStatus) {
      game.char.move(e.key);
      game.char.combatStart();
    }
  };
};
window.onkeyup = function() {
  if (game.combatStatus) {
    game.char.attack();
    game.enemy.attack();
    if (game.char.win()) {
      game.newEnemy();
      game.combatStatus = false;
    }
    if(game.char.lose()){
      
    }
  }
};
