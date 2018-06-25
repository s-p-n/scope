return {
	private foo = "I am private";
	public bar = "I am public";
	public getFoo = {
		return foo;
	};
}().getFoo();