var front3 = (str: "") {

	return str[0:3] & str[0:3] & str[0:3];
};
print(front3("Java"));
print(front3("Chocolate"));
print(front3("abc"));
print(front3("ab"));
print(front3("abba"));