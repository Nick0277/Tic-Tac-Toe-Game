const volumeIcon = document.querySelector(".volumeIcon");
const volumeCheckbox = document.querySelector("#volumeCheckbox");
let volumeOn = true;

volumeCheckbox.addEventListener('click', () => {
   if (volumeCheckbox.checked) {
      volumeIcon.src = './media/audioOff.png';
      volumeOn = false;
   } else if (!volumeCheckbox.checked) {
      volumeIcon.src = './media/audioOn.png';
      volumeOn = true;
   }
});

const resetButton = document.querySelector(".reset");
const resetIcon = document.querySelector(".resetIcon");
resetButton.addEventListener('click', () => {
   clear();
   player = tie = computer = 0;
   playerScore.innerText = tieScore.innerText = computerScore.innerText = 0;
   resetButton.classList.toggle("resetAnim");
});

const multiplayerIcon = document.querySelector(".multiplayerIcon");
const multiplayerCheckbox = document.querySelector("#multiplayerCheckbox");
const player2 = document.querySelector(".player2");
const player1 = document.querySelector(".player1");
let singleplayer = true;

multiplayerCheckbox.addEventListener('click', () => {
   if (multiplayerCheckbox.checked) {
      multiplayerIcon.src = './media/multiplayer.png';
      singleplayer = false;
      player2.innerText = "Player2(O)";
      player1.innerText = "Player1(X)";
      clear();
      player = tie = computer = 0;
      playerScore.innerText = tieScore.innerText = computerScore.innerText = 0;
   } else if (!multiplayerCheckbox.checked) {
      multiplayerIcon.src = './media/singleplayer.png';
      singleplayer = true;
      player2.innerText = "Computer(O)";
      player1.innerText = "Player(X)";
      clear();
      player = tie = computer = 0;
      playerScore.innerText = tieScore.innerText = computerScore.innerText = 0;
   }
});
const hardModeIcon = document.querySelector(".hardModeIcon");
const modeCheckbox = document.querySelector("#modeCheckbox");
let hardMode = true;
modeCheckbox.addEventListener('click', () => {
   if (modeCheckbox.checked) {
      hardModeIcon.src = "./media/easyMode.png";
      hardMode = false;
   } else if (!modeCheckbox.checked) {
      hardModeIcon.src = "./media/hardMode.png";
      hardMode = true;
   }
});

// Player(X), Tie, Computer(O) - Scores
const playerScore = document.querySelector(".playerSc");
const tieScore = document.querySelector(".tieSc");
const computerScore = document.querySelector(".computerSc");
const player1Div = document.querySelector(".playerScore");
const player2Div = document.querySelector(".computerScore");

let player = 0;
let tie = 0;
let computer = 0;
let counter = 0;

let boxStyle = document.querySelectorAll(".boxStyle");
let slotNames = ['topLeft', 'topCenter', 'topRight', 'middleLeft', 'middleCenter', 'middleRight',
   'bottomLeft', 'bottomCenter', 'bottomRight'];
let remainingSlots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

let Clickinterval = true;
let gameOver = false;
let playerTurn = true;


function playPlayerSound() {
   if (volumeOn) {
      const playerX = new Audio();
      playerX.src = "./sounds/playerSound.mp3";
      playerX.volume = 0.3;
      playerX.play();
   }
}
function playComputerSound() {
   if (volumeOn) {
      const computerO = new Audio();
      computerO.src = "./sounds/computerSound.mp3";
      computerO.volume = 0.3;
      computerO.play();
   }
}
function playWinningSound() {
   if (volumeOn) {
      const winnerSound = new Audio();
      winnerSound.src = "./sounds/matchFinish.mp3";
      winnerSound.volume = 0.3;
      winnerSound.play();
   }
}
function playTieSound() {
   if (volumeOn) {
      const tieSound = new Audio();
      tieSound.src = "./sounds/tieSound.mp3";
      tieSound.volume = 0.3;
      tieSound.play();
   }
}


