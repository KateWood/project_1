function cells(key) {
    switch(key) {
        case 'a': return null;
        case 'b': return null;
        case 'c': return null;
        case 'd': return null;
        case 'e': return null;
        case 'f': return null;
        case 'g': return null;
        case 'h': return null;
        case 'i': return null;
        default : return null;
    }
}

function getWinner() {
    if (isWinner('x')) {
      return 'x';
    }
    if (isWinner('o')) {
      return 'o';
    }
    return null;
}
function isWinner(player) {
    return winsRow(player) || winsColumn(player) || winsDiagonal(player);
}
function winsRow(player) {
    return allThree(player, cells('a'), cells('b'), cells('c')) ||
           allThree(player, cells('d'), cells('e'), cells('f')) ||
           allThree(player, cells('g'), cells('h'), cells('i'));
}
function winsColumn(player) {
    return allThree(player, cells('a'), cells('d'), cells('g')) ||
           allThree(player, cells('b'), cells('e'), cells('h')) ||
           allThree(player, cells('c'), cells('f'), cells('i'));
}
function winsDiagonal(player) {
    return allThree(player, cells('a'), cells('e'), cells('i')) ||
           allThree(player, cells('c'), cells('e'), cells('g'));
}
function allThree(player, cell_one, cell_two, cell_three) {
    return (cell_one === player) && (cell_two === player) && (cell_three === player);
}

