var n = 600851475143;
var z = 2;
while z * z <= n:
	if n % z is 0:
		n /= z;
	else:
		z += 1;
	end;
end;

print("Largest Prime: " & Text(n)); // 6857