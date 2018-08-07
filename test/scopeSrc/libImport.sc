let ScopeServer = import "lib/scopeServer.js";

let server = ScopeServer((client: []) {
	debug(client);
});

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
	</body>;
</html>;