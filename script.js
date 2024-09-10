let randomNumber = Math.round(Math.random() * 100 + 1);

let userInput = document.querySelector("#input");
let submitButton = document.querySelector("#submit");
let prevGuesses = document.querySelector(".previousGuesses");
let remGuesses = document.querySelector(".remainingGuesses");
let lowOrHi = document.querySelector(".lowOrHi");
let startOver = document.querySelector(".resultParas");

let p = document.createElement("p");

let prevGuessesArr = [];
let numGuesses = 0;

let playGame = true;

if (playGame) {
  submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    let guess = parseInt(userInput.value);
    validateInput(guess);
  });
}

function validateInput(guess) {
  if (guess === "" || guess < 1 || guess > 100 || isNaN(guess)) {
    alert("Please enter a valid number!");
  } else {
    if (numGuesses >= 9) {
      prevGuesses.innerHTML += `${guess}`;
      numGuesses = numGuesses + 1;
      remGuesses.innerHTML = `${10 - numGuesses}`;
      displayMessage(
        `<h2><b>GAME OVER! </b><span id="resultNo">The number is <b style="color: lightgreen">"${randomNumber}".</b></span></h2>`
      );
      endGame();
    } else {
      prevGuessesArr.push(guess);
      displayGuess(guess);
      checkInput(guess);
    }
  }
}

function checkInput(guess) {
  if (guess === randomNumber) {
    displayMessage(`<h1>Congratulations🎉, You WON.</h1>`);
    endGame();
  } else if (guess > randomNumber) {
    displayMessage(`<b>HINT:</b> Your guess is Greater!`);
  } else if (guess < randomNumber) {
    displayMessage(`<b>HINT:</b> Your guess is Lesser!`);
  } else {
  }
}

function displayGuess(guess) {
  userInput.value = "";
  prevGuesses.innerHTML += `${guess}, `;
  numGuesses = numGuesses + 1;
  remGuesses.innerHTML = `${10 - numGuesses}`;
  if (remGuesses.innerHTML <= 3) {
    remGuesses.style.color = "rgb(225, 90, 90)";
  }
}

function displayMessage(message) {
  lowOrHi.innerHTML = `${message}`;
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  let newGameButton = document.getElementById("newGame");
  newGameButton.addEventListener("click", (e) => {
    randomNumber = Math.round(Math.random() * 100 + 1);
    prevGuessesArr = [];
    prevGuesses.innerHTML = "";
    lowOrHi.innerHTML = "";
    numGuesses = 0;
    remGuesses.style.color = "lightgreen";
    userInput.value = "";
    remGuesses.innerHTML = `${10 - numGuesses}`;
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);
    playGame = true;
  });
}
