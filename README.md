# Lister.js [Early Alpha] - GH Pages

### A jQuery plugin to make lists from selects.
This plugin has a fairly simple goal. Given a set of selectors, translate them into unordered lists and have those list items pass the click event back to the select element.

By choice, the plugin is minimal. Apart from the demo, you won't find any CSS. It will only translate the selects for you and pass the value back. It's up to you to style the unordered list.

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="js/jquery.lister.min.js"></script>
	```

3. Call the plugin:


  ```javascript
  // All Select Elements:
  $("select").lister();
  // Single Select Element:
  $("selector1").lister();
  // Multiple Select Elements
  $("selector1", "selector2").lister();
  ```

<a href="http://punkave.com/"><img src="https://raw.github.com/punkave/jquery-selective/master/logos/logo-box-builtby.png" /></a>
