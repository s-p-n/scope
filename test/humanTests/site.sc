let server = import "lib/Serve.js"();
let template = import "inc/template.sc";

template.stylesheet["#page"] = [
	margin: "10px",
	">div": [
		color: "#804545"
	]
];
template.nav = [
	Home: "/",
	About: "/about"
];
server.get("/", (client: []) {
	use import "inc/home.sc";
	client.response.send(page(template.generate));
});
server.get("/about", (client: []) {
	use import "inc/about.sc";
	client.response.send(page(template.generate));
});
server.listen([port: 8080], {
	print("Server running on 8080");
});