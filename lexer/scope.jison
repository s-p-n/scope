%lex
%%

\s+         /* ignore */
"//".*      /* ignore one line comment */
"/*"(.|\n|\r)*?"*/" /* ignore block comment */
'.'         return '.'
';'         return ';'
'+'         return '+'
'-'         return '-'
'*'         return '*'
//'/'         return '/'
'%'         return '%'
'^'         return '^'
'!'         return '!'
'('         return '('
')'         return ')'
'['         return '['
']'         return ']'
'<'         return '<'
'>'         return '>'
'{'         return '{'
'}'         return '}'
':'         return ':'
'='         return '='
'&'         return '&'
'|'         return '|'
','         return ','
'`'         return '`'
'end'       {return 'END';}
'if'        {return 'IF';}
'for'       {return 'FOR';}
'in'        {return 'IN';}
'while'     {return 'WHILE';}
'else'      {return 'ELSE';}
'use'       {return 'USE';}
'as'        {return 'AS';}
'return'    {return 'RETURN';}
'var'       {return 'VAR';}
'public'    {return 'PUB';}
'protected' {return 'PRO';}
'private'   {return 'PRI';}
'is'        {return 'IS';}
'isnt'      {return 'ISNT';}
'and'       {return 'AND';}
'or'        {return 'OR';}
'not'       {return 'NOT';}
'true'      {return 'TRUE';}
'false'     {return 'FALSE';}
'<='        {return '<=';}
'>='        {return '>=';}
[a-zA-Z_][a-zA-Z0-9_]*  {return 'NAME';} // check later for: (?!end|if|for|while|else|use|as|return|var|public|protected|private|is|isnt|and|or|not|true|false)
/*[a-zA-Z_][a-zA-Z0-9_]*  {return 'ASSOCNAME';}*/
'$'+[a-zA-Z0-9_]*   {return 'SELECTNAME';}
[0-9]+(\.[0-9]+)?\b    {return 'NUMBER';}
\"[^\"]*\"  {return 'QSTRING';}
\'[^\']*\'  {return 'ASTRING';}
"/"[^\/]+"/"[egim]{0,4}  {return 'REGEXP';}
<<EOF>>     {return 'EOF';}
.           {return 'INVALID';}

/lex

//%token ASSOCNAME
%token NAME
%token RETURN
%token PUB
%token PRI
%token PRO
%token USE
%token AS
%token IF
%token WHILE
%token FOR
%token IN
%token ELSE
%token END
%token TRUE
%token FALSE
%token UMINUS
%token NUMBER
%token QSTRING
%token ASTRING
%token BSTRING
%token REGEXP
%token EOF
%token TAGSHORTCLOSE
%token TAGLONGCLOSE
%token TAGOPEN TAGCLOSE

%right TAGSHORTCLOSE TAGLONGCLOSE

%left TAGOPEN TAGCLOSE
%left '=' ':'
%left ','
%left IN
%left AND OR
%left IS ISNT
%left '<' '>' '<=' '>='
%left '+' '-' '&' '|'
%left '*' '%'
%left '^'
%left '!'
%left NOT
%left UMINUS
%left '.'
%right '(' ')'
%right '[' ']'
%right '{' '}'
%right ';'

%start program

%%

accessModifier
    : PRI {
        $$ = new yy.scopeAst(yy,"accessModifier",[
            $1
        ]);
    }
    | PRO {
        $$ = new yy.scopeAst(yy,"accessModifier",[
            $1
        ]);
    }
    | PUB {
        $$ = new yy.scopeAst(yy,"accessModifier",[
            $1
        ]);
    }
    ;

array
    : '[' arrayStatement ']' {
        $$ = new yy.scopeAst(yy,"array",[
            $2
        ]);
    }
    | '[' arrayStatement ']' '[' arrayKey']' {
        $$ = new yy.scopeAst(yy,"array",[
            $2, $5
        ]);
    }
    | '[' ']' {
        $$ = new yy.scopeAst(yy,"array",[]);
    }
    ;

arrayKey
    : term {
        $$ = new yy.scopeAst(yy,"arrayKey",[
            $1
        ]);
    }
    | ':' term {
        $$ = new yy.scopeAst(yy,"arrayKey",[
            $1, $2
        ]);
    }
    | term ':' {
        $$ = new yy.scopeAst(yy,"arrayKey",[
            $1, $2
        ]);
    }
    | term ':' term {
        $$ = new yy.scopeAst(yy,"arrayKey",[
            $1, $2, $3
        ]);
    }
    ;

