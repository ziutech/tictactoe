const Player = (symbol) => {
	let name;
	return { symbol };
};

// game logic
const Game = (() => {
	const board = ["", "", "", "", "", "", "", "", ""];

	let _gameOver = false;
	const isGameOver = () => _gameOver;
	const endGame = () => (_gameOver = false);
	const setBoardCell = (index, symbol) => {
		if (!board[index] && !_gameOver) board[index] = symbol;
	};

	const checkWin = () => {
		const winConditions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		console.clear();
		for (let i = 0; i < winConditions.length; i++) {
			// temporary array storing those values from board which are in a line
			const temp = [
				board[winConditions[i][0]],
				board[winConditions[i][1]],
				board[winConditions[i][2]],
			];
			// checks if temp has at least one element which is an empty string
			if (temp.some((el) => el == "")) {
				continue;
			}
			// checks if temp has only one symbol
			const symbol = temp[0];
			if (temp[1] == symbol && temp[2] == symbol) {
				console.log(symbol);
				return symbol;
			}
		}
		return "";
	};

	const players = [];
	const addPlayer = (player) => {
		players.push(player);
	};

	let _currentPlayerIndex = 0;
	const resetCurrentPlayer = () => (_currentPlayerIndex = 0);
	const getCurrentPlayer = () => players[_currentPlayerIndex];
	const changeCurrentPlayer = () => {
		if (_currentPlayerIndex == players.length - 1) _currentPlayerIndex = 0;
		else _currentPlayerIndex++;
	};

	const reset = () => {
		board.fill("");
		_currentPlayerIndex = 0;
	};

	return {
		board,
		setBoardCell,
		addPlayer,
		getCurrentPlayer,
		changeCurrentPlayer,
		reset,
		checkWin,
		endGame,
		isGameOver,
	};
})();

Game.addPlayer(Player("X"));
Game.addPlayer(Player("O"));

// connecting with document
const Display = (() => {
	const _game = document.querySelector(".game");
	const _menu = document.querySelector(".menu");
	const showWinner = (winner) => {
		const label = document.createElement("h4");
		label.textContent = `THE ${winner} HAS WON`;
		_menu.appendChild(label);
	};

	const hideWinnerLabel = () => _menu.removeChild(_menu.lastChild);

	const _cells = document.querySelectorAll(".cell");
	const setupCells = (func) => {
		_cells.forEach((cell) => {
			cell.addEventListener("click", () => {
				if (cell.textContent === "") {
					func.call(cell);
				}
			});
		});
	};

	const reload = (board) => {
		_cells.forEach((cell) => {
			cell.textContent = board[cell.dataset.index];
		});
	};

	const _restartButton = _menu.querySelector(".restart");
	const onRestart = (func) => {
		_restartButton.addEventListener("click", func);
	};
	return { reload, setupCells, onRestart, showWinner, hideWinnerLabel };
})();

// adds on click event for cells
Display.setupCells(function () {
	if (!Game.isGameOver()) {
		Game.setBoardCell(this.dataset.index, Game.getCurrentPlayer().symbol); // this == individual cell
		Display.reload(Game.board);
		const winner = Game.checkWin();
		if (winner !== "") {
			Display.showWinner(winner);
			Game.endGame();
			console.log(winner);
		}
		Game.changeCurrentPlayer();
	}
});

// adds on click for a restart button
Display.onRestart(function () {
	Game.reset();
	Display.hideWinnerLabel();
	Display.reload(Game.board);
});
