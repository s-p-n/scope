var fin = 4000000;
var result = 0;
var i = 0;
var c = 0;
var a = 1;
var b = 2;
while (a < fin):
	if (a % 2 is 0):
		result += a;
	end;
	c = a;
	a = b;
	b = c + b;
	i += 1;
end;
<<<<<<< HEAD
print("Result: " & Text(result)); // 4613732
=======
print("Result: " & Text(result));
>>>>>>> f6bec42fe8377ced8ec7b9b5109abb536c58f883
