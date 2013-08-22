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
print("Result: " & Text(result)); // 4613732