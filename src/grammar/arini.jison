%left BECOMES XML_ATTR_BECOMES
%left AND OR
%left EQ INEQ GTEQ LTEQ GT LT
%left IN HAS FROM
%left TO
%left BY
%left MINUS PLUS
%left TIMES DIVIDE MODULUS
%left POWER
%left '.'

%right UMINUS INCREMENT DECREMENT RANDOM '...'
%right '(' ')' BT_EXPR_OPEN BT_EXPR_CLOSE '[' ']' '){' '{' '}'
%right ','
%right ';'


%start program

%%
arrayStart
	: '['
		{yy.array.begin();}
	;

array
	: arrayStart arrayItems ']'
		{
			$$ = (function () {
				let result = yy.array.active.toScope();
				yy.array.end();
				return `scope.array(${result})`;
			}());
		}
	| arrayStart ']'
		{
			yy.array.end();
			$$ = `scope.array()`;
		}
	;

arrayItem
	: NAME BECOMES expr
		{
			yy.array.active.push($NAME, $expr);
		}
	| expr
		{
			yy.array.active.push($expr);
		}
	;

arrayItems
	: arrayItem
	| arrayItems ',' arrayItem
	;

attribute
	: property XML_ATTR_BECOMES expr
		{
			$$ = [$property, $expr];
		}
	| property
		{
			$$ = [$property, undefined];
		}
	;

attributeList
	: /* empty */
		{$$ = "";}
	| attributeList attribute
		{
			if ($attributeList !== "") {
				$attributeList += ",";
			}
			$$ = (function () {
				if ($attribute[1] === undefined) {
					return `${$attributeList}${$attribute[0]}`;
				}
				return `${$attributeList}"${$attribute[0]}":${$attribute[1]}`;
			}());
		}
	| attributeList '...' expr
		{
			if ($attributeList !== "") {
				$attributeList += ",";
			}
			$$ = `${$attributeList}...scope.asObj(${$expr})`;
		}
	;

binaryExpression
	: expr[a] LT expr[b]
		{$$ = `(${$a}<${$b})`;}
	| expr[a] LTEQ expr[b]
		{$$ = `(${$a}<=${$b})`;}
	| expr[a] GT expr[b]
		{$$ = `(${$a}>${$b})`;}
	| expr[a] GTEQ expr[b]
		{$$ = `(${$a}>=${$b})`;}
	| expr[a] EQ expr[b]
		{$$ = `Object.is(${$a},${$b})`;}
	| expr[a] INEQ expr[b]
		{$$ = `!Object.is(${$a},${$b})`;}
	| expr[a] PLUS expr[b]
		{$$ = `(${$a}+${$b})`;}
	| expr[a] MINUS expr[b]
		{$$ = `(${$a}-${$b})`;}
	| expr[a] TIMES expr[b]
		{$$ = `(${$a}*${$b})`;}
	| expr[a] DIVIDE expr[b]
		{$$ = `(${$a}/${$b})`;}
	| expr[a] MODULUS expr[b]
		{$$ = `(${$a}%${$b})`;}
	| expr[a] POWER expr[b]
		{$$ = `(${$a}^${$b})`;}
	| expr[a] AND expr[b]
		{$$ = `(${$a}&&${$b})`;}
	| expr[a] OR expr[b]
		{$$ = `(${$a}||${$b})`;}
	| expr[a] IN expr[b]
		{$$ = `scope.in(${$a}, ${$b})`;}
	| expr[a] HAS expr[b]
		{$$ = `scope.has(${$a}, ${$b})`;}
	| id BECOMES expr
		{$$ = `scope.set(${$id.parent},${$id.prop},${$expr})`;}
	| expr[a] '[' ']' BECOMES expr[b]
		{$$ = `${$a}.push(${$b})`;}
	| expr[a] TO expr[b] BY expr[c]
		{$$ = `scope.range(${$a},${$b},${$c})`;}
	| expr[a] TO expr[b]
		{$$ = `scope.range(${$a},${$b})`;}
	| randExpr FROM expr
		{$$ = `scope.random(${$expr}${$randExpr}`;}
	| expr[a] FROM expr[b]
		{$$ = `${$b}[${$a}]`;}
	;

codeBlock
	: decStatements controlCode
	;

controlCode
	: /* empty */
		{$$ = "";}
	| controlCode expr ';'
		{yy.expressions.push($expr);}
	;

decStatements
	: /* empty */
	| decStatements declaration ';'
		{yy.expressions.push($declaration);}
	;

declaration
	: LET decProperty
		{$$ = `scope.declare("let", ${$decProperty})`;}
	| PRIVATE decProperty
		{$$ = `scope.declare("private", ${$decProperty})`;}
	| PROTECTED decProperty
		{$$ = `scope.declare("protected", ${$decProperty})`;}
	| PUBLIC decProperty
		{$$ = `scope.declare("public", ${$decProperty})`;}
	;

decProperty
	: property BECOMES expr
		{$$ = `["${$property}",${$expr}]`;}
	| '[' decPropertyList ']' BECOMES expr
		{$$ = `[[${$decPropertyList}],${$expr}]`;}
	| property
		{$$ = `["${$property}",]`;}
	| decProperty ',' decProperty
		{$$ = `${$1},${$3}`;}
	;

decPropertyList
	: decPropertyListAtom
		{$$ = $decPropertyListAtom;}
	| decPropertyList ',' decPropertyListAtom
		{$$ = `${$decPropertyList},${$decPropertyListAtom}`;}
	;

decPropertyListAtom
	: property
		{$$ = `"${$property}"`;}
	| "[" decPropertyList "]"
		{$$ = `[${$decPropertyList}]`;}
	;

