// See Reference for XRegExp: http://xregexp.com/syntax/

let repeatedWords = /\b(?<word>[a-z]+)\s+\k<word>\b/gi;
let result = [repeatedWords.test("The the test data")];

result[] = XRegExp.replace('The the test data', repeatedWords, '${word}');

let url = /^
            (?<scheme> [^:\/?]+ ) :\/\/ # aka protocol
            (?<host>   [^\/?]+  )       # domain name or IP
            (?<path>   [^?]*    ) \??   # optional path
            (?<query>  .*       )       # optional query/x;
result[] = XRegExp.exec('http://google.com/path/to/file?q=1', url);

let d = /^(?#month)\d{1,2}\/(?#day)\d{1,2}\/(?#year)(\d{2}){1,2}/n;
result[] = d.test('04/20/2008');

let d2 = /^
            \d{1,2}       (?#month)
         \/ \d{1,2}       (?#day)
         \/ (\d{2}){1,2}  (?#year)/nx;
result[] = d2.test('04/20/2008');


	/* JS Code Equiv:
	// Basic usage: Add \a for the ALERT control code
	XRegExp.addToken(
	  /\\a/,
	  function() {return '\\x07';},
	  {scope: 'all'}
	);
	XRegExp('\\a[\\a-\\n]+').test('\x07\n\x07'); // -> true
	*/
	XRegExp.addToken(
		/\\a/,
		{return '\\x07';},
		[scope: 'all']
	);
	result[] = XRegExp(/\a[\a-\n]+/).test('\x07\n\x07');

// Add escape sequences: \Q..\E and \Q..
XRegExp.addToken(
  /\\Q([\s\S]*?)(?:\\E|$)/,
  (match: []) {
    return XRegExp.escape(match[1]);
  },
  [scope: 'all']
);
result[] = XRegExp(/^\Q(?*+)/).test('(?*+)'); // -> true

// Add the U (ungreedy) flag from PCRE and RE2, which reverses greedy and lazy quantifiers.
// Since `scope` is not specified, it uses 'default' (i.e., transformations apply outside of
// character classes only)
XRegExp.addToken(
  /([?*+]|{\d+(?:,\d*)?})(\??)/,
  (match: []) {
    return match[1] + if(match[2],{return '';},{return '?';});
  },
  [flag: 'U']
);
result[] = XRegExp(/a+/U).exec('aaa')[0]; // -> 'a'
result[] = XRegExp(/a+?/U).exec('aaa')[0]; // -> 'aaa'

// Add \R for matching any line separator (CRLF, CR, LF, etc.)
XRegExp.addToken(
  /\\R/,
  {return '(?:\\r\\n|[\\n-\\r\\x85\\u2028\\u2029])';}
);
console.log(XRegExp.build);
let time = XRegExp.build('(?x)^ {{hours}} ({{minutes}}) $', [
  hours: XRegExp.build('{{h12}} : | {{h24}}', [
    h12: /1[0-2]|0?[1-9]/,
    h24: /2[0-3]|[01][0-9]/
  ], 'x'),
  minutes: /^[0-5][0-9]$/
]);

result[] = time.test('10:59'); // -> true
result[] = XRegExp.exec('10:59', time).minutes; // -> '59'

print(result);
return result;