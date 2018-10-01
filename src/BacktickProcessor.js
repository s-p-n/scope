// Purpose:
// Attempts to intercept backtick strings (`)
// to implement interpolation.

// Usage:
// To be instantiated in ScopeParser.parse().
// The `lex` method is to be used to intercept JISON
// native `parser.lexer.lex` method.

// Properties:
// parser: [Object] Reference to ScopeParser instance.
// 
// state: {
//  inBacktick: [bool] Are we inside a backtick string? `..(here)..`
//  inBacktickExpr: [bool] Are we inside an interpolation? ${..(here)..}
// }

// Methods:
// constructor (sp)
// 
//  Arguments:
//  sp: [Object] Reference to ScopeParser
//
// ----------------------------------------------------------------------
//
// lex (ctx)
//
//  Arguments:
//   ctx: [Object] Should reference 'this' from overwritten 
//        'parser.lexer.lex' method.
//
//  Return: [Bool]
//   [true]:   Found a backtick-string and did the work.
//   [false]:  Not a backtick-string, not our job.

class BacktickProcessor {
	constructor (sp) {
		const self = this;
		self.sp = sp;
		self.state = {
			inBacktick: false,
			inBacktickExpr: false,
			btString: "",
			exprBody: "",
			exprBraceDepth: 0
		};
	}

