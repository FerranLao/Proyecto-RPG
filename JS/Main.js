var game;
window.onload = function() {
  game = new Game();
  game.start();

  window.onkeydown = function(e) {
    if (!game.combatStatus) {
      game.char.move(e.key);
      game.char.combatStart();
    } else {
      
      game.char.attack();
      if (game.char.win()) {
        game.newEnemy()
        game.combatStatus = false;
      }
    }
  };
};
