var List = {};
List.$types = ["Scope", "Instance"];
List.$values = {
    "Scope": function () {
        return function (num) {
            var arr = Array(num.$values["Number"]());
            var i = 0;
            for (i; i < arr.length; i += 1) {
                arr[i] = $primitive("Number", function (val) {
                    return function () {
                        return val;
                    };
                }(i));
            }
            return $array(arr);
        }
    },
    "Instance": function () {
        return {
            "random": {
                $types: ["Scope"],
                $values: {
                    "Scope": function() {
                        return function (arr) {
                            arr = arr.$values["Array"]();
                            return arr[Math.floor(Math.random() * arr.length)];
                        }
                    }
                }
            },
            "length": {
                $types: ["Scope"],
                $values: {
                    "Scope": function () {
                        return function (arr) {
                            return $primitive("Number", function () {
                                return arr.$values["Array"]().length;
                            });
                        }
                    }
                }
            }
        }
    }
};
