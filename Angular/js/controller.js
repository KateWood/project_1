angular
  .module('myApp', [])
    .controller("TicTacToeController", TicTacToeController)

function TicTacToeController () {
  var self = this;
  self.box1 = self.box1;
  self.boxes = [self.box0, self.box1, self.box2,
                self.box3, self.box4, self.box5,
                self.box6, self.box7, self.box8]


    }

var boxes = document.getElementsByClassName('box');
var turn = 0;
var p1 = 0;
var p2 = 0;

function takeTurns() {
  // alternate between players 1 and 2
  turn++;
  if (turn % 2 === 0) {
    return "o";
  } else {
    return "x";
  } 
}

chooseBox();

function chooseBox() {
  // react to box being clicked
  for (var i = 0; i < boxes.length; i++) {
      boxes[i].addEventListener('click', function() {
        if (this.innerHTML !== "") {
          alert("Oops! This cell is already taken. Please select a different cell.");
        } else {
          this.innerHTML = takeTurns();
          // check for winner
          getWinner();
        }
      });
  } 
}

function getWinner() {
    // check for x win
    if (((boxes[0].innerHTML === "x") && (boxes[1].innerHTML === "x") && (boxes[2].innerHTML === "x")) ||
       ((boxes[3].innerHTML === "x") && (boxes[4].innerHTML === "x") && (boxes[5].innerHTML === "x")) ||
       ((boxes[6].innerHTML === "x") && (boxes[7].innerHTML === "x") && (boxes[8].innerHTML === "x")) ||
       ((boxes[0].innerHTML === "x") && (boxes[3].innerHTML === "x") && (boxes[6].innerHTML === "x")) ||
       ((boxes[1].innerHTML === "x") && (boxes[4].innerHTML === "x") && (boxes[7].innerHTML === "x")) ||
       ((boxes[2].innerHTML === "x") && (boxes[5].innerHTML === "x") && (boxes[8].innerHTML === "x")) ||
       ((boxes[0].innerHTML === "x") && (boxes[4].innerHTML === "x") && (boxes[8].innerHTML === "x")) ||
       ((boxes[2].innerHTML === "x") && (boxes[4].innerHTML === "x") && (boxes[6].innerHTML === "x")))
    {
        alert("x wins!");
        p1++;
        document.getElementById('p1score').innerHTML = p1;
        for (var i = 0; i < boxes.length; i++) {
          boxes[i].innerHTML = null;
        }
        return;
    }
    // check for o win
    if (((boxes[0].innerHTML === "o") && (boxes[1].innerHTML === "o") && (boxes[2].innerHTML === "o")) ||
       ((boxes[3].innerHTML === "o") && (boxes[4].innerHTML === "o") && (boxes[5].innerHTML === "o")) ||
       ((boxes[6].innerHTML === "o") && (boxes[7].innerHTML === "o") && (boxes[8].innerHTML === "o")) ||
       ((boxes[0].innerHTML === "o") && (boxes[3].innerHTML === "o") && (boxes[6].innerHTML === "o")) ||
       ((boxes[1].innerHTML === "o") && (boxes[4].innerHTML === "o") && (boxes[7].innerHTML === "o")) ||
       ((boxes[2].innerHTML === "o") && (boxes[5].innerHTML === "o") && (boxes[8].innerHTML === "o")) ||
       ((boxes[0].innerHTML === "o") && (boxes[4].innerHTML === "o") && (boxes[8].innerHTML === "o")) ||
       ((boxes[2].innerHTML === "o") && (boxes[4].innerHTML === "o") && (boxes[6].innerHTML === "o")))
    {
        alert("o wins!");
        p2++;
        document.getElementById('p2score').innerHTML = p2;
        for (var i = 0; i < boxes.length; i++) {
          boxes[i].innerHTML = null;
        }
        return;
    }
}








