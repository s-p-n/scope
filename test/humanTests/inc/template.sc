public stylesheet = [
	"html,body": [
		font-family: "sans-serif",
		margin: 0,
		padding: 0
	],
	h1: [
		margin: "10px"
	],
	nav: [
		color: "#FFFFFF",
		width: "100%",
		padding: 0,
		">ul": [
			background-color: "#0090D2",
			list-style: "none",
			padding: "0 10px",
			margin: 0,
			">li": [
				font-size: "24px",
				font-weight: "bold",
				display: "inline-block",
				margin: "0 10px",
				">a": [
					padding: "10px",
					display: "inline-block",
					color: "#FFFFFF",
					text-decoration: "none"
				],
				":hover": [
					background-color: "#0d6892"
				]
			]
		]

	]
];
public manifest = [];
public nav = [];
public generate = (data: [
	title: "No title",
	body: <h1>"No Body.";</h1>
]) {
	let navBar = <ul></ul>;
	each(nav, (url: "", title: "") {
		navBar.appendChild(<li>
			<a href=url>title;</a>;
		</li>);
	});
	return 
	<html lang="en">
		<head>
			<title>data.title;</title>;
			<meta name="viewport" content="width=device-width, initial-scale=1" />;
			if(data.description, {
				return <meta name="Description" content=data.description />;
			});

			if (template.manifest.theme_color, {
				return <meta name="theme-color" content=template.manifest.theme_color />;
			});
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
			<h1>data.title;</h1>;
			<nav>
				navBar;
			</nav>;
			data.body;
		</body>;
	</html>;
};