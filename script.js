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

const newGame = () =>{
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msgConatiner.classList.add("hide");
    chanceO = true;
    chanceX = false;
}
const disableGame = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    })
}
const printWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgConatiner.classList.remove("hide");
    disableGame();
}
const checkWin = () => {
    for(let win of winChances){
        let box1 = boxes[win[0]].innerHTML;
        let box2 = boxes[win[1]].innerHTML;
        let box3 = boxes[win[2]].innerHTML;

        if (box1 === box2 && box2 === box3 && box1 !== "") {
            printWinner(box1);
        }
    }
}
boxes.forEach((box) => {
    box.addEventListener("click", () => {
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
        checkWin();
    });
    
});

newBtn.addEventListener("click", newGame);
resetButton.addEventListener("click", newGame);