arrayStatement
    : associativeList {
        $$ = new yy.scopeAst(yy,"arrayStatement",[
            $1
        ]);
    }
    | termList {
        $$ = new yy.scopeAst(yy,"arrayStatement",[
            $1
        ]);
    }
    ;

assignment
    : declareVariable {
        $$ = new yy.scopeAst(yy,"assignment",[
            $1
        ]);
    }
    | declareProperty {
        $$ = new yy.scopeAst(yy,"assignment",[
            $1
        ]);
    }
    ;

associativeTerm
    : NAME ':' term {
        $$ = new yy.scopeAst(yy,"associativeTerm",[
            $1, $3
        ]);
    }
    ;

associativeList
    : associativeTerm {
        $$ = new yy.scopeAst(yy,"associativeList",[
            $1
        ]);
    }
    | associativeList ',' associativeTerm {
        $$ = new yy.scopeAst(yy,"associativeList",[
            $1, $3
        ]);
    }
    ;

blockStatement
    : term {
        $$ = new yy.scopeAst(yy,"blockStatement",[
            $1
        ]);
    }
    | require {
        $$ = new yy.scopeAst(yy,"blockStatement",[
            $1
        ]);
    }
    ;

boolean
    : TRUE {
        $$ = new yy.scopeAst(yy,"boolean",[
            $1
        ]);
    }
    | FALSE {
        $$ = new yy.scopeAst(yy,"boolean",[
            $1
        ]);
    }
    ;

conditional
    : if {
        $$ = new yy.scopeAst(yy,"conditional",[
            $1
        ]);
    }
    | while {
        $$ = new yy.scopeAst(yy,"conditional",[
            $1
        ]);
    }
    | for {
        $$ = new yy.scopeAst(yy,"conditional",[
            $1
        ]);
    }
    ;

controlBlock
    : /* empty */ {
        $$ = new yy.scopeAst(yy,"controlBlock",[]);
    }
    | blockStatement ';' controlBlock {
        $$ = new yy.scopeAst(yy,"controlBlock",[
            $1, $3
        ]);
    }
    ;

controlCode
    : /* empty */ {
        $$ = new yy.scopeAst(yy,"controlCode", []);
    }
    | controlCode controlStatement ';' {
        $$ = new yy.scopeAst(yy,"controlCode",[
            $1, $2
        ]);
    }
    ;

controlStatement
    : term {
        $$ = new yy.scopeAst(yy,"controlStatement",[
            $1
        ]);
    }
    | require {
        $$ = new yy.scopeAst(yy,"controlStatement",[
            $1
        ]);
    }
    | return {
        $$ = new yy.scopeAst(yy,"controlStatement",[
            $1
        ]);
    }
    ;

declareProperty
    : accessModifier NAME '=' term {
        $$ = new yy.scopeAst(yy,"declareProperty",[
            $1, $2, $4
        ]);
    }
    | identifier '=' term {
        $$ = new yy.scopeAst(yy,"declareProperty",[
            $1, $3
        ]);
    }
    | selectorIdentifier '=' term {
        $$ = new yy.scopeAst(yy,"declareProperty",[
            $1, $3
        ]);
    }
    ;

declareVariable
    : VAR NAME '=' term {
        $$ = new yy.scopeAst(yy,"declareVariable",[
            $2, $4
        ]);
    }
    ;

identifier
    : NAME {
        $$ = new yy.scopeAst(yy,"identifier",[
            $1
        ]);
    }
    | identifier '.' NAME {
        $$ = new yy.scopeAst(yy,"identifier",[
            $1, $3
        ]);
    }
    | identifier '[' arrayKey ']' {
        $$ = new yy.scopeAst(yy,"identifier",[
            $1, $3, $2
        ]);
    }
    ;

if
    : ifBegin controlBlock ifElse END {
        $$ = new yy.scopeAst(yy,"if",[
            $1, $2, $3
        ]);
    }
    ;

ifBegin
    : IF '(' term ')' ':' {
        $$ = new yy.scopeAst(yy,"ifBegin",[
            $3
        ]);
    }
    ;

