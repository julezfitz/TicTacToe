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
            if (spaces[0][0] != '-' && (spaces[0][0] === spaces[0][1]) && (spaces[0][0] === spaces[0][2])) {
                if (spaces[0][0] === "X") {
                    return "X";
                } else if (spaces[0][0] === "O") {
                    return "O";
                }
            } else if (spaces[1][0] != '-' && ((spaces[1][0] === spaces[1][1]) && (spaces[1][0] === spaces[1][2]))) {
                if (spaces[1][0] === "X") {
                    return "X";
                } else if (spaces[1][0] === "O") {
                    return "O";
                }
            } else if (spaces[2][0] != '-' && ((spaces[2][0] === spaces[2][1]) && (spaces[2][0] === spaces[2][2]))) {
                if (spaces[2][0] === "X") {
                    return "X";
                } else if (spaces[2][0] === "O") {
                    return "O";
                }
            } else if (spaces[0][0] != '-' && ((spaces[0][0] === spaces[1][0]) && (spaces[0][0] === spaces[2][0]))) {
                if (spaces[0][0] === "X") {
                    return "X";
                } else if (spaces[0][0] === "O") {
                    return "O";
                }
            } else if (spaces[0][1] != '-' && ((spaces[0][1] === spaces[1][1]) && (spaces[0][1] === spaces[2][1]))) {
                console.log("win");
                if (spaces[0][1] === "X") {
                    return "X";
                } else if (spaces[0][1] === "O") {
                    return "O";
                }
            } else if (spaces[0][0] != '-' && ((spaces[0][0] === spaces[1][1]) && (spaces[0][0] === spaces[2][2]))) {
                if (spaces[0][0] === "X") {
                    return "X";
                } else if (spaces[0][0] === "O") {
                    return "O";
                }
            } else if (spaces[0][2] != '-' && ((spaces[0][2] === spaces[1][1]) && (spaces[0][2] === spaces[2][0]))) {
                if (spaces[0][2] === "X") {
                    return "X";
                } else if (spaces[0][2] === "O") {
                    return "O";
                }
            } else if (spaces[0][2] != '-' && ((spaces[0][2] === spaces[1][2]) && (spaces[0][2] === spaces[2][2]))) {
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
        possibleMoves: function () {
            let legalMoves = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (spaces[i][j] === "-") {
                        legalMoves.push([i, j]);
                    };
                };
            };
            return legalMoves;
        },
        getCurrentBoardState: function () {
            let gameStateCopy = spaces.map(function (arr) {
                return arr.slice();
            });
            return gameStateCopy;
        }
    }
}(console);

TicTacToe.createPlayer = function (name, isComputer) {
    return {
        name,
        wins: 0,
        losses: 0,
        ties: 0,
        isComputer, 
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
            console.log(_playerX);

            if(_currentPlayer.isComputer) {
                const computerTurn = TicTacToe.GameController.computerTurn();
                TicTacToe.GameController.takeTurn(computerTurn[0], computerTurn[1]);
            };
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
                    if(_currentPlayer.isComputer) {
                        const computerTurn = TicTacToe.GameController.computerTurn();
                        TicTacToe.GameController.takeTurn(computerTurn[0], computerTurn[1]);
                    };
                }
                return true;
            }
            return false;
        },
        computerTurn: function () {
            let possibleMoves = TicTacToe.GameBoard.possibleMoves();
            let randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            return randomMove;
        },
        isGameOver: function () {
            return TicTacToe.GameBoard.isGameOver();
        },
        isTie: function () {
            return TicTacToe.GameBoard.isTie();
        },
        winner: function () {
            if (TicTacToe.GameBoard.winner()) {
                return TicTacToe.GameBoard.winner() == 'X' ? _playerX : _playerO;
            } else {
                return undefined;
            }
        },
    }
}();