boxStyle.forEach(btn => {
   btn.addEventListener('click', (event) => {
      if (!gameOver) {
         if (playerTurn) {
            if (Clickinterval) {
               Clickinterval = false;
               if (singleplayer) {
                  setTimeout(() => {
                     Clickinterval = true;
                  }, 600);
               }
               if (!singleplayer) {
                  setTimeout(() => {
                     Clickinterval = true;
                  }, 50);
               } else {
                  if (event.target.value !== "X" && event.target.value !== "O") {
                     let X = document.createElement('img');
                     X.src = "./media/X.png";
                     event.target.appendChild(X);
                     X.classList.add("place");
                     setTimeout(() => {
                        X.classList.remove("place");
                     }, 150);
                     playPlayerSound();
                     remainingSlots = remainingSlots.filter(e => e !== slotNames.indexOf(event.target.id));
                     event.target.value = X.value = "X";
                     checkWinner();
                     computerPlays();
                  }
               }
               if (!singleplayer) {
                  player_1_plays();
                  if (counter % 2 === 1) {
                     if (event.target.value !== "X" && event.target.value !== "O") {
                        let O = document.createElement('img');
                        O.src = "./media/O.png";
                        event.target.appendChild(O);
                        O.classList.add("place");
                        setTimeout(() => {
                           O.classList.remove("place");
                        }, 150);
                        playComputerSound();
                        remainingSlots = remainingSlots.filter(e => e !== slotNames.indexOf(event.target.id));
                        event.target.value = O.value = "O";
                        counter++;
                        checkWinner();
                        X_turn();
                     }
                  }
               }
            }
         }
      } else {
         clear();
         gameOver = false;
         remainingSlots = [0, 1, 2, 3, 4, 5, 6, 7, 8];
         if ((player + tie + computer) % 2 !== 0) {
            playerTurn = false;
            computerPlays();
            setTimeout(() => {
               playerTurn = true;
            }, 650);
         }
      }
   });
});


function player_1_plays() {
   if (counter % 2 === 0) {
      if (event.target.value !== "X" && event.target.value !== "O") {
         let X = document.createElement('img');
         X.src = "./media/X.png";
         event.target.appendChild(X);
         X.classList.add("place");
         setTimeout(() => {
            X.classList.remove("place");
         }, 150);
         playPlayerSound();
         remainingSlots = remainingSlots.filter(e => e !== slotNames.indexOf(event.target.id));
         event.target.value = X.value = "X";
         counter++;
         checkWinner();
         O_turn();
      }
   }
}

function clear() {
   for (let i = 0; i < 9; i++) {
      boxStyle[i].value = "";
      boxStyle[i].classList.remove("tie");
      if (boxStyle[i].children[0]) boxStyle[i].children[0].remove();
   }
   if (singleplayer) {
      if (player1Div.childNodes[5]) player1Div.childNodes[5].remove();
      if (player2Div.childNodes[5]) player2Div.childNodes[5].remove();
      counter = 0;
   }
}

function X_turn() {
   if (!singleplayer) {
      const arrow = document.createElement("img");
      arrow.src = "./media/arrow.png";
      arrow.classList.add("yourTurn");
      player1Div.append(arrow);
      if (player2Div.childNodes[5]) {
         player2Div.childNodes[5].remove();
      }
   }
}

function O_turn() {
   const arrow = document.createElement("img");
   arrow.src = "./media/arrow.png";
   arrow.classList.add("yourTurn");
   player2Div.append(arrow);
   if (player1Div.childNodes[5]) {
      player1Div.childNodes[5].remove();
   }
}

function computerPlays() {
   if (!gameOver) {
      setTimeout(() => {
         if (remainingSlots.length > 7 || !hardMode) {
            let randomNumber = remainingSlots[Math.floor(Math.random() * remainingSlots.length)];
            remainingSlots = remainingSlots.filter(e => e !== randomNumber);
            let nil = document.createElement('img');
            nil.src = "./media/O.png";
            boxStyle[randomNumber].value = nil.value = "O";
            boxStyle[randomNumber].appendChild(nil);
            nil.classList.add("place");
            setTimeout(() => {
               nil.classList.remove("place");
            }, 150);
            playComputerSound();
            checkWinner();
         } else {
            computerPlaysHard();
            playComputerSound();
         }
      }, 500);
   }
}

