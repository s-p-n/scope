return Node((items = [{
        public name = "";
        public url = "";
        public text = "";
    }]
) {
    navList = <ul class="span12 nav nav-tabs" />;
    for (var item in items) {
        navList.push(<li class = active_or_not(item.name)>
            <a href = item.url>
                item.text;
            </a>;
        </li>);
    }

    // Null nodes are for storing two or more nodes
    // without the need for a parent. We need to return
    // two nodes- the placeholder and the nav- and we cannot
    // store them in a parent element.
    // Null nodes are not inserted into the DOM.
    return <<
        <div class="span12 navPlaceholder" />;
        navList;
    >>;
});
