/*
 *  Lister.js - v0.0.1
 *  A jQuery plugin to make lists from selects.
 *  http://jsumnersmith.github.io/lister
 *
 *  Made by Joel Smith
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {


		// Create the defaults once
		var pluginName = "lister";
  	defaults = {
			listClass: "lister",
      openListClass: "lister-open",
      selectedClass: "lister-selected",
      selectedTop: true,
      selectedTopText: true,
      selectedTopWrapperClass: "lister-selected-top",
      populateSelectedTop: true,
      listClickCallback: function() {},
      selectedTopOpenCallback: function() {},
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
        self.listItemClick();

        if (self.settings.selectedTop) {
          self.createSelectedTop();
          self.selectedTopClick();
        }
			},

      cloneSelect: function() {
        // Cache the constructor object
        var self = this;

        // Loop through and build out the
        // jQuery object; duplicate as necessary;
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
          }
        })
      },

      listItemClick: function() {
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
          // On click remove the parent class of openListClass
          if ($thisItem.parent().hasClass(self.settings.openListClass)){
              $thisItem.parent().removeClass(self.settings.openListClass);
          }

          // For a given list item, find the equivalent
          // <option> in the original select item.
          var $thisItemEquivalent = $thisItemSelect.find("option").eq($thisItem.index());

          // For each click event, set the equivalent <option> to selected.
          $thisItemEquivalent.prop("selected", true);

          // If we've passed in the option for the selected top section,
          // let's bind the appropriate clicks to it.
          if (self.settings.selectedTop) {
            // Let's make a jQuery object out of the container
            // <div> for selectedTop
            var $thisSelectedTop = $($thisItemSelect.prev("."+self.settings.selectedTopWrapperClass));

            // Let's add the text to the element.
            $thisSelectedTop.text($thisItemEquivalent.text());
          }
          // Let's allow for a callback on the click event.
          if (self.settings.listClickCallback) {
            self.settings.listClickCallback();
          }
        });
      },

      createSelectedTop: function() {
        var self = this;

        self.$element.before("<div class='"+self.settings.selectedTopWrapperClass+"'></div>");
        // console.log($selectedTop);
        //First, let's make an object of all the selected tops
        var $selectedTop = $(self.$element.prev("."+self.settings.selectedTopWrapperClass));

        // Then, we'll need to find the closest <li>
        // TO-DO: make sure this only selects the next <ul>
        var $nextSelect = $selectedTop.next("select");
        var $nextList = $nextSelect.next("ul");

        if (self.settings.populateSelectedTop) {
           var $firstOption = $nextSelect.children("option").first();
          console.log($firstOption);
          $selectedTop.text($firstOption.text());
        }
      },

      selectedTopClick: function() {
        var self = this;
        var $selectedTop = $(self.$element.prev("."+self.settings.selectedTopWrapperClass));
        var $nextSelect = $selectedTop.next("select");
        var $nextList = $nextSelect.next("ul");
        $selectedTop.click(function(){
          // TO-DO: add callbacks on this click event.
          if ($nextList.hasClass(self.settings.openListClass)){
            $nextList.removeClass(self.settings.openListClass);
          } else {
            $nextList.addClass(self.settings.openListClass);
            self.settings.selectedTopOpenCallback();
          }
        });
      }
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