ifElse
    : ELSE ifBegin controlBlock ifElse {
        $$ = new yy.scopeAst(yy,"ifElse",[
            $2, $3, $4
        ]);
    }
    | loopElse {
        $$ = new yy.scopeAst(yy,"ifElse",[
            $1
        ]);
    }
    ;

invoke
    : scope invokeParam {
        $$ = new yy.scopeAst(yy,"invoke",[
            $1, $2
        ]);
    }
    | identifier invokeParam {
        $$ = new yy.scopeAst(yy,"invoke",[
            $1, $2
        ]);
    }
    | invoke '.' identifier {
        $$ = new yy.scopeAst(yy,"invoke",[
            $1, $2, $3
        ]);
    }
    ;

invokeParam
    : '(' termList ')' {
        $$ = new yy.scopeAst(yy,"invokeParam",[
            $2
        ]);
    }
    | '(' ')' {
        $$ = new yy.scopeAst(yy,"invokeParam",[]);
    }
    ;

loopElse
    : /* empty */ {
        $$ = new yy.scopeAst(yy,"loopElse",[]);
    }
    | ELSE ':' controlBlock {
        $$ = new yy.scopeAst(yy,"loopElse",[
            $3
        ]);
    }
    ;

number
    : NUMBER {
        $$ = new yy.scopeAst(yy,"number",[
            $1
        ]);
    }
    ;

string
    : ASTRING {
        $$ = new yy.scopeAst(yy,"string",[
            $1
        ]);
    }
    | QSTRING {
        $$ = new yy.scopeAst(yy,"string",[
            $1
        ]);
    }
    ;

subTerm
    : boolean       {
        $$ = new yy.scopeAst(yy,"subTerm",[
            $1
        ]);
    }
    | number        {
        $$ = new yy.scopeAst(yy,"subTerm",[
            $1
        ]);
    }
    | text          {
        $$ = new yy.scopeAst(yy,"subTerm",[
            $1
        ]);
    }
    | identifier    {
        $$ = new yy.scopeAst(yy,"subTerm",[
            $1
        ]);
    }
    | invoke        {
        $$ = new yy.scopeAst(yy,"subTerm",[
            $1
        ]);
    }
    | array         {
        $$ = new yy.scopeAst(yy,"subTerm",[
            $1
        ]);
    }
    | scope         {
        $$ = new yy.scopeAst(yy,"subTerm",[
            $1
        ]);
    }
    | node          {
        $$ = new yy.scopeAst(yy,"subTerm",[
            $1
        ]);
    }
    | selector {
        $$ = new yy.scopeAst(yy,"subTerm",[
            $1
        ]);
    }
    | selectorIdentifier {
        $$ = new yy.scopeAst(yy,"subTerm",[
            $1
        ]);
    }
    ;

term
    : subTerm {
        $$ = new yy.scopeAst(yy,"term",[
            $1
        ]);
    }
    | '(' attrConflictTerm ')' {
        $$ = new yy.scopeAst(yy,"term",[
            $2
        ]);
    }
    | assignment {
        $$ = new yy.scopeAst(yy,"term",[
            $1
        ]);
    }
    | conditional {
        $$ = new yy.scopeAst(yy,"term",[
            $1
        ]);
    }
    | term '&' term {
        $$ = new yy.scopeAst(yy,"term",[
            $1, $2, $3
        ]);
    }
    | term '+' term {
        $$ = new yy.scopeAst(yy,"term",[
            $1, $2, $3
        ]);
    }
    | term '-' term {
        $$ = new yy.scopeAst(yy,"term",[
            $1, $2, $3
        ]);
    }
    | term '*' term {
        $$ = new yy.scopeAst(yy,"term",[
            $1, $2, $3
        ]);
    }
    //| term '/' term {
    //    $$ = new yy.scopeAst(yy,"term",[
    //        $1, $2, $3
    //    ]);
    //}
    | term '%' term {
        $$ = new yy.scopeAst(yy,"term",[
            $1, $2, $3
        ]);
    }
    | term '^' term {
        $$ = new yy.scopeAst(yy,"term",[
            $1, $2, $3
        ]);
    }
    | term IS term {
        $$ = new yy.scopeAst(yy,"term",[
            $1, $2, $3
        ]);
    }
    | term ISNT term {
        $$ = new yy.scopeAst(yy,"term",[
            $1, $2, $3
        ]);
    }
    | term AND term {
        $$ = new yy.scopeAst(yy,"term",[
            $1, $2, $3
        ]);
    }
    | term OR term {
        $$ = new yy.scopeAst(yy,"term",[
            $1, $2, $3
        ]);
    }
    | '-' term %prec UMINUS {
        $$ = new yy.scopeAst(yy,"term",[
            $1, $2
        ]);
    }
    | NOT term {
        $$ = new yy.scopeAst(yy,"term",[
            $1, $2
        ]);
    }
    | '!' term {
        $$ = new yy.scopeAst(yy,"term",[
            $1, $2
        ]);
    }
    | '(' term ')' {
        $$ = new yy.scopeAst(yy,"term",[
            $1, $2, $3
        ]);
    }
    ;

