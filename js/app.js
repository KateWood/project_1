var boxes = document.getElementsByClassName('box');
var turn = 0;

function takeTurns() {
	turn++;
	if (turn % 2 === 0) {
		return "x";
	} else {
		return "o";
	} 
}

chooseBox();

function chooseBox() {
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('click', function() {
			if (this.innerHTML === "x" || this.innerHTML === "o") {
				alert("this cell has already been chosen, please select another cell");
			} else {
				this.innerHTML = takeTurns();
				getWinner();
			}
		});
	} 
}

function getWinner() {
	if (((boxes[0].innerHTML === "x") && (boxes[1].innerHTML === "x") && (boxes[2].innerHTML === "x")) ||
	   ((boxes[3].innerHTML === "x") && (boxes[4].innerHTML === "x") && (boxes[5].innerHTML === "x")) ||
	   ((boxes[6].innerHTML === "x") && (boxes[7].innerHTML === "x") && (boxes[8].innerHTML === "x"))) {
		alert("x wins!");
		for (var i = 0; i < boxes.length; i++) {
			boxes[i].innerHTML = null;
		}
	} else if (((boxes[0].innerHTML === "x") && (boxes[3].innerHTML === "x") && (boxes[6].innerHTML === "x")) ||
	   ((boxes[1].innerHTML === "x") && (boxes[4].innerHTML === "x") && (boxes[7].innerHTML === "x")) ||
	   ((boxes[2].innerHTML === "x") && (boxes[5].innerHTML === "x") && (boxes[8].innerHTML === "x"))) {
		alert("x wins!");
		for (var i = 0; i < boxes.length; i++) {
			boxes[i].innerHTML = null;
		}		
	} else if (((boxes[0].innerHTML === "x") && (boxes[4].innerHTML === "x") && (boxes[8].innerHTML === "x")) ||
	   ((boxes[2].innerHTML === "x") && (boxes[4].innerHTML === "x") && (boxes[6].innerHTML === "x"))) {
		alert("x wins!");
		for (var i = 0; i < boxes.length; i++) {
			boxes[i].innerHTML = null;
		}		
	} else if (((boxes[0].innerHTML === "o") && (boxes[1].innerHTML === "o") && (boxes[2].innerHTML === "o")) ||
	   ((boxes[3].innerHTML === "o") && (boxes[4].innerHTML === "o") && (boxes[5].innerHTML === "o")) ||
	   ((boxes[6].innerHTML === "o") && (boxes[7].innerHTML === "o") && (boxes[8].innerHTML === "o"))) {
		alert("o wins!");
		for (var i = 0; i < boxes.length; i++) {
			boxes[i].innerHTML = null;
		}		
	} else if (((boxes[0].innerHTML === "o") && (boxes[3].innerHTML === "o") && (boxes[6].innerHTML === "o")) ||
	   ((boxes[1].innerHTML === "o") && (boxes[4].innerHTML === "o") && (boxes[7].innerHTML === "o")) ||
	   ((boxes[2].innerHTML === "o") && (boxes[5].innerHTML === "o") && (boxes[8].innerHTML === "o"))) {
		alert("o wins!");
		for (var i = 0; i < boxes.length; i++) {
			boxes[i].innerHTML = null;
		}		
	} else if (((boxes[0].innerHTML === "o") && (boxes[4].innerHTML === "o") && (boxes[8].innerHTML === "o")) ||
	   ((boxes[2].innerHTML === "o") && (boxes[4].innerHTML === "o") && (boxes[6].innerHTML === "o"))) {
		alert("o wins!");
		for (var i = 0; i < boxes.length; i++) {
			boxes[i].innerHTML = null;
		}		
	}
}


