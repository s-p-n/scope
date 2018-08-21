return (directory: "") {
	print("Will load: ", directory);
	public pages = [
		home: import "./pages/home.sc",
		about: import "./pages/about.sc"
	];
};