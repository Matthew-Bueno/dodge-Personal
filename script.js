let lives = 3; // This is how many lives you will have
let playerRow = 3; // What row the player will spawns
let playerCol = 3; //  What column the player will spawn
let enemyRedRow = 6; // What row the red enemy will spawn
let enemyRedCol = 6; // What column the red enemy will spawn
let enemyGreyRow = 6; // What row the green enemy will spawn
let enemyGreyCol = 0; // What column the green enemy will spawn
let enemyOrangeRow = 0; // What row the orange enemy will spawn
let enemyOrangeCol = 6; // What column the orange enemy will spawn
let enemyPinkRow = 0; // What row the white enemy will spawn
let enemyPinkCol = 0; // What column the white enemy will spawn
let redInterval; 
let greyInterval;
let orangeInterval;
let pinkInterval;
let playerHitTimeout;
let container = document.getElementById("container"); // This is getting the container id that will be used later to hide the rules
let countdown;
let time = 60;

if (localStorage.getItem("color") === "colorChange"){
  document.body.classList.add("colorChange");
  document.getElementById("loseScreen").classList.add("colorChange");
  document.getElementById("winScreen").classList.add("colorChange");
}

function play() {
  document.removeEventListener("keydown", playerMove);
  container.style.display = "none";

  document.getElementById("grid").style.display = "grid";
  document.getElementById("holder1").style.display = "flex";

  console.log("play");
  updateHearts();
  updatePlayerPosition();
  enemyPink();
  enemyOrange();
  enemyGrey();
  enemyRed();
  
  document.getElementById("countdown").textContent = time;

  countdown = setInterval(() => {
    time--;
    document.getElementById("countdown").textContent = time;
    // stop at 0
    if (time === 0) {
      clearInterval(redInterval);
      clearInterval(greyInterval);
      clearInterval(orangeInterval);
      clearInterval(pinkInterval);
      clearInterval(countdown);
      winGame();
    }
  }, 1000);

  redInterval = setInterval(enemyRedMovement, 700);
  greyInterval = setInterval(enemyGreyMovement, 500);
  orangeInterval = setInterval(enemyOrangeMovement, 700);
  pinkInterval = setInterval(enemyPinkMovment, 600);
  document.addEventListener("keydown", playerMove); // This event is used when you press down a key
}

function enemyInfo() {
  document.getElementById("overlay").style.display = "flex";
}

function closeEnemyInfo() {
  document.getElementById("overlay").style.display = "none";
}

function changeColor() {
  let body = document.querySelector("body");
  body.classList.toggle("colorChange");
  document.getElementById("loseScreen").classList.toggle("colorChange");
  document.getElementById("winScreen").classList.toggle("colorChange");

  // localstorage
  if(body.classList.contains("colorChange")){
    localStorage.setItem("color", "colorChange");
  } else {
    localStorage.removeItem("color");
  }
}

function updateHearts() {
  console.log("updateHearts", lives);
  // This function is to upadte the hearts as well as load them onto the HMTL screen
  const heartsDiv = document.getElementById("hearts");

  heartsDiv.innerHTML = "";

  for (let i = 0; i < lives; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heartsDiv.appendChild(heart);
  }
}

function playerMove(event) {
  // This function is used when
  let key = event.key.toLowerCase();

  if (key === "w" || key === "arrowup") {
    if (playerRow > 0) playerRow--;
  } else if (key === "s" || key === "arrowdown") {
    if (playerRow < 6) playerRow++;
  } else if (key === "a" || key === "arrowleft") {
    if (playerCol > 0) playerCol--;
  } else if (key === "d" || key === "arrowright") {
    if (playerCol < 6) playerCol++;
  }

  updatePlayerPosition();
  console.log("playerMove");
  playerHitTimeout = setTimeout(() => enemyHit(), 400);
}

function enemyHitIndecator() {}

function updatePlayerPosition() {
  const player = document.getElementById("player");

  const cellWidth = 100;
  const cellHeight = 100;

  const playerSize = 20;

  const offsetX = (cellWidth - playerSize) / 2;
  const offsetY = (cellHeight - playerSize) / 2;

  player.style.transform = `translate(${playerCol * cellWidth + offsetX}px, ${playerRow * cellHeight + offsetY}px)`;
}