function computerPlaysHard() {
   if (boxStyle[0].value == "O" && boxStyle[1].value == "O" && remainingSlots.includes(2)) computerPlace(2);
   else if (boxStyle[0].value == "O" && boxStyle[2].value == "O" && remainingSlots.includes(1)) computerPlace(1);
   else if (boxStyle[0].value == "O" && boxStyle[3].value == "O" && remainingSlots.includes(6)) computerPlace(6);
   else if (boxStyle[0].value == "O" && boxStyle[6].value == "O" && remainingSlots.includes(3)) computerPlace(3);
   else if (boxStyle[3].value == "O" && boxStyle[6].value == "O" && remainingSlots.includes(0)) computerPlace(0);
   else if (boxStyle[0].value == "O" && boxStyle[4].value == "O" && remainingSlots.includes(8)) computerPlace(8);
   else if (boxStyle[0].value == "O" && boxStyle[8].value == "O" && remainingSlots.includes(4)) computerPlace(4);
   else if (boxStyle[1].value == "O" && boxStyle[4].value == "O" && remainingSlots.includes(7)) computerPlace(7);
   else if (boxStyle[1].value == "O" && boxStyle[7].value == "O" && remainingSlots.includes(4)) computerPlace(4);
   else if (boxStyle[4].value == "O" && boxStyle[7].value == "O" && remainingSlots.includes(1)) computerPlace(1);
   else if (boxStyle[2].value == "O" && boxStyle[5].value == "O" && remainingSlots.includes(8)) computerPlace(8);
   else if (boxStyle[2].value == "O" && boxStyle[8].value == "O" && remainingSlots.includes(5)) computerPlace(5);
   else if (boxStyle[2].value == "O" && boxStyle[4].value == "O" && remainingSlots.includes(6)) computerPlace(6);
   else if (boxStyle[2].value == "O" && boxStyle[6].value == "O" && remainingSlots.includes(4)) computerPlace(4);
   else if (boxStyle[4].value == "O" && boxStyle[6].value == "O" && remainingSlots.includes(2)) computerPlace(2);
   else if (boxStyle[5].value == "O" && boxStyle[8].value == "O" && remainingSlots.includes(2)) computerPlace(2);
   else if (boxStyle[3].value == "O" && boxStyle[4].value == "O" && remainingSlots.includes(5)) computerPlace(5);
   else if (boxStyle[3].value == "O" && boxStyle[5].value == "O" && remainingSlots.includes(4)) computerPlace(4);
   else if (boxStyle[5].value == "O" && boxStyle[4].value == "O" && remainingSlots.includes(3)) computerPlace(3);
   else if (boxStyle[6].value == "O" && boxStyle[7].value == "O" && remainingSlots.includes(8)) computerPlace(8);
   else if (boxStyle[6].value == "O" && boxStyle[8].value == "O" && remainingSlots.includes(7)) computerPlace(7);
   else if (boxStyle[7].value == "O" && boxStyle[8].value == "O" && remainingSlots.includes(6)) computerPlace(6);
   else if (boxStyle[8].value == "O" && boxStyle[4].value == "O" && remainingSlots.includes(0)) computerPlace(0);
   else {
      if (boxStyle[0].value == "X" && boxStyle[1].value == "X" && remainingSlots.includes(2)) computerPlace(2);
      else if (boxStyle[0].value == "X" && boxStyle[2].value == "X" && remainingSlots.includes(1)) computerPlace(1);
      else if (boxStyle[0].value == "X" && boxStyle[3].value == "X" && remainingSlots.includes(6)) computerPlace(6);
      else if (boxStyle[0].value == "X" && boxStyle[6].value == "X" && remainingSlots.includes(3)) computerPlace(3);
      else if (boxStyle[3].value == "X" && boxStyle[6].value == "X" && remainingSlots.includes(0)) computerPlace(0);
      else if (boxStyle[0].value == "X" && boxStyle[4].value == "X" && remainingSlots.includes(8)) computerPlace(8);
      else if (boxStyle[0].value == "X" && boxStyle[8].value == "X" && remainingSlots.includes(4)) computerPlace(4);
      else if (boxStyle[1].value == "X" && boxStyle[4].value == "X" && remainingSlots.includes(7)) computerPlace(7);
      else if (boxStyle[1].value == "X" && boxStyle[7].value == "X" && remainingSlots.includes(4)) computerPlace(4);
      else if (boxStyle[4].value == "X" && boxStyle[7].value == "X" && remainingSlots.includes(1)) computerPlace(1);
      else if (boxStyle[2].value == "X" && boxStyle[5].value == "X" && remainingSlots.includes(8)) computerPlace(8);
      else if (boxStyle[2].value == "X" && boxStyle[8].value == "X" && remainingSlots.includes(5)) computerPlace(5);
      else if (boxStyle[2].value == "X" && boxStyle[4].value == "X" && remainingSlots.includes(6)) computerPlace(6);
      else if (boxStyle[2].value == "X" && boxStyle[6].value == "X" && remainingSlots.includes(4)) computerPlace(4);
      else if (boxStyle[4].value == "X" && boxStyle[6].value == "X" && remainingSlots.includes(2)) computerPlace(2);
      else if (boxStyle[5].value == "X" && boxStyle[8].value == "X" && remainingSlots.includes(2)) computerPlace(2);
      else if (boxStyle[3].value == "X" && boxStyle[4].value == "X" && remainingSlots.includes(5)) computerPlace(5);
      else if (boxStyle[3].value == "X" && boxStyle[5].value == "X" && remainingSlots.includes(4)) computerPlace(4);
      else if (boxStyle[5].value == "X" && boxStyle[4].value == "X" && remainingSlots.includes(3)) computerPlace(3);
      else if (boxStyle[6].value == "X" && boxStyle[7].value == "X" && remainingSlots.includes(8)) computerPlace(8);
      else if (boxStyle[6].value == "X" && boxStyle[8].value == "X" && remainingSlots.includes(7)) computerPlace(7);
      else if (boxStyle[7].value == "X" && boxStyle[8].value == "X" && remainingSlots.includes(6)) computerPlace(6);
      else if (boxStyle[8].value == "X" && boxStyle[4].value == "X" && remainingSlots.includes(0)) computerPlace(0);
      else {
         let randomNumber = remainingSlots[Math.floor(Math.random() * remainingSlots.length)];
         computerPlace(randomNumber);
      }
   }
}

