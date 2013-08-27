/*
	Given a string, return the count of the number of times that a substring 
	length 2 appears in the string and also as the last 2 chars of the string, 
	so "hixxxhi" yields 1 (we won't count the end substring). 
*/

var last2 = (str: "") {
	var last2Chars = str[-2] & str[-1];
	var i = 0;
	var result = 0;
	while i < len(str) - 2:
		result += if str[i:1 + (i += 1)] is last2Chars:
			1;
		else:
			0;
		end;
	end;
	return result;
};

print(last2("hixxhi"));
print(last2("xaxxaxaxx"));
print(last2("axxxaaxx"));