termList
    : term {
        $$ = new yy.scopeAst(yy,"termList",[
            $1
        ]);
    }
    | term ',' termList {
        $$ = new yy.scopeAst(yy,"termList",[
            $1, $3
        ]);
    }
    ;

text
    : string {
        $$ = new yy.scopeAst(yy,"text",[
            $1
        ]);
    }
    ;

program
    : controlCode EOF {
        return $controlCode;
    }
    ;

attrConflictTerm
    : term '>' term {
        $$ = new yy.scopeAst(yy,"attrConflictTerm",[
            $1, $2, $3
        ]);
    }
    | term '<' term {
        $$ = new yy.scopeAst(yy,"attrConflictTerm",[
            $1, $2, $3
        ]);
    }
    | term '>=' term {
        $$ = new yy.scopeAst(yy,"attrConflictTerm",[
            $1, $2, $3
        ]);
    }
    | term '<=' term {
        $$ = new yy.scopeAst(yy,"attrConflictTerm",[
            $1, $2, $3
        ]);
    }
    ;

attributeList
    : attributeTerm {
        $$ = new yy.scopeAst(yy,"attributeList",[
            $1
        ]);
    }
    | attributeList attributeTerm {
        $$ = new yy.scopeAst(yy,"attributeList",[
            $1, $2
        ]);
    }
    ;

attributeTerm
    : NAME '=' term {
        $$ = new yy.scopeAst(yy,"attributeTerm",[
            $1, $2, $3
        ]);
    }
    ;

for
    : forBegin controlBlock loopElse END {
        $$ = new yy.scopeAst(yy,"for",[
            $1, $2, $3, $4
        ]);
    }
    ;

forBegin
    : FOR '(' NAME IN term ')' ':' {
        $$ = new yy.scopeAst(yy,"forBegin",[
            $3, $5
        ]);
    }
    | FOR '(' NAME ':' NAME IN term ')' ':' {
        $$ = new yy.scopeAst(yy,"forBegin",[
            $3, $7, $5
        ]);
    }
    ;

node
    : tagStart attributeList tagEnd nodeEnd {
        $$ = new yy.scopeAst(yy,"node",[
            $1, $2, $3, $4
        ]);
    }
    | tagStart tagEnd nodeEnd {
        $$ = new yy.scopeAst(yy,"node",[
            $1, $2, $3
        ]);
    }
    | tagStart attributeList shortTagEnd {
        $$ = new yy.scopeAst(yy,"node",[
            $1, $2, $3
        ]);
    }
    | tagStart shortTagEnd {
        $$ = new yy.scopeAst(yy,"node",[
            $1, $2
        ]);
    }
    ;

nodeBlockEnd
    : '<' '/' identifier tagEnd %prec TAGLONGCLOSE {
        $$ = new yy.scopeAst(yy,"nodeBlockEnd",[
            $1, $2, $3, $4
        ]);
    }
    ;

nodeBlock
    : term ';' {
        $$ = new yy.scopeAst(yy,"nodeBlock",[
            $1
        ]);
    }
    | term ';' nodeBlock {
        $$ = new yy.scopeAst(yy,"nodeBlock",[
            $1, $3
        ]);
    }
    ;

nodeEnd
    : nodeBlock nodeBlockEnd {
        $$ = new yy.scopeAst(yy,"nodeEnd",[
            $1, $2
        ]);
    }
    | nodeBlockEnd {
        $$ = new yy.scopeAst(yy,"nodeEnd",[
            $1
        ]);
    }
    ;

