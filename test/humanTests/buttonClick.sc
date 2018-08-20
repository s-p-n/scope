let Serve = import "./lib/Serve.js";

let server = Serve();

server.get("/", (client: []) {
	client.response.send(site);
});

server.on("buttonClick", (client: []) {
	client.emit("response", "Message from Outer-space");
});

server.listen([port: 8080], {
	print("Server running on port 8080");
});

let tellServer = (e: []) {
	socket.emit("buttonClick");
};

let button = <button onclick=tellServer>
	"Click me";
</button>;

let site = 
<html>
	<head>
		<title>"Example Site";</title>;
	</head>;
	<body>
		<div bind-out="response" />;
		button;
	</body>;
</html>;