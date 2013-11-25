var Text = {
	$types: ["Scope", "Instance"],
	$values: {
		"Scope": function () {
			return function Text (primitive, fromType) {
				var result = null, res = "";
				if (fromType !== void 0) {
					fromType = fromType.$values["Text"]();
					if (primitive.$values.hasOwnProperty(fromType)) {
						res = primitive.$values[fromType]().toString();
						result = function () { return res; }; 
					}
				} else if (primitive.$values.hasOwnProperty("Text")) {
					result = primitive.$values["Text"];
				} else if(primitive.$types.length === 1) {
					res = Console.$values['Instance']().printValues.$values["Scope"]()(primitive);
                    if (res.Number !== void 0) {
                        res = "" + res.Number;
                    }
					result = function () { return res; };
				}
				if (result === null) {
					throw "Error! Multi-Type Primitive (without a text-type and no specified type for" +
						"Text(Any:Primitive [, Text:fromType])), cannot be converted to Text.";
				}
				return $primitive("Text", result);
			}
		},
		"Instance": function () {
			return {
				"split": {
					$types: ["Scope"],
					$values: {
						"Scope": function() {
                            var findNext = function (unit, sep) {
                                var match = unit.match(sep);
                                return match !== null ? match.index : -1;
                            }
                            var f = function (val) {
                            	return function () {
                            		return val;
                            	}
                            }
                            return function split(txt, sep, maxSplit) {
                                var hasMax = false;
                                var result = [];
                                var i;
                                txt = txt.$values["Text"]();
                                return $primitive("Text", f(txt.split(sep, maxSplit)));
                                /*
                                if (typeof sep === "undefined") {
                                    sep = /\s+/;
                                } else {
                                    sep = sep.$values["Text"]();
                                }

                                if (typeof maxSplit === "undefined") {
                                    hasMax = true
                                }
                                for (i = findNext(txt, sep); i !== -1; i = findNext(txt, sep)) {
                                    result.push($primitive("Text", f(txt.substr(0, i))));
                                    txt = txt.substr(i + 1);
                                }
                                result.push($primitive("Text", f(txt)));
                                return {
                                    $types: ["Array"],
                                    $values: {
                                        "Array": function() {
                                            return result;
                                        }
                                    }
                                };
                                */

                            }
                        }
                    }
				},
                "rsplit": {
                    $types: ["Scope"],
                    $values: {
                        "Scope": function() {
                            var findNext = function (unit, sep) {
                                var match = unit.match(sep);
                                return match !== null ? match.index : -1;
                            }
                            var f = function (val) {
                                return function () {
                                    return val;
                                }
                            }
                            String.prototype.rsplit = function(sep, maxsplit) {
                                var split = this.split(sep);
                                return maxsplit ? [ split.slice(0, -maxsplit).join(sep) ].concat(split.slice(-maxsplit)) : split;
                            };
                            return function rsplit(txt, sep, maxSplit) {
                                var maxSplit = maxSplit || 0;
                                var result = [];
                                var i;
                                var txt = txt.$values["Text"]().rsplit(sep.$values["Text"](), maxSplit.$values["Number"]());
                                for (i = 0; i < txt.length; i += 1) {
                                    txt[i] = $primitive("Text", f(txt[i]));
                                }
                                return $array(txt);
                            }
                        }
                    }
                }
			}
		}
	}
};
