let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const darkModeSwitch = document.querySelector("#dark-mode-switch");

const generateCompChoice = () => {
  const options = ["rock", "paper", "scissor"];
  const randomIndex = Math.floor(Math.random() * 3);
  return options[randomIndex];
};

const createSparkles = (type) => {
  const container = document.createElement("div");
  container.classList.add("sparkles", type);
  document.body.appendChild(container);

  setTimeout(() => {
    container.remove();
  }, 2000);
};

const draw = () => {
  msg.innerText = "Game Draw🔃";
  msg.style.backgroundColor = "rgb(53, 43, 105)";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Win😁! -> Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    createSparkles("win");
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost😥! -> ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
    createSparkles("lose");
  }
};

const playGame = (userChoice) => {
  const compChoice = generateCompChoice();

  if (userChoice === compChoice) {
    draw();
  } else {
    let userWin = true;

    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissor" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }

    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

darkModeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
