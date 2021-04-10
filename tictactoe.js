
const TicTacToe = {};

TicTacToe.GameBoard = function (logger) {
    const spaces = [
        ['-', '-', '-'], // first row
        ['-', '-', '-'], // second row
        ['-', '-', '-'] // third row
    ];

    return {
        placeMark: function (row, column, mark) {
            if (spaces[row][column] === "-" && this.isGameOver() !== true) {
                spaces[row][column] = mark;
                return true;
            }
            else {
                logger.log('Illegal move: that move is not allowed');
                return false;
            }
        },
        isGameOver: function () {
            if (this.winner() || (this.isTie() === true)) {
                return true;
            }
        },
        winner: function () {
            if ((spaces[0][0] === spaces[0][1]) && (spaces[0][0] === spaces[0][2])) {
                if (spaces[0][0] === "X") {
                    return "X";
                } else if (spaces[0][0] === "O") {
                    return "O";
                }
            } else if ((spaces[1][0] === spaces[1][1]) && (spaces[1][0] === spaces[1][2])) {
                if (spaces[1][0] === "X") {
                    return "X";
                } else if (spaces[1][0] === "O") {
                    return "O";
                }
            } else if ((spaces[2][0] === spaces[2][1]) && (spaces[2][0] === spaces[2][2])) {
                if (spaces[2][0] === "X") {
                    return "X";
                } else if (spaces[2][0] === "O") {
                    return "O";
                }
            } else if ((spaces[0][0] === spaces[1][0]) && (spaces[0][0] === spaces[2][0])) {
                if (spaces[0][0] === "X") {
                    return "X";
                } else if (spaces[0][0] === "O") {
                    return "O";
                }
            } else if ((spaces[0][1] === spaces[1][1]) && (spaces[0][1] === spaces[2][1])) {
                if (spaces[0][1] === "X") {
                    return "X";
                } else if (spaces[0][1] === "O") {
                    return "O";
                }
            } else if ((spaces[0][0] === spaces[1][1]) && (spaces[0][0] === spaces[2][2])) {
                if (spaces[0][0] === "X") {
                    return "X";
                } else if (spaces[0][0] === "O") {
                    return "O";
                }
            } else if ((spaces[0][2] === spaces[1][1]) && (spaces[0][2] === spaces[2][0])) {
                if (spaces[0][2] === "X") {
                    return "X";
                } else if (spaces[0][2] === "O") {
                    return "O";
                }
            }
            return undefined;
        },
        isTie: function () {
            if ((spaces.some(row => row.includes('-'))) || (this.winner() === true)) {
                return false;
            }
            else {
                return true;
            }
        },
        resetBoard: function () {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    spaces[i][j] = "-";
                }
            }
        },
        getCurrentBoardState: function () {
            let gameStateCopy = spaces.map(function (arr) {
                return arr.slice();
            });
            return gameStateCopy;
        }
    }
}(console);

TicTacToe.createPlayer = function (name) {
    return {
        name,
        wins: 0,
        losses: 0,
        ties: 0
    };
}

TicTacToe.GameController = function () {

    let _playerX;
    let _playerO;
    let _currentPlayer;

    return {
        newGame: function (playerX, playerO) {
            TicTacToe.GameBoard.resetBoard();
            _currentPlayer = _playerX = playerX;
            _playerO = playerO;
        },
        whoseTurn: function () {
            return _currentPlayer;
        },
        takeTurn: function (row, col) {
            if (TicTacToe.GameBoard.placeMark(row, col, _currentPlayer == _playerX ? 'X' : 'O')) {
                if (TicTacToe.GameBoard.isGameOver()) {
                    if (TicTacToe.GameBoard.winner()) {
                        _currentPlayer.wins++;
                    } else if (TicTacToe.GameBoard.isTie()) {
                        _playerX.ties++;
                        _playerO.ties++;
                    }
                } else {
                    _currentPlayer = (_currentPlayer == _playerX) ? _playerO : _playerX;
                }
            }
        },
        isGameOver: function () {
            return TicTacToe.GameBoard.isGameOver();
        },
        isTie: function () {
            return TicTacToe.GameBoard.isTie();
        },
        winner: function () {
            return TicTacToe.GameBoard.winner();
        },
    }
}();

TicTacToe.DisplayController = function () {

    return {
        generateBoard: function () {
            const gameStateArray = TicTacToe.GameBoard.getCurrentBoardState();
            let html = '';
            for (let i = 0; i < gameStateArray.length; i++) {
                for (let j = 0; j < gameStateArray[i].length; j++) {
                    html += '<section data-row="' + i + '" data-col="' + j + '">' + gameStateArray[i][j] + '</section>';
                }
            }
            document.getElementById("gridMain").innerHTML = html;
            document.querySelectorAll('#gridMain > section').forEach((el) => {
                el.addEventListener('click', function() {
                    console.log(this);
                    TicTacToe.GameController.takeTurn(this.getAttribute('data-row'), this.getAttribute('data-col'));
                    TicTacToe.DisplayController.generateBoard();
                    TicTacToe.DisplayController.displayTurn();
                });
            }) 
            console.log(html);
        },
        displayTurn: function () {
            let statusText = document.getElementById("gameStatus");
            statusText.textContent = TicTacToe.GameController.whoseTurn().name + '\'s turn';
        },
        displayWinState: function () {

        },
        playAgainHandler: function () {

        },
        spaceClickHandler: function () {

        },
        pageLoadHandler: function () {
            this.showPopUp();

            const btnX = document.getElementById('X');
            btnX.addEventListener('click', () => {
                this.hidePopUp();
                const player1 = TicTacToe.createPlayer("Player 1");
                const player2 = TicTacToe.createPlayer("Player 2");
                TicTacToe.GameController.newGame(player1, player2);
                this.generateBoard();
                this.displayTurn();
            });
            
            const btnO = document.getElementById('O');
            btnO.addEventListener('click', () => {
                this.hidePopUp();
                const player1 = TicTacToe.createPlayer("Player 1");
                const player2 = TicTacToe.createPlayer("Player 2");
                TicTacToe.GameController.newGame(player2, player1);
                this.generateBoard();
                this.displayTurn();
            });
        },
        showPopUp: function () {
            startMenu = document.getElementById("cont");
            startMenu.style.display = 'block';
        },
        hidePopUp: function () {
            startMenu = document.getElementById("cont");
            startMenu.style.display = 'none';
        }
    };
}();

window.addEventListener('load', () => TicTacToe.DisplayController.pageLoadHandler());

//div.textContent = 'Wins!'  and play again button                            
