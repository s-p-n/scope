module.exports = function forBegin (name, list, val) {
    if (val !== void 0) {
        return "(function () {var " + name + ", " + val + ", $$$list = " + list + "; for (" + name + " in $$$list){if ($$$list.hasOwnProperty(" + name + ")) { " + val + " = $$$list[" + name + "]; (function () {";
    }
    return "(function () {var " + name + ", $$$list = " + list + "; for (" + name + " in $$$list){if ($$$list.hasOwnProperty(" + name + ")) {(function () {";
}
