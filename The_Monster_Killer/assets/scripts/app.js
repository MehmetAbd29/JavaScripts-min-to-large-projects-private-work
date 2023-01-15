const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const ATTACK_VALUE_MONSTER = 14;
const HEAL_VALUE = 10;
const ATTACK_EVENT = "Attack Event";
const STRONG_ATTACK_EVENT = "Strong Attack Event";
const MONSTER_ATTACK_EVENT = "Monster Attack Event";
const HEAL_EVENT = "Healing Event";
const BOUNS_LIFE_EVENT = "Bouns Life Event";

const getUserInput = () => {
  let userInput = +prompt("Type the maximum life for you & the monster", "100");
  if (isNaN(userInput) || userInput <= 0) {
    userInput = 100;
    alert("Life amount is set to 100");
  }
  return userInput;
}


let chosenMaxLife = getUserInput();
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBounsLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife);





const checkResult = (currentMonsterHealth, currentPlayerHealth) => {
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You Won!");
    resetHandler();
  }

  if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lose :(");
    resetHandler();
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("draw");
    resetHandler();
  }
};

const attackRound = (mode, monsterAttack) => {
  const initialPlayerHealth = currentPlayerHealth;
  let playerAttack;
  if (mode === ATTACK_EVENT){
    playerAttack = ATTACK_VALUE;
  }
  else if (mode == STRONG_ATTACK_EVENT) {
    playerAttack = STRONG_ATTACK_VALUE;
  }
  else {
    playerAttack = 0;
  }
  
  const damage = dealMonsterDamage(playerAttack);
  currentMonsterHealth -= damage;
  writeToLog(mode, currentPlayerHealth, currentMonsterHealth, playerAttack);
  const monsterDamage = dealPlayerDamage(monsterAttack);
  currentPlayerHealth -= monsterDamage;
  writeToLog(MONSTER_ATTACK_EVENT, currentPlayerHealth, currentMonsterHealth, monsterDamage);

  if (currentPlayerHealth <= 0 && hasBounsLife) {
    currentPlayerHealth = initialPlayerHealth;
    hasBounsLife = false;
    removeBonusLife();
    alert("Bouns life activated");
    setPlayerHealth(currentPlayerHealth);
    writeToLog(BOUNS_LIFE_EVENT, currentPlayerHealth, currentMonsterHealth);
  }

  checkResult(currentMonsterHealth, currentPlayerHealth);
};

const attackHandler = () => {
  attackRound(ATTACK_EVENT, ATTACK_VALUE_MONSTER);
};

const strongAttackHandler = () => {
  attackRound(STRONG_ATTACK_EVENT, ATTACK_VALUE_MONSTER);
};

const healHandler = () => {
  let healValue = null; // to control the healing amount
  if (currentPlayerHealth === chosenMaxLife) {
    alert("You're already at full health!");
    return;
  }

  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(HEAL_EVENT, currentPlayerHealth, currentMonsterHealth);
  attackRound(0, ATTACK_VALUE_MONSTER);
};

const resetHandler = () => {
  chosenMaxLife = getUserInput();
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  battleLog = []
  adjustHealthBars(chosenMaxLife);
};

const writeToLog = (
  event,
  playerHealth,
  monsterHealth,
  damage = "NO DAMAGE"
) => {
  logEntery = {
    event,
    playerHealth,
    monsterHealth,
    damage
  };
  battleLog.push(logEntery);

};

const writeToLogHandler = () => {
  for (const event of battleLog){
    console.log(event);
  }
  console.log("<-------------------------------------------------> END OF LOG");
};

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
logBtn.addEventListener("click", writeToLogHandler);
resetBtn.addEventListener("click", resetHandler);