TicTacToe.DisplayController = function () {

    let player1;
    let player2;

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
                el.addEventListener('click', function () {
                    console.log(this);
                    if (TicTacToe.GameController.takeTurn(this.getAttribute('data-row'), this.getAttribute('data-col'))) {
                        TicTacToe.DisplayController.displayTurn();
                        console.log(player1);
                        if (TicTacToe.GameController.isGameOver() === true) {
                            TicTacToe.DisplayController.displayWinState();
                        }
                    } else {
                        TicTacToe.DisplayController.displayIllegalMove();
                    }
                    TicTacToe.DisplayController.generateBoard();
                });
            })
            console.log(html);
        },
        displayTurn: function () {
            let statusText = document.getElementById("gameStatus");
            statusText.textContent = TicTacToe.GameController.whoseTurn().name + '\'s turn';
        },
        displayIllegalMove: function () {
            let statusError = document.getElementById("gameStatus");
            statusError.textContent = 'Illegal move: that move is not allowed';
        },
        displayWinState: function () {
            this.showEndPopUp();
            endMenu = document.getElementById("endGame");
            const plAgbtn = document.getElementById('playAgain');
            plAgbtn.addEventListener('click', () => {
                this.hideEndPopUp();
                TicTacToe.DisplayController.pageLoadHandler();
            });
        },
        pageLoadHandler: function () {
            if (player1 === undefined) {
                this.showCreatePlayers();
                this.createPlayers();
                this.hidePopUp();
            } else {
                this.showPopUp();
            }
            this.hideEndPopUp();

            const btnX = document.getElementById('X');
            btnX.addEventListener('click', () => {
                this.hidePopUp();
                TicTacToe.GameController.newGame(player1, player2);
                this.generateBoard();
                this.displayTurn();
            });

            const btnO = document.getElementById('O');
            btnO.addEventListener('click', () => {
                this.hidePopUp();
                TicTacToe.GameController.newGame(player2, player1);
                this.generateBoard();
                this.displayTurn();
            });
        },
        showPopUp: function () {
            startMenu = document.getElementById("cont");
            startMenu.style.display = 'block';
            document.getElementById("chooseMarkText").innerHTML = player1.name + ", please choose your mark:";
        },
        hidePopUp: function () {
            startMenu = document.getElementById("cont");
            startMenu.style.display = 'none';
        },
        showEndPopUp: function () {
            endMenu = document.getElementById("endGame");
            endMenu.style.display = 'block';
            againText = document.getElementById("againText");
            againText.setAttribute('style', 'white-space: pre;');
            if (TicTacToe.GameController.winner()) {
                againText.textContent = TicTacToe.GameController.winner().name + ' wins! \r\n';
                againText.textContent += player1.name + ":  Wins: " + player1.wins + "  Losses: " + player1.losses + "  Ties: " + player1.ties + "\r\n";
                againText.textContent += player2.name + ":  Wins: " + player2.wins + "  Losses: " + player2.losses + "  Ties: " + player2.ties + "\r\n";
            } else {
                againText.textContent = 'Tie!';
            };
        },
        hideEndPopUp: function () {
            endMenu = document.getElementById("endGame");
            endMenu.style.display = 'none';
        },
        createPlayers: function () {
            const nameInputPlayer1 = document.getElementById("nameInputPlayer1");
            const nameInputPlayer2 = document.getElementById("nameInputPlayer2");
            
            let playersButton = document.getElementById("submit");

            playersButton.addEventListener("click", function () {
                if((nameInputPlayer1.value.length < 1) || (nameInputPlayer2.value.length < 1)) {
                    alert ("Please submit player names.");
                } else {
                player1 = TicTacToe.createPlayer(nameInputPlayer1.value);
                player2 = TicTacToe.createPlayer(nameInputPlayer2.value);
                TicTacToe.DisplayController.showPopUp();
                TicTacToe.DisplayController.hideCreatePlayers();
                console.log(nameInputPlayer1);
                }
            });

            let soloButton = document.getElementById("soloGame");
            soloButton.addEventListener("click", function() {
                if(nameInputPlayer1.value.length < 1) {
                    alert ("Please submit player names.");
                } else {
                player1 = TicTacToe.createPlayer(nameInputPlayer1.value);
                player2 = TicTacToe.createPlayer("Computer", true);
                TicTacToe.DisplayController.showPopUp();
                TicTacToe.DisplayController.hideCreatePlayers();
                }  
            });
        },
        showCreatePlayers: function () {
            startMenu = document.getElementById("setPlayerNames");
            startMenu.style.display = 'block';
        },
        hideCreatePlayers: function () {
            startMenu = document.getElementById("setPlayerNames");
            startMenu.style.display = 'none';
        }
    };
}();

window.addEventListener('load', () => TicTacToe.DisplayController.pageLoadHandler());


