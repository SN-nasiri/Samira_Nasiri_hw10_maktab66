let fill = document.querySelectorAll(".tile");
let ban = true;
const statusDisplay = document.querySelector(".status");
let active = true;
let currentPlayer = "X";
let state = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => {
    if (currentPlayer === "X") {
        document.getElementById("board").classList.add("winX");
        statusDisplay.style.display = "none";
    } else {
        document.getElementById("board").classList.add("winO");
        statusDisplay.style.display = "none";
    }
};
const drawMessage = () => {
    document.getElementById("board").classList.add("warning");
    statusDisplay.style.display = "none";
};
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn();
document
    .querySelectorAll(".tile")
    .forEach((cell) => cell.addEventListener("click", handleCellClick));
document.querySelector(".restart").addEventListener("click", handleRestartGame);

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute("data-cell-index")
    );
    if (state[clickedCellIndex] !== "" || !active) {
        return;
    }
    handleCellPlayed(clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCellIndex) {
    state[clickedCellIndex] = currentPlayer;
    if (ban) {
        fill[clickedCellIndex].classList.add("fill-x");
        ban = false;
    } else {
        fill[clickedCellIndex].classList.add("fill-o");
        ban = true;
    }
}
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = state[winCondition[0]];
        let b = state[winCondition[1]];
        let c = state[winCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            const item = winCondition;
            roundWon = true;
            fill[item[0]].classList.add("set");
            fill[item[1]].classList.add("set");
            fill[item[2]].classList.add("set");
            break;
        }
    }
    if (roundWon) {
        winningMessage();
        active = false;
        return;
    }
    let roundDraw = !state.includes("");
    if (roundDraw) {
        drawMessage();
        active = false;
        return;
    }
    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
    active = true;
    ban = true;
    currentPlayer = "X";
    state = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.display = "block";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".tile").forEach((cell) => {
        cell.classList.remove("set");
        cell.classList.remove("fill-x");
        cell.classList.remove("fill-o");
    });
    document.getElementById("board").classList.remove("winX");
    document.getElementById("board").classList.remove("winO");
    document.getElementById("board").classList.remove("warning");
}