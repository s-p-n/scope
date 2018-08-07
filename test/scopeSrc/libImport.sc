let Serve = import "lib/Serve.js";

let server = Serve();

server.get("/", (client: []) {
	client.response.send(site);
});

server.on("say", (client: [], data: "") {
	client.emit("echo", data);
});

server.listen([port: 8080], {
	print("Server running on port 8080");
});

let siteIo = <div id="io">
	<input type="text" bindIn="keyup:say" />;
	<div bindOut="echo" />;
</div>;

let site = 
<html>
	<head>
		<title>
			"Scope Server Test";
		</title>;
	</head>;
	<body>
		<h1>
			"Hello Scope Server";
		</h1>;
		siteIo;
	</body>;
</html>;