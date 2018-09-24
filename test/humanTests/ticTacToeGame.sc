let server = import "serve"();

createTag("Square", (attr: [], children: []) {
	public listeners = [
		click: attr.onClick
	];
	public render = {
		return 
		<button class="square">
			attr.value;
		</button>;
	};
});

createTag("Board", (attr: []) {
	public renderSquare = (i: 0) {
		let square = <Square value=attr.squares[i] index=i onClick=attr.onClick(i) />;
		return square;
	};

	public render = {
		return 
			<div>
				<div class="status">status;</div>;
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
	public listeners = [
		click: attr.onClick
	];
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
		each(lines, (val: [], index: 0, break: {}) {
			let a = val[0];
			let b = val[1];
			let c = val[2];
			if (squares[a] isnt "" and squares[a] is squares[b] and squares[a] is squares[c], {
				result = squares[a];
				break();
			});
		});
		return result;
	};

	let jumpTo = (step: 0) {
		state.stepNumber = step;
		state.activePlayer = if(step % 2 is 0, {
			return "X";
		}, {
			return "O";
		});
	};

	public handleClick = (i: 0) {
		let history = each(state.history, (val: [], index: 0, break: {}) {
			if (index is state.stepNumber, {
				break();
			});
			return val;
		});
		let current = history[history.size - 1];
		let squares = each(current.squares, (square: "") {return square;});
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
		let moves = <ol>
			each(history, (val: [], move: 0) {
				let desc = if(move, {
					return "Go to move #" + move;
				}, {
					return "Go to game start";
				});
				return <li>
					<jumpTo onClick={jumpTo(move);}>desc;</jumpTo>;
				</li>;
			});
		</ol>;
		let status = if (winner isnt "", {
			return "Winner: " + winner;
		}, {
			return "Next Player: " + state.activePlayer;
		});

		return
			<div class="game">
				<div class="game-board">
					<Board squares=current.squares onClick=handleClick />;
				</div>;
				<div class="game-info">
					<div>status;</div>;
					moves;
				</div>;
			</div>;
	};
});

let css = [
	body: [
		font: '14px "Century Gothic", Futura, sans-serif',
		margin: '20px'
	],
	square: [
		width: "25px",
		height: "25px",
		display: "inline-block",
		border: "1px solid black"
	],
	'ol, ul': [
		padding-left: '30px'
	],

	'.board-row:after': [
		clear: 'both',
		content: "",
		display: 'table'
	],

	'.status': [
		margin-bottom: '10px'
	],

	'.square': [
		background: '#fff',
		border: '1px solid #999',
		float: 'left',
		font-size: '24px',
		font-weight: 'bold',
		line-height: '34px',
		height: '34px',
		margin-right: '-1px',
		margin-top: '-1px',
		padding: '0',
		text-align: 'center',
		width: '34px',
		'.winner': [
			box-shadow: "inset red 0px 0px 5px 0px"
		]
	],

	'.square:focus': [
		outline: 'none'
	],

	'.kbd-navigation .square:focus': [
		background: '#ddd'
	],

	'.game': [
		display: 'flex',
		flex-direction: 'row'
	],

	'.game-info': [
		margin-left: '20px'
	]
];

let doc = 
<html>
	<head>
		<title>"Tic Tac Toe Game";</title>;
		<style>css;</style>;
	</head>;
	<body>
		<Game foo="bar"/>;
	</body>;
</html>;

server.get("/", (client: []) {
	client.setUserTags(getAllTags());
	client.response.render(doc);
});

server.listen([port: 8080, clientScope: true]);