return (directory: "") {
	print("Will load: ", directory);
	public promises = [
		home: compile("./pages/home.sc"),
		docs: compile("./pages/docs.sc"),
		about: compile("./pages/about.sc")
	];
};