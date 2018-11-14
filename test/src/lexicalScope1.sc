let something = "outer scope";
let someScope = {
	let something = "inner scope";
	return something;
}();
return something + "," + someScope;
