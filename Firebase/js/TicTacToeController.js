angular
    .module('myApp')
        .controller("TicTacToeController", TicTacToeController)

        // injects $firebaseObject
        TicTacToeController.$inject = ['$firebaseObject'];

        /*
         TicTacToeController function -- must contain everything for the controller
        */
        function TicTacToeController ($firebaseObject) {
            
            // variable capture
            var self = this;

            // gets boxes array from firebase and attaches it to the controller
            self.gameBoard = (function(){
                var ref = new Firebase('https://tictactoekate.firebaseio.com');
                var gameBoard = $firebaseObject(ref);
                return gameBoard;
            })();
            
            // attaches takeTurns to the controller
            self.takeTurns = takeTurns;

            // attaches chooseBox to the controller
            self.chooseBox = chooseBox;

            // attaches getWinner to the controller
            self.getWinner = getWinner;

            // attaches resetBoard to the controller
            self.resetBoard = resetBoard;

            // attaches resetScores to the controller
            self.resetScores = resetScores;

            // stores my player ID locally
            self.myId = null;

            // attaches getMyId to controller
            self.getMyId = getMyId;

            // stores playerName locally
            self.playerName = ""

            // stores player ID locally
            self.iAmFire = false;
            self.iAmIce = false;

            // displays waiting message for player 1 when player 2 is false
            self.waiting = false;

            // assigns player ID
            function getMyId() {
                if (self.gameBoard.player1.isHere === false) {
                    self.gameBoard.player1.isHere = true;
                    self.myId = "player 1";
                    self.iAmIce = false;
                    self.iAmFire = true;
                    self.gameBoard.player1.myName = self.playerName;
                    self.waiting = true;
                }
                else if (self.gameBoard.player2.isHere === false) {
                    self.gameBoard.player2.isHere = true;
                    self.myId = "player 2";
                    self.iAmFire = false;
                    self.iAmIce = true;
                    self.gameBoard.player2.myName = self.playerName;
                    self.gameBoard.displayBoard = true;
                }
                else {
                    self.myId = "spectator";
                }
                // clears input field
                self.playerName = "";
                self.gameBoard.$save(self.gameBoard);
            }

            /*
             alternates between players 1 and 2
            */
            function takeTurns() {
                self.gameBoard.turn++;
                if (self.gameBoard.turn % 2 === 0) {
                    return "o";
                }
                else {
                    return "x";
                }

            }

            /* 
             reacts to box being clicked if game is in progress

             @param number index - provides the index of the box that was clicked
            */
            function chooseBox(index) {
                if (self.gameBoard.gameStatus === "Game in progress") {
                    if ((self.gameBoard.boxes[index].isX) 
                        || (self.gameBoard.boxes[index].isO)) 
                    {
                        alert("Oops! This cell is already taken. Please select a different cell.");
                        return;
                    }
                    var myTurn = takeTurns();
                    if (myTurn === "o") {
                        if (self.myId === "player 2") {
                        self.gameBoard.boxes[index].isO = true;
                        }
                        else {
                           self.gameBoard.turn--;
                        } 

                    }
                    else if (myTurn === "x") {
                        if (self.myId === "player 1") {
                        self.gameBoard.boxes[index].isX = true;
                        }
                        else {
                           self.gameBoard.turn--; 
                        }
                    }
                    self.gameBoard.$save(self.gameBoard.boxes);
                    self.getWinner();
                }

            }

            /* 
             checks for a winner or tie
            */
            function getWinner() {
                
                // var token = ["x", "o"];
                // for (var i = 0; i < tokens.length; i++)
                //     var t = tokens[i];
                //     var winner_found = false
                //     if 

                //     if(t == "x") {
                //         // player 1 wins, increase p1 score, return
                //     } else {
                //         //player 2 wins, increase p2 score, return
                //     }

                // checks for x win
                if (
                    ((self.gameBoard.boxes[0].isX) 
                        && (self.gameBoard.boxes[1].isX) 
                        && (self.gameBoard.boxes[2].isX)) 
                    || ((self.gameBoard.boxes[3].isX) 
                        && (self.gameBoard.boxes[4].isX) 
                        && (self.gameBoard.boxes[5].isX)) 
                    || ((self.gameBoard.boxes[6].isX)
                        && (self.gameBoard.boxes[7].isX) 
                        && (self.gameBoard.boxes[8].isX)) 
                    || ((self.gameBoard.boxes[0].isX) 
                        && (self.gameBoard.boxes[3].isX) 
                        && (self.gameBoard.boxes[6].isX)) 
                    || ((self.gameBoard.boxes[1].isX) 
                        && (self.gameBoard.boxes[4].isX) 
                        && (self.gameBoard.boxes[7].isX)) 
                    || ((self.gameBoard.boxes[2].isX) 
                        && (self.gameBoard.boxes[5].isX) 
                        && (self.gameBoard.boxes[8].isX)) 
                    || ((self.gameBoard.boxes[0].isX) 
                        && (self.gameBoard.boxes[4].isX) 
                        && (self.gameBoard.boxes[8].isX)) 
                    || ((self.gameBoard.boxes[2].isX) 
                        && (self.gameBoard.boxes[4].isX) 
                        && (self.gameBoard.boxes[6].isX))
                ){
                    /*
                     changes gameStatus & p1 score if x has won
                     stops looking for a win or tie
                    */
                    self.gameBoard.gameStatus = self.gameBoard.player1.myName + " wins!";
                    self.gameBoard.p1++;
                    self.gameBoard.$save(self.gameBoard.p1);
                    return;
                }
                
                // checks for o win
                if (
                    ((self.gameBoard.boxes[0].isO) 
                        && (self.gameBoard.boxes[1].isO) 
                        && (self.gameBoard.boxes[2].isO)) 
                    || ((self.gameBoard.boxes[3].isO) 
                        && (self.gameBoard.boxes[4].isO) 
                        && (self.gameBoard.boxes[5].isO)) 
                    || ((self.gameBoard.boxes[6].isO) 
                        && (self.gameBoard.boxes[7].isO) 
                        && (self.gameBoard.boxes[8].isO)) 
                    || ((self.gameBoard.boxes[0].isO) 
                        && (self.gameBoard.boxes[3].isO) 
                        && (self.gameBoard.boxes[6].isO)) 
                    || ((self.gameBoard.boxes[1].isO) 
                        && (self.gameBoard.boxes[4].isO) 
                        && (self.gameBoard.boxes[7].isO)) 
                    || ((self.gameBoard.boxes[2].isO) 
                        && (self.gameBoard.boxes[5].isO) 
                        && (self.gameBoard.boxes[8].isO)) 
                    || ((self.gameBoard.boxes[0].isO) 
                        && (self.gameBoard.boxes[4].isO) 
                        && (self.gameBoard.boxes[8].isO)) 
                    || ((self.gameBoard.boxes[2].isO) 
                        && (self.gameBoard.boxes[4].isO) 
                        && (self.gameBoard.boxes[6].isO))
                ){
                    /*
                     changes gameStatus & p2 score if o has won
                     stops looking for a win or tie
                    */
                    self.gameBoard.gameStatus = self.gameBoard.player2.myName + " wins!";
                    self.gameBoard.p2++;
                    self.gameBoard.$save(self.gameBoard.p2);
                    return;
                }
                
                // checks for tie
                var cellEmpty = false;
                for (var i = 0; i < self.gameBoard.boxes.length; i++) {
                    if ((self.gameBoard.boxes[i].isX === false) 
                        && (self.gameBoard.boxes[i].isO === false)) {
                        cellEmpty = true;
                    }
                }
                if (cellEmpty === false) {
                    /*
                     changes gameStatus & tie count if it is a tie
                    */
                    self.gameBoard.gameStatus = "It's a tie!"
                    self.gameBoard.$save(self.gameBoard.gameStatus);
                    self.gameBoard.tie++;
                    self.gameBoard.$save(self.gameBoard.tie);
                }
            
            }

            /*
             clears board when game is over
            */
            function resetBoard() {
                
                // prevents a game reset when a game is in progress
                if (self.gameBoard.gameStatus === "Game in progress") {
                    alert("Whoa! One game at a time!");
                    return;
                }
                // clears the board for a new game
                else {
                    for (var i = 0; i < self.gameBoard.boxes.length; i++) {
                        self.gameBoard.boxes[i].isX = false;
                        self.gameBoard.boxes[i].isO = false;
                        self.gameBoard.$save(self.gameBoard.boxes[i]);
                    }

                    //resets the game status for the new game
                    self.gameBoard.gameStatus = "Game in progress";
                    self.gameBoard.$save(self.gameBoard.gameStatus);
                }
                
            }

            /*
             clears board, resets player IDs, and resets scores and turn counters
             to start a new tournament
            */
            function resetScores() {
                for (var i = 0; i < self.gameBoard.boxes.length; i++) {
                    self.gameBoard.boxes[i].isX = false;
                    self.gameBoard.boxes[i].isO = false;
                    self.gameBoard.$save(self.gameBoard.boxes[i]);
                }

                //resets the game status for the new game
                self.gameBoard.gameStatus = "Game in progress";
                self.gameBoard.p1 = 0;
                self.gameBoard.p2 = 0;
                self.gameBoard.tie = 0;
                self.gameBoard.turn = 0;
                self.gameBoard.player1.isHere = false;
                self.gameBoard.player1.myName = "Fire";
                self.gameBoard.player2.isHere = false;
                self.gameBoard.player2.myName = "Ice";
                self.gameBoard.displayBoard = false;
                self.gameBoard.$save(self.gameBoard)
                self.waiting = false;
                
            }

        }









