(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";

class Scope {
  constructor(context) {
    const self = this;
    this._scoping = {
      let: new Map(),
      private: new Map(),
      protected: new Map(),
      public: new Map(),
      parent: null
    };
    let h = require("hyperscript");
    this.xmlExpression = (tag, attr, ...children) => {
      let node;
      function processStyle(m) {
        let style = "";
        for (let [selector, body] of m) {
          //console.log(selector);
          style += `${selector}{`;
          for (let [name, value] of body) {
            if (value instanceof Map) {
              style += `}${selector}${processStyle(new Map([[name, value]]))}${selector}{`;
            } else {
              style += `${name}:${value};`;
            }
          }
          style += '}';
        }
        return style;
      }
      if (tag === "style" && children[0] instanceof Map) {
        node = h(tag, [processStyle(children[0])]);
        node.__defineGetter__('textContent', function () {
          return this.childNodes[0].value;
        });
        node.__defineGetter__('innerHTML', function () {
          return this.textContent;
        });
        node.__defineGetter__('outerHTML', function () {
          return `<style>${this.innerHTML}</style>`;
        });
      } else {
        node = h(tag, ...children);
      }
      for (let a in attr) {
        let val = "";
        if (a === "style" && attr[a] instanceof Map) {
          for (let [name, value] of attr[a]) {
            val += `${name}:${value};`;
          }
        } else {
          val = attr[a];
        }
        if (typeof val === "function") {
          val = `scope.invokeExpression(scope.createScope(${val.toString()}), [this])`;
        }
        node.setAttribute(a, val);
      }
      node.toString = function () {
        if (node.tagName === "style") {
          return node.outerHTML.replace(/gt\;/, ">");
        }
        console.log(node);

        return node.outerHTML;
      };
      node.get = function (key) {
        if (typeof node[key] === "function") {
          console.log(node[key].toString());
          return node[key].bind(node);
        }
        return node[key];
      };
      node.childNodes.get = function (key) {
        if (typeof node.childNodes[key] === "function") {
          //return node.childNodes[key].bind(node);
        }
        return node.childNodes[key];
      };
      return node;
    };
  }

  arrayExpression(...items) {
    let arr = new Map();
    items.forEach((item, i) => {
      if (typeof item === "object" && item.key !== undefined && item.value !== undefined) {
        arr.set(item.key, item.value);
      } else {
        arr.set(i, item);
      }
    });
    return arr;
  }

  assignmentExpression(names, value, ctx = this._scoping) {
    const self = this;
    let name;
    if (names.length > 1) {
      return names[0].set(names[1], value);
    } else {
      name = names[names.length - 1];
    }
    if (ctx.let.has(name)) {
      return ctx.let.set(name, value);
    }
    if (ctx.private.has(name)) {
      return ctx.private.set(name, value);
    }
    if (ctx.protected.has(name)) {
      return ctx.protected.set(name, value);
    }
    if (ctx.public.has(name)) {
      return ctx.public.set(name, value);
    }
    if (ctx.parent) {
      return self.assignmentExpression([name], value, ctx.parent);
    }

    throw new Error(`Identifier '${name}' is not defined`);
  }

  declarationExpression({ type, name, value }) {
    const self = this;
    if (type === 'let') {
      if (self._scoping.let.has(name)) {
        throw new Error(`Identifier '${name}' has already been declared`);
      }
      self._scoping.let.set(name, value);
      return value;
    }
    if (type === 'private') {
      if (self._scoping.private.has(name)) {
        throw new Error(`Identifier '${name}' has already been declared`);
      }
      self._scoping.private.set(name, value);
      return value;
    }
    if (type === 'protected') {
      if (self._scoping.protected.has(name)) {
        throw new Error(`Identifier '${name}' has already been declared`);
      }
      self._scoping.protected.set(name, value);
      return value;
    }
    if (type === 'public') {
      if (self._scoping.public.has(name)) {
        throw new Error(`Identifier '${name}' has already been declared`);
      }
      self._scoping.public.set(name, value);
      return value;
    }
    throw new Error("A problem occurred - unknown declaration type.");
  }

  identifier(name, ctx = this._scoping) {
    const self = this;
    if (ctx.let.has(name)) {
      return ctx.let.get(name);
    }
    if (ctx.private.has(name)) {
      return ctx.private.get(name);
    }
    if (ctx.protected.has(name)) {
      return ctx.protected.get(name);
    }
    if (ctx.public.has(name)) {
      return ctx.public.get(name);
    }
    if (ctx.parent) {
      return self.identifier(name, ctx.parent);
    }

    throw new Error(`Identifier '${name}' is not defined`);
  }

  createScope(f) {
    f._isScope = true;
    f._parent = this._scoping;
    return f;
  }

  invokeExpression(f, args, extension = false) {
    if (!f._isScope) {
      return f.apply(args);
    }
    let scoping = this._scoping;
    if (f === undefined) {
      throw new Error(`Call to undefined scope`);
    }
    this._scoping = {
      parent: f._parent,
      let: new Map(),
      private: new Map(),
      protected: new Map(),
      public: new Map()
    };
    if (extension instanceof Map) {
      if (extension.has("protected")) {
        for (let [key, val] of extension.get("protected")) {
          this._scoping.protected.set(key, val);
        }
      }
      if (extension.has("public")) {
        for (let [key, val] of extension.get("public")) {
          this._scoping.public.set(key, val);
        }
      }
    }
    let result = f(args);
    if (result === undefined) {
      if (extension === true) {
        result = new Map([["public", this._scoping.public], ["protected", this._scoping.protected]]);
      } else {
        result = this._scoping.public;
      }
    }
    this._scoping = scoping;
    return result;
  }

  import(filename) {
    const filePath = require.resolve(filename);
    delete require.cache[filePath];
    return require(filePath);
  }

  use(usable, useOnly) {
    let self = this;
    usable.forEach(sc => {
      if (typeof sc !== "function") {
        throw new Error("Attempt to use non-scope");
      }
      //console.log(sc);
      let temp = self.invokeExpression(sc, [], true);
      //console.log(temp);
      for (let [key, val] of temp.get("protected")) {
        if (useOnly === undefined || useOnly.indexOf(key) !== -1) {
          //console.log(key, val);
          self._scoping.protected.set(key, val);
        }
      }
      for (let [key, val] of temp.get("public")) {
        if (useOnly === undefined || useOnly.indexOf(key) !== -1) {
          //console.log(key, val);
          self._scoping.public.set(key, val);
        }
      }
    });
  }
}

module.exports = new Scope({});
},{"hyperscript":6}],3:[function(require,module,exports){
"use strict";

module.exports = scope => {
  const ScopeApi = {
    "print": value => {
      console.log(...value);
    },

    "debug": value => {
      value.forEach(val => {
        ScopeApi.print([ScopeApi.__debugReturn(val)]);
      });
    },

    "__debugReturn": (value, spaces = 2) => {
      let result = "";
      let spacef = () => {
        let r = '';
        for (let i = 0; i < spaces; i += 1) {
          r += ' ';
        }
        return r;
      };
      if (typeof value === "object" && value instanceof Map) {
        result += "Map(";
        for (let [key, val] of value) {
          result += `\n${spacef()}${key} => ${ScopeApi.__debugReturn(val, spaces + 2)}`;
        }
        return `${result})`;
      } else if (typeof value === "function") {
        let source = value.toString();
        let args = source.match(/^\(args\=(\[.*\])\)/);
        if (args[1]) {
          args = eval(args[1]);
        } else {
          args = [];
        }
        //console.log('args:', args);
        result += "Scope([";
        args.forEach(arg => {
          result += `\n${spacef()}(${typeof arg.value}) ${arg.key}: ${ScopeApi.__debugReturn(arg.value, spaces + 2)}`;
        });
        return `${result}])`;
      } else if (typeof value === "string") {
        return `"${value}"`;
      } else {
        return value;
      }
    },

    "if": ([condition, ifTrueScope = () => {}, ifFalseScope = () => {}]) => {
      if (condition) {
        return scope.invokeExpression(ifTrueScope, []);
      }
      return scope.invokeExpression(ifFalseScope, []);
    },

    "each": ([array, block = () => {}]) => {
      let result = new Map();
      for (let [key, val] of array) {
        result.set(key, scope.invokeExpression(block, [val, key]));
      }
      return result;
    }
  };
  return ScopeApi;
};
},{}],4:[function(require,module,exports){
/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = (function split(undef) {

  var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef,
    // NPCG: nonparticipating capturing group
    self;

  self = function(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
      (separator.sticky ? "y" : ""),
      // Firefox 3+
      lastLastIndex = 0,
      // Make `global` and avoid `lastIndex` issues by working with a copy
      separator = new RegExp(separator.source, flags + "g"),
      separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
})();

},{}],5:[function(require,module,exports){
// contains, add, remove, toggle
var indexof = require('indexof')

module.exports = ClassList

function ClassList(elem) {
    var cl = elem.classList

    if (cl) {
        return cl
    }

    var classList = {
        add: add
        , remove: remove
        , contains: contains
        , toggle: toggle
        , toString: $toString
        , length: 0
        , item: item
    }

    return classList

    function add(token) {
        var list = getTokens()
        if (indexof(list, token) > -1) {
            return
        }
        list.push(token)
        setTokens(list)
    }

    function remove(token) {
        var list = getTokens()
            , index = indexof(list, token)

        if (index === -1) {
            return
        }

        list.splice(index, 1)
        setTokens(list)
    }

    function contains(token) {
        return indexof(getTokens(), token) > -1
    }

    function toggle(token) {
        if (contains(token)) {
            remove(token)
            return false
        } else {
            add(token)
            return true
        }
    }

    function $toString() {
        return elem.className
    }

    function item(index) {
        var tokens = getTokens()
        return tokens[index] || null
    }

    function getTokens() {
        var className = elem.className

        return filter(className.split(" "), isTruthy)
    }

    function setTokens(list) {
        var length = list.length

        elem.className = list.join(" ")
        classList.length = length

        for (var i = 0; i < list.length; i++) {
            classList[i] = list[i]
        }

        delete list[length]
    }
}

function filter (arr, fn) {
    var ret = []
    for (var i = 0; i < arr.length; i++) {
        if (fn(arr[i])) ret.push(arr[i])
    }
    return ret
}

function isTruthy(value) {
    return !!value
}

},{"indexof":7}],6:[function(require,module,exports){
var split = require('browser-split')
var ClassList = require('class-list')

var w = typeof window === 'undefined' ? require('html-element') : window
var document = w.document
var Text = w.Text

function context () {

  var cleanupFuncs = []

  function h() {
    var args = [].slice.call(arguments), e = null
    function item (l) {
      var r
      function parseClass (string) {
        // Our minimal parser doesn’t understand escaping CSS special
        // characters like `#`. Don’t use them. More reading:
        // https://mathiasbynens.be/notes/css-escapes .

        var m = split(string, /([\.#]?[^\s#.]+)/)
        if(/^\.|#/.test(m[1]))
          e = document.createElement('div')
        forEach(m, function (v) {
          var s = v.substring(1,v.length)
          if(!v) return
          if(!e)
            e = document.createElement(v)
          else if (v[0] === '.')
            ClassList(e).add(s)
          else if (v[0] === '#')
            e.setAttribute('id', s)
        })
      }

      if(l == null)
        ;
      else if('string' === typeof l) {
        if(!e)
          parseClass(l)
        else
          e.appendChild(r = document.createTextNode(l))
      }
      else if('number' === typeof l
        || 'boolean' === typeof l
        || l instanceof Date
        || l instanceof RegExp ) {
          e.appendChild(r = document.createTextNode(l.toString()))
      }
      //there might be a better way to handle this...
      else if (isArray(l))
        forEach(l, item)
      else if(isNode(l))
        e.appendChild(r = l)
      else if(l instanceof Text)
        e.appendChild(r = l)
      else if ('object' === typeof l) {
        for (var k in l) {
          if('function' === typeof l[k]) {
            if(/^on\w+/.test(k)) {
              (function (k, l) { // capture k, l in the closure
                if (e.addEventListener){
                  e.addEventListener(k.substring(2), l[k], false)
                  cleanupFuncs.push(function(){
                    e.removeEventListener(k.substring(2), l[k], false)
                  })
                }else{
                  e.attachEvent(k, l[k])
                  cleanupFuncs.push(function(){
                    e.detachEvent(k, l[k])
                  })
                }
              })(k, l)
            } else {
              // observable
              e[k] = l[k]()
              cleanupFuncs.push(l[k](function (v) {
                e[k] = v
              }))
            }
          }
          else if(k === 'style') {
            if('string' === typeof l[k]) {
              e.style.cssText = l[k]
            }else{
              for (var s in l[k]) (function(s, v) {
                if('function' === typeof v) {
                  // observable
                  e.style.setProperty(s, v())
                  cleanupFuncs.push(v(function (val) {
                    e.style.setProperty(s, val)
                  }))
                } else
                  var match = l[k][s].match(/(.*)\W+!important\W*$/);
                  if (match) {
                    e.style.setProperty(s, match[1], 'important')
                  } else {
                    e.style.setProperty(s, l[k][s])
                  }
              })(s, l[k][s])
            }
          } else if(k === 'attrs') {
            for (var v in l[k]) {
              e.setAttribute(v, l[k][v])
            }
          }
          else if (k.substr(0, 5) === "data-") {
            e.setAttribute(k, l[k])
          } else {
            e[k] = l[k]
          }
        }
      } else if ('function' === typeof l) {
        //assume it's an observable!
        var v = l()
        e.appendChild(r = isNode(v) ? v : document.createTextNode(v))

        cleanupFuncs.push(l(function (v) {
          if(isNode(v) && r.parentElement)
            r.parentElement.replaceChild(v, r), r = v
          else
            r.textContent = v
        }))
      }

      return r
    }
    while(args.length)
      item(args.shift())

    return e
  }

  h.cleanup = function () {
    for (var i = 0; i < cleanupFuncs.length; i++){
      cleanupFuncs[i]()
    }
    cleanupFuncs.length = 0
  }

  return h
}

var h = module.exports = context()
h.context = context

function isNode (el) {
  return el && el.nodeName && el.nodeType
}

function forEach (arr, fn) {
  if (arr.forEach) return arr.forEach(fn)
  for (var i = 0; i < arr.length; i++) fn(arr[i], i)
}

function isArray (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]'
}



},{"browser-split":4,"class-list":5,"html-element":1}],7:[function(require,module,exports){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
},{}],8:[function(require,module,exports){
if (!window.ServedOnce) {
	(function () {
		window.ServedOnce = true;
		window.scope = require('../../../lib/scopeRuntime.js');
		window.ScopeApi = require('../../../lib/scopeRuntimeApi.js')(scope);
		window.socket = io.connect();

		scope.declarationExpression({
			type: "let", 
			name: "socket", 
			value: new Map([
				["on", (args) => {
					return socket.on(args[0], args[1])
				}],
				["emit", (args) => {
					return socket.emit(args[0], args[1])
				}]
			])
		});

		//socket.on("connect", function () {
		//});

		$('[bind-in]').each(function () {
			var binder = $(this).attr('bind-in').split(':');
			var event = binder[0];
			var id = binder[1];
			$(this).on(event, function (e) {
				socket.emit(id, $(this).val());
			});
		});

		$('[bind-out]').each(function () {
			var channel = $(this).attr('bind-out');
			var el = $(this);
			socket.on(channel, function (data) {
				el.html(data);
			});
		});
	}());
}
},{"../../../lib/scopeRuntime.js":2,"../../../lib/scopeRuntimeApi.js":3}]},{},[8]);
