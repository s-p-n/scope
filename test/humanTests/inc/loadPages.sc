return (directory: "") {
	print("Will load: ", directory);
	public promises = [
		home: compile("./pages/home.sc"),
		about: compile("./pages/about.sc")
	];
};