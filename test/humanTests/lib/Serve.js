const express = require('express');
const socketIo = require('socket.io');
const spdy = require('spdy');
const fs = require('fs');
const path = require('path');
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

function mapToObj (m) {
	if (m instanceof Map) {
		let obj = Object.create(null);
		for (let [key, val] of m) {
			obj[key] = mapToObj(val);
		}
		return obj;
	}
	return m;
}

function get (id) {
	return this[id];
}

function Serve () {
	let self = new Map();
	let app = express();
	let server = spdy.createServer({
		key: fs.readFileSync(path.join(__dirname, '/server.key')),
		cert: fs.readFileSync(path.join(__dirname, '/server.cert'))
	}, app);
	let io = socketIo(server);
	let clients = new Map();
	let clientScope = true;
	let ioListeners = new Map();

	self.set("listen", (props, callback) => {
		if (!props.has('port')) {
			// TODO: set to random available port
			props.set('port', 8000);
		}
		if (callback !== undefined) {
			server.listen(props.get('port'), callback);
		} else {
			server.listen(props.get('port'));
		}
		if (!props.has('clientScope')) {
			props.set('clientScope', true);
		}
		if (props.get('clientScope')) {
			app.get('/Serve/client.js', (req, res, next) => {
				res.sendFile("/home/spence/Projects/scope/test/humanTests/lib/client.js");
			});
		} else {
			clientScope = false;
		}
	});

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
			req.params.get = get;
			request.set("params", req.params);

			response.set("status", res.status.bind(res));
			response.set("sendStyle", (stylesheet) => {
				let css = scope.xmlExpression('style', {}, stylesheet).childNodes[0].value;
				res.type('css').end(css);
			});
			response.set("render", (xmlType) => {
				if (clientScope && xmlType.tagName === "html") {
					xmlType.childNodes.forEach((node) => {
						if (node.tagName === 'body') {
							node.appendChild(h('script', {src: 'https://code.jquery.com/jquery-3.3.1.min.js'}, ["JavaScript needed for full functionality"]));
							node.appendChild(h('script', {src: '/socket.io/socket.io.js'}, ["JavaScript needed for full functionality"]));
							node.appendChild(h('script', {'src': "Serve/client.js"}, ["JavaScript needed for full functionality"]));
						}
					});
				}
				res.send(xmlType.toString());
			});

			response.set("redirect", (status, path) => {
				if (!path) {
					path = status;
					status = 302;
				}
				res.redirect(status, path);
			});

			client.set("request", request);
			client.set("response", response);
			client.set("next", next);
			scope.invokeExpression(handle, [client]);
		});
	});

	self.set("manifest", (m) => {
		let o = mapToObj(m);
		app.get("/manifest.webmanifest", (req, res) => {
			res.send(JSON.stringify(o));
		});
	});
	return self;
}

module.exports = Serve;