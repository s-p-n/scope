let server = import "serve"();

server.get("/", (client: []) {
	client.response.render(site);
});

server.listen([port: 8080, clientScope: true], {
	print("Server running on port 8080");
});
let multiPatterns = [
	"letters": /[a-zA-Z]+/, 
	"numbers": /[0-9]+/, 
	"special": /[^a-zA-Z0-9]/
];
let clock = {
	let render = {
		let time = Reflect.construct(Date, []).toLocaleTimeString();
		let element = <div>
			<h1>"Hello, World!";</h1>;
			<h2>"It is " + time + ".";</h2>;
		</div>; 
		jQuery('#clock').html(element);
	};
	
	setInterval(render, 1000);
	render();
};
print("foo", multiPatterns.test("foo"), 5/2);
let site = 
<html>
	<head>
		<title>"Ticking Clock";</title>;
	</head>;
	<body onload=clock>
		<div id="clock" />;
	</body>;
</html>;