if (!window.ServedOnce) {
	(function () {
		window.ServedOnce = true;
		window.XRegExp = require("xregexp");
		window.scope = require('../../lib/scopeRuntime.js');
		window.ScopeApi = require('../../lib/scopeRuntimeApi.js')(scope);
		window.socket = io.connect();
		scope.declarationExpression({
			type: "let", 
			name: "socket", 
			value: {
				emit (channel, data) {
					return socket.emit(channel, ScopeApi.toJSON(data));
				},
				on (channel, handle) {
					return socket.on(channel, handle);
				}
			}
		});

		function attrToMap(attributes) {
			let result = scope.mapExpression();
			for (let i = 0; i < attributes.length; i += 1) {
				let name = attributes[i].name;
				let value = attributes[i].value;
				result[name] = value;
			}
			return result;
		}
		function randStr (len=16) {
			let result = "";
			let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
			for (let i = 0; i < len; i += 1) {
				result += chars[Math.floor(Math.random() * chars.length)];
			}
			return result;
		}

		function stateProxy (instance, element) {
			let state = instance.state;
			let stateProxyTraps = {
				get (target, prop, receiver) {
					//console.log("get state-proxy:", prop, target[prop]);
					if (typeof target[prop] !== "undefined") {
						if (prop === "set") {
							return function (name, val) {
								//console.log("set state-proxy(2):", name, val);
								let result = target[prop](name, val);
								let newElement = scope.identifier("renderEngine").renderChildren(instance.render());
								$(element).replaceWith(newElement);
								element = newElement;
								return result;
							};
						}
						if (typeof target[prop] === "object") {
							return new Proxy(target[prop], stateProxyTraps);
						}
						return target[prop];
					}
					return undefined;
				},
				set (target, prop, val) {
					//console.log("set state-proxy:", prop, target[prop], val);
					target[prop] = val;
					let newElement = scope.identifier("renderEngine").renderChildren(instance.render());
					$(element).replaceWith(newElement);
					element = newElement;
					return val;
				}
			}
			instance.state = new Proxy(state, stateProxyTraps);
			instance.setState = (newState) => {
				for (let [key, val] of state) {
					if (!newState.has(key)) {
						newState.set(key, val);
					}
				}
				state = newState;
				instance.state = new Proxy(newState, stateProxyTraps);
				let newElement = scope.identifier("renderEngine").renderChildren(instance.render());
				$(element).replaceWith(newElement);
				element = newElement;
				return instance.state;
			}
		}

		scope.declarationExpression({
			type: "let",
			name: "userTagStates",
			value: scope.mapExpression()
		});
		let lastPaint = 0;
		let minPaintInterval = 150;
		scope.declarationExpression({
			type: "let",
			name: "renderEngine",
			value: {
				triggerPaint () {
					return window.requestAnimationFrame(scope.identifier("renderEngine").paint);
				},
				renderUserTag (tagName, sc, element) {
					let attr = $(element).data("rawAttributes") || scope.mapExpression();
					let id = randStr();
					let tClass = sc(attr, element.childNodes);
					if (typeof tClass.render === "function") {
						let node = tClass.render();
						scope.identifier("userTagStates").set(id, tClass);
						if (tClass.state && tClass.state instanceof Map) {
							stateProxy(tClass, node);
						}
						if (tClass.listeners && tClass.listeners instanceof Map) {
							for (let [event, func] of tClass.listeners) {
								$(node).on(event, func);
							}
						}
						return node;
					}
					// No render function found, so return original element.
					return element;
				},
				renderChildren (n) {
					let self = this;
					let userTags = ScopeApi.getAllTags();
					/*if(document.contains(n)) {
						console.log("render after paint");
					} else {
						console.log("render before paint");
					}*/
					for (let [tagName, sc] of userTags) {
						$(n).find(tagName).each(function (i, element) {
							let node = self.renderUserTag(tagName, sc, element);
							element.replaceWith(self.renderChildren(node));
						});
					}
					return n;
				},
				paint() {
					let self = scope.identifier("renderEngine");
					self.renderChildren(document);
				}
			}
		});
		whenReady(scope.identifier("renderEngine").triggerPaint);
		$('[bind-in]').each(function () {
			var binder = $(this).attr('bind-in').split(':');
			var event = binder[0];
			var id = binder[1];
			$(this).on(event, function (e) {
				scope.identifier("socket").emit(id, $(this).val());
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