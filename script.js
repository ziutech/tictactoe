const Player = (symbol) => {
	return { symbol };
};

const Game = (() => {
	const board = ["", "", "", "", "", "", "", "", ""];

	const setBoardCell = (index, symbol) => {
		if (!board[index]) board[index] = symbol;
	};

	// const checkWin = () => {
	// 	const winConditions = [
	// 		[0, 1, 2], //
	// 		[4, 5, 6],
	// 		[7, 8, 9],
	// 		[0, 4, 7],
	// 		[1, 5, 9],
	// 		[2, 5, 6],
	// 		[0, 5, 9],
	// 		[2, 5, 7],
	// 	];
	// 	for (let con in winConditions) {
	// 		const symbol = board[con[0]];
	// 		if (board[con[1]] == symbol && board[con[2]] == symbol) {
	// 			console.log("won");
	// 			return symbol;
	// 		}
	// 	}
	// 	console.log("Not yet");
	// 	return "";
	// };

	const players = [];
	const addPlayer = (player) => {
		players.push(player);
	};

	let _currentPlayerIndex = 0;
	const getCurrentPlayer = () => players[_currentPlayerIndex];
	const changeCurrentPlayer = () => {
		if (_currentPlayerIndex == players.length - 1) _currentPlayerIndex = 0;
		else _currentPlayerIndex++;
	};

	return {
		board,
		setBoardCell,
		addPlayer,
		getCurrentPlayer,
		changeCurrentPlayer,
		//checkWin,
	};
})();

Game.addPlayer(Player("X"));
Game.addPlayer(Player("O"));

const Display = (() => {
	const _game = document.querySelector(".game");
	const _cells = document.querySelectorAll(".cell");

	const setupCells = (func) => {
		_cells.forEach((cell) => {
			cell.addEventListener("click", func);
		});
	};

	const reload = (board) => {
		const cells = [..._game.children];
		cells.forEach((cell) => {
			cell.textContent = board[cell.dataset.index];
		});
	};

	return { reload, setupCells };
})();

Display.setupCells(function () {
	Game.setBoardCell(this.dataset.index, Game.getCurrentPlayer().symbol); // this == individual cell
	Display.reload(Game.board);
	//const won = Game.checkWin();
	Game.changeCurrentPlayer();
});
