module.exports = function setXregexState(parser) {
	let priv = new WeakMap();
	class Regex {
		constructor (text="", modifiers="") {
			const self = this;
			priv.set(this, {});
			const p = priv.get(self);

			self.text = text;
			self.modifiers = [...modifiers];
			self.groups = [];
			self.match = "";

			p.inCharacterClass = false;
			p.i = 0;
			p.currentMatch = "";
		}

		reportMatch (m) {
			const self = this;
			const p = priv.get(self);

			p.i += m.length;
			p.currentMatch += m;
			self.match += m;
		}

		walk() {
			const self = this;
			const p = priv.get(self);

			if (p.inCharacterClass) {
				return self.walkCharacterClass();
			}

			let search = self.text.substr(p.i);

			// escape first:
			if (search.test(/^\\/)) {
				self.reportMatch(search.substr(0,2));
				return self.walk();
			}

			// Free-spacing mode:
			if (self.modifiers.indexOf("x") !== -1) {
				let m = search.match(/^\s/);
			}
		}

		walkCharacterClass() {

		}
	}

	parser.yy.regex = {
		del: ""
	};

	function swapCase(char) {
		if (char === char.toLowerCase()) {
			return char.toUpperCase();
		}
		return char.toLowerCase();
	}

	// modifiers: string of modifiers.
	// i: index of "problem" index.
	//    
	// purpose: Identify reason the modifier is a 
	//    problem, and attempt to explain how to 
	//    solve the problem.
	//
	// return: (string) explaination of problem
	//         or "unknown"
	function findSolution (modifiers, i) {
		let validModifier = /^[Agimnsuxy]$/;
		let possible_fix = `'${modifiers}' is syntacticly an invalid modifier set, noticed at place ${i}.`;
		if (modifiers.indexOf(i) !== modifiers.lastIndexOf(i)) {
			possible_fix += `
	'${modifiers[i]}' is used twice.
	-	Try removing modifier '${modifiers[i]}' at place ${modifiers[modifiers.lastIndexOf(i)]}.`;
		}
		if (!validModifier.test(modifiers[i])) {
			possible_fix += `
	'${modifiers[i]}' is not recognized.`;
			if (validModifier.test(swapCase(modifiers[i]))) {
				possible_fix += `
	-	Did you mean '${swapCase(modifiers[i])}'?`
			}
			possible_fix += `
	- Here's a list of supported arguments:
	For a complete list, see http://xregexp.com/flags/

	n: Explicit capture
	s: Dot matches all (aka dotall or singleline mode)
	x: Free-spacing and line comments (aka extended mode)
	A: Astral (requires the Unicode Base addon)
	g: All matches, or advance 'lastIndex' after matches (global)
	i: Case insensitive (ignoreCase)
	m: '^' and '$' match at newlines (multiline)
	u: Handle surrogate pairs as code points and enable \\u{...} (unicode) - Requires native ES6 support
	y: Matches must start at 'lastIndex' (sticky) - Requires Firefox 3+ or native ES6 support`
		}
		return possible_fix;
	}

	let modifiers = "";
	Object.defineProperty(parser.yy.regex, "modifiers", {
		get: function () {
			return modifiers;
		},
		set: function (newModifiers) {
			let modifier_regex = /^[Agimnsuxy]$/;
			let yy = parser.yy;
			modifiers = newModifiers;
			for (let i = 0; i < modifiers.length; i += 1) {
				let mod = modifiers[i];
				if (!(
					modifier_regex.test(mod) &&
					modifiers.indexOf(mod) === modifiers.lastIndexOf(mod)
				)) {
					parser.yy.parseError(`Invalid Modifier \`${mod}\` in Regex at place ${i}.`, {
						line: yy.yylineno,
						text: yy.yytext,
						token: mod,
						solution: findSolution(modifiers, i)
					});
				}
			}
			return modifiers;
		}

	});
}