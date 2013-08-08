var $concat = function $concat (a, b, line) {
    var type = Type.$values["Scope"](), 
        compatible = Compatible.$values["Scope"](),
        concatTestBoth = $primitive(["Text", "Array"], {
            "Text": function () {
                    return "";
                },
            "Array": function () {
                return [];
        }}),
        compatTestText = $primitive("Text", function () {
            return "";
        }),
        compatTestArray = $primitive("Array", function () {
            return [];
        }),
        concatFunc = function (value) {
            return function () {
                return value;
            }
        },
        txtConcat = function (a, b) {
            return a.$values["Text"]() + b.$values["Text"]();
        },
        arrConcat = function (a, b) {
            var result, 
                subResult,
                shortest, 
                i,
                type,
                len,
                f = function (val) {
                    return function () {
                        return val;
                    }
                };
            //console.log("a:");
            //Console.write.$values["Scope"]()(a);
            //console.log("b:");
            //Console.write.$values["Scope"]()(b);
            a = a.$values["Array"]();
            b = b.$values["Array"]();
            if (a.length > b.length) {
                result = a;
                shortest = b;
            } else {
                result = b;
                shortest = a;
            }
            if(a instanceof Array) {
                for (i = 0; i < b.length; i += 1) {
                    len = a.push({$types: Object.create(b[i].$types), $values: {}}) - 1;
                    for (type in b[i].$values) {
                        a[len].$values[type] = f(b[i].$values[type]());
                    }
                }
                result = a;
            } else {
                for (i in shortest) {
                    if(i !== "length" && shortest.hasOwnProperty(i)) {
                        result[i] = shortest[i];
                        result.length += 1;
            }}}
            return result;
        };
    
    if (compatible(a, b).$values["Boolean"]() ||
        compatible(b, a).$values["Boolean"]()
    ) {
        if (compatible(a, concatTestBoth).$values["Boolean"]()) {
            return $primitive(["Text", "Array"], {
                "Text": concatFunc(txtConcat(a, b)),
                "Array": concatFunc(arrConcat(a, b))
            });
        }
        if (compatible(compatTestText, a).$values["Boolean"]()) {
            return $primitive("Text", 
                concatFunc(txtConcat(a, b))
            );
        } else if (compatible(compatTestArray, a).$values["Boolean"]()) {
            return $primitive("Array", 
                concatFunc(arrConcat(a, b))
            );
        }
    }
    $runtimeError(line, 
        "Type Error:  Compatible Text, Array or Both expected, got: %what%", 
        a.$types + " and " + b.types
    );
};
