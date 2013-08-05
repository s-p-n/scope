var $Math = {
    add: function add (a, b) {
        return $primitive("Number", function (val) {
            return function () {
                return val;
            }
        }(a.value() + b.value()));
    }
};
