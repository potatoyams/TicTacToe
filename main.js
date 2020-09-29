// Class that keeps track of player
const Player = () => {
    const timesWon = 0;
    // For now, have default players have thier maker made up.
    return {timesWon};
};

// Class that keeps track of the state of the game.
const gameBoard = (() => {
    var board = [[undefined, undefined, undefined],[undefined, undefined, undefined], [undefined, undefined, undefined]];
    var moveCount = 0;
    const playerOne = Player();
    const playerTwo = Player();


    return {
        board, 
        moveCount,
        playerOne,
        playerTwo
    };  
})();

// Class that keeps updates the game functionality.
const gameControl = (() => {
    var playerOneTurn = true; // True if player one's turn. False otherwise.

    const makeMove = (x, y) => {
        const currPiece = document.getElementById("r" + x + "c" + y);
        if (currPiece.textContent !== "X" && currPiece.textContent !== "O") {
            gameBoard.moveCount++;
            var marker = ""
            if (playerOneTurn) {
                marker = "X"
            } else {
                marker = "O"
            }
            gameBoard.board[x][y] = marker;
            playerOneTurn = !playerOneTurn;
            currPiece.textContent = marker;
            if (checkWinner(x, y, marker)) {
                if (!playerOneTurn) {
                    alert("Player One Won");
                } else {
                    alert("Player Two Won");
                }
                resetState();
                updateGameScore();
            } else if (gameBoard.moveCount === Math.pow(3, 2)) {
                alert("You Tied")
                resetState();
                console.log(gameBoard.board);
            }
        }
    };

    function checkWinner(x, y, marker) {
        /*
            col=row=diag=rdiag=0
            winner=false
            for i=1 to n
            if cell[x,i]=player then col++
            if cell[i,y]=player then row++
            if cell[i,i]=player then diag++
            if cell[i,n-i+1]=player then rdiag++
            if row=n or col=n or diag=n or rdiag=n then winner=true
        */
       var col = 0;
       var row = 0;
       var diag = 0;
       var rdiag = 0;
       for (let i = 0; i < 3; i++) {
           if (gameBoard.board[x][i] === marker) {
               col++;
           }
           
           if (gameBoard.board[i][y] === marker) {
               row++;
           }

           if (gameBoard.board[i][i] === marker) {
               diag++;
           }

           if (gameBoard.board[i][2 - i] === marker) {
               rdiag++;
           }
       }
       if (row === 3 || col === 3 || diag === 3 || rdiag === 3) {
           if (marker === "X") {
               gameBoard.playerOne.timesWon++;
           } else {
               gameBoard.playerTwo.timesWon++;
           }
        return true;
       }
    }

    function resetState() {
        // Having this function in gameBoard makes it so that state doesn't reset properly. 
        gameBoard.board = [[undefined, undefined, undefined],[undefined, undefined, undefined], [undefined, undefined, undefined]];
        gameBoard.moveCount = 0;
        var gamePieces = document.querySelectorAll(".gamepieces");
        for (let currPiece of gamePieces) {
            currPiece.textContent = "";
            /*
            currPiece.addEventListener("click", () => {
                gameControl.makeMove(currPiece.id.charAt(1), currPiece.id.charAt(3));
           }); */  // This causes unusual bug in the game state. Figure out how.
        }
    }

    return {makeMove,
    resetState}
    })();

updateGameScore();

var gamePieces = document.querySelectorAll(".gamepieces");
for (let currPiece of gamePieces) {
    currPiece.addEventListener("click", () => {
        gameControl.makeMove(currPiece.id.charAt(1), currPiece.id.charAt(3));
    });
}

function updateGameScore() {
    var gamePieces = document.querySelector(".player-score").children;
    var playerOneStat = gamePieces[0];
    var playerTwoStat = gamePieces[1];
    playerOneStat.textContent = "Player One: " + gameBoard.playerOne.timesWon;
    playerTwoStat.textContent = "Player Two: " + gameBoard.playerTwo.timesWon;
}

var resetGameButton = document.getElementById("resetGameBtn");
resetGameButton.addEventListener("click", () => {
    gameControl.resetState();
});

var resetScoreButton = document.getElementById("resetScoreBtn");

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("res");

// When the user clicks on the button, open the modal
resetScoreButton.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 
