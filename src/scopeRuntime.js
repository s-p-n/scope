if (typeof window !== "undefined") {
  if (typeof global === "undefined") {
    window["global"] = window;
  }
}

function hasType(id, type="") {
  if (typeof id === "undefined") {
    return false;
  }
  function spotError (i) {
    let dashes = "";
    let str = 'hasType(.., "';
    let start = 0;
    let end = type.length;
    let charIndex = i + 12;
    if (i > 10) {
      start = i - 10;
      str += "..";
      charIndex += 2 - start;
    }
    if ((i + 5) < type.length) {
      end = i + 5;
      str += type.substr(start, end) + '..")';
    } else {
      str += type.substr(start, end) + '")';
    }
    for (let i = 0; i < charIndex; i += 1) {
      dashes += "-";
    }
    dashes += "^";
      return `
      ${str}
      ${dashes}`;
  }
  let types = [];
  types.parent = null;
  let word = "";
  let space = /\s/;
  for (let i = 0; i < type.length; i += 1) {
    let char = type[i];
    if(space.test(char)) {
      continue;
    }
    switch (char) {
      case "&":
        types.push(word);
        types.push("and");
        word = "";
        break;
      case "|":
        types.push(word);
        types.push("or");
        word = "";
        break;
      case "(":
        let child = [];
        if (word.length > 0) {
          console.log("Word before starting Paren at char:", i, "\nSolution: Use | or & before this group.");
          console.log(spotError(i));
          process.exit();
        }
        child.parent = types;
        types.push(child);
        types = child;
        break;
      case ")":
        if (types.parent === null) {
          console.log("Extra Closing Paren at char:", i);
          console.log(spotError(i));
          process.exit();
        }
        if (word.length > 0) {
          types.push(word);
          word = "";
        }
        types = types.parent;
        break;
      default:
        word += char;
    }
  }
  if (word.length > 0) {
    types.push(word);
  }
  function checkType (type = "") {
    if (id == null) {
      if (type === "null") {
        return true;
      }
      return false;
    }
    if (type instanceof Array) {
      return checkAllTypes(type);
    }
    if (type === "object") {
      return true;
    }
    if (type === "map") {
     return (id instanceof Map || id instanceof NumericMap);
    }
    if (type === "associative" || type === "numeric") {
      return (id.type === type);
    }
    if (type === "regex") {
      return (id instanceof XRegExp || id instanceof RegEXP);
    }
    if (type === "xregex") {
      return (id instanceof XRegExp);
    }
    if (type === "scope") {
      return (id._isScope === true);
    }
    if (type === "js") {
      return (
        id.type === undefined && 
        id._isScope === undefined &&
        !(id instanceof XRegExp)
      );
    }
    return (typeof id === type);
  }
  function checkAllTypes (types = []) {
    if (types.length === 1) {
      return checkType(type);
    }
    let state = false;
    let sign = "|";
    for (let i = 0; i < types.length; i += 1) {
      let type = types[i];
      if (type === "&" || type === "|") {
        sign = type;
        continue;
      }
      if (sign === "&") {
        if (state) {
          state = state && checkType(type);
          continue;
        }
        return false;
      }
      if (sign === "|") {
        state = state || checkType(type); 
      }
    }
    return state;
  }
  return checkAllTypes(types);
}

let randStr = (len=16) => {
  let result = "";
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < len; i += 1) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

let indexRange = (begin, end, size) => {
  if (typeof size !== "number") {
    return [0,0];
  }

  if (typeof begin !== "number") {
    begin = 0;
  }

  if (typeof end !== "number") {
    end = size;
  }

  if (begin < 0) {
    begin = size + begin;
    if (begin < 0) {
      begin = 0;
    }
  }
  
  if (end < 0) {
    end = size + end;
    if (end < 0) {
      end = 0;
    }
  }

  if (end > size) {
    end = size;
  }

  if (begin >= end) {
    return [0,0];
  }

  return [begin, end];
}
Object.defineProperty(Map.prototype, "slice", {
  value: function slice (begin=0, end=this.size) {
    let iterator = this.entries();
    let arr = [];

    if (begin < 0) {
      begin = this.size + begin;
      if (begin < 0) {
        begin = 0;
      }
    }
    
    if (end < 0) {
      end = this.size + end;
      if (end < 0) {
        end = 0;
      }
    }

    if (end > this.size) {
      end = this.size;
    }

    if (begin >= end) {
      return scope.mapExpression();
    }

    for (let i = 0; i < begin; i += 1) {
      iterator.next();
    }

    for (let i = begin; i < end; i += 1) {
      arr.push(iterator.next().value);
    }

    return scope.mapExpression(...arr);
  }
});

