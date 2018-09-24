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

Map.prototype.slice = function slice (begin=0, end=this.size) {
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

const createProxy = (function () {
  const priv = new WeakMap();
  const intRegexp = /^\-?\d+$/
  const mapProxyHandler = {
    get: function (target, prop, receiver) {
      if (typeof prop === "string" && intRegexp.test(prop)) {
        prop = parseInt(prop);
        return target.get(prop);
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
        }
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
      if (prop === "type") { //disallow setting 'type'
        return priv.get(this).type;
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
      let result = "NumericMap {";
      for (let i = 0; i < this.size; i += 1) {
        if (i !== 0) {
          result += ","
        }
        result += ` ${i} => ${this.get(i)}`;
      }
      return result + " }";
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
      //console.log(index);
      if (this.size === 0) {
        return undefined;
      }
      // Allow reverse indexing like Python. foo[-1] === foo[foo.size - 1];
      while (index < 0) { // TODO optimize using modulus operator
        index = this.size + index;
      }
      //console.log(index);
      return this.array[index];
    }

    set (index, value) {
      return this.array[index] = value;
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
          //console.log("found user tag:", tag);
          //console.log(attr);
          for (let name in attr) {
            attrMap[name] = attr[name];
          }
          let html = h(tag, attr, ...children);
          $(html).data("rawAttributes", attrMap);
          return html;
        }
      }
      /*
      if (this.identifier(tag) && this.identifier(tag)._isScope) {
        let t = this.identifier(tag)(attr, children);
        let clientCode = {};
        function toClientCode (val) {
          if (typeof val === "function") {
            if (val._isScope) {
              return val._originalFunction; 
            } else {
              return "undefined";
            }
          }
          if (typeof val === "object" && val instanceof NumericMap) {
            let result = "[";
            for (let i = 0; i < val.length; i += 1) {
              result += toClientCode(val[i]) + ",";
            }
            return result + "]";
          }
          if (typeof val === "object" && val instanceof Map) {
            let result = "{";
            for (let [k,v] of val) {
              result += `"${k}":${toClientCode(v)},`;
            }
            return result + "}";
          }
          return JSON.stringify(val);
        }

        clientCode = toClientCode(t);
          
        let id = randStr(10);
        if (typeof t.render === "function") {
          let code = this.identifier(tag)._originalFunction;
          code = code.toString().replace(/scope\.identifier\(\"([^\"]*)\"\)/g, function (match, a) {
            return `window._STATE${id}["${a}"]`;
          });
          let result = `
            whenReady(function () {
              let thisScript = document.getElementById("${id}");
              let state = {};
              let node = null;
              function render() {
                if (node === null) {
                  node = thisScript.parentNode.appendChild(_STATE${id}.render());
                } else {
                  newNode = _STATE${id}.render();
                  node.replaceWith(newNode);
                  node = newNode;
                }
              }
              window._STATE${id} = scope.createScope(${code})(${toClientCode(attr)}, ${toClientCode(children)});
              for (let [key,val] of _STATE${id}.state) {
                state[key] = val;
              }
              _STATE${id}.state = new Proxy(state, {
                get (target, prop) {
                  return target[prop];
                },
                set (target, prop, value) {
                  target[prop] = value;
                  render();
                  return true;
                }
              })
              render();
            });`;
          return h("script", {id: id}, result);
        }
      }
      */
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
          /*
          if (voidElements.indexOf(tag) === -1) {
            let event = a.toLowerCase().replace(/^on/, "");
            let thisNodeId= randStr(10);
            node.setAttribute("id", thisNodeId);
            val = `
            whenReady(function () {
              document.getElementById("${thisNodeId}").addEventListener(
                "${event}", 
                ${code}
              );
            });`;
            let script = this.xmlExpression("script", {"type": "text/JavaScript"}, val);
            node.appendChild(script);
            continue;
          } else {*/
            val = `${code}(event)`;
          //}
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
    return createProxy(new Map(items), "associative");
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
      case "+":
        if ((typeof a === "string" || typeof a === "number") && 
            (typeof b === "string" || typeof b === "number")) {
          return a + b;
        } else if (a instanceof NumericMap) {
          let newA = this.arrayExpression(...a.array);
          newA.set(newA.size, b);
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
              newA.set(newA.size, a[j]);
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
    if (typeof window !== "undefined") {
      return window[name];
    }
    if (typeof global !== "undefined") {
      return global[name];
    }
    return undefined;
  }

  createScope(f) {
    let self = this;
    f._isScope = true;
    f._parent = this._scoping;
    f._beingUsed = false;
    f._originalFunction = f;
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