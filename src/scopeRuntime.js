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
      function processStyle (m) {
        let style = "";
        for (let [selector, body] of m) {
          //console.log(selector);
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
    let arr = new Map();
    let type = '';
    items.forEach((item, i) => {
      if (typeof item === "object" && item.key !== undefined && item.value !== undefined) {
        arr.set(item.key, item.value);
        type = "associative";
      } else {
        arr.set(i, item);
        type = "numeric";
      }
    });
    Object.defineProperty(arr, 'type', {
      get: () => {
        return type;
      },
      set: (val) => {
        if (type === "" && (val === "associative" || val === "numeric")) {
          return type = val;
        }
        return type;
      },
      configurable: false,
      enumerable: false
    });
    return arr;
  }

  assignmentExpression(names, valParts, ctx=this._scoping) {
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
      switch(op) {
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
        if ((typeof a === "string" || typeof a === "number") && 
            (typeof b === "string" || typeof b === "number")) {
          return a + b;
        } else if (a instanceof Map && a.type !== "associative") {
          let oldA = [];
          for (let [key, val] of a) {
            oldA.push(val);
          }
          console.log(oldA);
          let newA = self.arrayExpression(...oldA);
          newA.type = "numeric";
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

    throw new Error(`Identifier '${name}' is not defined`);
  }

  createScope(f) {
    f._isScope = true;
    f._parent = this._scoping;
    return f;
  }

  invokeExpression(f, args, extension = false) {
    if (!f._isScope) {
      return f(...args);
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
        result = new Map([
          ["public", this._scoping.public],
          ["protected", this._scoping.protected]
        ]);
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
      //console.log(sc);
      let temp = self.invokeExpression(sc, [], true);
      //console.log(temp);
      if (!(temp instanceof Map)) {
        throw new Error("Attempt to use scope returning non-map");
      }
      if (temp.get("protected") instanceof Map) {
        for (let [key, val] of temp.get("protected")) {
          if (useOnly === undefined || useOnly.indexOf(key) !== -1) {
            //console.log(key, val);
            self._scoping.protected.set(key, val);
          }
        }
      }
      if (temp.get("public") instanceof Map) {
        for (let [key, val] of temp.get("public")) {
          if (useOnly === undefined || useOnly.indexOf(key) !== -1) {
            //console.log(key, val);
            self._scoping.public.set(key, val);
          }
        }
      }
    });
  }
}

module.exports = new Scope({});