const createProxy = (function () {
  const priv = new WeakMap();
  const intRegexp = /^\-?\d+$/
  const mapProxyHandler = {
    get: function (target, prop, receiver) {
      const self = this;
      if (typeof prop === "string" && intRegexp.test(prop)) {
        prop = parseInt(prop);
        return target.get(prop);
      }
      if (prop === "toString") {
        if (priv.get(self).type === "associative") {
          return () => {
            let result = `map:${priv.get(self).type} {`;
            let first = true;
            for (let [key, val] of target) {
              if (!first) {
                result += ",";
              } else {
                first = false;
              }
              result += ` ${key} => ${val}`;
            }
            return result + " }";
          }
        } else {
          return target.toString;
        }
      }
      if (prop === "type") {
        return priv.get(self).type;
      }

      if (target.has(prop)) {
        return target.get(prop);
      }
      if (prop in target) {
        if (typeof target[prop] === "function") {
          return target[prop].bind(target);
        }
        return target[prop];
      }
      







      if (hasType(receiver, "numeric")) {
        if (prop in target.array) {
          console.log("found array operation:", prop);
          return target.array[prop];
        }
      }










      // Query each instance who has the prop with type: function
      // Return a function that returns an array with values
      // corresponding to the results of each instance calling
      // the prop method.
      let vals = target.entries();
      let valsWithFunc = [];
      for (let [key, val] of vals) {
        if (typeof val[prop] === "function") {
          valsWithFunc.push([key, val]);
        }
      }
      if (valsWithFunc.length === 0) {
        return undefined;
      }
      return function (...args) {
        if (priv.get(self).type === "numeric") {
          return scope.arrayExpression(...valsWithFunc.map(item => {
            return item[1][prop](...args);
          }));
        }
        return scope.mapExpression(...valsWithFunc.map(item => {
            return [item[0], item[1][prop](...args)];
        }));
      }
    },
    has: function (target, prop) {
      return target.has(prop);
    },
    set: function (target, prop, val) {
      const self = this;
      if (prop === "type") { //disallow setting 'type'
        return priv.get(this).type;
      }
      if (priv.get(self).type === "associative") {
        target[prop] = val;
      }
      return target.set(prop, val);
    }
  }
  function createProxy (obj, type) {
    let handle = Object.create(mapProxyHandler);
    priv.set(handle, Object.create(null));
    priv.get(handle).type = type;
    return new Proxy(obj, handle);
  }
  return createProxy;
}());

const NumericMap = (function () {
  const priv = new WeakMap();
  function nextEntry (iteratorData, self) {
    return function () {
      if (iteratorData.index < self.size) {
        iteratorData.result.value = [iteratorData.index, self.get(iteratorData.index ++)];
      } else {
        iteratorData.index = 0;
        return {done: true};
      }
      return iteratorData.result;
    }
  }

  function nextKey (iteratorData, self) {
    return function () {
      if (iteratorData.index < self.size) {
        iteratorData.result.value = iteratorData.index ++;
      } else {
        iteratorData.index = 0;
        return {done: true};
      }
      return iteratorData.result;
    }
  }

  function nextValue (iteratorData, self) {
    return function () {
      if (iteratorData.index < self.size) {
        iteratorData.result.value = self.get(iteratorData.index ++);
      } else {
        iteratorData.index = 0;
        return {done: true};
      }
      return iteratorData.result;
    }
  }
  class NumericMap {
    constructor (arr) {
      const self = this;
      const hidden = {
        array: [...arr]
      };
      priv.set(this, hidden)

      hidden.createKeyIterator = function createKeyIterator () {
        return hidden.createIterator(nextKey);
      }

      hidden.createValueIterator = function createValueIterator () {
        return hidden.createIterator(nextValue);
      }

      hidden.createEntryIterator = function createEntryIterator () {
        return hidden.createIterator(nextEntry);
      }

      hidden.createIterator = function createIterator (next) {
        return {
          next: next({
            index: 0,
            result: {
              value: undefined,
              done: false
            }
          }, self),
          [Symbol.iterator]: function () { return this; }
        };;
      };
    }

    toString () {
      let result = "[";
      for (let i = 0; i < this.size; i += 1) {
        if (i !== 0) {
          result += ", "
        }
        result += `${this.get(i)}`;
      }
      return result + "]";
    }

    get type () {
      return "numeric";
    }

    get array () {
      return priv.get(this).array;
    }

    set array (val) {
      if (val instanceof Array) {
        return priv.get(this).array = val;
      }
      return priv.get(this).array;
    }

    get (index) {
      if (this.size === 0) {
        return undefined;
      }
      // Allow reverse indexing like Python. foo[-1] === foo[foo.size - 1];
      if (index < 0) { // (-1 % 5) is -1
        index = (index % this.size) + this.size;
        if (index === this.size) {
          index = 0;
        }
      }
      return this.array[index];
    }

    set (index, value) {
      return this.array[index] = value;
    }

    push (...values) {
      return this.array.push(...values);
    }

    slice (begin = 0, end = this.size) {
      return scope.arrayExpression(...this.array.slice(begin, end));
    }

    delete (index) {
      if (this.has(index)) {
        this.array.splice(index, 1);
        return true;
      }
      return false;
    }

    clear () {
      this.size = 0;
    }

    entries () {
      return priv.get(this).createEntryIterator();
    }

    keys () {
      return priv.get(this).createKeyIterator();
    }

    values () {
      return priv.get(this).createValueIterator();
    }

    has (index) {
      if (typeof index === "number") {
        return index >= 0 && index < this.size;
      }
      return false;
    }

    forEach (callback, thisArg=this) {
      for (let [key, val] of this) {
        callback.call(thisArg, val, key, this);
      }
    }

    get size () {
      return this.array.length;
    }

    set size (value) {
      return this.array.length = value;
    }

    [Symbol.iterator] () {
      return priv.get(this).createEntryIterator();
    }
  }
  return NumericMap;
}());

