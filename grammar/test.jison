%lex
%{
	yy.result = "";

%}

%x inString
%s inStringExpr

%%
<inString>'"'                          { this.popState(); return "CLOSE_QUOTE"; }
<inString>\$\{                         { this.pushState("inStringExpr"); return "OPEN_STR_EXPR"; }
<inString>(\\\"|[^\"\$]|\$[^\"\{])+    { return "TEXT"; }
<inStringExpr>\}                       { this.popState(); return "CLOSE_STR_EXPR"; }

[a-zA-Z]+        { return "ATOM"; }
[\s\n]+          { return "WS"; }
'"'              { this.pushState("inString"); return "OPEN_QUOTE"; }
[^a-zA-Z0-9]+    { return "OP"; }
<<EOF>>          { return "EOF"; }

%%
/lex
%left OP WS
%start program


%%



string
	: OPEN_QUOTE stringBody CLOSE_QUOTE
		{$$ = '`'+$stringBody+'`';}
	;

stringBody
	: /* empty */
		{$$ = "";}
	| stringBody TEXT
		{$$ = $stringBody + $TEXT;}
	| stringBody OPEN_STR_EXPR expr CLOSE_STR_EXPR
		{$$ = $stringBody + '${' + $expr + '}';}
	;

binaryStmt
	: expr OP expr
		{$$ = $expr1 + $OP + $expr2;}
	;

expr
	: literal
		{$$ = $literal;}
	| binaryStmt
		{$$ = $binaryStmt;}
	| functionStmt
		{$$ = $functionStmt;}
	;

functionStmt
	: expr WS expr
		{$$ = `${$expr1}(${$expr2})`;}
	;

literal
	: ATOM
		{$$ = $ATOM;}
	| string
		{$$ = $string;}
	;

program
	: expr EOF
		{return $expr;}
	;
