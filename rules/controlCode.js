module.exports = function controlCode (controlCode, stmt) {
    if (controlCode === void 0) {
        this.parentId += 1;
        /*
        var foo = 'function self(o,e,f){' +
        '   return void 0===f ?' +
        '       selfProps[o] || (' +
        '           ' +
        this.error('e', 'runtime', 'reference', 'o') +
        '   ) :' +
        '   ('+
        '       selfProps.access[e]=o,'+
        '       selfProps[e]=f,'+
        '       f'+
        '   )'+
        '};' +
        'var selfProps={access:{parent: "private"},parent:' + (this.curParent > -1 ? ("$$$parent" + this.curParent) : "null") + '};' +
        'var $$$parent' + this.parentId + '=selfProps;';
        //console.log("controlCode:", foo);
        */
        var foo = this.loadTemplate('controlCode_begin', {
            error: this.error('name', 'runtime', 'reference', 'access'),
            id: this.parentId,
            value: (this.curParent > -1 ? 
                "$$$parent" + this.curParent :
                "null"
            )
        });
        return foo;
    }

    return this.loadTemplate('controlCode', {
        controlCode: controlCode,
        statement: stmt
})};