class Scope {
  constructor(context) {
    const self = this;
    this._scoping = {
      let: this.mapExpression(),
      private: this.mapExpression(),
      protected: this.mapExpression(),
      public: this.mapExpression(),
      parent: null
    };
    this.userTags = this.mapExpression();
    let h = require("hyperscript");
    this.xmlExpression = (tag, attr, ...children) => {
      let node;
      if (tag !== "style" && tag !== "script") {
        let newChildren = [];
        for (let i = 0; i < children.length; i += 1) {
          let child = children[i];
          if (child instanceof NumericMap || child instanceof Map) {
            newChildren.push(...child.values());
          } else {
            newChildren.push(child);
          }
        }
        children = newChildren;
      }
      if (this.userTags.has(tag.toLowerCase())) {
        if (typeof window !== "undefined") {
          let attrMap = this.mapExpression();
          for (let name in attr) {
            attrMap[name] = attr[name];
          }
          let html = h(tag, attr, ...children);
          $(html).data("rawAttributes", attrMap);
          return html;
        }
      }
      let voidElements = [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr"
      ];
      function processStyle (m) {
        let style = "";
        for (let [selector, body] of m) {
          style += `${selector}{`;
          let index = 0;
          let terminated = false;
          for (let [name, value] of body) {
            if (value instanceof Map) {
              style += `}${processStyle(new Map([[selector + name, value]]))}`;
              if ((index + 1) < body.size) {
                style += `${selector}{`;
              } else {
                terminated = true;
              }
            } else {
              style += `${name}:${value};`;
            }
            index += 1;
          }
          if (!terminated) {
            style += '}';
          }
        }
        return style;
      }
      if (tag === "style" && children[0] instanceof Map) {
        node = h(tag, [processStyle(children[0])]);
      } else if(tag === "script") {
        node = h(tag, ...children);
      } else {
        node = h(tag, ...children);
      }
      if (tag === "style" || tag === "script") {
        node.__defineGetter__('textContent', function () {
          return this.childNodes[0].value;
        });
        node.__defineGetter__('innerHTML', function () {
          return this.textContent;
        });
        node.__defineGetter__('outerHTML', function () {
          return `<${tag}>${this.innerHTML}</${tag}>`;
        });
      }
      for (let a in attr) {
        let val = "";
        if (a === "style" && attr[a] instanceof Map) {
          for (let [name, value] of attr[a]) {
            val += `${name}:${value};`;
          }
        } else if (a === "pattern" && attr[a] instanceof RegExp) {
          let regExpStr = attr[a].toString();
          val = regExpStr.substr(1, regExpStr.lastIndexOf("/") - 1);
        } else {
          val = attr[a];
        }
        if (typeof val === "function") {
          let code = `scope.createScope(${val._originalFunction.toString()})`;
            val = `${code}(event)`;
        }
        node.setAttribute(a, val);
      }
      node.toString = function () {
        if (node.tagName === "style") {
          return node.outerHTML.replace(/gt\;/, ">");
        }
        
        return node.outerHTML;
      };
      node.get = function (key) {
        if (typeof node[key] === "function") {
          return node[key].bind(node);
        }
        return node[key];
      };
      node.childNodes.get = function (key) {
        if (typeof node.childNodes[key] === "function") {
          return node.childNodes[key].bind(node);
        }
        return node.childNodes[key];
      }
      return node;
    };
  }

