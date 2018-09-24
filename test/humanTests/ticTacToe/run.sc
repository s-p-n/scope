let server = import "serve"();
let tags = import "tags.sc";

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
	client.setUserTags(tags);
	client.response.render(doc);
});

server.listen([port: 8080, clientScope: true]);