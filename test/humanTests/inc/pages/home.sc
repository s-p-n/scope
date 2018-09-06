return {
	public page = (template: {}) {
		return template([
			title: "Home",
			url: "/home",
			description: "Example site built using the Scope Programming Language.",
			body: 
			<article>
				<h1>
					"Da Homepage";
				</h1>;
				<div>
					"This is an article.. kinda.";
				</div>;
			</article>
		]);
	};
};