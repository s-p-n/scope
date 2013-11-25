/// < Shims
    Function.prototype.bind = (function(origBind) {
        return function bind () {
            var fn = origBind.apply(this.unbind(), arguments);
            fn.__origFn__ = this.__origFn__ || this;
            return fn;
    }}(Function.prototype.bind));
    Function.prototype.unbind = function unbind () {
        return this.__origFn__ || this;
    };
    if (typeof Object.create === 'undefined') {
        Object.create = function (o) {
            function F() {};
            F.prototype = o;
            return new F();
    }};
    Array.prototype.has = function (term) {
        var key, result = false;
        for (key in this) {
            if (!this.hasOwnProperty(key)) {
                continue;
            }
            if ($compare(this[key], term).$values["Boolean"]()) {
                result = true;
                break;
            }
        }
        return $primitive("Boolean", function () {
            return result;
        });
    }
/// > Shims
function $self (access, name, value) {
    var line;
    if (typeof name === "number") {
        line = name;
        name = void 0;
    }
    if (name === void 0) {
        name = access;
        if (typeof this[name] !== "undefined") {
            return this[name];
        } else if (typeof this.$property[name] !== "undefined") {
            return this.$property[name];
        }
        var parent = this;
        while (parent !== null) {
            if (typeof parent[name] !== "undefined") {
                return parent[name];
            }
            parent = parent.$parent.$values["Instance"]();
        }
        throw "Undefined variable/property: " + name + " on line: " + line;
    }
    if (value === void 0) {
        value = name;
        name = access;
        if (typeof this[name] !== "undefined") {
            return this[name] = value;
        } else if (typeof this.$property[name] !== "undefined") {
            return this.$property[name] = value;
        }
    }
    if (access === "var") {
        return this[name] = value;
    }
    this.$access[name] = access;
    return this.$property[name] = value;
};
function $arg (name, $default, value) {
    if (value === void 0) {
        value = $default;
    }
    return this.$self("protected", name, value);
};
function $primitive (types, val) {
    var obj = {$values: {}};
    var i;
    if (typeof val === "object" && val.$types !== void 0) {
        return val;
    }
    if (types instanceof Array) {
        obj.$types = types;
    } else {
        obj.$types = [types];
    }

    if (typeof val === "object") {
        obj.$values = val;
    } else {
        obj.$values[obj.$types[0]] = val;
    }
    return obj;
}
function $newParent (parent) {
    var newParent = $primitive("Instance", function () {
        return parent;
    });
    var result = {
        $access: {},
        $property: {
            $public: {},
            $protected: {},
            $private: {}
        },
        $parent: newParent
    };
    result.$self = $self.bind(result);
    result.$arg = $arg.bind(result);
    return result;
};
function $enforceType (type, term, line) {
    if (Type(term).indexOf(type) !== -1) {
        return term;
    }
    $runtimeError(line, "Expected " + type + " and got %what%.");
};
var $root = $newParent(null);
var $i;
for ($i in $root) {
    this[$i] = $root[$i];
}

var $compare = function () {
  var equals = function(a, b) {
    var p;
    if (typeof a.$types !== "undefined") {
      //console.log("equals is a scope primitive:", a, b);
      return $compare(a, b).$values["Boolean"]();
    }
    //console.log("equals is a JS primitive:", a, b);
    if (typeof a !== "object") {
      return a === b;
    }
    for(p in a) {
      if(typeof(b[p])=='undefined') {return false;}
      if (a[p]) {
        switch(typeof(a[p])) {
          case 'object':
            if (!equals(a[p], b[p])) {
              return false;
            }
            break;
          case 'function':
            if (typeof(b[p])=='undefined' ||
              (p != 'equals' && (a[p].toString() != b[p].toString() ||
                a[p].unbind().toString() != b[p].unbind().toString()
              )
              )) {
              return false;
            }
            //console.log("func:", a[p].unbind().toString() != b[p].unbind().toString())
            break;
          default:
            if (a[p] !== b[p]) {
              return false;
            }
      }} else if (b[p]) {
        return false;
    }}
    for(p in b) {
      if(typeof(a[p])=='undefined') {
        return false;
    }}
    return true;
  };
  return function $compare (a, b) {
    var i, j, c, result = true;
    if (a.$types.length > b.$types.length) {
      c = a;
      a = b;
      b = a;
    }
    //console.log("$compare:")
    //Console.$values["Instance"]().write.$values["Scope"]()(a);
    //Console.$values["Instance"]().write.$values["Scope"]()(b);
    for (i = 0; i < a.$types.length; i += 1) {
      if (b.$types.indexOf(a.$types[i]) > -1 &&
          equals(a.$values[a.$types[i]](), b.$values[a.$types[i]]())
        ) {
        //console.log("Got true");
        continue;
      }
      //console.log("Got false");
      result = false;
      break;
    }
    //console.log("Returning", result);


    return $primitive("Boolean", function (val) {
      return function () {
        return val;
    }}(result)
)}}();