  arrayExpression(...items) {
    return createProxy(new NumericMap(items), "numeric");
  }

  mapExpression(...items) {
    let m = new Map(items);
    for (let [key, val] of items) {
      m[key] = val;
    }
    return createProxy(m, "associative");
  }

  assignmentExpression(names, valParts, ctx=this._scoping) {
    const self = this;
    let name;
    let [op, value] = valParts;
    let id;
    if (names.length > 1) {
      if (names.length === 2) {
        [id, name] = names;
      } else if (names.length === 3) {
        id = names[0];
        let [begin, end] = indexRange(names[1], names[2], id.size);
        if (id instanceof NumericMap) {
          let values = self.arrayExpression();
          for (let i = begin; i < end; i += 1) {
            values.array.push(self.assignmentExpression([id, i], valParts, ctx));
          }
          return values;
        } else if (id instanceof Map) {
          let values = self.mapExpression();
          let keys = id.keys();
          for (let i = 0; i < begin; i += 1) {
            keys.next();
          }
          for (let i = begin; i < end; i += 1) {
            let key = keys.next().value;
            values.set(key, self.assignmentExpression([id, key], valParts, ctx));
          }
          return values;
        }
        throw new Error(`Unexpected Range Assignment \`[:]\` on non-map.`);
      }
    } else {
      name = names[names.length - 1];
    
      if (ctx.let.has(name)) {
        id = ctx.let;
      }
      if (ctx.private.has(name)) {
        id = ctx.private;
      }
      if (ctx.protected.has(name)) {
        id = ctx.protected;
      }
      if (ctx.public.has(name)) {
        id = ctx.public;
      }
    }
    if (id !== undefined) {
      switch(op) {
        case "=":
          if (id.set) {
            id.set(name, value);
            return id.get(name);
          } else {
            return id[name] = value;
          }
        case "+=":
          id.set(name, self.binaryExpression("+", id.get(name), value));
          return id.get(name);
        case "[]=":
          return self.binaryExpression("<&", id.get(name), value);
        case "*=":
          id.set(name, self.binaryExpression("*", id.get(name), value));
          return id.get(name);
        default:
          throw new Error(`Assignment Operator '${op}' is not implemented`);
      }
    }
    if (ctx.parent) {
      return self.assignmentExpression([name], valParts, ctx.parent);
    }
    throw new Error(`Identifier '${name}' is not defined`);
  }

  binaryExpression(op, a, b) {
    let self = this;
    switch (op) {
      case "&&":
        return a && b;
      case "||":
        return a || b;
      case "===":
        return a === b;
      case "!==":
        return a !== b;
      case ">":
        return a > b;
      case "<":
        return a < b;
      case ">=":
        return a >= b;
      case "<=":
        return a <= b;
      case "&>":
          console.log("&>:", a, b);
        if (hasType(b, "numeric")) {
          b.push(a);
          return b;
        } else if (hasType(b, "string")) {

        }
        throw new Error(`Attempt to push on incompatible type: '${a}' &> '${b}'`);
        break;
      case "<&":
        if (hasType(a, "numeric")) {
          a.push(b);
          return a;
        }
        throw new Error(`Attempt to push on incompatible type: '${a}' <& '${b}'`);
        break;
      case "+":
        if (hasType(a, "string|number") && hasType(b, "string|number")) {
          return a + b;
        } else if (hasType(a, "numeric")) {
          let newA = this.arrayExpression(...a.array);
          newA.push(b);
          return newA;
        }
        throw new Error(`Attempt to add incompatible types: '${a}' + '${b}'`);
      case "-":
        return a - b;
      case "*":
        if (typeof b !== "number") {
          b = 1;
        }
        if (typeof a === "number") {
          return a * b;
        } else if (typeof a === "string") {
          let result = "";
          for (let i = 0; i < b; i += 1) {
            result += a;
          }
          return result;
        } else if (a instanceof NumericMap) {
          let newA = scope.arrayExpression();
          for (let i = 0; i < b; i += 1) {
            for (let j = 0; j < a.size; j += 1) {
              newA.push(a[j]);
            }
          }
          return newA;
        }
        throw new Error(`Attempt to multiply incompatible types: '${a}' + '${b}'`);
      case "/":
        return a / b;
      case "^":
        return a ^ b;
      case "%":
        return a % b;
    }
  }

