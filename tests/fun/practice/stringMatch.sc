/*
	Given 2 strings, a and b, return the number of the positions where they 
	contain the same length 2 substring. So "xxcaazz" and "xxbaaz" yields 3, 
	since the "xx", "aa", and "az" substrings appear in the same place in both 
	strings. 
*/

var stringMatch = (a: "", b: "") {
	var c = "";
	var result = 0;
	if len(b) < len(a):
		c = a;
		a = b;
		b = c;
	:;
	for i in a[:-1]:
		if a[i:i+2] is b[i:i+2]:
			result += 1;
		:;
	:;
	return result;
};

print(stringMatch("xxcaazz", "xxbaaz")); // 3
print(stringMatch("abc", "abc")); // 2
print(stringMatch("abc", "axc")); // 0