"use strict";
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let turnO = true;
let count = 0;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});
function checkWinner() {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
}
function disableBoxes() {
    for (let box of boxes) {
        box.disabled = true;
    }
}
function enableBoxes() {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
function showWinner(winner) {
    if (msg && msgContainer) {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
    }
    disableBoxes();
}
function gameDraw() {
    if (msg && msgContainer) {
        msg.innerText = `Game was a Draw.`;
        msgContainer.classList.remove("hide");
    }
    disableBoxes();
}
function resetGame() {
    turnO = true;
    count = 0;
    enableBoxes();
    if (msgContainer) {
        msgContainer.classList.add("hide");
    }
}
if (newGameBtn && resetBtn) {
    newGameBtn.addEventListener("click", resetGame);
    resetBtn.addEventListener("click", resetGame);
}
