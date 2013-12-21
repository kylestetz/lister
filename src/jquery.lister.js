// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {


		// Create the defaults once
		var pluginName = "lister";
  	defaults = {
			listClass: "lister",
      selectedClass: "lister-selected",
      selectedTop: true,
      selectedTopWrapperClass: "lister-selected-top"
		};

		// The actual plugin constructor
		function Lister ( element, options ) {
			// Let's always use self
      var self = this;
      self.element = element;
			self.$element = $(self.element);
			self.settings = $.extend( {}, defaults, options );
      self._defaults = defaults;
			self._name = pluginName;
			self.init();
		}

		Lister.prototype = {

			init: function () {
        // Cache the constructor object
        var self = this;
        // First let's create the markup
				self.cloneSelect();
        // Then, let's bind the UI back to the
        // original selects.
        self.bindClicks();
			},

      cloneSelect: function() {
        // Cache the constructor object
        var self = this;

        // Loop through the jQuery object and
        // duplicate as necessary;
        this.$element.each(function(){
          var $thisSelect = $(this);

          //Create the new list
          var thisList = $thisSelect.clone().wrap("<div></div>").parent().html().replace(/select/g,"ul").replace(/option/g,"li");

          // Make the jQuery object
          var $thisList = $(thisList);

          //Give the list an appropriate class.
          $thisList.addClass(self.settings.listClass);

          //Insert the new list into the DOM.
          $thisSelect.after($thisList);

          // If the option has been passed in, let's also create a new <div>
          // above the <ul> to house the selected item.
          if (self.settings.selectedTop) {
            self.$element.before("<div class='"+self.settings.selectedTopWrapperClass+"'></div>")
          }
        })
      },

      bindClicks: function() {
        // Cache the constructor object
        var self = this;

        // Create the jQuery object of all appropriates
        // lists given a list class.
        var $list = $("ul."+self.settings.listClass);

        // Create the jQuery object of all appropriate
        // list items, given a list class.
        var $listItem = $list.find("li");

        // Create a click event for the list items.
        $listItem.click(function(){
          // Cache the clicked item
          var $thisItem = $(this);
          // For a given list item, find the preceding <select>
          var $thisItemSelect = $thisItem.parent().prev(self.$element);
          // Add the selected class to the clicked item after
          // removing the class from all the list items.
          $listItem.removeClass(self.settings.selectedClass);
          $thisItem.addClass(self.settings.selectedClass);
          if (self.settings.selectedTop) {

            // For a given list item, find the equivalent
            // <option> in the original select item.
            var $thisItemEquivalent = $thisItemSelect.find("option").eq($thisItem.index());

            // For each click event, set the equivalent <option> to selected.
            $thisItemEquivalent.prop("selected", true);


            // Let's make a jQuery object out of the container
            // <div> for selectedTop
            var $selectedTop = $($thisItemSelect.prev("."+self.settings.selectedTopWrapperClass));

            console.log($selectedTop);
            // Let's add the text to the element.
            $selectedTop.text($thisItemEquivalent.val());
            // $thisItem.parent().before($selectedTop;
          } else {
            // For a given list item, find the equivalent
            // <option> in the original select item.
            var $thisItemEquivalent = $thisItemSelect.find("option").eq($thisItem.index());
            // For each click event, set the equivalent <option> to selected.
            $thisItemEquivalent.prop("selected", true);
          }
        });
      },
		};


		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn.lister = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Lister( this, options ) );
						}
				});
		};

})( jQuery, window, document );
