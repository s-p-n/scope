module.exports = function selectorExpression (expr) {
    var ret,i,build_list = '', var_ret = '', that = this, operator = '>';
    var context = (this.prevContext[this.contextDepth-1] || this.prevContext[this.contextDepth-6]);
    var goodContext = function goodContext (cxt) {
        var ret = (cxt instanceof Array) && (cxt[0] === 'identifier' || cxt[0] === 'selectorIdentifier' || cxt[0] ==='arrayStatement' || cxt[0] === 'selectorStatement');
        //console.log(that.contextDepth, "is", (cxt && cxt[0]), "good context?", ret);
        return ret;
    };

    var buildLoop = function buildLoop (operator, condition) {
        var loop = 'for (i in $$) {if($$.hasOwnProperty(i) && '+condition+') {'+build_list+'}';

        //console.log("Operator in buildLoop:", operator);

        switch (operator) {
            case '>':
                return loop + '};' + return_ret+';}('+context+'))';
            case '^':
                return 'function loop ($$) {var i;'+loop+' else if(typeof $$[i] === "object"){loop($$[i])}}};loop($$);' + return_ret+';}('+context+'))';
            case ',':
                //console.log("Case is comma");
                return '';
        }
    };
    //console.log("Simples:", this.simple);
    if (this.simple[this.contextDepth-1] === '^') {
        //console.log("\033[33m ~~~~~ FOUND ^ ~~~~~\033[0m");
        operator = '^';
    } else if(this.simple[this.contextDepth-1] === ',') {
        //console.log("\033[33m ~~~~~ FOUND , ~~~~~\033[0m");
        operator = ',';
    }

    //console.log('original context:', context, goodContext(context));
    if (!goodContext(context)) {
        if (this.contextDepth < this.prevContext.length) {
            i = this.contextDepth;
        } else {
            i = this.prevContext.length;
        }
        for (;i > 0;i-=1) {
            if (!goodContext(this.prevContext[i])) {
                continue;
            }
            context = this.prevContext[i];
            break;
        }
        if (!(context instanceof Array)) {
            context = [null, ''];
        }
    }
    //console.log("Context:", this.contextDepth-1, context, this.prevContext);
    context = context[1];
    if (expr === '*') {
        return context;
        //return ''
    }
    var_ret = 'var ret = (($$ instanceof Array) ? [] : {})';
    build_list = 'if($$ instanceof Array) { ret.push($$[i]); } else { ret[i] = $$[i]; }';
    return_ret = 'return $$$array(ret)';
    if (expr[0] === '/') {
        var modifiers = expr.substr(expr.lastIndexOf('/') + 1);

        ret = '(function ($$) {'+var_ret+',i, regexp = ' + (new RegExp('^' + expr.substr(1, expr.lastIndexOf('/') - 1).replace(/\\/gm, '\\\\') + '$', modifiers)) + ';';
        ret += buildLoop(operator, 'regexp.test(i)');
        return ret;
    }
    if (expr[0] === '"' || expr[0] === "'") {
        switch (operator) {
            case ',':
                return '(function ($$$context) {return ' + context + ';}('+context+'))'

        }
        return context + '[' + expr + ']';
    }
    // must be scope-code.

    ret = '(function ($$){'+var_ret+', i;' + buildLoop(operator, expr);
    return ret;
}
