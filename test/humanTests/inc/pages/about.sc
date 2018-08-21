return {
	public page = (template: {}) {
		return template([
			title: "About",
			body: 
			<div id="page">
				<h2>
					"About Us";
				</h2>;
				<div>
					"This is an article about us.. kinda.";
				</div>;
			</div>
		]);
	};
};