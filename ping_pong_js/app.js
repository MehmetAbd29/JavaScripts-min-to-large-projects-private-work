// Important notes:
// The game runs through a time update loop (for every single frame a function is being called)
// the update function is going to update all logics/positions in the script
// computer AI moves the ball & the paddle on the left
// the user can move the right paddle via mouse

// imports:
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

// constants:
const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("p-paddle"));
const computerPaddle = new Paddle(document.getElementById("c-paddle"));
const playerScoreElem = document.getElementById("p-score");
const computerScoreElem = document.getElementById("c-score");

let perviousTime;
function updateFrames(passedTime) {
  //console.log(perviousTime)
  if (perviousTime) {
    const detlaTime = passedTime - perviousTime;
    // we will manipulate the ball only if there's passed time.
    ball.updateBall(detlaTime, [computerPaddle.rect(), playerPaddle.rect()]);
    computerPaddle.updatePaddle(detlaTime, ball.y);
  }

  if (isLose()) {
    handleLose();
  }
  perviousTime = passedTime;
  requestAnimationFrame(updateFrames);
  //console.log(passedTime);
}
// Note: the setInterval function "setInterval(update, 10)"
// won't be as good as requestAnimationFrames, because setInterval isn't 100% accurate and won't run every 10m secs, and it runs between frames.
// while requestAnimationFrame runs EVERY time a frame animation on the screen is changed! So JS will not call the function UNLESS something on the screen changed, unlike setIntervals which would run "almost" every 10msecs
//https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }
  ball.reset();
  computerPaddle.reset();
}

document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

document.addEventListener("mousemove", (event) => {
  // note in the CSS, the position is in percents of view port, thus we need to divide event.y with window.innerHeight
  playerPaddle.position = (event.y / window.innerHeight) * 100;
});
requestAnimationFrame(updateFrames);
