var Foo = {
	print(this);
};
var Bar = {
	private a = "1";
	protected b = "2";
	public c = "3";
};
var FooBar = Scope.extend(Foo, Bar);
print(FooBar());