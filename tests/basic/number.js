#!/usr/bin/env node
var $factorial = function $factorial(n) {
    var i, result = n;
    if (n < 0) {
        for (i = -1; i > n; i -= 1) {
            result *= i;
        }
    } else if (n > 0) {
        for (i = 1; i < n; i += 1) {
            result *= i;
        }
    }
    return result;
}; /* Begin ControlCode: 0 */
return {
    type: 'Number',
    valueOf: function() {
        return 8
    }
} + {
    type: 'Number',
    valueOf: function() {
        return 120
    }
} * {
    type: 'Number',
    valueOf: function() {
        return 2
    }
}
/ $factorial(({type: 'Number', valueOf: function () {return 5}}));