function enemyRed() {
  const enemyRed = document.getElementById("enemyRed");

  const enemyRedcellWidth = 100;
  const enemyRedcellHeight = 100;

  const enemyRedSize = 20;

  const offsetX = (enemyRedcellWidth - enemyRedSize) / 2;
  const offsetY = (enemyRedcellHeight - enemyRedSize) / 2;

  enemyRed.style.transform = `translate(${enemyRedCol * enemyRedcellWidth + offsetX}px, ${enemyRedRow * enemyRedcellHeight + offsetY}px)`;
}

function enemyRedMovement() {
  // enemy red movement
  if (enemyRedRow < playerRow) {
    enemyRedRow++;
  } else if (enemyRedRow > playerRow) {
    enemyRedRow--;
  }

  if (enemyRedCol < playerCol) {
    enemyRedCol++;
  } else if (enemyRedCol > playerCol) {
    enemyRedCol--;
  }

  enemyRed();
  console.log("enemyRed");
  setTimeout(() => enemyHit(), 1000);
}

function enemyGrey() {
  const enemyGrey = document.getElementById("enemyGrey");

  const enemyGreycellWidth = 100;
  const enemyGreycellHeight = 100;

  const enemyGreySize = 20;

  const offsetX = (enemyGreycellWidth - enemyGreySize) / 2;
  const offsetY = (enemyGreycellHeight - enemyGreySize) / 2;

  enemyGrey.style.transform = `translate(${enemyGreyCol * enemyGreycellWidth + offsetX}px, ${enemyGreyRow * enemyGreycellHeight + offsetY}px)`;
}

function enemyGreyMovement() {
  // enemy grey movement
  let direction = Math.floor(Math.random() * 4);

  if (direction === 0 && enemyGreyRow > 0) {
    enemyGreyRow--;
  } else if (direction === 1 && enemyGreyRow < 6) {
    enemyGreyRow++;
  } else if (direction === 2 && enemyGreyCol > 0) {
    enemyGreyCol--;
  } else if (direction === 3 && enemyGreyCol < 6) {
    enemyGreyCol++;
  }

  enemyGrey();
  console.log("grey");
  setTimeout(() => enemyHit(), 1000);
}

function enemyOrange() {
  const enemyOrange = document.getElementById("enemyOrange");

  const enemyOrangecellWidth = 100;
  const enemyOrangecellHeight = 100;

  const enemyOrangeSize = 20;

  const offsetX = (enemyOrangecellWidth - enemyOrangeSize) / 2;
  const offsetY = (enemyOrangecellHeight - enemyOrangeSize) / 2;

  enemyOrange.style.transform = `translate(${enemyOrangeCol * enemyOrangecellWidth + offsetX}px, ${enemyOrangeRow * enemyOrangecellHeight + offsetY}px)`;
}

function enemyOrangeMovement() {
  // Enemy Orange movement
  let direction = Math.floor(Math.random() * 4);
  //TODO: check if move is valid (within board) before changing row & col
  // if not valid generate new random direction
  // console.log("direction", direction);

  if (direction === 0) {
    if (enemyOrangeRow > 0 && enemyOrangeCol < 6) {
      enemyOrangeRow--;
      enemyOrangeCol++;
    } else enemyOrangeMovement();
  } else if (direction === 1) {
    if (enemyOrangeRow < 6 && enemyOrangeCol < 6) {
      enemyOrangeRow++;
      enemyOrangeCol++;
    } else enemyOrangeMovement();
  } else if (direction === 2) {
    if (enemyOrangeRow > 0 && enemyOrangeCol > 0) {
      enemyOrangeRow--;
      enemyOrangeCol--;
    } else enemyOrangeMovement();
  } else if (direction === 3) {
    if (enemyOrangeRow < 6 && enemyOrangeCol > 0) {
      enemyOrangeRow++;
      enemyOrangeCol--;
    } else enemyOrangeMovement();
  }

  enemyOrange();
  console.log("orange");
  setTimeout(() => enemyHit(), 1000);
}

