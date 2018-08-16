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
      node.toString = () => {
        return node.outerHTML;
      };
      node.get = key => {
        return node[key];
      };
      node.childNodes.get = key => {
        return node.childNodes[key];
      }
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

  assignmentExpression(names, value, ctx=this._scoping) {
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
    f._parent = this._scoping;
    return f;
  }

  invokeExpression(f, args, extension = false) {
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
      console.log(sc);
      let temp = self.invokeExpression(sc, [], true);
      console.log(temp);
      for (let [key, val] of temp.get("protected")) {
        if (useOnly === undefined || useOnly.indexOf(key) !== -1) {
          console.log(key, val);
          self._scoping.protected.set(key, val);
        }
      }
      for (let [key, val] of temp.get("public")) {
        if (useOnly === undefined || useOnly.indexOf(key) !== -1) {
          console.log(key, val);
          self._scoping.public.set(key, val);
        }
      }
    });
  }
}

module.exports = new Scope({});