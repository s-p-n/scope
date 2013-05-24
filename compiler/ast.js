var scopeAst = function scopeAst (data, name, x) {
    this.name = name;
    this.x = x;
    //console.log("\n\nMatched: ", data.lexer.parseError.toString(), "\n\n");
    this.data = {program: data.lexer.matched,
        first_line: data.lexer.yylloc.first_line,
        last_line: data.lexer.yylloc.last_line,
        first_column: data.lexer.yylloc.first_column,
        last_column: data.lexer.yylloc. last_column
    }
    this.partial = data.lexer._input;
    this.line = data.lexer.yylloc.first_line;
    //throw "stop";
}

// create an indentation for level l
function indentString(l) {
    var r="";
    var i;
    for(i = 0; i < l; i += 1) {
        r += i + " ";
    }
    return r;
}

scopeAst.prototype.get = function get (indent) {
    var r = indentString(indent) + "(" + this.name;
    var rem = this.x;
    if(rem.length == 1 && !(rem[0] instanceof scopeAst)) {
        r += " '"+rem[0]+"'";
    } else for( i in rem ) {
        if( rem[i] instanceof scopeAst ) {
            r += "\n" + rem[i].get(indent+1);
        } else {
            r += "\n" + indentString(indent+1);
            r += "'"+rem[i]+"'";
        }
    }
    return r + /*"\n" + indentString(indent) +*/ ")";
}

module.exports = scopeAst;
