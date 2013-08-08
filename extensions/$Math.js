var $Math = {
    add: function add (a, b) {
        return $primitive("Number", function (val) {
            return function () {
                return val;
            }
        }(a.$values["Number"]() + b.$values["Number"]()));
    },
    subtract: function subtract (a, b) {
        return $primitive("Number", function (val) {
            return function () {
                return val;
            }
        }(a.$values["Number"]() - b.$values["Number"]()));
    },
    multiply: function multiply (a, b) {
        return $primitive("Number", function (val) {
            return function () {
                return val;
            }
        }(a.$values["Number"]() * b.$values["Number"]()));
    },
    divide: function divide (a, b) {
        return $primitive("Number", function (val) {
            return function () {
                return val;
            }
        }(a.$values["Number"]() / b.$values["Number"]()));
    },
    modulus: function divide (a, b) {
        return $primitive("Number", function (val) {
            return function () {
                return val;
            }
        }(a.$values["Number"]() % b.$values["Number"]()));
    }
};
