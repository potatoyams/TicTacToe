const gameBoard = (() => {
    const gameboard = [[undefined, undefined, undefined],[undefined, undefined, undefined], [undefined, undefined, undefined]]
    return {
        gameboard
    };  
})();

const Player = () => {
    return {};
};

const gameControl = (() => {
    const playerOne = Player();
    const playerTwo = Player();
    var playerOneTurn = true; // True if player one's turn. False otherwise.

    const makeMove = (pieceInfo) => {
        const currPiece = document.getElementById(pieceInfo);
        if (currPiece.textContent !== "X" && currPiece.textContent !== "O") {
            var row  = pieceInfo.charAt(1);
            var col = pieceInfo.charAt(3);
            var marker = ""
            if (playerOneTurn) {
                marker = "X"
            } else {
                marker = "O"
            }
            gameBoard.gameboard[row][col] = marker;
            playerOneTurn = !playerOneTurn;
            currPiece.textContent = marker;
        }
        checkWinner();
    };

    function checkWinner() {
    }

    return {makeMove}
})();

var gamePieces = document.querySelectorAll(".gamepieces");
for (let currPiece of gamePieces) {
    currPiece.addEventListener("click", () => {
        gameControl.makeMove(currPiece.id)
    });
}