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

  function attackBtn() {
    if (game.combatStatus) {
      delay(attackBtn);
      game.char.attack();
      game.combatFlow();
    }
  }
  document.getElementById("atkbtn").addEventListener("click", attackBtn);

  function defenseBtn() {
    if (game.combatStatus) {
      delay();
      game.char.defense();
      game.combatFlow();
    }
  }
  document.getElementById("defbtn").addEventListener("click", defenseBtn);

  function objects() {
    if (game.combatStatus) {
    document.getElementById("objects_container").className = "show"
    }
  }
  document.getElementById("objbtn").addEventListener("click", objects);

  function drinkPotion() {
    if (game.combatStatus) {
      delay();
      game.char.potion();
      game.combatFlow();
    }
  }
  document.getElementById("potion").addEventListener("click", drinkPotion);

  function drinkElixir() {
    if (game.combatStatus) {
      delay();
      game.char.elixir();
      game.combatFlow();
    }
  }
  document.getElementById("elixir").addEventListener("click", drinkElixir)

  function objectsBack(){
    if (game.combatStatus) {
      document.getElementById("objects_container").className = "off"
    }
  }
  document.getElementById("back").addEventListener("click", objectsBack)

  function runBtn() {
    if (game.combatStatus) {
      delay();
      if (game.char.Run()) {
        game.combatStatus = false;
        game.newEnemy();
      } else {
        game.combat.textBar("You tried to escape and failed");
        game.combatFlow();
      }
    }
  }
  document.getElementById("runbtn").addEventListener("click", runBtn);

  function magBtn() {
    if (game.combatStatus) {
      delay();
      game.char.fireBall();
      game.combatFlow();
    }
  }
  document.getElementById("magbtn").addEventListener("click", magBtn);

  function delay() {
    var container = document.getElementById("button_container");
    if (container.className.includes("pointer")) {
      container.className.replace("pointer", "");
    } else {
      container.classList.add("pointer");
      setTimeout(function() {
        container.className = "";
      }, 1000);
    }
  }
};