function enemyPink() {
  const enemyPink = document.getElementById("enemyPink");

  const enemyPinkcellWidth = 100;
  const enemyPinkcellHeight = 100;

  const enemyPinkSize = 20;

  const offsetX = (enemyPinkcellWidth - enemyPinkSize) / 2;
  const offsetY = (enemyPinkcellHeight - enemyPinkSize) / 2;

  enemyPink.style.transform = `translate(${enemyPinkCol * enemyPinkcellWidth + offsetX}px, ${enemyPinkRow * enemyPinkcellHeight + offsetY}px)`;
}

function enemyPinkMovment() {
  let nextRow = enemyPinkRow;
  let nextCol = enemyPinkCol;

  if (enemyPinkRow < playerRow) {
    nextRow++;
  } else if (enemyPinkRow > playerRow) {
    nextRow--;
  }

  if (enemyPinkCol < playerCol) {
    nextCol++;
  } else if (enemyPinkCol > playerCol) {
    nextCol--;
  }

  if (nextRow === playerRow && nextCol === playerCol) {
    return;
  }

  enemyPinkRow = nextRow;
  enemyPinkCol = nextCol;
  enemyPink();
  console.log("pink");
  setTimeout(() => enemyHit(), 1000);
}

function enemyHit() {
  // when enemy hits you
  let redHit = playerRow === enemyRedRow && playerCol === enemyRedCol;
  let greyHit = playerRow === enemyGreyRow && playerCol === enemyGreyCol;
  let orangeHit = playerRow === enemyOrangeRow && playerCol === enemyOrangeCol;
  let pinkHit = playerRow === enemyPinkRow && playerCol === enemyPinkCol;

  if (redHit || greyHit || orangeHit || pinkHit) {
    const player = document.getElementById("player");

    player.classList.add("flash");

    setTimeout(() => {
      player.classList.remove("flash");
    }, 1200);

    lives--;
    console.log("enemyHit");
    updateHearts();

    clearInterval(redInterval);
    clearInterval(orangeInterval);
    clearInterval(greyInterval);
    clearInterval(pinkInterval);
    clearTimeout(playerHitTimeout);
     

    if (lives === 0) {
      loseGame();
    } else {


      enemyRedRow = 6;
      enemyRedCol = 6;

      enemyGreyRow = 6;
      enemyGreyCol = 0;

      enemyOrangeRow = 0;
      enemyOrangeCol = 6;

      enemyPinkRow = 0;
      enemyPinkCol = 0;

      playerCol = 3;
      playerRow = 3;

      setTimeout(() => {
        enemyRed();
        enemyGrey();
        enemyOrange();
        enemyPink();
        updatePlayerPosition();
      }, 700);

      document.removeEventListener("keydown", playerMove);

      setTimeout(() => document.addEventListener("keydown", playerMove), 300);

      setTimeout(
        () => (redInterval = setInterval(enemyRedMovement, 700)),
        2000,
      );
      setTimeout(
        () => (greyInterval = setInterval(enemyGreyMovement, 500)),
        1800,
      );
      setTimeout(
        () => (orangeInterval = setInterval(enemyOrangeMovement, 700)),
        1800,
      );
      setTimeout(
        () => (pinkInterval = setInterval(enemyPinkMovment, 600)),
        1800,
      );
    }
  }
}

function winGame() {
  document.removeEventListener("keydown", playerMove);

  setTimeout(() => {
    document.getElementById("grid").style.display = "none";
    document.getElementById("holder1").style.display = "none";
    document.getElementById("winScreen").style.display = "flex";
  }, 1000);
}

function loseGame() {
  document.removeEventListener("keydown", playerMove);
  clearInterval(countdown);

  setTimeout(() => {
    document.getElementById("grid").style.display = "none";
    document.getElementById("holder1").style.display = "none";
    document.getElementById("loseScreen").style.display = "flex";
  }, 1000);
}

function mainMenu() {
  location.reload();
}
