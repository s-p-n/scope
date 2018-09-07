"use strict";

const createProxy = function () {
  const priv = new WeakMap();
  const intRegexp = /^\d+$/;
  const mapProxyHandler = {
    get: function (target, prop, receiver) {
      if (typeof prop === "string" && intRegexp.test(prop)) {
        prop = parseInt(prop);
      }
      if (prop === "toString") {
        return () => {
          let result = `map:${priv.get(this).type} {`;
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
        };
      }
      if (prop === "type") {
        return priv.get(this).type;
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
      return undefined;
    },
    has: function (target, prop) {
      return target.has(prop);
    },
    set: function (target, prop, val) {
      if (prop === "type") {
        //disallow setting 'type'
        return priv.get(this).type;
      }
      return target.set(prop, val);
    }
  };
  function createProxy(obj, type) {
    let handle = Object.create(mapProxyHandler);
    priv.set(handle, Object.create(null));
    priv.get(handle).type = type;
    return new Proxy(obj, handle);
  }
  return createProxy;
}();

const NumericMap = function () {
  const priv = new WeakMap();
  function nextEntry(iteratorData, self) {
    return function () {
      if (iteratorData.index < self.size) {
        iteratorData.result.value = [iteratorData.index, self.get(iteratorData.index++)];
      } else {
        iteratorData.index = 0;
        return { done: true };
      }
      return iteratorData.result;
    };
  }

  function nextKey(iteratorData, self) {
    return function () {
      if (iteratorData.index < self.size) {
        iteratorData.result.value = iteratorData.index++;
      } else {
        iteratorData.index = 0;
        return { done: true };
      }
      return iteratorData.result;
    };
  }

  function nextValue(iteratorData, self) {
    return function () {
      if (iteratorData.index < self.size) {
        iteratorData.result.value = self.get(iteratorData.index++);
      } else {
        iteratorData.index = 0;
        return { done: true };
      }
      return iteratorData.result;
    };
  }
  class NumericMap {
    constructor(arr) {
      const self = this;
      const hidden = {
        array: [...arr]
      };
      priv.set(this, hidden);

      hidden.createKeyIterator = function createKeyIterator() {
        return hidden.createIterator(nextKey);
      };

      hidden.createValueIterator = function createValueIterator() {
        return hidden.createIterator(nextValue);
      };

      hidden.createEntryIterator = function createEntryIterator() {
        return hidden.createIterator(nextEntry);
      };

      hidden.createIterator = function createIterator(next) {
        return {
          next: next({
            index: 0,
            result: {
              value: undefined,
              done: false
            }
          }, self),
          [Symbol.iterator]: function () {
            return this;
          }
        };;
      };
    }

    toString() {
      let result = "NumericMap {";
      for (let i = 0; i < this.size; i += 1) {
        if (i !== 0) {
          result += ",";
        }
        result += ` ${i} => ${this.get(i)}`;
      }
      return result + " }";
    }

    get type() {
      return "numeric";
    }

    get array() {
      return priv.get(this).array;
    }

    set array(val) {
      if (val instanceof Array) {
        return priv.get(this).array = val;
      }
      return priv.get(this).array;
    }

    get(index) {
      return this.array[index];
    }

    set(index, value) {
      return this.array[index] = value;
    }

    delete(index) {
      if (this.has(index)) {
        this.array.splice(index, 1);
        return true;
      }
      return false;
    }

    clear() {
      this.size = 0;
    }

    entries() {
      return priv.get(this).createEntryIterator();
    }

    keys() {
      return priv.get(this).createKeyIterator();
    }

    values() {
      return priv.get(this).createValueIterator();
    }

    has(index) {
      if (typeof index === "number") {
        return index >= 0 && index < this.size;
      }
      return false;
    }

    forEach(callback, thisArg = this) {
      for (let [key, val] of this) {
        callback.call(thisArg, val, key, this);
      }
    }

    get size() {
      return this.array.length;
    }

    set size(value) {
      return this.array.length = value;
    }

    [Symbol.iterator]() {
      return priv.get(this).createEntryIterator();
    }
  }
  return NumericMap;
}();

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
    let h = require("hyperscript");
    this.xmlExpression = (tag, attr, ...children) => {
      let node;
      function processStyle(m) {
        let style = "";
        for (let [selector, body] of m) {
          style += `${selector}{`;
          let index = 0;
          let terminated = false;
          for (let [name, value] of body) {
            if (value instanceof Map) {
              style += `}${processStyle(new Map([[selector + name, value]]))}`;
              if (index + 1 < body.size) {
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
          val = `${val.toString()}()`;
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
      };
      return node;
    };
  }

  arrayExpression(...items) {
    return createProxy(new NumericMap(items), "numeric");
  }

  mapExpression(...items) {
    return createProxy(new Map(items), "associative");
  }

  assignmentExpression(names, valParts, ctx = this._scoping) {
    const self = this;
    let name;
    let [op, value] = valParts;
    let id;
    if (names.length > 1) {
      [id, name] = names;
      //return names[0].set(names[1], value);
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
      switch (op) {
        case "=":
          id.set(name, value);
          return id.get(name);
        case "+=":
          id.set(name, self.binaryExpression("+", id.get(name), value));
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
      case "+":
        if ((typeof a === "string" || typeof a === "number") && (typeof b === "string" || typeof b === "number")) {
          return a + b;
        } else if (a instanceof NumericMap) {
          let newA = new NumericMap(a.array);
          newA.set(newA.size, b);
          return newA;
        }
        throw new Error(`Attempt to add incompatible types: '${a}' + '${b}'`);
      case "-":
        return a - b;
      case "*":
        return a * b;
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

  dereferenceIdentifier(name, ctx = this._scoping) {
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
    let self = this;
    f._isScope = true;
    f._parent = this._scoping;
    f._beingUsed = false;
    return new Proxy(f, {
      apply: function (target, thisArg, args) {
        return self.invokeExpression({
          function: target,
          arguments: args,
          context: thisArg,
          isExtension: target._beingUsed
        });
      }
    });
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
        result = this.mapExpression(["public", this._scoping.public], ["protected", this._scoping.protected]);
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

module.exports = new Scope({});