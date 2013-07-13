module.exports = function selectorExpression (expr) {
    var ret,i,build_list = '', var_ret = '', that = this, operator = '>';
    var context = (this.prevContext[this.contextDepth-1] || this.prevContext[this.contextDepth-6]);
    var goodContext = function goodContext (cxt) {
        var ret = (cxt instanceof Array) && (cxt[0] === 'identifier' || cxt[0] === 'selectorIdentifier' || cxt[0] ==='arrayStatement' || cxt[0] === 'selectorStatement');
        //console.log(that.contextDepth, "is", (cxt && cxt[0]), "good context?", ret);
        return ret;
    };

    var buildLoop = function buildLoop (operator, condition) {
        switch (operator) {
            case '>':
                return that.loadTemplate('selectorExpression_buildLoop_firstChild', {
                    condition: condition,
                    buildList: build_list,
                    returnRet: return_ret,
                    context: context
                });
            case '^':
                return that.loadTemplate('selectorExpression_buildLoop_allChild', {
                    condition: condition,
                    buildList: build_list,
                    returnRet: return_ret,
                    context: context
                });
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
    var_ret = that.loadTemplate('selectorExpression_varRet');
    build_list = that.loadTemplate('selectorExpression_buildList');
    return_ret = 'return $$$array(ret)';
    if (expr[0] === '/') {
        return that.loadTemplate('selectorExpression_regex', {
            varRet: var_ret,
            regExp: (
                // Generate RegExp which must match from beginning to end:
                new RegExp(
                    '^' +
                        expr.substr(1,
                            expr.lastIndexOf('/') - 1
                        ).replace(/\\/gm, '\\\\') +
                        '$',
                    // RegExp Modifiers:
                    expr.substr(expr.lastIndexOf('/') + 1)
            )),
            buildLoop: buildLoop(operator, 'regexp.test(i)')
        });
    }
    if (expr[0] === '"' || expr[0] === "'") {
        switch (operator) {
            case ',':
                return that.loadTemplate('selectorExpression_text_comma', {
                    context: context
                });
        }
        return that.loadTemplate('selectorExpression_text', {
            context: context,
            expr: expr
        });
    }
    // must be scope-code.
    return that.loadTemplate('selectorExpression_code', {
        varRet: var_ret,
        buildLoop: buildLoop(operator, expr)
    });
}
