var $array = (function () {
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
    return function $array (arr) {
        var n, i;
        if (arr instanceof Array) {
            return $primitive("Array", function () {
                return arr;
            });
        }
        n = assocArray();
        for (i in arr) {
            n[i] = arr[i];
            n.length += 1;
        }
        return $primitive("Array", function () {
            return n;
        });
    }
}());
