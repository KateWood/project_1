angular
    .module('myApp')
        .controller("TicTacToeController", TicTacToeController)

function TicTacToeController () {
    var self = this;

    // starts the turn counter at zero
    self.turn = 0;

    // starts both player scores at zero
    self.p1 = 0;
    self.p2 = 0;

    //sets game status as game in progress
    self.gameStatus = "Game in progress";

    // sets boxes as an array
    self.boxes = [ {isX: false, isO: false},
                   {isX: false, isO: false},
                   {isX: false, isO: false},
                   {isX: false, isO: false},
                   {isX: false, isO: false},
                   {isX: false, isO: false},
                   {isX: false, isO: false},
                   {isX: false, isO: false},
                   {isX: false, isO: false}
                 ];
    
    // attaches takeTurns to the controller
    self.takeTurns = takeTurns;

    // attaches chooseBox to the controller
    self.chooseBox = chooseBox;

    //attaches getWinner to the controller
    self.getWinner = getWinner;

    // alternates between players 1 and 2
    function takeTurns() {
        self.turn++;
        if (self.turn % 2 === 0) {
          return "o";
        } else {
          return "x";
        } 
    }

    // reacts to box being clicked
    function chooseBox(index) {
        if ((self.boxes[index].isX === true) || (self.boxes[index].isO === true)) {
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
        self.getWinner();
    }

    //checks for a winner
    function getWinner() {
        //check for x win
        if (((self.boxes[0].isX === true) && (self.boxes[1].isX === true) && (self.boxes[2].isX === true)) ||
           ((self.boxes[3].isX === true) && (self.boxes[4].isX === true) && (self.boxes[5].isX === true)) ||
           ((self.boxes[6].isX === true) && (self.boxes[7].isX === true) && (self.boxes[8].isX === true)) ||
           ((self.boxes[0].isX === true) && (self.boxes[3].isX === true) && (self.boxes[6].isX === true)) ||
           ((self.boxes[1].isX === true) && (self.boxes[4].isX === true) && (self.boxes[7].isX === true)) ||
           ((self.boxes[2].isX === true) && (self.boxes[5].isX === true) && (self.boxes[8].isX === true)) ||
           ((self.boxes[0].isX === true) && (self.boxes[4].isX === true) && (self.boxes[8].isX === true)) ||
           ((self.boxes[2].isX === true) && (self.boxes[4].isX === true) && (self.boxes[6].isX === true)))
        {
          alert('x wins!');
          self.p1++;
          for (var i = 0; i < self.boxes.length; i++) {
          self.boxes[i].isX = false;
          self.boxes[i].isO = false;
          }
          return;
        }
        //check for o win
        if (((self.boxes[0].isO === true) && (self.boxes[1].isO === true) && (self.boxes[2].isO === true)) ||
           ((self.boxes[3].isO === true) && (self.boxes[4].isO === true) && (self.boxes[5].isO === true)) ||
           ((self.boxes[6].isO === true) && (self.boxes[7].isO === true) && (self.boxes[8].isO === true)) ||
           ((self.boxes[0].isO === true) && (self.boxes[3].isO === true) && (self.boxes[6].isO === true)) ||
           ((self.boxes[1].isO === true) && (self.boxes[4].isO === true) && (self.boxes[7].isO === true)) ||
           ((self.boxes[2].isO === true) && (self.boxes[5].isO === true) && (self.boxes[8].isO === true)) ||
           ((self.boxes[0].isO === true) && (self.boxes[4].isO === true) && (self.boxes[8].isO === true)) ||
           ((self.boxes[2].isO === true) && (self.boxes[4].isO === true) && (self.boxes[6].isO === true)))
        {
          alert('o wins!');
          self.p2++;
          for (var i = 0; i < self.boxes.length; i++) {
          self.boxes[i].isX = false;
          self.boxes[i].isO = false;
          }
          return;
        }
        //checks for tie
        var cellEmpty = false;
        for (var i = 0; i < self.boxes.length; i++) {
            if ((self.boxes[i].isX === false) && (self.boxes[i].isO === false)) {
            cellEmpty = true;
            }
        }
        if (cellEmpty === false) {
            alert("It's a tie!");
            for (var i = 0; i < self.boxes.length; i++) {
          self.boxes[i].isX = false;
          self.boxes[i].isO = false;
          }
        }
    
    }

}




