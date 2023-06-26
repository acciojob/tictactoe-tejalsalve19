//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit");
  const player1Input = document.getElementById("player-1");
  const player2Input = document.getElementById("player-2");
  const gameDiv = document.getElementById("game");
  const messageDiv = document.querySelector(".message");
  const cells = document.querySelectorAll(".cell");

  let currentPlayer = "X";
  let currentPlayerName = "";

  submitBtn.addEventListener("click", () => {
    const player1Name = player1Input.value;
    const player2Name = player2Input.value;

    if (player1Name && player2Name) {
      document.getElementById("players").style.display = "none";
      gameDiv.style.display = "block";
      currentPlayerName = player1Name;
      messageDiv.textContent = `${currentPlayerName}, you're up!`;
    }
  });

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (cell.textContent === "") {
        cell.textContent = currentPlayer;

        if (checkWin()) {
          messageDiv.textContent = `${currentPlayerName}, congratulations you won!`;
          disableCells();
        } else if (checkDraw()) {
          messageDiv.textContent = "It's a draw!";
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          currentPlayerName = currentPlayerName === player1Input.value ? player2Input.value : player1Input.value;
          messageDiv.textContent = `${currentPlayerName}, you're up!`;
        }
      }
    });
  });

  function checkWin() {
    const winningCombinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        cells[a - 1].textContent === currentPlayer &&
        cells[b - 1].textContent === currentPlayer &&
        cells[c - 1].textContent === currentPlayer
      ) {
        return true;
      }
    }

    return false;
  }

  function checkDraw() {
    return Array.from(cells).every((cell) => cell.textContent !== "");
  }

  function disableCells() {
    cells.forEach((cell) => (cell.style.pointerEvents = "none"));
  }
});