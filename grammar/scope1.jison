%lex

%options flex case-insensitive

%%
\s+                       /* skip whitespace */
"//".*                    /* one line comment */
"/*"(.|\n|\r)*?"*/"       /* block comment */

"..."                     return '...';
"+="                      return '+=';
"="                       return '=';
"</"                      return '</';
"/>"                      return '/>';
"<="                      return '<=';
">="                      return '>=';
"<&"                      return '<&';
"&>"                      return '&>';
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
"+"                       return '+';
"-"                       return '-';
"*"                       return '*';

/*
\/(\\[\/]|[^\/\r\n])+\/(i(gm|mg|m|g)?|m(ig|gi|i|g)?|g(im|mi|i|m)?)?     return 'REGEXP';
*/


"%"                       return '%';
"^"                       return '^';
/*
    "`"                     return '`';
    (\\\`|[^\`])            return 'BACKTICKCHAR';
    "${"                    return '${';
*/
\'(\\\'|[^\'])*\'         return 'ASTRING';
\"(\\\"|[^\"])*\"         return 'QSTRING';
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
[0-9]+(?:\.[0-9]+)?       return 'NUMBER';


[a-zA-Z_$][a-zA-Z0-9_\-$]*   return 'IDENTIFIER';
\/(?:\\\/|[^\/])+\/[a-zA-Z]* return 'REGEXPBODY';
"/"                          return '/';

/* Backtick Tokens: */
'`'             return '`';
'${'            return '${';
(\\\`|[^\`])    return 'BTCHAR';

<<EOF>>                   return 'EOF';

/lex

%right USE
%right IMPORT
%right RETURN
%left ONLY INTO AS
%left '=' ':' '+='
%left IS ISNT GT LT GTEQ LTEQ
%left AND OR
%left '...'
%left '<&' '&>'
%left '+' '-'
%left '*' '/' DIVIDE
%left '^' '%'
%left '.'
%left ','
%right REGEXP
%right '${' '{' '}'
%right '[' ']'
%right '(' ')'
%right '</' '/>'
%right '<' '>'
%right '!'
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
    | '[' ']' '=' expression
        {$$ = new yy.scopeAst(yy, 'assignmentValue', ['[]=', $expression]);}
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

btOpStart
    : '`'
    ;

btOpEnd
    : btBody '`'
        {$$ = yy.scopeState.btString;}
    ;

btString
    : btOpStart btOpEnd
        {$$ = $btOpEnd;}
    ;

btBody
    : 
        {$$ = "";}
    | btBody btPart
        {$$ = $btBody + $btPart;}
    ;

btPart
    : '${' expression '}'
        {$$ = '${' + $expression.translation + '}';}
    | BTCHAR                                         %prec BTEXPR
        {$$ = $BTCHAR;}
    ;

binaryExpression
    : expression AND expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, '&&', $3]);}
    | expression OR expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, '||', $3]);}
    | expression '<&' expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, '<&', $3]);}
    | expression '&>' expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, '&>', $3]);}
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
    | expression '/' expression                                         %prec DIVIDE
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, $2, $3]);}
    | expression '^' expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, $2, $3]);}
    | expression '%' expression
        {$$ = new yy.scopeAst(yy, 'binaryExpression', [$1, $2, $3]);}
    ;

bracketExpression
    : '[' expression ':' expression ']'
        {$$ = new yy.scopeAst(yy, 'bracketSelectorExpression', [$2, $4]);}
    | '[' ':' expression ']'
        {$$ = new yy.scopeAst(yy, 'bracketSelectorExpression', [0, $3]);}
    | '[' expression ':' ']'
        {$$ = new yy.scopeAst(yy, 'bracketSelectorExpression', [$2, undefined]);}
    | '[' ':' ']'
        {$$ = new yy.scopeAst(yy, 'bracketSelectorExpression', [0, undefined]);}
    | '[' expression ']'
        {$$ = new yy.scopeAst(yy, 'bracketExpression', [$expression]);}
    ;

