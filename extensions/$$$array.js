if (typeof Object.create === 'undefined') {
    Object.create = function (o) {
        function F() {};
        F.prototype = 0;
        return new F();
    }
}

var $$$array = (function () {
    var assocArray = function () {
        var obj = {};
        Object.defineProperty(obj, 'length', {
            enumerable: false,
            value: 0,
            configurable: false,
            writable: true
        });
        return obj;
    };
    return function $$$array (arr) {
        var n, i;
        if (arr instanceof Array) {
            return arr;
        }
        n = assocArray();
        for (i in arr) {
            n[i] = arr[i];
            n.length += 1;
        }
        return n;
    }
}());
