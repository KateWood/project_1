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
                    if ((self.gameBoard.boxes[index].isX === true) 
                        || (self.gameBoard.boxes[index].isO === true)) 
                    {
                        alert("Oops! This cell is already taken. Please select a different cell.");
                        return;
                    }
                    var myTurn = takeTurns();
                    if (myTurn === "o") {
                        self.gameBoard.boxes[index].isO = true;
                    }
                    else if (myTurn === "x") {
                        self.gameBoard.boxes[index].isX = true;

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
                    ((self.gameBoard.boxes[0].isX === true) 
                        && (self.gameBoard.boxes[1].isX === true) 
                        && (self.gameBoard.boxes[2].isX === true)) 
                    || ((self.gameBoard.boxes[3].isX === true) 
                        && (self.gameBoard.boxes[4].isX === true) 
                        && (self.gameBoard.boxes[5].isX === true)) 
                    || ((self.gameBoard.boxes[6].isX === true) 
                        && (self.gameBoard.boxes[7].isX === true) 
                        && (self.gameBoard.boxes[8].isX === true)) 
                    || ((self.gameBoard.boxes[0].isX === true) 
                        && (self.gameBoard.boxes[3].isX === true) 
                        && (self.gameBoard.boxes[6].isX === true)) 
                    || ((self.gameBoard.boxes[1].isX === true) 
                        && (self.gameBoard.boxes[4].isX === true) 
                        && (self.gameBoard.boxes[7].isX === true)) 
                    || ((self.gameBoard.boxes[2].isX === true) 
                        && (self.gameBoard.boxes[5].isX === true) 
                        && (self.gameBoard.boxes[8].isX === true)) 
                    || ((self.gameBoard.boxes[0].isX === true) 
                        && (self.gameBoard.boxes[4].isX === true) 
                        && (self.gameBoard.boxes[8].isX === true)) 
                    || ((self.gameBoard.boxes[2].isX === true) 
                        && (self.gameBoard.boxes[4].isX === true) 
                        && (self.gameBoard.boxes[6].isX === true))
                ){
                    /*
                     changes gameStatus & p1 score if x has won
                     stops looking for a win or tie
                    */
                    self.gameBoard.gameStatus = "X wins!";
                    self.gameBoard.p1++;
                    self.gameBoard.$save(self.gameBoard.p1);
                    return;
                }
                
                // checks for o win
                if (
                    ((self.gameBoard.boxes[0].isO === true) 
                        && (self.gameBoard.boxes[1].isO === true) 
                        && (self.gameBoard.boxes[2].isO === true)) 
                    || ((self.gameBoard.boxes[3].isO === true) 
                        && (self.gameBoard.boxes[4].isO === true) 
                        && (self.gameBoard.boxes[5].isO === true)) 
                    || ((self.gameBoard.boxes[6].isO === true) 
                        && (self.gameBoard.boxes[7].isO === true) 
                        && (self.gameBoard.boxes[8].isO === true)) 
                    || ((self.gameBoard.boxes[0].isO === true) 
                        && (self.gameBoard.boxes[3].isO === true) 
                        && (self.gameBoard.boxes[6].isO === true)) 
                    || ((self.gameBoard.boxes[1].isO === true) 
                        && (self.gameBoard.boxes[4].isO === true) 
                        && (self.gameBoard.boxes[7].isO === true)) 
                    || ((self.gameBoard.boxes[2].isO === true) 
                        && (self.gameBoard.boxes[5].isO === true) 
                        && (self.gameBoard.boxes[8].isO === true)) 
                    || ((self.gameBoard.boxes[0].isO === true) 
                        && (self.gameBoard.boxes[4].isO === true) 
                        && (self.gameBoard.boxes[8].isO === true)) 
                    || ((self.gameBoard.boxes[2].isO === true) 
                        && (self.gameBoard.boxes[4].isO === true) 
                        && (self.gameBoard.boxes[6].isO === true))
                ){
                    /*
                     changes gameStatus & p2 score if o has won
                     stops looking for a win or tie
                    */
                    self.gameBoard.gameStatus = "O wins!";
                    self.gameBoard.p2++;
                    self.gameBoard.$save(self.gameBoard.p2);
                    return;
                }
                
                // checks for tie
                var cellEmpty = false;
                for (var i = 0; i < self.gameBoard.boxes.length; i++) {
                    if ((self.gameBoard.boxes[i].isX === false) && (self.gameBoard.boxes[i].isO === false)) {
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

            function resetScores() {
                // prevents a game reset when a game is in progress
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
                    self.gameBoard.p1 = 0;
                    self.gameBoard.$save(self.gameBoard.p1);
                    self.gameBoard.p2 = 0;
                    self.gameBoard.$save(self.gameBoard.p2);
                    self.gameBoard.tie = 0;
                    self.gameBoard.$save(self.gameBoard.tie);
                    self.gameBoard.turn = 0;
                    self.gameBoard.$save(self.gameBoard.turn);
                }
                
            }

        }




