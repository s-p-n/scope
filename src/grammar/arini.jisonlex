%options case-insensitive

%{
	yy.setStr = function setStr(body, txt) {
		return body + txt;
	};
%}


%x inBacktick
%s inBacktickExpr
%x angleBracket 
%s xmlTagOpen 
%x xmlBlockClose
%x inRegex
%s declLeft
%s declBracket
%s declRight
%s exprBracket
%s paren
%s formalArguments

%%

\s+                                          {/* skip whitespace */}
"("                                          {
												if (/ /i) {

												}
												this.pushState('paren');
												this.pushState('declLeft');
												return "(";
											 }
<paren>")\s*{"                               {this.popState();return "){"}
<paren>")"                                   {this.popState();return ")";}
<paren>","                                   {this.pushState('declLeft');return ",";}
'...'                                        {return '...';}

'`'				                             {this.pushState('inBacktick'); return 'BT_OPEN';}
<inBacktick>'`'                              {this.popState(); return 'BT_CLOSE';}
<inBacktick>'${'			                 {this.popState(); this.pushState('inBacktickExpr'); return 'BT_EXPR_OPEN';}

<inBacktickExpr>'}'                          {this.popState(); this.pushState('inBacktick'); return 'BT_EXPR_CLOSE';}

<inBacktick>(\\\`|[^\`\$]|\$[^\{\`])+	     {return "BT_TEXT";}


"<"                                          {
                                                if ((/^(\/|[a-z])/).test(this._input)) {
													this.pushState("angleBracket");
													return "<";
												} else if ((/^\=/).test(this._input)) {
													yytext += "=";
													this.match += '=';
													this.matched += '=';
													this._input = this._input.substr(1);
													return "LTEQ"
												} else if ((/^\-/).test(this._input)) {
													yytext += "-";
													this.match += '-';
													this.matched += '-';
													this._input = this._input.substr(1);
													return "BY";
												}
												return "LT";
											 }

<angleBracket>"/"                            {this.popState(); this.pushState("xmlBlockClose"); return "XML_BLOCK_END";}
<angleBracket>[a-z][a-z0-9\-\_\$]*           {this.popState(); this.pushState("xmlTagOpen"); return "XML_OPEN_ID";}
<angleBracket>.                              {this.popState();}


<xmlTagOpen>">"                              {this.popState(); return "XML_BLOCK_START";}
<xmlTagOpen>"/>"                             {this.popState(); return "XML_SHORT_CLOSE";}
<xmlTagOpen>"="                              {return "XML_ATTR_BECOMES";}

<xmlBlockClose>\s+                           /* skip whitespace */
<xmlBlockClose>">"                           {this.popState(); return "XML_BLOCK_CLOSE";}
<xmlBlockClose>[a-z][a-z0-9\-\_\$]*          {return "XML_CLOSE_ID";}


r(?:\'\'\'|\"\"\"|[/"'@~%`])      		 	%{
	                                         	return (() => {
	                                         		let del_regex = /^r('''|"""|[\/"'@~%`])/;
	                                         		yy.regex.del = yytext.match(del_regex)[1];
	                                         		this.pushState("inRegex");
	                                         		return "REGEX_START";
	                                         	})();
                                            %}
<inRegex>(?:\'\'\'|\"\"\"|[/"'@~%`])[Agimnsuxy]{0,7} %{
												return (() => {
													let del = yytext.match(/^'''|"""|[/"'@~%`]/)[0];
													if (yy.regex.del === del) {
														yy.regex.modifiers = yytext.match(/[a-z]*$/i)[0];
														this.popState();
														return "REGEX_END";
													}
													return "REGEX_BODY";
												})();
											%}
<inRegex>\S|\s                              {return "REGEX_BODY";}
<declLeft>'['                               {this.pushState("declBracket"); return "[";}
<declLeft>'='|'becomes'                     {this.popState();return "BECOMES";}
<declBracket>']'                            {this.popState();return "]";}
<declBracket>'['                            {this.pushState("declBracket"); return "[";}
<declBracket>','                            {return ",";}
<declBracket>[a-z][a-z0-9\-\_\$]*           {
												if (!(/\-/).test(yytext)) {
                                                 	return "JSPROPERTY";
                                                }
                                                return "PROPERTY";
                                            }
'['                                         {this.pushState("exprBracket");return '[';}
<exprBracket>']'                            {this.popState();return ']';}
<exprBracket>[a-z][a-z0-9\-\_\$]*           {
                                                 for (let [search, result] of yy.namedTokens) {
                                                 	if (search.test(yytext)) {
                                                 		if (typeof result === "function") {
                                                 			return result.call(this, yytext);
                                                 		}
                                                 		return result;
                                                 	}
                                                 }

                                                 if (/^\s*(\:|\=|BECOMES)/.test(this._input)) {
                                                 	return "NAME";
                                                 }
                                                 if (!(/\-/).test(yytext)) {
                                                 	return "JSPROPERTY";
                                                }
                                                return "PROPERTY";
                                            }

"/"                                         {
                                                return (() => {
	                                                const line_comment_regex = /^(?:\/[^\n]*(?=\n|$))/;
	                                                const block_comment_regex = /^(?:\*[\s\S]*?\*\/)/;
	                                                if (line_comment_regex.test(this._input)) {
	                                                    let match = this._input.match(line_comment_regex)[0];
	                                                    yytext += match;
	                                                    this.match += match;
	                                                    this.matched += match;
	                                                    this._input = this._input.substr(match.length + 1);
	                                                } else if (block_comment_regex.test(this._input)) {
	                                                	let match = this._input.match(block_comment_regex)[0];
	                                                	yytext += match;
	                                                    this._input = this._input.substr(match.length);
	                                                } else {
                                                		return "DIVIDE";
                                                	}
                                                })();
                                            }

".."                                         {return "TO";}
\"(\\\"|[^\"])*\"                            {return "QSTRING";}
\'(\\\'|[^\'])*\'                            {return "ASTRING";}
">"                                          {return "GT";}
">="                                         {return "GTEQ";}
"=="                                         {return "EQ";}
"!="                                         {return "INEQ";}
"&&"                                         {return "AND";}
"||"                                         {return "OR";}
"++"                                         {return "INCREMENT";}
"--"                                         {return "DECREMENT";}
"+"                                          {return "PLUS";}
"-"                                          {return "MINUS";}
"*"                                          {return "TIMES";}
"%"                                          {return "MODULUS";}
"^"                                          {return "POWER";}
"."                                          {return ".";}
","                                          {return ",";}
"="                                          {return "BECOMES";}
":"                                          {return "BECOMES";}
"{"                                          {return "{";}
"}"                                          {return "}";}
[a-z][a-z0-9\-\_\$]*                         {
                                                 for (let [search, result] of yy.namedTokens) {
                                                 	if (search.test(yytext)) {
                                                 		if (typeof result === "function") {
                                                 			return result.call(this, yytext);
                                                 		}
                                                 		return result;
                                                 	}
                                                 }
                                                 if (!(/\-/).test(yytext)) {
                                                 	return "JSPROPERTY";
                                                 }
                                                 return "PROPERTY";
                                             }
[0-9]+(?:\.[0-9]+)?                          {return 'NUMBER';}
';'                                          {return ';';}


<<EOF>>                      return 'EOF';