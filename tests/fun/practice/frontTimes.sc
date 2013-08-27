/*
	Given a string and a non-negative int n, we'll say that the front of the 
	string is the first 3 chars, or whatever is there if the string is less than 
	length 3. Return n copies of the front; 
*/

var frontTimes = (str: "", n: 0) {
	str = str[0:3];
	var result = "";
	while (len(str) * n) > len(result):
		result &= str;
	end;
	return result;
};

print(frontTimes("Chocolate", 2)); // "hihi"
print(frontTimes("Chocolate", 3)); // "hihihi"
print(frontTimes("Abc", 3)); // "hi"