const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const ScopeParser = require('../../../lib/ScopeParser.js');//require('scope-lang');
const libUtils = new ScopeParser().libraryUtils();
const scope = libUtils.runtime;
const ScopeApi = libUtils.api(scope);
const h = require('hyperscript');
/*
function scopify (item, ctx = null) {
	if (item !== null && typeof item === "object") {
		if (item instanceof Map) {
			return item;
		}
		let result = new Map();
		for (let i in item) {
			result.set(i, scopify(item[i], item));
		}
		return result;
	} else if (typeof item === "function") {
		return (args) => {
			return item.apply(args, ctx);
		}
	} else {
		return item;
	}
}
*/
function get (id) {
	return this[id];
}

function Serve () {
	let self = new Map();
	let app = express();
	let server = http.Server(app);
	let io = socketIo(server);
	let clients = new Map();

	let ioListeners = new Map();

	self.set("listen", (args) => {
		let props = args[0];
		let port = 8888;
		if (props.has('port')) {
			port = props.get('port');
		}
		if (args[1] !== undefined) {
			server.listen(port, args[1]);
		} else {
			server.listen(port);
		}
		app.get('/Serve/client.js', (req, res, next) => {
			res.sendFile("/home/spence/Projects/scope/test/humanTests/lib/client.js");
		});
	});
	self.get("listen")._isScope = true;

	self.set('on', (channel, data) => {
		ioListeners.set(channel, data);
	});
	
	io.on("connection", function (client) {
		let scClient = new Map();
		scClient.set("emit", (args) => {
			let channel = args[0];
			let data = args[1];
			client.emit(channel, data);
		});
		scClient.set("broadcast", (args) => {
			let channel = args[0];
			let data = args[1];
			client.broadcast(channel, data);
		});
		for (let [channel, handle] of ioListeners) {
			client.on(channel, function (data) {
				scope.invokeExpression(handle, [scClient, data]);
			});
		}
		scClient.get("emit")._isScope = true;
		scClient.get("broadcast")._isScope = true;
	});

	self.set("get", (url, handle) => {
		app.get(url, (req, res, next) => {
			let client = new Map();
			let request = new Map();
			let response = new Map();
			req.get = get;
			res.get = get;

			response.set("send", (xmlType) => {
				if (xmlType.tagName === "html") {
					xmlType.childNodes.forEach((node) => {
						if (node.tagName === 'body') {
							node.appendChild(h('script', {src: 'https://code.jquery.com/jquery-3.3.1.min.js'}));
							node.appendChild(h('script', {src: '/socket.io/socket.io.js'}));
							node.appendChild(h('script', {'src': "Serve/client.js"}));
						}
					});
				}
				res.send(xmlType.toString());
			});

			client.set("request", request);
			client.set("response", response);
			client.set("next", next);
			scope.invokeExpression(handle, [client]);
		});
	});
	return self;
}

module.exports = Serve;