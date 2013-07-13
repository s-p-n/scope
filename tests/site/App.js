var obj = {
    App: {
        clients: [{
            id: '(Text->Hash) The client ID',
            $: '(Scope || Instance) The Document Object Modal for this client',
        }],
        http: {
            on: function on (event_type, optional_url, fn) {
                // Note: Optional selector is not possible with HTTP
                //       because there is no connected client.
                // Example: 
                // myApp.http.on('get', 'index', (client) {
                //     client.$('body').text("Hello, World!");
                //});
            },
            listen: "(Number->Int) The port HTTP will listen on."
        },
        ws: {
            on: function on (event_type, optional_channel, fn) {
                // Example: 
                // myApp.ws.on('input', '#exampleForm', (client, data) {
                //     client.$('#exampleMessageBox').append(data);
                //});
            },
            listen: "(Number->Int) The port Web-Sockets will listen on."
        },
        public_directory: "(Text->DirectoryPath) The public resources directory- for images, videos, and such."
    }
}