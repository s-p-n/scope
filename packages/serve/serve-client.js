if (!window.ServedOnce) {
	(function () {
		window.ServedOnce = true;
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