/*
	Given a string, return a new string where "not " has been added to the front. 
	However, if the string already begins with "not", return the string unchanged. 
*/

var notString = (str: "") {
	return if str[:4] is "not ":
		str;
	else:
		"not " & str;
	end;
};
print(notString("candy"));	 // not candy
print(notString("x"));		 // not x
print(notString("not bad")); // not bad
print(notString("nothing")); // not nothing