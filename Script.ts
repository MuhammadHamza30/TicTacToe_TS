const boxes: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".box");
const resetBtn: HTMLButtonElement | null = document.querySelector("#reset-btn");
const newGameBtn: HTMLButtonElement | null = document.querySelector("#new-btn");
const msgContainer: HTMLDivElement | null = document.querySelector(".msg-container");
const msg: HTMLParagraphElement | null = document.querySelector("#msg");

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
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;
    count++;
    
    let isWinner: boolean | undefined = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const checkWinner = (): boolean | undefined => {
  for (let pattern of winPatterns) {
    let pos1Val: string = boxes[pattern[0]].innerText;
    let pos2Val: string = boxes[pattern[1]].innerText;
    let pos3Val: string = boxes[pattern[2]].innerText;
    
    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

const disableBoxes = (): void => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = (): void => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner: string): void => {
  if (msg && msgContainer) {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
  }
  disableBoxes();
};

const gameDraw = (): void => {
  if (msg && msgContainer) {
    msg.innerText = "Game was a Draw.";
    msgContainer.classList.remove("hide");
  }
  disableBoxes();
};

const resetGame = (): void => {
  turnO = true;
  count = 0;
  enableBoxes();
  if (msgContainer) {
    msgContainer.classList.add("hide");
  }
};

newGameBtn?.addEventListener("click", resetGame);
resetBtn?.addEventListener("click", resetGame);
