createTag("Square", (attr: [], children: []) {
	public listeners = [click: attr.onClick];
	public render = {
		return <button class="square">
			attr.value;
		</button>;
	};
});

createTag("Board", (attr: []) {
	public renderSquare = (i: 0) {
		return <Square 
			value=attr.squares[i] 
			onClick=attr.onClick(i) 
		/>;
	};

	public render = {
		return <div>
			<div class="board-row">
				renderSquare(0);
				renderSquare(1);
				renderSquare(2);
			</div>;
			<div class="board-row">
				renderSquare(3);
				renderSquare(4);
				renderSquare(5);
			</div>;
			<div class="board-row">
				renderSquare(6);
				renderSquare(7);
				renderSquare(8);
			</div>;
		</div>;
	};
});

createTag("jumpTo", (attr: [], children: []) {
	public listeners = [click: attr.onClick];
	public render = {
		return <button>children[0];</button>;
	};
});

createTag("Game", {
	public state = [
		history: [
			[squares: [''] * 9]
		],
		activePlayer: "X",
		stepNumber: 0
	];

	let getWinner = (squares: []) {
		let lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
		let result = "";
		each(lines, (line: [], index: 0, break: {}) {
			let [a, b, c] = line;
			if (squares[a] isnt "" and squares[a] is squares[b] and squares[a] is squares[c], {
				result = squares[a];
				break();
			});
		});
		return result;
	};

	let jumpTo = (step: 0) {
		setState([
			stepNumber: step,
			activePlayer: if(step % 2 is 0, {return "X";}, {return "O";})
		]);
	};

	public handleClick = (i: 0) {
		let history = state.history[:state.stepNumber + 1];
		let current = history[history.size - 1];
		let squares = current.squares[:];
		return (e: []) {
			if(squares[i] is "" and getWinner(squares) is "", {
				squares[i] = state.activePlayer;
				history += [squares: squares];
				setState([
					history: history,
					activePlayer: if (state.activePlayer is "X", {return "O";}, {return "X";}),
					stepNumber: history.size - 1
				]);
			});
		};
	};

	public render = {
		let history = state.history;
		let current = history[state.stepNumber];
		let winner = getWinner(current.squares);
		let moves = each(history, (val: [], move: 0) {
			let desc = if(move, 
				{return "Go to move #" + move;}, 
				{return "Go to game start";});
			return <li>
				<jumpTo onClick={jumpTo(move);}>desc;</jumpTo>;
			</li>;
		});
		let status = if (winner isnt "", {
			return "Winner: " + winner;
		}, {
			return "Next Player: " + state.activePlayer;
		});

		return <div class="game">
			<div class="game-board">
				<Board squares=current.squares onClick=handleClick />;
			</div>;
			<div class="game-info">
				<div>status;</div>;
				<ol>moves;</ol>;
			</div>;
		</div>;
	};
});

return getAllTags();