let playerHealth = 100;
let enemyHealth = 100;
let potions = 3;

const log = document.getElementById("log");
const playerHP = document.getElementById("player-health");
const enemyHP = document.getElementById("enemy-health");
const potionCount = document.getElementById("potions");

function attack(type) {
  const battlefield = document.getElementById("battlefield");

  let successChance, damage, className, name;
  switch (type) {
    case 'fireball':
      successChance = 0.75;
      damage = 25;
      className = 'fireball';
      name = 'Bola de Fogo';
      break;
    case 'ice':
      successChance = 0.40;
      damage = 50;
      className = 'ice';
      name = 'Raio Congelante';
      break;
    case 'meteor':
      successChance = 0.25;
      damage = 90;
      className = 'meteor';
      name = 'Chuva de Meteoros';
      break;
  }

  // Mostrar animação
  const effect = document.createElement("div");
  effect.className = `effect ${className}`;
  battlefield.appendChild(effect);

  setTimeout(() => {
    battlefield.removeChild(effect);
  }, 1000);

  // Jogador ataca
  if (Math.random() <= successChance) {
    enemyHealth -= damage;
    enemyHealth = Math.max(enemyHealth, 0);
    log.innerText = `Você usou ${name} e causou ${damage} de dano!`;
  } else {
    log.innerText = `Você usou ${name}, mas errou o ataque!`;
  }

  updateHealth();

  if (enemyHealth <= 0) {
    log.innerText += "\n🎉 Você venceu!";
    disableButtons();
    return;
  }

  // Delay para ataque inimigo
  setTimeout(enemyAttack, 1500);
}

function enemyAttack() {
  const battlefield = document.getElementById("battlefield");

  const attacks = [
    { name: "Bola de Fogo", chance: 0.75, damage: 25, class: 'fireball' },
    { name: "Raio Congelante", chance: 0.40, damage: 50, class: 'ice' },
    { name: "Chuva de Meteoros", chance: 0.25, damage: 90, class: 'meteor' }
  ];

  const atk = attacks[Math.floor(Math.random() * attacks.length)];

  const effect = document.createElement("div");
  effect.className = `effect ${atk.class}`;
  battlefield.appendChild(effect);

  setTimeout(() => {
    battlefield.removeChild(effect);
  }, 1000);

  if (Math.random() <= atk.chance) {
    playerHealth -= atk.damage;
    playerHealth = Math.max(playerHealth, 0);
    log.innerText = `O inimigo usou ${atk.name} e causou ${atk.damage} de dano!`;
  } else {
    log.innerText = `O inimigo usou ${atk.name}, mas errou!`;
  }

  updateHealth();

  if (playerHealth <= 0) {
    log.innerText += "\n💀 Você perdeu!";
    disableButtons();
  }
}

function usePotion() {
  if (potions > 0 && playerHealth < 100) {
    playerHealth += 30;
    if (playerHealth > 100) playerHealth = 100;
    potions--;
    potionCount.innerText = potions;
    log.innerText = "Você usou uma poção e recuperou 30 de vida!";
    updateHealth();
    setTimeout(enemyAttack, 1500);
  } else {
    log.innerText = "Você não pode usar uma poção agora.";
  }
}

function updateHealth() {
  playerHP.innerText = playerHealth;
  enemyHP.innerText = enemyHealth;
}

function disableButtons() {
  document.querySelectorAll("button").forEach(btn => btn.disabled = true);
}
