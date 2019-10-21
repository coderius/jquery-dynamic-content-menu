Jquery dynamic content menu
===========================
**This plugin on the fly creates a menu of the current page. By clicking on any menu item, the plugin moves to this item on the page. By default, menu items are formed from headline tests h1, h2, h3. 
But you can specify any tags, css classes or id elements that will take part in the formation of the menu.**

See code example - [html code and include plugin & basic config](https://github.com/coderius/jquery-dynamic-content-menu/blob/master/demos/index.html)


Plugin gif in action:
-------------------
![Jquery dynamic content menu](https://github.com/coderius/github-images/blob/master/ezgif.com-video-to-gif.gif?raw=true "Jquery dynamic content menu")

Basic usage.
-----------
Include CSS and JavaScript files.

Between <head> ... </head> include css

```html
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <title>Jquery dynamic content menu</title>
       <link rel="stylesheet" href="../jquery-dynamic-content-menu.css" type="text/css" />

	</head>
```

Before </body> include scripts and plugin like thet:

```js
<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<script src="../jquery-dynamic-content-menu.js"></script>

<script>
            
$(function() {
    if(!window.jQuery){
        alert('jQuery not included!');
    }
    //Include plugin
    $("#dinamicMenu").dynamicContentMenu({
        // 'theme' : "material",
        'selectors' : "h1, h2, h3, .h1s",
        'extendPage': false // do not increase page height
    });
});
</script>
</body>
```

And use in html:

```html
<!-- Side -->
<div class="col-md-4">
    <!-- Plugin menu in this place -->
    <div id="dinamicMenu"></div>
</div>
```

License
-------
*Copyright (c) 2010-2019 Sergio Coderius.*

**jquery-dynamic-content-menu** plugin is released under the MIT License (MIT). See the bundled LICENSE.md for details.
