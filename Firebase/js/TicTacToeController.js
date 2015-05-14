angular
    .module('myApp')
        .controller("TicTacToeController", TicTacToeController)

        // injects $firebaseArray
        TicTacToeController.$inject = ['$firebaseArray'];

        /*
         TicTacToeController function -- must contain everything for the controller
        */
        function TicTacToeController ($firebaseArray) {
            
            // variable capture
            var self = this;

            // starts the turn counter at zero
            self.turn = 0;

            // starts both player scores and tie count at zero
            self.p1 = 0;
            self.p2 = 0;
            self.tie = 0;

            // sets game status as game in progress
            self.gameStatus = "Game in progress";

            // gets boxes array from firebase and attaches it to the controller
            self.boxes = (function(){
                var ref = new Firebase('https://tictactoekate.firebaseio.com/boxes');
                var boxes = $firebaseArray(ref);
                console.log(boxes);
                return boxes;
            })();
            
            // attaches takeTurns to the controller
            self.takeTurns = takeTurns;

            // attaches chooseBox to the controller
            self.chooseBox = chooseBox;

            // attaches getWinner to the controller
            self.getWinner = getWinner;

            // attaches resetBoard to the controller
            self.resetBoard = resetBoard;

            /*
             alternates between players 1 and 2
            */
            function takeTurns() {
                
                self.turn++;
                if (self.turn % 2 === 0) {
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
                
                if (self.gameStatus === "Game in progress") {
                    if ((self.boxes[index].isX === true) 
                        || (self.boxes[index].isO === true)) 
                    {
                        alert("Oops! This cell is already taken. Please select a different cell.");
                        return;
                    }
                    var myTurn = takeTurns();
                    if (myTurn === "o") {
                        self.boxes[index].isO = true;
                    }
                    else if (myTurn === "x") {
                        self.boxes[index].isX = true;

                    }
                    self.boxes.$save(self.boxes[index]);
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
                    ((self.boxes[0].isX === true) 
                        && (self.boxes[1].isX === true) 
                        && (self.boxes[2].isX === true)) 
                    || ((self.boxes[3].isX === true) 
                        && (self.boxes[4].isX === true) 
                        && (self.boxes[5].isX === true)) 
                    || ((self.boxes[6].isX === true) 
                        && (self.boxes[7].isX === true) 
                        && (self.boxes[8].isX === true)) 
                    || ((self.boxes[0].isX === true) 
                        && (self.boxes[3].isX === true) 
                        && (self.boxes[6].isX === true)) 
                    || ((self.boxes[1].isX === true) 
                        && (self.boxes[4].isX === true) 
                        && (self.boxes[7].isX === true)) 
                    || ((self.boxes[2].isX === true) 
                        && (self.boxes[5].isX === true) 
                        && (self.boxes[8].isX === true)) 
                    || ((self.boxes[0].isX === true) 
                        && (self.boxes[4].isX === true) 
                        && (self.boxes[8].isX === true)) 
                    || ((self.boxes[2].isX === true) 
                        && (self.boxes[4].isX === true) 
                        && (self.boxes[6].isX === true))
                ){
                    /*
                     changes gameStatus & p1 score if x has won
                     stops looking for a win or tie
                    */
                    self.gameStatus = "X wins!";
                    self.p1++;
                    return;
                }
                
                // checks for o win
                if (
                    ((self.boxes[0].isO === true) 
                        && (self.boxes[1].isO === true) 
                        && (self.boxes[2].isO === true)) 
                    || ((self.boxes[3].isO === true) 
                        && (self.boxes[4].isO === true) 
                        && (self.boxes[5].isO === true)) 
                    || ((self.boxes[6].isO === true) 
                        && (self.boxes[7].isO === true) 
                        && (self.boxes[8].isO === true)) 
                    || ((self.boxes[0].isO === true) 
                        && (self.boxes[3].isO === true) 
                        && (self.boxes[6].isO === true)) 
                    || ((self.boxes[1].isO === true) 
                        && (self.boxes[4].isO === true) 
                        && (self.boxes[7].isO === true)) 
                    || ((self.boxes[2].isO === true) 
                        && (self.boxes[5].isO === true) 
                        && (self.boxes[8].isO === true)) 
                    || ((self.boxes[0].isO === true) 
                        && (self.boxes[4].isO === true) 
                        && (self.boxes[8].isO === true)) 
                    || ((self.boxes[2].isO === true) 
                        && (self.boxes[4].isO === true) 
                        && (self.boxes[6].isO === true))
                ){
                    /*
                     changes gameStatus & p2 score if o has won
                     stops looking for a win or tie
                    */
                    self.gameStatus = "O wins!";
                    self.p2++;
                    return;
                }
                
                // checks for tie
                var cellEmpty = false;
                for (var i = 0; i < self.boxes.length; i++) {
                    if ((self.boxes[i].isX === false) && (self.boxes[i].isO === false)) {
                        cellEmpty = true;
                    }
                }
                if (cellEmpty === false) {
                    /*
                     changes gameStatus & tie count if it is a tie
                    */
                    self.gameStatus = "It's a tie!"
                    self.tie++;
                }
            
            }

            /*
             clears board when game is over
            */
            function resetBoard() {
                
                // prevents a game reset when a game is in progress
                if (self.gameStatus === "Game in progress") {
                    alert("Whoa! One game at a time!");
                    return;
                }
                // clears the board for a new game
                else {
                    for (var i = 0; i < self.boxes.length; i++) {
                        self.boxes[i].isX = false;
                        self.boxes[i].isO = false;
                        self.boxes.$save(self.boxes[i]);
                    }

                    //resets the game status for the new game
                    self.gameStatus = "Game in progress";
                }
                
            }

        }




