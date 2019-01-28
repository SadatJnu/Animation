;(function($) {

	if ( typeof Object.create !== 'function' ) {
	    Object.create = function( obj ) {
	        function F() {}
	        F.prototype = obj;
	        return new F();
	    };
	}

	var Popup = {

		defaultOptions: {
			content: "",	//left blank, must be set when new options passed through
			position: "top",	//where the popup will show by default- top. Other options: right, bottom, or left
			style: "",	//default no style, will revert to default colours. Other options: blue, red, green, custom
			animation: "standard",	//Standard animation by default. Other options: flip, grow, bounce
			event: "click",	//Default set to "click", can also be set to hover
			hideOnClick: true,	//When true, clicking off the menu closes it. When false, only clicking on the menu closes it
			zIndex: 100,	//Individual z-index can be set for each menu for layering if necessary
			popItemClick: function(){}	//function to handle actions when clicking on popup menu icons
		},

		init: function(options, elem) {
			var self = this;
			self.elem = elem;
			self.$elem = $(elem);
			self.options = $.extend({}, Popup.defaultOptions, options);
			self.popup = $('<div class="pop-cont" />')
			.addClass('pop-' + self.options.position)
			.addClass('popupTheme' + self.options.style)
			.append('<div class="pop-items" />')
			.appendTo('body').css("opacity", 0).hide();

			self.initializePopUp();
		},

		initializePopUp: function() {
			var self = this;
			self.setContent();
			self.setTriggers();
		},

		setContent: function() {
			var self = this;
			var location = self.popup.find(".pop-items");
			var content;
			if ((self.options.position == 'top') || (self.options.position == 'bottom')) {
				content = $(self.options.content).find("a").addClass("pop-item");
				location.html(content);
				self.popup.find("i").first().addClass("leftBorder");
				self.popup.find("i").last().addClass("rightBorder");
			} else if ((self.options.position == 'left') || (self.options.position == 'right')) {
				content = $(self.options.content).find("a").addClass("pop-item").addClass('item-side');
				location.html(content);
				self.popup.find("i").first().addClass("topBorder");
				self.popup.find("i").last().addClass("bottomBorder");
			}

		//popItemClick callback****************************************
			location.find('.pop-item').on('click', function(event) {
				event.preventDefault();
				self.options.popItemClick.call(this);
			});
		},

		setTriggers: function() {
			var self = this;

			if (self.options.event == 'click') {
				self.$elem.on('click', function(event) {
					event.preventDefault();
					if (self.$elem.hasClass('pressed')) {
						self.hide();
					} else {
						self.show();
					}
				});
			}

			if (self.options.event == 'hover') {
				self.$elem.on('mouseenter', function(event) {
					setTimeout(function() {
                        self.show();
                    }, 250);
				});

				$('.pop-cont').on('mouseleave', function(event) {
					setTimeout(function() {
                            self.hide();
                        }, 500);
				});
			}

			if (self.options.hideOnClick === true) {
				$('html').on('click.popup', function(event) {
					if (event.target != self.elem && self.$elem.has(event.target).length === 0 && 
						self.popup.has(event.target).length === 0 && self.popup.is(":visible")) {
						self.hide();
					}
				});
			}
		},

		hide: function() {
			var self = this;
			var animation = {opacity: 0};
			self.$elem.removeClass('pressed');

			switch (self.options.position) {
				case'top': 
					animation.top = '+=20';
					break;
				case 'left':
					animation.left = '+=20';
					break;
				case 'right':
					animation.left = '-=20';
					break;
				case 'bottom':
					animation.top = '-=20';
					break;
			}
			self.popup.animate(animation, 200, function() {
				self.popup.hide();
			});
		},

		show: function() {
			var self = this;
			self.$elem.addClass('pressed');
			self.setPosition();
			self.popup.show().css({opacity: 1}).addClass('animate-' + self.options.animation);
		},

		setPosition: function() {
			var self = this;
			self.coords = self.$elem.offset();
			var x = self.coords.left;
			var y = self.coords.top;
			var popWidth = self.popup.width();
			var popHeight = self.popup.height();
			var adjLeft = popWidth / 2;
			var adjTop = popHeight / 2;

			self.testy = $('<div class="test" />').css({display: 'inline-block', margin: '0px', padding: '0px'})
			.appendTo('body');
			var measure = self.$elem.clone().css({padding: "0px", margin: "0px"});
			var loc = self.testy;
			loc.html(measure);
			var textWidth = self.testy.width();
			var textHeight = self.testy.height();
			self.testy.remove();

			var adjMenuWidth = textWidth / 2;
			var adjMenuHeight = textHeight / 2;
			var up = y - (popHeight + 7);
			var down = y + textHeight;

			if (self.popup.hasClass('pop-top')){
					self.popup.css({top: up + "px",
					 left: (x - adjLeft + adjMenuWidth + 5) + "px",
					 right: "auto", 'z-index': self.options.zIndex});
			}

			if (self.popup.hasClass('pop-bottom')) {
					self.popup.css({top: (down + 7) + "px",
					 left: (x - adjLeft + adjMenuWidth + 5) + "px",
					 right: "auto", 'z-index': self.options.zIndex});
			}

			if (self.popup.hasClass('pop-left')) {
				self.popup.css({top: (y - adjTop + adjMenuHeight + 5) + "px",
				 left: (x - popWidth - 2) + "px",
				 right: "auto", 'z-index': self.options.zIndex});
			}

			if (self.popup.hasClass('pop-right')) {
				self.popup.css({top: (y - adjTop + adjMenuHeight + 5) + "px",
				 left: (x + textWidth + 12) + "px",
				 right: "auto", 'z-index': self.options.zIndex});
			}
		}
	};

//************************************************************************************
	$.fn.popup = function(options) {
		return this.each(function() {
			var popobject = Object.create(Popup);
			popobject.init(options, this);
		});
	};

}(jQuery));