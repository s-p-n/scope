let Serve = import "serve";

let server = Serve();

server.get("/", (client: []) {
	client.response.render(site);
});

server.on("buttonClick", (client: []) {
	print("got click");
	client.emit("response", "Message from Outer-space");
});

server.listen([port: 8080, clientScope: true], {
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