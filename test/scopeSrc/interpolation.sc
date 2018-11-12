let expression = "inline-expression";
let expr = {
	return "expression";
};
let foo = `
	Hello, World!

	This is an ${expression}.

	Here's a ${
		{
			return `depthy ${expr()}`; 
		}()
	}.
`;
return foo;