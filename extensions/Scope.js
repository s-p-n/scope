var Scope = (function () {
	return {
		extend: function extend (extended, extendee, parent) {
			var result;
			extendee = extendee.unbind();
			extended = extended.bind($newParent(parent));
			result = function () {
				var i, access;
				var extension = extended.apply(this, arguments);
				this.$self("protected", "extended", extension);
				for (i in extension.$access) {
					access = extension.$access[i]
					if (access === "private") {
						continue;
					}
					this.$self(access, i, extension.$property[i]);
				}
				return extendee.apply(this, arguments);
			}.bind($newParent(parent));
			result.name = extendee.name;
			return result;
}}}());