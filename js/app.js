var boxes = document.getElementsByClassName('box');
var turn = 0;

function takeTurns() {
	turn ++;
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
			this.innerHTML = takeTurns();
		})
	}
	getWinner();
}

function getWinner() {
	if (isWinner("x")) {
		console.log("x");
	} else if (isWinner("o")) {
		console.log("o");
	} else {
		return null;
	}
}

function isWinner(player) {
	return winsRow(player) || winsColumn(player) || winsDiagonal(player);
}

function winsRow(player) {
	return allThree(player, boxes[0], boxes[1], boxes[2]) ||
		   allThree(player, boxes[3], boxes[4], boxes[5]) ||
		   allThree(player, boxes[6], boxes[7], boxes[8]);
}

function winsColumn(player) {
	return allThree(player, boxes[0], boxes[3], boxes[6]) ||
		   allThree(player, boxes[1], boxes[4], boxes[7]) ||
		   allThree(player, boxes[2], boxes[5], boxes[8]);
}

function winsDiagonal(player) {
	return allThree(player, boxes[0], boxes[4], boxes[8]) ||
		   allThree(player, boxes[2], boxes[4], boxes[6]);
}

function allThree(player, cell_one, cell_two, cell_three) {
	return (cell_one === player) && (cell_two === player) && (cell_three === player);
}
