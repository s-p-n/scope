if (!window.ServedOnce) {
	(function () {
		window.ServedOnce = true;
		window.scope = require('../../lib/scopeRuntime.js');
		window.ScopeApi = require('../../lib/scopeRuntimeApi.js')(scope);
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