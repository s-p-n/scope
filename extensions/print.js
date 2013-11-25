var print = {
    $types: ["Scope"],
    $values: {
        "Scope": function () {
            return function print () {
                var result = "";
                var i = 0;
                do {
                    result += Text.$values["Scope"]()(arguments[i]).$values["Text"]();
                } while (((i += 1) in arguments) && (result += " "));
                console.log(result);
            }
        }
    }
};
