let boxes: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".box");
let resetBtn: HTMLButtonElement | null = document.querySelector("#reset-btn");
let newGameBtn: HTMLButtonElement | null = document.querySelector("#new-btn");
let msg: HTMLElement | null = document.querySelector("#msg");
let msgContainer: HTMLElement | null = document.querySelector(".msg-container");

let turnO: boolean = true;
let count: number = 0;

const winPatterns: number[][] = [
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
  box.addEventListener("click", (): void => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 &&  !isWinner) {
      gameDraw();
    }
  });
});

function checkWinner(): boolean {
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

function disableBoxes(): void {
  for (let box of boxes) {
    box.disabled = true;
  }
}

function enableBoxes(): void {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

function showWinner(winner: string): void {
  if (msg && msgContainer) {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
  }
  disableBoxes();
}

function gameDraw(): void {
  if (msg && msgContainer) {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
  }
  disableBoxes();
}

function resetGame(): void {
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
