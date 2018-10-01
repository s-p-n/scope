%lex
%%
'`'				return '`';
'${'			return '${';
'{'				return '{';
'}'				return '}';
(\\\`|[^\`])	return 'BTCHAR';

/lex

%start btString

%right BTEXPRCHAR

%%
btString
	: '`' btBody '`'
		{$$ = '`' + $btBody + '`';}
	;

btBody
	: 
		{$$ = "";}
	| btBody btPart
		{$$ = $btBody + $btPart;}
	;

btExpr
	: 
		{$$ = "";}
	| btExpr BTCHAR
		{$$ = $btExpr + $2;}
	| btExpr btString
		{$$ = $btExpr + $btString;}
	| btExpr '{' btExpr '}'
		{$$ = $1 + '{' + $3 + '}';}
	;

btPart
	: '${' btExpr '}'
		{$$ = '${' + yy.parseExpression($btExpr) + '}';}
	| BTCHAR
		{$$ = $BTCHAR;}
	;
