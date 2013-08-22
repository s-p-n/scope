var Scope = {
	$types: ["Instance"],
	$values: {
		"Instance": function () {
			return {
				extend: {
					$types: ["Scope"],
					$values: {
						"Scope": function () {
							return function extend (extended, extendee, parent) {
								var result;
								extendee = extendee.$values["Scope"]().unbind();
								extended = extended.$values["Scope"]().bind($newParent(parent));
								//console.log("Extend:", extendee, extended);
								result = function () {
									var i, access;
									var extension = extended.apply(this, arguments);
									//console.log("extension:", extension);
									this.$self("protected", "extended", extension);
									for (i in extension.$access) {
										access = extension.$access[i]
										if (access === "private") {
											continue;
										}
										this.$self(access, i, extension.$property[i]);
									}
									//console.log(this);
									return extendee.apply(this, arguments);
								}.bind($newParent(parent));
								result.name = extendee.name;
								//console.log("Result:", result);
								return $primitive("Scope", function () {
									return result
								});
							}
						}
					}
					
				}
			}
		}
	}	
};