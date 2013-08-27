/*
	Given a string and a non-negative int n, return a larger string that is n 
	copies of the original string. 
*/

var stringTimes = (str: "", n: 0) {
	var result = "";
	while (len(str) * n) > len(result):
		result &= str;
	end;
	return result;
};

print(stringTimes("hi", 2)); // "hihi"
print(stringTimes("hi", 3)); // "hihihi"
print(stringTimes("hi", 1)); // "hi"