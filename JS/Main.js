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
      setTimeout(function() {
        game.enemy.attack();
      }, 500);
      checkWin();
    }
  }
  document.getElementById("atkbtn").addEventListener("click", attackBtn);

  function defenseBtn() {
    if (game.combatStatus) {
      delay();
      game.char.defense();
      setTimeout(function() {
        game.enemy.attack();
      }, 500);
      checkWin();
    }
  }
  document.getElementById("defbtn").addEventListener("click", defenseBtn);

  function runBtn() {
    if (game.combatStatus) {
      delay();
      if (game.char.Run()) {
        game.combatStatus = false;
        game.newEnemy();
      } else {
        game.combat.textBar("You tried to escape and failed")
        game.enemy.attack();
      }
    }
  }
  document.getElementById("runbtn").addEventListener("click", runBtn);

  function magBtn() {
    if (game.combatStatus) {
      delay();
      game.char.fireBall();
      setTimeout(function() {
        game.enemy.attack();
      }, 500);
      checkWin();
    }
  }
  document.getElementById("magbtn").addEventListener("click", magBtn);

  function checkWin() {
    if (game.char.win()) {
      game.char.currentHP = game.char.maxHP;
      game.enemy.giveExp();
      game.newEnemy();
      game.combatStatus = false;
    }
    if (game.char.lose()) {
    }
  }

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