	lex (ctx) {
		const self = this;
		const state = self.state;

		//console.log("inBacktick:", state.inBacktick);
		// Look for ` token
		if (ctx.yytext === "`") {
			// Switch inBacktick flag
			//console.log("found `: swapping inBacktick");
			state.inBacktick = !state.inBacktick;
		}
		// Check if we're inside of a backtick string:
		if (state.inBacktick) {
			//console.log("in backtick string");
			//console.log(state);
			//console.log("yytext:", JSON.stringify(ctx.yytext));
			//console.log("_input:", ctx._input);
			//console.log("match:", ctx.match);
			//console.log("matched:", ctx.matched);
			let inputMatch, testMatch;

			// Set btString to an empty string.
			state.btString = "";

			// RegExp for expression-wrapper tokens
			// TODO: implement support for '${..{..}..}'
			let btExprRegex = /^(?:(\s*)\$\{(.*))/gus;

			let btExprBodyRegex = /^([^\{\}]*)(\{|\})(.*)/gus;

			// RegExp for non-expression-wrapper tokens
			let btBodyRegex = /^((?:\\`|[^`](?!\{))*)(.*)/gus;

			// Begin walking source:
			// The goal is to push non-expr chars
			// onto the stack, and push translated
			// expressions in the place of source-code
			// on the stack.
			// The result should be a valid JavaScript
			// back-tick string with semi-optimistic
			// parsed source-code within. Syntax should
			// be checked, but runtime validity should not.
			while(true) {
				//console.log("looping..");
				//console.log("yytext:", JSON.stringify(ctx.yytext));
				//console.log(state);
				if (ctx._input.length < 1) {
					console.log("input exhausted.");
					process.exit();
				}
				if (state.inBacktickExpr) {
					//console.log("in backtickExpr:");
					//console.log("yytext:", JSON.stringify(ctx.yytext));
					//console.log("_input:", JSON.stringify(ctx._input));
					inputMatch = ctx._input.match(btExprBodyRegex)
					if (inputMatch) {
						//console.log("found brace");
						let btExprBodyMatch = btExprBodyRegex.exec(ctx._input);

						let [
							original,
							prefix,
							brace,
							leftovers
						] = btExprBodyMatch;

						state.exprBody += prefix;
						//console.log("state body:", JSON.stringify(state.exprBody));
						if (brace === "{") {
							state.exprBraceDepth += 1;
							state.exprBody += "{";
						} else if (brace === "}") {
							if (state.exprBraceDepth > 0) {
								state.exprBraceDepth -= 1;
								state.exprBody += "}";
							} else {
								state.inBacktickExpr = false;
								let newExprSrc = self.sp.traverse(
									self.sp.parse(state.exprBody + ";") // Add semi-colon to end of scope source.
								).translation.replace(/;$/, "");   // Remove semi-colon from end of JS code.
								state.exprBody = "";
								state.btString += newExprSrc + "}";
								state.inBacktick = true;
							}
						}
						ctx._input = leftovers;
						ctx.match = prefix + brace;
						ctx.yytext += ctx.match;
						ctx.matched += ctx.match;
						continue;
					}
					console.log("brace misalignment.");
					process.exit();
				}

				// Assign inputMatch the RegExp match for a
				// backtick expression `${..}`
				inputMatch = ctx._input.match(btExprRegex);

				// Check if the result of that match is truthy
				if (inputMatch) {
					//console.log("found expr match");
					// We have a match- get it:
					let btExprMatch = btExprRegex.exec(ctx._input);

					// Seperate the capture groups into 4 variables.
					let [
						btExprOriginal,
						btExprSpaces,
						//btExprSrc,
						btExprLeftovers
					] = btExprMatch;

					//console.log("btExprMatch:");
					//console.log("original:", JSON.stringify(btExprOriginal));
					//console.log("btExprSpaces:", JSON.stringify(btExprSpaces));
					//console.log("btExprSrc:", JSON.stringify(btExprSrc));
					//console.log("btExprLeftovers:", JSON.stringify(btExprLeftovers));
					//console.log();
					// Set the state.
					// Since we're looking for expressions now,
					// turn off back-tick parsing.
					state.inBacktick = false;
					state.inBacktickExpr = true;
					state.exprBraceDepth = 0;

					ctx._input = btExprLeftovers;
					ctx.match = btExprSpaces + "${";
					ctx.yytext += ctx.match;
					ctx.matched += ctx.match;
					state.btString += ctx.match;
					continue;
					/*
					// Convert the Scope code into JavaScript:
					let newExprSrc = self.sp.traverse(
						self.sp.parse(btExprSrc + ";") // Add semi-colon to end of scope source.
					).translation.replace(/;$/, "");   // Remove semi-colon from end of JS code.

					// Done parsing expression, 
					// turn back on back-tick parsing,
					state.inBacktick = true;

					// Replace input with new input, while setting the match.
					ctx._input = ctx._input.replace(btExprRegex, () => {
						let lines = btExprSrc.split("\n");
						let length = lines.pop().length;
						let newlines = lines.length; 
						let col = ctx.yylloc.last_column;

						if (newlines > 0) {
							col = length;
						} else {
							col += length;
						}

						ctx.yylloc = {
							first_line: ctx.yylloc.last_line,
							first_column: ctx.yylloc.last_column,
							last_line: ctx.yylloc.last_line + newlines,
							last_column: col
						};

						// Set match to the translated expression:
						ctx.match = btExprSpaces + '${' + btExprSrc + '}';
						ctx.matched += ctx.match;
						state.btString += btExprSpaces + '${' + newExprSrc + '}';
						// Return whatever is leftover from _input
						// after the match.
						return btExprLeftovers;
					});

					// Add this match to yytext
					ctx.yytext += ctx.match;
					//console.log("set match to expr and adjusted input.");
					//console.log("match:\n```\n", ctx.match, "\n```");
					//console.log("matched:\n```\n", ctx.matched, "\n```");
					//console.log("_input:\n```\n", ctx._input, "\n```");
					continue;
					*/
				}

				// Assign inputMatch the RegExp match for a
				// non-expression.
				inputMatch = ctx._input.match(btBodyRegex);

				// Check if the result of that match is truthy
				if (inputMatch) {
					//console.log("found non-expr:", JSON.stringify(ctx._input));
					// If the input is a backtick, break the loop.
					// Next time the lexer goes around, it should
					// see the '`' and adjust the state accordingly.
					if (ctx._input[0] === "`") {
						//console.log("found terminating ` char, breaking loop.");
						ctx._input = ctx._input.substr(1);
						ctx.yytext += "`";
						ctx.match = "`";
						ctx.matched += "`";
						state.inBacktick = false;
						//console.log("yytext:", JSON.stringify(ctx.yytext));
						//console.log("match:\n```\n", ctx.match, "\n```");
						//console.log("matched:\n```\n", ctx.matched, "\n```");
						//console.log("_input:\n```\n", ctx._input, "\n```");
						break;
					}

					// Replace input with new input, while setting the match.
					ctx._input = ctx._input.replace(btBodyRegex, (original, match, leftovers) => {
						let lines = match.split("\n");
						let length = lines.pop().length;
						let newlines = lines.length; 
						let col = ctx.yylloc.last_column;

						if (newlines > 0) {
							col = length;
						} else {
							col += length;
						}

						ctx.yylloc = {
							first_line: ctx.yylloc.last_line,
							first_column: ctx.yylloc.last_column,
							last_line: ctx.yylloc.last_line + newlines,
							last_column: col
						};

						// Set match to the non-expression chars
						ctx.match = match;
						ctx.matched += ctx.match;
						// Return whatever is leftover from _input
						// after the match.
						return leftovers;
					});
					// Add this match to the state.btString.

					//console.log("yytext (before):", JSON.stringify(ctx.yytext));
					state.btString += ctx.match;
					ctx.yytext += ctx.match;

					//console.log("set match to non-expr and adjusted input.");
					//console.log("yytext (after):", JSON.stringify(ctx.yytext));
					//console.log("match:\n```\n", ctx.match, "\n```");
					//console.log("matched:\n```\n", ctx.matched, "\n```");
					//console.log("_input:\n```\n", ctx._input, "\n```");
					continue;
				}

				console.log("Backtick Processor in bad state.");
				process.exit();
			}

			// Set the bString to the final match.
			// Surround backticks becase we ate them 
			// during the lex.
			//console.log("setting btString:", state.btString);
			ctx.yy.scopeState.btString = "`" + state.btString + "`";
			state.btString = "";

			// Return the '`' to tell Jison this btString is done.
			return '`';
		}

		// Must not have done anything, return false.
		return false;
	}


}

module.exports = BacktickProcessor;