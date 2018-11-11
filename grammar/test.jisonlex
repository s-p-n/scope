%lex
%%

[a-zA-Z]+    { return "WORD"; }
\n           { return "NL"; }
.            { return "CHAR"; }
<<EOF>>      { return "EOF"; }

%%
/lex