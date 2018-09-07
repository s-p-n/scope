public stylesheet = [
	h1: [
		margin: "10px"
	],
	".navbar-dark": [
		" .navbar-nav": [
			" .nav-link": [
				color: "rgba(255, 255, 255, 0.7)"
			]
		]
	]
];
public manifest = [];
public nav = [];
public generate = (data: [
	title: "No title",
	body: <h1>"No Body.";</h1>,
	url: ""
]) {
	let navBar = <ul class="navbar-nav mr-auto"></ul>;
	each(nav, (link: "", title: "") {
		if(link is data.url, {
			navBar.appendChild(<li class="nav-item active">
				<a class="nav-link" href=link>
					title;
					<span class="sr-only">
						"(current)";
					</span>;
				</a>;
			</li>);
		}, {
			navBar.appendChild(<li class="nav-item">
				<a class="nav-link" href=link>title;</a>;
			</li>);
		});
	});
	return 
	<html lang="en">
		<head>
			<title>"Scope - " + data.title;</title>;
			<meta name="viewport" content="width=device-width, initial-scale=1" />;
			if(data.description, {
				return <meta name="Description" content=data.description />;
			});

			if (template.manifest.theme_color, {
				return <meta name="theme-color" content=template.manifest.theme_color />;
			});
			<link
				rel = "stylesheet" 
				href = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" 
				integrity = "sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" 
				crossorigin = "anonymous"
			/>;
			if (template.styleLink, {
				return <link rel="stylesheet" href=template.styleLink />;
			}, {
				return <style>
					stylesheet;
				</style>;
			});

			<link rel="manifest" href="/manifest.webmanifest" />;
		</head>;
		<body>
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
				<a class="navbar-brand" href="/">"Scope";</a>;
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>;
				</button>;
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					navBar;
					<form class="form-inline my-2 my-lg-0">
						<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />;
						<button class="btn btn-primary my-2 my-sm-0" type="submit">
							"Search";
						</button>;
					</form>;
				</div>;
			</nav>;
			<div class="container-fluid" id="page">
				data.body;
			</div>;
			<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
				integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
				crossorigin="anonymous">
			</script>;
			<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" 
				integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" 
				crossorigin="anonymous">
			</script>;
			<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" 
				integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" 
				crossorigin="anonymous">
			</script>;
		</body>;
	</html>;
};