controlCode
    : 
        {$$ = new yy.scopeAst(yy, 'controlCode', []);}
    | controlCode expression ';'
        {$$ = new yy.scopeAst(yy, 'controlCode', [$1, $2]);}
    ;

declarationId
    : IDENTIFIER
        {$$ = new yy.scopeAst(yy, 'declarationId', [$1]);}
    | '[' idList ']'
        {$$ = new yy.scopeAst(yy, 'declarationIdList', [$idList]);}
    ;

declarationExpression
    : LET declarationId '=' expression
        {$$ = new yy.scopeAst(yy, 'declarationExpression', ['let', $declarationId, $expression]);}
    | PRIVATE declarationId '=' expression
        {$$ = new yy.scopeAst(yy, 'declarationExpression', ['private', $declarationId, $expression]);}
    | PROTECTED declarationId '=' expression
        {$$ = new yy.scopeAst(yy, 'declarationExpression', ['protected', $declarationId, $expression]);}
    | PUBLIC declarationId '=' expression
        {$$ = new yy.scopeAst(yy, 'declarationExpression', ['public', $declarationId, $expression]);}
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
        {$$ = new yy.scopeAst(yy, 'identifier', [$id, 'dot', $3]);}
    | id bracketExpression
        {$$ = new yy.scopeAst(yy, 'identifier', [$id, 'bracket', $bracketExpression]);}
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
        {$$ = new yy.scopeAst(yy, 'invokeExpression', [$scope, $invokeArguments]);}
    | import '(' invokeArguments ')'
        {$$ = new yy.scopeAst(yy, 'invokeExpression', [$import, $invokeArguments]);}
    | invoke '.' id
        {$$ = new yy.scopeAst(yy, 'invokeId', [$invoke, 'dot', $id]);}
    | invoke bracketExpression
        {$$ = new yy.scopeAst(yy, 'invokeId', [$invoke, 'bracket', $bracketExpression]);}
    | invoke '(' invokeArguments ')'
        {$$ = new yy.scopeAst(yy, 'invokeExpression', [$invoke, $invokeArguments]);}
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
        {$$ = new yy.scopeAst(yy, 'stringLiteral', [$string]);}
    | REGEXPBODY %prec REGEXP
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
    : '(' scopeArgumentsList scopeArgumentSpread ')'
        {$$ = new yy.scopeAst(yy, 'scopeArguments', [$scopeArgumentsList, $scopeArgumentSpread]);}
    | '(' scopeArgumentsList ')'
        {$$ = new yy.scopeAst(yy, 'scopeArguments', [$scopeArgumentsList, "remainingArguments"]);}
    | '(' scopeArgumentSpread ')'
        {$$ = new yy.scopeAst(yy, 'scopeArguments', [undefined, $scopeArgumentSpread]);}
    | '(' ')'
        {$$ = new yy.scopeAst(yy, 'scopeArguments', [undefined, undefined])}

    ;

scopeArgumentSpread
    : '...' IDENTIFIER
        {$$ = new yy.scopeAst(yy, 'scopeArgumentSpread', [$2]);}
    ;

scopeArgumentsList
    : scopeArgumentsListDeclaration
        {$$ = new yy.scopeAst(yy, 'scopeArgumentsList', [$scopeArgumentsListDeclaration])}
    | scopeArgumentsListDeclaration ',' scopeArgumentsList
        {$$ = new yy.scopeAst(yy, 'scopeArgumentsList', [$scopeArgumentsListDeclaration, $scopeArgumentsList])}
    ;

scopeArgumentsListDeclaration
    : IDENTIFIER ':' expression
        {$$ = new yy.scopeAst(yy, 'scopeArgumentsListDeclaration', [$IDENTIFIER, $expression])}
    ;

string
    : QSTRING
        {$$ = $1}
    | ASTRING
        {$$ = $1}
    | btString
        {$$ = new yy.scopeAst(yy, 'btString', [$btString]);}
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
        {$$ = new yy.scopeAst(yy, 'xmlExpression', [$2, $3, $5, $7]);}
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
