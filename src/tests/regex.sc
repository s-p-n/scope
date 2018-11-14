/*
	Examples taken from http://xregexp.com/ and converted into Scope code.

*/
let date, year, newFormat, html, domains;

// Using named capture and flag x (free-spacing and line comments)
date = r`(?<year>  [0-9]{4} ) -?  # year
                (?<month> [0-9]{2} ) -?  # month
                (?<day>   [0-9]{2} )     # day`x;

// Using named backreferences...
year = XRegExp.exec('2016-02-23', date).year;
console.log(year); 
// 2016

newFormat = XRegExp.replace('2016-02-23', date, '${month}/${day}/${year}');
console.log(newFormat); 
// 02/23/2016

// Finding matches within matches, while passing forward and returning specific backreferences
html = '<a href="http://xregexp.com/api/">XRegExp</a>' +
       '<a href="http://www.google.com/">Google</a>';
domains = XRegExp.matchChain(html, [
  [regex: r`<a href="([^"]+)">`i, backref: 1],
  [regex: r`(?i)^https?://(?<domain>[^/?#]+)`, backref: 'domain']
]);
console.log(domains); 
// ['xregexp.com', 'www.google.com']
