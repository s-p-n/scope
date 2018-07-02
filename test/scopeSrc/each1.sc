let arr = [
	a: "one", 
	b: "two", 
	c: "three"
];
let str = "";

each(arr, (val: "", key: "") {
	str = str + " " + val;
});
return str;