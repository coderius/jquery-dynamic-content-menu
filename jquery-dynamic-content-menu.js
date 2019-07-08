/**
 * See (http://jquery.com/).
 * @name $
 * @class
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See (http://jquery.com/)
 * @name fn
 * @class
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf $
 */

(function(factory) {
    if (typeof define === 'function' && define.amd && define.amd.jQuery) {
      // AMD. Register as anonymous module.
      define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
      // CommonJS Module
      factory(require("jquery"));
    } else {
      // Browser globals.
      factory(jQuery);
    }
  }(function($) {
    "use strict";
    
    //Constants
    var VERSION = "1.0.0",
        PLUGIN_NS = 'DynamicContentMenu',
        PLUGIN_NAME = 'dynamicContentMenu';

    // PLUGIN CONSTRUCTOR
    // =======================
    var DynamicContentMenu = function (element, options) {
        this.options             = options;
        this.$body               = $(document.body);
        this.$element            = $(element);
        this.$dialog             = this.$element.find('.modal-dialog');
        this.$backdrop           = null;
        this.isShown             = null;
        this.originalBodyPad     = null;
        this.scrollbarWidth      = 0;
        this.ignoreBackdropClick = false;
        
        if (this.options.remote) {
            this.$element
            .find('.modal-content')
            .load(this.options.remote, $.proxy(function () {
                this.$element.trigger('loaded.bs.modal')
            }, this))
        }
    }

    DynamicContentMenu.DEFAULTS  = {
        // **context**: Accepts String: Any jQuery selector
        // The container element that holds all of the elements used to generate the table of contents
        context: "body",

        // **ignoreSelector**: Accepts String: Any jQuery selector
        // A selector to any element that would be matched by selectors that you wish to be ignored
        ignoreSelector: null,

        // **selectors**: Accepts an Array of Strings: Any jQuery selectors
        // The element's used to generate the table of contents.  The order is very important since it will determine the table of content's nesting structure
        selectors: "h1, h2, h3",

        // **showAndHide**: Accepts a boolean: true or false
        // Used to determine if elements should be shown and hidden
        showAndHide: true,

        // **showEffect**: Accepts String: "none", "fadeIn", "show", or "slideDown"
        // Used to display any of the table of contents nested items
        showEffect: "slideDown",

        // **showEffectSpeed**: Accepts Number (milliseconds) or String: "slow", "medium", or "fast"
        // The time duration of the show animation
        showEffectSpeed: "medium",

        // **hideEffect**: Accepts String: "none", "fadeOut", "hide", or "slideUp"
        // Used to hide any of the table of contents nested items
        hideEffect: "slideUp",

        // **hideEffectSpeed**: Accepts Number (milliseconds) or String: "slow", "medium", or "fast"
        // The time duration of the hide animation
        hideEffectSpeed: "medium",

        // **smoothScroll**: Accepts a boolean: true or false
        // Determines if a jQuery animation should be used to scroll to specific table of contents items on the page
        smoothScroll: true,

        // **smoothScrollSpeed**: Accepts Number (milliseconds) or String: "slow", "medium", or "fast"
        // The time duration of the smoothScroll animation
        smoothScrollSpeed: "medium",

        // **scrollTo**: Accepts Number (pixels)
        // The amount of space between the top of page and the selected table of contents item after the page has been scrolled
        scrollTo: 0,

        // **showAndHideOnScroll**: Accepts a boolean: true or false
        // Determines if table of contents nested items should be shown and hidden while scrolling
        showAndHideOnScroll: true,

        // **highlightOnScroll**: Accepts a boolean: true or false
        // Determines if table of contents nested items should be highlighted (set to a different color) while scrolling
        highlightOnScroll: true,

        // **highlightOffset**: Accepts a number
        // The offset distance in pixels to trigger the next active table of contents item
        highlightOffset: 40,

        // **theme**: Accepts a string: "bootstrap", "jqueryui", or "none"
        // Determines if Twitter Bootstrap, jQueryUI, or Tocify classes should be added to the table of contents
        theme: "bootstrap",

        // **extendPage**: Accepts a boolean: true or false
        // If a user scrolls to the bottom of the page and the page is not tall enough to scroll to the last table of contents item, then the page height is increased
        extendPage: true,

        // **extendPageOffset**: Accepts a number: pixels
        // How close to the bottom of the page a user must scroll before the page is extended
        extendPageOffset: 100,

        // **history**: Accepts a boolean: true or false
        // Adds a hash to the page url to maintain history
        history: true,

        // **scrollHistory**: Accepts a boolean: true or false
        // Adds a hash to the page url, to maintain history, when scrolling to a TOC item
        scrollHistory: false,

        // **hashGenerator**: How the hash value (the anchor segment of the URL, following the
        // # character) will be generated.
        //
        // "compact" (default) - #CompressesEverythingTogether
        // "pretty" - #looks-like-a-nice-url-and-is-easily-readable
        // function(text, element){} - Your own hash generation function that accepts the text as an
        // argument, and returns the hash value.
        hashGenerator: "compact",

        // **highlightDefault**: Accepts a boolean: true or false
        // Set's the first TOC item as active if no other TOC item is active.
        highlightDefault: true
    };

    DynamicContentMenu.prototype.hello = function () {
        alert('Hello!');
    }

    // PLUGIN DEFINITION
    // =======================
    function Plugin(option, _relatedTarget) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data(PLUGIN_NS);
            //Options can be passed via data attributes or JavaScript. For data attributes, append the option name to data-, as in data-backdrop=""
            //Keep in mind that the target object (first argument) will be modified, and will also be returned from $.extend(). If, however, you want to preserve both of the original objects, you can do so by passing an empty object as the target:
            //typeof option == 'object' && option return option if typeof object
            var options = $.extend({}, DynamicContentMenu.DEFAULTS, $this.data(), typeof option == 'object' && option);
        
            if (!data) $this.data(PLUGIN_NS, (data = new DynamicContentMenu(this, options)));

            //only public method
            if (typeof option == 'string'){

                if ( !$.isFunction( data[option] ) || option.charAt( 0 ) === "_" ) {
                    $.error( "no such method '" + option + "' for " + PLUGIN_NAME +
                        " plugin instance" );
                }

                //call if like $('#el').dynamicContentMenu('methodName', $(this));
                // data[option](_relatedTarget);
                data[option]( Array.prototype.slice.call( arguments, 1 ) );
            }
            else if ( !data ) {
                $.error( 'Plugin must be initialised before using method: ' + option );
            }

            // else if (options.show) {
            //     data.show(_relatedTarget);
            // }
        });
    }

    var old = $.fn[ PLUGIN_NAME ];

    $.fn[ PLUGIN_NAME ]             = Plugin;
    $.fn[ PLUGIN_NAME ].Constructor = DynamicContentMenu;
  
  
    // PLUGIN NO CONFLICT
    // =================
  
    $.fn[ PLUGIN_NAME ].noConflict = function () {
      $.fn[ PLUGIN_NAME ] = old;
      return this
    }

}));

