/*
	Given a string, return a new string where the first and last chars have been exchanged. 
*/

var frontBack = (str: "") {
	return if str[0] is str[-1]:
		str;
	else:
		str[-1] & str[1:-1] & str[0];
	end;
};

print(frontBack("code"));	// eodc
print(frontBack("a")); 		// a
print(frontBack("ab"));		// ba
print(frontBack("abba"));	// abba