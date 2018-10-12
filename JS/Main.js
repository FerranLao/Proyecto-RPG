var game;
window.onload = function() {
  game = new Game();
    game.start()
  window.onkeydown = function(e) {
    if (!game.combatStatus) {
      game.char.move(e.key);
      game.char.combatStart();
    } 
  };
};
