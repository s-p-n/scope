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
return 8 + 120 * 2 / $factorial((5));