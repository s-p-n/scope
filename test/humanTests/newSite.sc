let server = import "serve"();
let db = import "inc/db.sc";


let tellServer = (event: []) {
		print(event);
		event.preventDefault();
		let data = [
			username: event.target.username.value,
			password: event.target.password.value
		];
		print(data);
		socket.emit("register", data);
		return false;
	};
let userPattern = /^[a-zA-Z0-9-_]{3,32}$/;
let passPattern = /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)(?=.*[^a-zA-Z0-9]).{3,32}$/;
let makeUserForm = 
<form onSubmit=tellServer>
	<label for="username">
		"Usernames may have 3-32 letters, numbers, hyphens (-) and underscores (_).";
	</label>;
	<br />;
	<input id="username" name="username" placeholder="Username" pattern=userPattern minlength=3 maxLength=32 required=true />;
	<br />;
	<label for="password">
		"Passwords may have 3-32 characters- but must contain at least 1 letter, 1 number, and 1 special character.";
	</label>;
	<br />;
	<input id="password" type="password" name="password" placeholder="Password" pattern=passPattern minlength=3 maxLength=32 required=true />;
	<br />;
	<input id="email" type="email" name="email" placeholder="Email" />;
	<input type="submit">"Register";</button>;
</form>;

let page = <html>
<head>
	<title>"register";</title>;
</head>;
<body>
	<div bind-out="register" />;
	makeUserForm;
</body>;
</html>;

server.on("register", (client: [], data: []) {
	if (data.has("error"), {
		print(data.error);
		client.emit("register", "Something went wrong..");
	}, {
		let cont = data.has("username") and data.username.length gt 2;
		cont = cont and userPattern.test(data.username);
		cont = cont and data.has("password") and data.password.length gt 2;
		cont = cont and passPattern.test(data.password);
		let text = if (cont, {
			return 
			<span style=[
				color: "green",
				font-weight: "bold"]>
				"Registration passes criteria.";
			</span>;
		}, {
			return 
			<span style=[
				color: "red", 
				font-weight: "bold"]>
				"Registration doesn't pass criteria. Username and Password must be at least 3 characters long.";
			</span>;
		});
		client.emit("register", text);
	});
});

server.get("/", (client: []) {
	client.response.render(page);
});

server.listen([port: 8000, clientScope: true]);