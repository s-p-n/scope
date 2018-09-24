let usee = {
	protected foo = "Hello from usee";
	public baz = "I'm baz";
};

let user1 = {
	use usee;
	return foo;
};

let user2 = {
	use usee only ("foo");
	public bar = foo;
};
return [user1(), user2()];