return {
	public page = (template: {}) {
		return template([
			title: "About",
			url: "/about",
			description: "Information about who we are. (Hint: we make the Scope Programming Language!)",
			body: 
			<article>
				<h1>
					"About Us";
				</h1>;
				<div>
					"This is an article about us.. kinda.";
				</div>;
			</article>
		]);
	};
};