  declarationExpression({ type, name, value }) {
    const self = this;
    let ctx;

    if(name instanceof Array) {
      if (value !== null && typeof value[Symbol.iterator] === 'function') {
        let result = [];
        for (let i = 0; i < name.length; i += 1) {
          let val;
          if (value.length <= i) {
            val = undefined;
          } else {
            val = value[i];
          }
          result.push(self.declarationExpression({type: type, name: name[i], value: val}));
        }
        return self.arrayExpression(...result);
      } else {
        throw new Error("Attempt to iterate over non-iterable during declaration");
      }
    }

    if (type === 'let') {
      if (self._scoping.let.has(name)) {
        throw new Error(`Identifier '${name}' has already been declared`);
      }
      ctx = self._scoping.let;
    }
    if (type === 'private') {
      if (self._scoping.private.has(name)) {
        throw new Error(`Identifier '${name}' has already been declared`);
      }
      ctx = self._scoping.private;
    }
    if (type === 'protected') {
      if (self._scoping.protected.has(name)) {
        throw new Error(`Identifier '${name}' has already been declared`);
      }
      ctx = self._scoping.protected;
    }
    if (type === 'public') {
      if (self._scoping.public.has(name)) {
        throw new Error(`Identifier '${name}' has already been declared`);
      }
      ctx = self._scoping.public;
    }

    ctx.set(name, value);
    return value;
  }

  dereferenceIdentifier (name, ctx=this._scoping) {
    const self = this;
    if (ctx.let.has(name)) {
      return ctx.let.delete(name);
    }
    if (ctx.private.has(name)) {
      return ctx.private.delete(name);
    }
    if (ctx.protected.has(name)) {
      return ctx.protected.delete(name);
    }
    if (ctx.public.has(name)) {
      return ctx.public.delete(name);
    }
    if (ctx.parent) {
      return self.dereferenceIdentifier(name, ctx.parent);
    }

    return false;
  }

  identifier(name, ctx=this._scoping) {
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
    return global[name];
  }

  createScope(f) {
    const self = this;
    let result = function Scope(...args) {
      const thisArg = this;
      return self.invokeExpression({
        function: f,
        arguments: args,
        context: thisArg,
        isExtension: f._beingUsed
      });
    };
    const define = function (prop, val) {
      Object.defineProperty(result, prop, {
        get: () => f[prop],
        set: newVal => f[prop] = newVal
      });
      return result[prop] = val;
    };
    define("_isScope", true);
    define("_parent", self._scoping);
    define("_beingUsed", false);
    define("_originalFunction", f);
    return result;
  }

  invokeExpression(config = {
    function: function () {},
    arguments: [],
    context: this,
    isExtension: false
  }) {
    if (!config.function._isScope) {
      return config.function.apply(config.context, config.arguments);
    }
    let scoping = this._scoping;
    if (config.function === undefined) {
      throw new Error(`Call to undefined scope`);
    }
    this._scoping = {
      parent: config.function._parent,
      let: this.mapExpression(),
      private: this.mapExpression(),
      protected: this.mapExpression(),
      public: this.mapExpression()
    };
    let result = config.function(config.arguments);
    if (result === undefined) {
      if (config.isExtension === true) {
        result = this.mapExpression(
          ["public", this._scoping.public],
          ["protected", this._scoping.protected]
        );
      } else {
        result = this._scoping.public;
      }
    }
    this._scoping = scoping;
    return result;
  }

  import (filename) {
    const filePath = require.resolve(filename);
    delete require.cache[filePath];
    return require(filePath);
  }

  use (usable, useOnly) {
    let self = this;
    usable.forEach(sc => {
      if (typeof sc !== "function") {
        throw new Error("Attempt to use non-scope");
      }
      sc._beingUsed = true;
      let temp = sc();
      sc._beingUsed = false;
      if (!(temp instanceof Map)) {
        throw new Error("Attempt to use scope returning non-map");
      }
      if (temp.get("protected") instanceof Map) {
        for (let [key, val] of temp.get("protected")) {
          if (useOnly === undefined || useOnly.indexOf(key) !== -1) {
            self._scoping.protected.set(key, val);
          }
        }
      }
      if (temp.get("public") instanceof Map) {
        for (let [key, val] of temp.get("public")) {
          if (useOnly === undefined || useOnly.indexOf(key) !== -1) {
            self._scoping.public.set(key, val);
          }
        }
      }
    });
  }
}
let scope = new Scope({});
module.exports = scope;