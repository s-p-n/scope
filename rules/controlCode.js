module.exports = function controlCode (controlCode, stmt) {
    if (controlCode === void 0) {
        this.parentId += 1;

        return 'function self(o,e,f){' +
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
    }

    return controlCode + stmt + ';';
}
