let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const darkModeSwitch = document.querySelector("#dark-mode-switch");
const body = document.body;

// Create canvas for sparkles
const createSparkleCanvas = () => {
  const canvas = document.createElement("canvas");
  canvas.id = "sparkle-canvas";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "1000";
  canvas.style.pointerEvents = "none";
  body.appendChild(canvas);
  return canvas;
};

// Winning emojis
const winningEmojis = ["🎉", "🥳", "😃", "🌟", "💪", "🏆"];

// Sad emojis
const losingEmojis = ["😢", "😞", "💔", "😩", "😿", "🙁"];

// Fireworks animation for winning
const showCelebration = () => {
  const canvas = createSparkleCanvas();
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const particles = [];

  const createWinningParticle = () => {
    const angle = Math.random() * 3 * Math.PI; // Random angle in radians
    return {
      x: centerX,
      y: centerY,
      size: 40, // Size of the emoji
      speed: Math.random() * 3 + 1, // Slower upward speed
      angle: angle, // Set the angle for bouquet effect
      opacity: 1,
      emoji: winningEmojis[Math.floor(Math.random() * winningEmojis.length)], // Random emoji
    };
  };

  for (let i = 0; i < 50; i++) {
    particles.push(createWinningParticle());
  }

  const animateWinningParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      // Move particles outward in a circular pattern
      particle.x += Math.cos(particle.angle) * particle.speed; // Move sideways
      particle.y -= particle.speed * 0.5; // Move upward, slowing it down
      particle.opacity -= 0.01;

      if (particle.opacity > 0) {
        ctx.globalAlpha = particle.opacity;
        ctx.font = `${particle.size}px Arial`;
        ctx.fillText(particle.emoji, particle.x, particle.y); // Draw emoji
      }
    });

    if (particles.some((particle) => particle.opacity > 0)) {
      requestAnimationFrame(animateWinningParticles);
    } else {
      canvas.remove();
    }
  };

  animateWinningParticles();
};

// Sad emojis animation
const showSadness = () => {
  const canvas = createSparkleCanvas();
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const particles = [];

  const createSadParticle = () => {
    const angle = Math.random() * 3 * Math.PI; // Random angle in radians
    return {
      x: centerX,
      y: centerY,
      size: 40, // Size of the emoji
      speed: Math.random() * 3 + 1, // Slower upward speed
      angle: angle, // Set the angle for bouquet effect
      opacity: 1,
      emoji: losingEmojis[Math.floor(Math.random() * losingEmojis.length)], // Random emoji
    };
  };

  for (let i = 0; i < 50; i++) {
    particles.push(createSadParticle());
  }

  const animateSadParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      // Move particles outward in a circular pattern
      particle.x += Math.cos(particle.angle) * particle.speed; // Move sideways
      particle.y -= particle.speed * 0.5; // Move upward, slowing it down
      particle.opacity -= 0.01;

      if (particle.opacity > 0) {
        ctx.globalAlpha = particle.opacity;
        ctx.font = `${particle.size}px Arial`;
        ctx.fillText(particle.emoji, particle.x, particle.y); // Draw emoji
      }
    });

    if (particles.some((particle) => particle.opacity > 0)) {
      requestAnimationFrame(animateSadParticles);
    } else {
      canvas.remove();
    }
  };

  animateSadParticles();
};

// Generate computer choice
const generateCompChoice = () => {
  const options = ["rock", "paper", "scissor"];
  return options[Math.floor(Math.random() * 3)];
};

// Handle draw case
const draw = () => {
  msg.innerText = "Game Draw🔃";
  msg.style.backgroundColor = "rgb(53, 43, 105)";
};

// Handle win/lose case
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Win😁! -> Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    showCelebration();
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost😥! -> ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
    showSadness(); // Call the sad emoji function here
  }
};

// Play game
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

// Add event listeners
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// Dark mode toggle
darkModeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
