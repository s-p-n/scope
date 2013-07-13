use "index.sc" as index;

var website = App('example.com');

website.http.on('get', 'index', (client) {
	client.$('body').html(index());
});
