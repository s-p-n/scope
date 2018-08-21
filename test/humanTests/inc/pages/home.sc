return {
	public page = (template: {}) {
		return template([
			title: "Home",
			description: "Example site built using the Scope Programming Language.",
			body: 
			<div id="page">
				<h2>
					"Da Homepage";
				</h2>;
				<div>
					"This is an article.. kinda.";
				</div>;
			</div>
		]);
	};
};