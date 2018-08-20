return {
	public page = (template: {}) {
		return template([
			title: "Home",
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