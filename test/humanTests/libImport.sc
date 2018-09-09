let Serve = import "serve";

let server = Serve();

server.get("/", (client: []) {
	client.response.render(site);
});

server.on("say", (client: [], data: "") {
	print("Client says:", data);
	client.emit("echo", data);
});

server.on("clicked", (client: [], data: "") {
	print("clicked");
});

server.listen([port: 8080, clientScope: true], {
	print("Server running on port 8080");
});

let stylesheet = [
	"h1": [
		font-family: "sans-serif",
		color: "#AAA",
		margin: 0,
		padding: 0 
	],
	"input": [
		padding: "5px",
		border: "none",
		outline: "none",
		box-shadow: "0px 0px 5px #DDDDDD",
		":focus": [
			border: "none",
			outline: "none",
			box-shadow: "0px 0px 5px #00DDDD"
		],
		border-radius: "2px",
		transition: ".3s ease-in-out"
	]
];

let siteIo = <div id="io">
	//<input type="text" bind-in="keyup:say" />;
	<input type="text" onKeyUp=(e: []) {
		socket.emit("say", e.target.value);
	} />;
	<div bind-out="echo" />;
	<button onclick=(e: []) {
		socket.emit("clicked");
	}>
		"Send to 'clicked' channel";
	</button>;
</div>;

let site = 
<html>
	<head>
		<title>
			"Scope Server Test";
		</title>;
		<style>
			stylesheet;
		</style>;
	</head>;
	<body>
		<h1>
			"Hello Scope Server";
		</h1>;
		siteIo;
	</body>;
</html>;