expr
	: literal
		{$$ = $literal;}
	| id
		{$$ = $id.value;}
	| invokeExpr
		{$$ = $invokeExpr;}
	| binaryExpression
		{$$ = $binaryExpression;}
	| '(' expr ')'
		{$$ = '(' + $expr + ')';}
	| unaryExpression
		{$$ = $unaryExpression;}
	;

id
	: property
		{$$ = {parent: "scope._scoping", prop: `"${$property}"`, value: `scope.id["${$property}"]`};}
	| expr '.' PROPERTY
		{$$ = {parent: $expr, prop: `"${$PROPERTY}"`, value:`${$expr}["${$PROPERTY}"]`};}
	| expr '.' JSPROPERTY
		{$$ = {parent: $expr, prop: `"${$JSPROPERTY}"`, value:`${$expr}.${$JSPROPERTY}`};}
	| expr '.' RANDOM
		{$$ = {parent: $expr, prop: `"${$RANDOM}"`, value:`${$expr}.${$RANDOM}`};}
	| expr '[' expr ']'
		{$$ = {parent: $expr1, prop: $expr2, value:`${$expr1}[${$expr2}]`};}
	;

invokeArgs
	: expr
		{$$ = $expr;}
	| invokeArgs ',' expr
		{$$ = $invokeArgs + "," + $expr;}
	;

invokeExpr
	: expr '(' ')'
		{$$ = `${$expr}()`;}
	| expr '(' invokeArgs ')'
		{$$ = `${$expr}(${$invokeArgs})`;}
	;

literal
	: array
		{$$ = $array;}
	| BOOL
		{$$ = $BOOL.toLowerCase();}
	| NUMBER
		{$$ = $NUMBER;}
	| regex
		{$$ = $regex;}
	| scope
		{$$ = $scope;}
	| string
		{$$ = $string;}
	| tag
		{$$ = $tag.toScope();}
	| UNDEFINED
		{$$ = undefined;}
	;

program
	: codeBlock EOF
		{return yy.expressions;}
	;

property
	: PROPERTY
		{$$ = $PROPERTY;}
	| JSPROPERTY
		{$$ = $JSPROPERTY;}
	;

randExpr
	: RANDOM
		{$$ = ')';}
	| RANDOM expr
		{$$ = `,${$expr})`;}
	;

regex
	: REGEX_START regexBody REGEX_END
		%{
			$$ = (function () {
				let modifiers = yy.regex.modifiers;
				if (modifiers.length > 0) {
					return `XRegExp("${$regexBody}", "${modifiers}")`;
				}
				return `XRegExp("${$regexBody}")`;
			}());
		%}
	;

regexBody
	: /* empty */
		{$$ = "";}
	| regexBody REGEX_BODY
		%{
			$$ = $regexBody + $REGEX_BODY.replace(/\"/g, '\\"').replace(/\n/g,'\\n');
		%}
	;

scope
	: scopeStart codeBlock '}'
	;
/*
scopeArgument
	: ARGUMENT BECOMES expression
	| property
	;

scopeArguments
	: scopeArgumentsList
	;

scopeArgumentsList
	: scopeArgument
	| scopeArguments ',' scopeArgument
	;

scopeArgumentSpread
	: '...' property
	;
*/
scopeStart
	: '{'
	| '(' '){'
	| '(' decProperty ')'
	;

string
	: BT_OPEN stringBody BT_CLOSE
		{ $$ = '`' + $stringBody + '`'; }
	| QSTRING
		{$$ = $QSTRING.replace(/\n/g, '\\n');}
	| ASTRING
		{$$ = $ASTRING.replace(/\n/g, '\\n');}
	;

stringBody
	: /* empty */
		{$$ = "";}
	| stringBody BT_TEXT
		%{
			$$ = yy.setStr($stringBody, $BT_TEXT);
		%}
	| stringBody BT_EXPR_OPEN expr BT_EXPR_CLOSE
		%{
			$$ = yy.setStr($stringBody, '${' + $expr + '}');
		%}
	;

tag
	: tagShort
		{$$ = $tagShort;}
	| tagBlock
		{$$ = $tagBlock;}
	;

tagBlock
	: tagBlockStart controlCode tagBlockEnd
		{
			$$ = (function () {
				let tag = $tagBlockStart;

				if (tag.tagName !== $tagBlockEnd) {
					yy.parseError(`Tag mismatch: `, {
						text: `</${$tagBlockEnd}><f`,
						token: yytext,
						line: yylineno,
						solution: `Change ${$tagBlockEnd} to ${tag.tagName}, or the other way around.`,
						recoverable: true
					});
				}

				return tag;
			}());

		}
	;

tagBlockEnd
	: "<" XML_BLOCK_END XML_CLOSE_ID XML_BLOCK_CLOSE
		{
			yy.expressions = yy.expressions.parent;
			$$ = $XML_CLOSE_ID;
		}
	;

tagBlockStart
	: "<" XML_OPEN_ID attributeList XML_BLOCK_START
		{
			$$ = (function () {
				let parent = yy.expressions;
				yy.expressions = [];
				yy.expressions.parent = parent;
				return new yy.xml.Tag($XML_OPEN_ID, $attributeList, yy.expressions, parent);
			}());
		}
	;

tagShort
	: "<" XML_OPEN_ID attributeList XML_SHORT_CLOSE
		{$$ = (new yy.xml.Tag($XML_OPEN_ID, $attributeList, [], yy.expressions));}
	;

unaryExpression
	: MINUS expr %prec UMINUS
		{$$ = '-' + $expr}
	| INCREMENT expr
		{$$ = '++' + $expr;}
	| DECREMENT expr
		{$$ = '--' + $expr;}
	;