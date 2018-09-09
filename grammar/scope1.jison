%lex

%%
\s+                       /* skip whitespace */
"//".*                    /* one line comment */
"/*"(.|\n|\r)*?"*/"       /* block comment */
"+="                      return '+=';
"="                       return '=';
"</"                      return '</';
"/>"                      return '/>';
"<="                      return '<=';
">="                      return '>=';
"<"                       return '<';
">"                       return '>';
"{"                       return '{';
"}"                       return '}';
"["                       return '[';
"]"                       return ']';
"("                       return '(';
")"                       return ')';
":"                       return ':';
"."                       return '.';
","                       return ',';
";"                       return ';';
\/(\\\/|[^\/])*\/(i(gm|mg|m|g)?|m(ig|gi|i|g)?|g(im|mi|i|m)?)?     return 'REGEXP';
"+"                       return '+';
"-"                       return '-';
"*"                       return '*';
"/"                       return '/';
"%"                       return '%';
"^"                       return '^';
\'[^\']*\'                return 'ASTRING';
\"[^\"]*\"                return 'QSTRING';
\`[^\`]*\`                return 'BSTRING';
"import"                  return 'IMPORT';
"use"                     return 'USE';
"only"                    return 'ONLY';
"into"                    return 'INTO';
"as"                      return 'AS';
"let"                     return 'LET';
"public"                  return 'PUBLIC';
"protected"               return 'PROTECTED';
"private"                 return 'PRIVATE';
"true"                    return 'TRUE';
"false"                   return 'FALSE';
"return"                  return 'RETURN';
"is"                      return 'IS';
"isnt"                    return 'ISNT';
"lt"                      return 'LT';
"gt"                      return 'GT';
"gteq"                    return 'GTEQ';
"lteq"                    return 'LTEQ';
"&&"                      return 'AND';
"and"                     return 'AND';
"||"                      return 'OR';
"or"                      return 'OR';
"!"                       return '!';
[0-9]+(?:.[0-9]+)?        return 'NUMBER';
[a-zA-Z_-][a-zA-Z0-9_-]*  return 'IDENTIFIER';
<<EOF>>                   return 'EOF';

/lex
%left USE
%left IMPORT
%left ONLY INTO AS
%left RETURN
%left '=' ':' '+='
%left AND OR
%left IS ISNT GT LT GTEQ LTEQ
%left '!'
%left '+' '-'
%left '*' '/'
%left '^' '%'
%left '.'
%left ','
%right '{' '}'
%right '[' ']'
%right '(' ')'
%right '</' '/>'
%right '<' '>'
%right UMINUS
%right ';'


%start program

%%

array
    : arrayStart ']'
        {$$ = new yy.scopeAst(yy, 'emptyMapExpression', [$arrayStart]);}
    | arrayStart associativeList ']'
        {$$ = new yy.scopeAst(yy, 'mapExpression', [$arrayStart, $associativeList]);}
    | arrayStart expressionList ']'
        {$$ = new yy.scopeAst(yy, 'arrayExpression', [$arrayStart, $expressionList]);}
    ;

arrayStart
    : '['
        {$$ = new yy.scopeAst(yy, 'arrayStart', []);}
    ;

assignmentExpression
    : id assignmentValue
        {$$ = new yy.scopeAst(yy, 'assignmentExpression', [$id, $assignmentValue]);}
    ;

assignmentValue
    : '=' expression
        {$$ = new yy.scopeAst(yy, 'assignmentValue', [$1, $expression]);}
    | '+=' expression
        {$$ = new yy.scopeAst(yy, 'assignmentValue', [$1, $expression]);}
    ;

associativeDeclaration
    : IDENTIFIER ':' expression
        {$$ = new yy.scopeAst(yy, 'associativeDeclaration', [$1, 'id', $3]);}
    | string ':' expression
        {$$ = new yy.scopeAst(yy, 'associativeDeclaration', [$1, 'string', $3]);}
    ;

associativeList
    : associativeDeclaration
        {$$ = new yy.scopeAst(yy, 'associativeList', [$1]);}
    | associativeList ',' associativeDeclaration
        {$$ = new yy.scopeAst(yy, 'associativeList', [$1, $3]);}
    ;

binaryExpression
    : expression AND expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, '&&', $3]);}
    | expression OR expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, '||', $3]);}
    | expression IS expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, '===', $3]);}
    | expression ISNT expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, '!==', $3]);}
    | expression GT expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, '>', $3]);}
    | expression LT expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, '<', $3]);}
    | expression GTEQ expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, '>=', $3]);}
    | expression LTEQ expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, '<=', $3]);}
    | expression '+' expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, $2, $3]);}
    | expression '-' expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, $2, $3]);}
    | expression '*' expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, $2, $3]);}
    | expression '/' expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, $2, $3]);}
    | expression '^' expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, $2, $3]);}
    | expression '%' expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, $2, $3]);}
    ;

controlCode
    : 
        {$$ = new yy.scopeAst(yy, 'controlCode', []);}
    | controlCode expression ';'
        {$$ = new yy.scopeAst(yy, 'controlCode', [$1, $2]);}
    ;

declarationExpression
    : LET IDENTIFIER '=' expression
        {$$ = new yy.scopeAst(yy, 'declarationExpression', ['let', $2, $4]);}
    | PRIVATE IDENTIFIER '=' expression
        {$$ = new yy.scopeAst(yy, 'declarationExpression', ['private', $2, $4]);}
    | PROTECTED IDENTIFIER '=' expression
        {$$ = new yy.scopeAst(yy, 'declarationExpression', ['protected', $2, $4]);}
    | PUBLIC IDENTIFIER '=' expression
        {$$ = new yy.scopeAst(yy, 'declarationExpression', ['public', $2, $4]);}
    ;

expression
    : assignmentExpression
        {$$ = $1}
    | import
        {$$ = $1}
    | use
        {$$ = $1}
    | declarationExpression
        {$$ = $1}
    | '-' expression %prec UMINUS
        {$$ = new yy.scopeAst(yy, 'unaryExpression',['-', $expression]);}
    | binaryExpression
        {$$ = $1}
    | '(' expression ')'
        {$$ = $2}
    | literal
        {$$ = $1}
    | id
        {$$ = $1}
    | invoke
        {$$ = $1}
    | RETURN expression
        {$$ = new yy.scopeAst(yy, 'returnExpression', [$2]);}
    | '!' expression
        {$$ = new yy.scopeAst(yy, 'unaryExpression',['!', $expression]);}
    ;

expressionList
    : expression
        {$$ = new yy.scopeAst(yy, 'expressionList', [$1]);}
    | expression ',' expressionList
        {$$ = new yy.scopeAst(yy, 'expressionList', [$1, $3]);}
    ;

id
    : IDENTIFIER
        {$$ = new yy.scopeAst(yy, 'identifier', [$1]);}
    | id '.' IDENTIFIER
        {$$ = new yy.scopeAst(yy, 'identifier', [$1, 'dot', $3]);}
    | id '[' expression ']'
        {$$ = new yy.scopeAst(yy, 'identifier', [$1, 'bracket', $3]);}
    ;

idList
    : IDENTIFIER
        {$$ = new yy.scopeAst(yy, 'idList', [$1]);}
    | IDENTIFIER ',' idList
        {$$ = new yy.scopeAst(yy, 'idList', [$1, $3]);}
    ;

import
    : IMPORT string
        {$$ = new yy.scopeAst(yy, 'importExpression', [$2]);}
    ;

invokeTracker
    : id '('
        {$$ = new yy.scopeAst(yy, 'invokeTracker', [$id]);}
    ;

invoke
    : invokeTracker invokeArguments ')'
        {$$ = new yy.scopeAst(yy, 'invokeExpression', [$invokeTracker, $invokeArguments]);}
    | scope '(' invokeArguments ')'
        {$$ = new yy.scopeAst(yy, 'invokeExpression', [$1, $3]);}
    | import '(' invokeArguments ')'
        {$$ = new yy.scopeAst(yy, 'invokeExpression', [$1, $3]);}
    | invoke '.' id
        {$$ = new yy.scopeAst(yy, 'invokeId', [$1, 'dot', $3]);}
    | invoke '[' expression ']'
        {$$ = new yy.scopeAst(yy, 'invokeId', [$1, 'bracket', $3]);}
    | invoke '(' invokeArguments ')'
        {$$ = new yy.scopeAst(yy, 'invokeExpression', [$1, $3]);}
    ;

invokeArguments
    : 
        {$$ = new yy.scopeAst(yy, 'invokeArguments', []);}
    | expressionList
        {$$ = new yy.scopeAst(yy, 'invokeArguments', [$1]);}
    ;

literal
    : TRUE
        {$$ = new yy.scopeAst(yy, 'booleanLiteral', true);}
    | FALSE
        {$$ = new yy.scopeAst(yy, 'booleanLiteral', false);}
    | NUMBER
        {$$ = new yy.scopeAst(yy, 'numericLiteral', Number($1));}
    | string
        {$$ = new yy.scopeAst(yy, 'stringLiteral', $1.substr(1,$1.length-2));}
    | REGEXP
        {$$ = new yy.scopeAst(yy, 'regexLiteral', [$1])}
    | xml
        {$$ = $1}
    | scope
        {$$ = $1}
    | array
        {$$ = $1}
    ;

program
    : controlCode EOF
        {return $1}
    ;

scope
    : scopeArguments scopeStart controlCode '}'
        {$$ = new yy.scopeAst(yy, 'scopeExpression', [$scopeStart, $scopeArguments, $controlCode]);}
    | scopeStart controlCode '}'
        {$$ = new yy.scopeAst(yy, 'scopeExpression', [$scopeStart, $controlCode]);}
    ;

scopeStart
    : '{'
        {$$ = new yy.scopeAst(yy, 'scopeStart', []);}
    ;

scopeArguments
    : '(' associativeList ')'
        {$$ = new yy.scopeAst(yy, 'scopeArguments', [$2]);}
    ;

string
    : QSTRING
        {$$ = $1}
    | ASTRING
        {$$ = $1}
    | BSTRING
        {$$ = $1}
    ;

use
    : USE usable
        {$$ = new yy.scopeAst(yy, 'useExpression', [$2]);}
    | USE usable useOnly
        {$$ = new yy.scopeAst(yy, 'useExpression', [$2, $3]);}
    ;

usable
    : scope
        {$$ = new yy.scopeAst(yy, 'usable', [$1]);}
    | id
        {$$ = new yy.scopeAst(yy, 'usable', [$1]);}
    | import
        {$$ = new yy.scopeAst(yy, 'usable', [$1]);}
    | usable ',' scope
        {$$ = new yy.scopeAst(yy, 'usable', [$1, $3]);}
    | usable ',' id
        {$$ = new yy.scopeAst(yy, 'usable', [$1, $3]);}
    | usable ',' import
        {$$ = new yy.scopeAst(yy, 'usable', [$1, $3]);}
    ;

useOnly
    : ONLY '(' expressionList ')'
        {$$ = new yy.scopeAst(yy, 'useOnly', [$3]);}
    ;

xml
    : '<' id xmlAttributes '>' xmlControlCode '</' id '>'
        {$$ = new yy.scopeAst(yy, 'xmlExpression', [$2, $3, $5]);}
    | '<' id xmlAttributes '/>'
        {$$ = new yy.scopeAst(yy, 'xmlExpression', [$2, $3]);}
    ;

xmlAttributes
    : 
        {$$ = new yy.scopeAst(yy, 'xmlAttributes', []);}
    | xmlAttributes IDENTIFIER '=' expression
        {$$ = new yy.scopeAst(yy, 'xmlAttributes', [$1, $2, $4]);}
    ;

xmlControlCode
    : 
        {$$ = new yy.scopeAst(yy, 'xmlControlCode', []);}
    | xmlControlCode expression ';'
        {$$ = new yy.scopeAst(yy, 'xmlControlCode', [$1, $2]);}
    ;
