/*
	Given a string, return a new string made of every other char starting with 
	the first, so "Hello" yields "Hlo". 
*/

var stringBits = (str: "") {
	var i = 0;
	var result = "";
	while i < len(str):
		result &= str[i];
		i += 2;
	end;
	return result;
};

print(stringBits('Hello')); // "Hlo"