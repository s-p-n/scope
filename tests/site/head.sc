return Node((
    author = "",
    keywords = "",
    description = "",
    favicon = {
        public type = "";
        public url = "";
    },
    title = ""
) {
    // Attributes in the tag are the arguments in this scope.
    // The order is not important during invokation.
    // Node arguments must have defined optionals.
    return <head>
        <meta charset="UTF-8" />;
        <meta name="author" content = author />;
        <meta name="keywords" content = keywords />;
        <meta name="description" content = description />;
        <link
            rel = "icon"
            type = favicon.type
            href = favicon.src
        />;
        <title>
            title;
        </title>;
        Tag.node; // The stuff inside the tag-body
    </head>;
});