function computerPlace(slot) {
   remainingSlots = remainingSlots.filter(e => e !== slot);
   let nil = document.createElement('img');
   nil.src = "./media/O.png";
   boxStyle[slot].value = nil.value = "O";
   boxStyle[slot].appendChild(nil);
   nil.classList.add("place");
   setTimeout(() => {
      nil.classList.remove("place");
   }, 150);
   playComputerSound()
   checkWinner();
}

function checkWinner() {
   if (boxStyle[0].value === "X" && boxStyle[1].value === "X" && boxStyle[2].value === "X" ||
      boxStyle[0].value === "O" && boxStyle[1].value === "O" && boxStyle[2].value === "O") {
      if (boxStyle[0].value === "X") player++, playerScore.innerText = player, scoreAnimX();
      if (boxStyle[0].value === "O") computer++, computerScore.innerText = computer, scoreAnimO();
      gameOver = true;
      setTimeout(() => {
         for (let i = 0; i < 3; i++) {
            boxStyle[i].childNodes[0].classList.add("win");
         }
      }, 200);
      gameOver = true;
   }
   else if (boxStyle[3].value === "X" && boxStyle[4].value === "X" && boxStyle[5].value === "X" ||
      boxStyle[3].value === "O" && boxStyle[4].value === "O" && boxStyle[5].value === "O") {
      if (boxStyle[3].value === "X") player++, playerScore.innerText = player, scoreAnimX();
      if (boxStyle[3].value === "O") computer++, computerScore.innerText = computer, scoreAnimO();
      setTimeout(() => {
         for (let i = 3; i < 6; i++) {
            boxStyle[i].childNodes[0].classList.add("win");
         }
      }, 200);
      gameOver = true;
   }
   else if (boxStyle[6].value === "X" && boxStyle[7].value === "X" && boxStyle[8].value === "X" ||
      boxStyle[6].value === "O" && boxStyle[7].value === "O" && boxStyle[8].value === "O") {
      if (boxStyle[6].value === "X") player++, playerScore.innerText = player, scoreAnimX();
      if (boxStyle[6].value === "O") computer++, computerScore.innerText = computer, scoreAnimO();
      setTimeout(() => {
         for (let i = 6; i < 9; i++) {
            boxStyle[i].childNodes[0].classList.add("win");
         }
      }, 200);
      gameOver = true;
   }
   else if (boxStyle[0].value === "X" && boxStyle[3].value === "X" && boxStyle[6].value === "X" ||
      boxStyle[0].value === "O" && boxStyle[3].value === "O" && boxStyle[6].value === "O") {
      if (boxStyle[0].value === "X") player++, playerScore.innerText = player, scoreAnimX();
      if (boxStyle[0].value === "O") computer++, computerScore.innerText = computer, scoreAnimO();
      setTimeout(() => {
         for (let i = 0; i < 7; i += 3) {
            boxStyle[i].childNodes[0].classList.add("win");
         }
      }, 200);
      gameOver = true;
   }
   else if (boxStyle[1].value === "X" && boxStyle[4].value === "X" && boxStyle[7].value === "X" ||
      boxStyle[1].value === "O" && boxStyle[4].value === "O" && boxStyle[7].value === "O") {
      if (boxStyle[1].value === "X") player++, playerScore.innerText = player, scoreAnimX();
      if (boxStyle[1].value === "O") computer++, computerScore.innerText = computer, scoreAnimO();
      setTimeout(() => {
         for (let i = 1; i < 8; i += 3) {
            boxStyle[i].childNodes[0].classList.add("win");
         }
      }, 200);
      gameOver = true;
   }
   else if (boxStyle[2].value === "X" && boxStyle[5].value === "X" && boxStyle[8].value === "X" ||
      boxStyle[2].value === "O" && boxStyle[5].value === "O" && boxStyle[8].value === "O") {
      if (boxStyle[2].value === "X") player++, playerScore.innerText = player, scoreAnimX();
      if (boxStyle[2].value === "O") computer++, computerScore.innerText = computer, scoreAnimO();
      setTimeout(() => {
         for (let i = 2; i < 9; i += 3) {
            boxStyle[i].childNodes[0].classList.add("win");
         }
      }, 200);
      gameOver = true;
   }
   else if (boxStyle[0].value === "X" && boxStyle[4].value === "X" && boxStyle[8].value === "X" ||
      boxStyle[0].value === "O" && boxStyle[4].value === "O" && boxStyle[8].value === "O") {
      if (boxStyle[0].value === "X") player++, playerScore.innerText = player, scoreAnimX();
      if (boxStyle[0].value === "O") computer++, computerScore.innerText = computer, scoreAnimO();
      setTimeout(() => {
         for (let i = 0; i < 9; i += 4) {
            boxStyle[i].childNodes[0].classList.add("win");
         }
      }, 200);
      gameOver = true;
   }
   else if (boxStyle[2].value === "X" && boxStyle[4].value === "X" && boxStyle[6].value === "X" ||
      boxStyle[2].value === "O" && boxStyle[4].value === "O" && boxStyle[6].value === "O") {
      if (boxStyle[2].value === "X") player++, playerScore.innerText = player, scoreAnimX();
      if (boxStyle[2].value === "O") computer++, computerScore.innerText = computer, scoreAnimO();
      setTimeout(() => {
         for (let i = 2; i < 7; i += 2) {
            boxStyle[i].childNodes[0].classList.add("win");
         }
      }, 200);
      gameOver = true;
   }
   else if (remainingSlots.length < 1) {
      for (let i = 0; i < 9; i++) {
         boxStyle[i].classList.add("tie");
      }
      tie++;
      tieScore.innerText = tie, scoreAnimTie();
      gameOver = true;
   }
}

function scoreAnimX() {
   playerScore.classList.add("jello-vertical");
   setTimeout(() => {
      playerScore.classList.remove("jello-vertical");
   }, 1000);
   playWinningSound();
}
function scoreAnimO() {
   computerScore.classList.add("jello-vertical");
   setTimeout(() => {
      computerScore.classList.remove("jello-vertical");
   }, 1000);
   playWinningSound();
}
function scoreAnimTie() {
   tieScore.classList.add("jello-vertical");
   setTimeout(() => {
      tieScore.classList.remove("jello-vertical");
   }, 1000);
   playTieSound();
}

