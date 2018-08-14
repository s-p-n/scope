const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const ScopeParser = require('../../../lib/ScopeParser.js');//require('scope-lang');
const libUtils = new ScopeParser().libraryUtils();
const scope = libUtils.runtime;
const ScopeApi = libUtils.api(scope);
const h = require('hyperscript');

function setupServerUtils (port) {
	return `(function serveUtils () {
		var socket = io.connect('http://localhost:${port}');
		socket.on("connect", function () {
			console.log("connected");
		});

		$('[bind-in]').each(function () {
			console.log($(this), $(this).attr('bind-in'));
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
	}());`;
}


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
		app.get('/Serve/serveUtils.js', (req, res, next) => {
			res.send(setupServerUtils(port));
		});
		/** TODO: Implement scope runtime for client
		app.get('/Serve/scopeRuntime.js', (req, res, next) => {
			res.sendFile("/home/spence/Projects/scope/lib/scopeRuntime.js");
		});
		app.get('/Serve/scopeRuntimeApi.js', (req, res, next) => {
			res.sendFile("/home/spence/Projects/scope/lib/scopeRuntimeApi.js");
		});
		**/
	});

	self.set('on', (args) => {
		ioListeners.set(args[0], args[1]);
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
	});

	self.set("get", (args) => {
		let url = args[0];
		let handle = args[1];
		app.get(url, (req, res, next) => {
			let client = new Map();
			let request = new Map();
			let response = new Map();
			req.get = get;
			res.get = get;

			response.set("send", (args) => {
				let xmlType = args[0];
				if (xmlType.tagName === "html") {
					xmlType.childNodes.forEach((node) => {
						if (node.tagName === 'body') {
							node.appendChild(h('script', {src: 'https://code.jquery.com/jquery-3.3.1.min.js'}));
							node.appendChild(h('script', {src: '/socket.io/socket.io.js'}));
							node.appendChild(h('script', {src: '/Serve/serveUtils.js'}));
							/** TODO: Implement scope runtime for client
							node.appendChild(h('script', {src: '/Serve/scopeRuntime.js'}));
							node.appendChild(h('script', {src: '/Serve/scopeRuntimeApi.js'}));
							**/
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