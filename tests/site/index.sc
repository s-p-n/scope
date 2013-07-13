use "head.sc" as head;
use "nav.sc" as nav;
use "footer.sc" as footer;
use "headerImg.sc" as headerImg;
use "data.sc" as data;
use "style.sc" as style;
return <<
    <head
        author = data.author
        keywords = data.keywords
        description = data.description
        favicon = data.favicon
        title = data.title
    />;
    <body>
        <div class="container shadow">
            <nav items = data.links />;
            <headerImg
                url = data.headerImg.url
                src = data.headerImg.src
                alt = data.headerImg.alt
            />
            <section class="pages">
                contents;
            </section>;
            <footer url=data.footer.url text=data.footer.text />;
        </div>;
    </body>;
>>.css(style);