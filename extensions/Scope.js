var Scope = (function () {
	var extendCache = {
		extendedRef: [],
		extendedStor: [],
		extendeeRef: [],
		extendeeStor: []
	};
	var findProtected = function findProtected (id) {
		return new RegExp("\\$\\$\\$self" + id + '\\(\\"protected\\"', "g");
	}
	var findId = /\$\$\$self([0-9]+)\(/;
	var findArgs = function findArgs (id) {
		return new RegExp("\\/\\*\\@argumentStart" + id + "\\@\\*\\/");
	}
	return {
		extend: function extend (extended, extendee) {
			var extendee_id = extendee.toString().match(findId)[1];
			var extended_id = extended.toString().match(findId)[1];
			var cache_index = extendCache.extendedRef.indexOf(extended);
			var extended_code;
			var extendee_code;
			var gotCache = false;
			if (cache_index > -1) {
				//console.log("Loaded extended from cache.");
				gotCache = true;
				extended_code = extendCache.extendedStor[cache_index];
			} else {
				extended_code = '(' +
					extended.
						toString().
						replace(
							findProtected(extended_id), 
								"$$$$$$self" + extended_id + "(\"public\""
						).
						replace(/\$/g, "$$$$"
					) + 
				')';
				extendCache.extendedRef.push(extended);
				extendCache.extendedStor.push(extended_code);
			}
			cache_index = extendCache.extendeeRef.indexOf(extendee);
			if (gotCache && cache_index > -1) {
				//console.loog("Loaded extendee from cache.");
				extendee_code = extendCache.extendeeStor[cache_index];
			} else {
				extendee_code = eval('(' +
						extendee.
							toString().
							replace(
								findArgs(extendee_id), 
								"/*@argumentStart" +
									extendee_id + 
									"@*/\n$$$$$$self" + 
									extendee_id + 
									'("protected", "extended", ' + 
									extended_code + 
									'.apply($$$$$$self' + 
									extendee_id + 
									', Array.prototype.slice.call(arguments, arguments)));'
							) + 
				')');
				extendCache.extendeeRef.push(extendee);
				extendCache.extendeeStor.push(extendee_code);
			}

			return extendee_code;
}}}());