require
    : USE text AS NAME {
        $$ = new yy.scopeAst(yy,"require",[
            $2, $4
        ]);
    }
    ;

return
    : RETURN term {
        $$ = new yy.scopeAst(yy,"return",[
            $2
        ]);
    }
    | RETURN identifier ':' term {
        $$ = new yy.scopeAst(yy,"return",[
            $3, $4
        ]);
    }
    | RETURN scope ':' term {
        $$ = new yy.scopeAst(yy,"return",[
            $3, $4
        ]);
    }
    ;

selector
    : '`' selectorStatement '`' {
        $$ = new yy.scopeAst(yy,"selector",[
            $2
        ]);
    }
    ;

selectorExpression
    : '(' selectorTerm ')' {
        $$ = new yy.scopeAst(yy,"selectorExpression",[
            $2
        ]);
    }
    | REGEXP {
        $$ = new yy.scopeAst(yy,"selectorExpression",[
            $1
        ]);
    }
    | '*' {
        $$ = new yy.scopeAst(yy,"selectorExpression",[
            '*'
        ]);
    }
    | text {
        $$ = new yy.scopeAst(yy,"selectorExpression",[
            $1
        ]);
    }
    ;

selectorIdentifier
    : SELECTNAME {
        $$ = new yy.scopeAst(yy,"selectorIdentifier",[
            $1
        ]);
    }
    | selectorIdentifier '.' SELECTNAME {
        $$ = new yy.scopeAst(yy,"selectorIdentifier",[
            $1, $3
        ]);
    }
    | selectorIdentifier '[' arrayKey ']' {
        $$ = new yy.scopeAst(yy,"selectorIdentifier",[
            $1, $3, $2
        ]);
    }
    ;

selectorStatement
    : selectorExpression {
        $$ = new yy.scopeAst(yy,"selectorStatement",[
            $1
        ]);
    }
    | selectorStatement '>' selectorExpression {
        $$ = new yy.scopeAst(yy,"selectorStatement",[
            $1, $2, $3
        ]);
    }
    | selectorStatement '^' selectorExpression {
        $$ = new yy.scopeAst(yy,"selectorStatement",[
            $1, $2, $3
        ]);
    }
    | selectorStatement ',' selectorExpression {
        $$ = new yy.scopeAst(yy,"selectorStatement",[
            $1, $2, $3
        ]);
    }
    | selectorStatement '&' selectorExpression {
        $$ = new yy.scopeAst(yy,"selectorStatement",[
            $1, $2, $3
        ]);
    }
    | selectorStatement '|' selectorExpression {
        $$ = new yy.scopeAst(yy,"selectorStatement",[
            $1, $2, $3
        ]);
    }
    ;

selectorTerm
    : term
    ;

shortTagEnd
    : '/' '>' %prec TAGSHORTCLOSE {
        $$ = new yy.scopeAst(yy,"shortTagEnd", [
            $1, $2
        ]);
    }
    ;

scope
    : scopeArgs scopeStart controlCode '}' {
        $$ = new yy.scopeAst(yy,"scope",[
            $2, $3, $1
        ]);
    }
    | scopeStart controlCode '}' {
        $$ = new yy.scopeAst(yy,"scope",[
            $1, $2
        ]);
    }
    ;

scopeArgs
    : '(' associativeList ')' {
        $$ = new yy.scopeAst(yy,"scopeArgs",[
            $2
        ]);
    }
    | '(' ')' {
        $$ = new yy.scopeAst(yy,"scopeArgs",[]);
    }
    ;

scopeStart
    : '{' {
        $$ = new yy.scopeAst(yy,"scopeStart",[]);
    }
    ;

tagStart
    : '<' identifier %prec TAGOPEN {
        $$ = new yy.scopeAst(yy,"tagStart",[
            $1, $2
        ]);
    }
    ;

tagEnd
    : '>' %prec TAGCLOSE {
        $$ = new yy.scopeAst(yy,"tagEnd",[
            $1
        ]);
    }
    ;

while
    : whileBegin controlBlock loopElse END {
        $$ = new yy.scopeAst(yy,"while",[
            $1, $2, $3, $4
        ]);
    }
    ;

whileBegin
    : WHILE '(' boolean ')' ':' {
        $$ = new yy.scopeAst(yy,"whileBegin",[
            $1, $2, $3, $4, $5
        ]);
    }
    ;
