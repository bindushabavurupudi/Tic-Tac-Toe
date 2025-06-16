let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('.reset-btn');
let newBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let msgConatiner = document.querySelector(".msg-container");
let chanceO = true
let chanceX = false

let winChances = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const moveSound = new Audio("sounds/touch.wav");
const winSound = new Audio("sounds/win.mp3");
const drawSound = new Audio("sounds/draw.wav");

let winnerFound = false;
const newGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msgConatiner.classList.add("hide");
    chanceO = true;
    chanceX = false;
    winnerFound = false;
    cnt = 0;
    moveSound.pause();
    winSound.pause();
    drawSound.pause();
    moveSound.currentTime = 0;
    winSound.currentTime = 0;
    drawSound.currentTime = 0;
}
const disableGame = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    })
}
const printWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgConatiner.classList.remove("hide");
    winSound.currentTime = 0;
    winSound.play();
    dropConfetti();
    disableGame();
}
const checkWin = () => {
    for (let win of winChances) {
        let box1 = boxes[win[0]].innerHTML;
        let box2 = boxes[win[1]].innerHTML;
        let box3 = boxes[win[2]].innerHTML;

        if (box1 === box2 && box2 === box3 && box1 !== "") {
            winnerFound = true;
            printWinner(box1);
        }
    }
}
let cnt = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        moveSound.currentTime = 0;
        moveSound.play();
        if (chanceO) {
            box.innerText = "O"
            chanceO = false
            chanceX = true
        }
        else {
            box.innerText = "X"
            chanceO = true
            chanceX = false
        }
        box.disabled = true;
        cnt++;
        checkWin();
        if (cnt == 9 && !winnerFound) {
            msg.innerText = `It's a draw!`;
            msgConatiner.classList.remove("hide");
            drawSound.currentTime = 0;
            drawSound.play();
            disableGame();
        }
    });
});



newBtn.addEventListener("click", newGame);
resetButton.addEventListener("click", newGame);

function dropConfetti() {
  const container = document.querySelector('.confetti-container');
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";
    confetti.style.setProperty('--hue', Math.floor(Math.random() * 360));
    container.appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}
