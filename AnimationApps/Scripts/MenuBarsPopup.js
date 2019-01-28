/*jshint multistr: true */
;(function($) {
	$(document).ready(function() {
		var transport = '<div>\
							<a href="#"><i id="plane" class="fa fa-plane"></i></a>\
							<a href="#"><i id="car" class="fa fa-car"></i></a>\
							<a href="#"><i id="bus" class="fa fa-bus"></i></a>\
							<a href="#"><i id="bicycle" class="fa fa-bicycle"></i></a>\
					 	 </div>';
		var starwars = '<div>\
							<a id="rebs" href="./PopupResult.html#rebel"><i id="rebels" class="fa fa-ra"></i></a>\
							<a id="imperial" href="./PopupResult.html#empire"><i id="imperials" class="fa fa-empire"></i></a>\
						    <a id="firstO" href="./PopupResult.html#firstOrder"><i id="firstOrder" class="fa fa-first-order"></i></a>\
						</div>';
		var smileys =  '<div>\
							<a href="#"><i id="v-hap" class="material-icons">sentiment_very_satisfied</i></a>\
							<a href="#"><i id="hap" class="material-icons">sentiment_satisfied</i></a>\
							<a href="#"><i id="neut" class="material-icons">sentiment_neutral</i></a>\
							<a href="#"><i id="unhap" class="material-icons">sentiment_dissatisfied</i></a>\
							<a href="#"><i id="v-unhap" class="material-icons">sentiment_very_dissatisfied</i></a>\
					    </div>';
		var homeCallPic = '<div>\
							<a href="#"><i id="home" class="material-icons">home</i></a>\
							<a href="#"><i id="call" class="material-icons">call</i></a>\
							<a href="#"><i id="chat" class="material-icons">chat</i></a>\
							<a href="#"><i id="mail" class="material-icons">mail_outline</i></a>\
							<a href="#"><i id="camera" class="material-icons">camera_alt</i></a>\
						   </div>';
//call popup, pass through options
	//	$('div[data-popup="myPopUp"]').popup({	//call popup on the element the popup will be attached to
		$('[name="menu1"]').popup({
			content: transport, //the menu to be appended

			position: "top",	//where the popup will show by default- top, right, bottom, or left

			style: "",		//colour theme for the popup, "" for default, blue, red, green, custom

			animation: "bounce",	//choose how the popup will appear/disappear
										//standard, flip, grow, bounce

			event: "click",		//activate popup by click or by hover

			hideOnClick: true,	//if event is click, set to true to close menu when clicking off of it	

			zIndex: 100,	//make the popup appear above other elements

			popItemClick: function() {

				switch ($(event.target).attr('id')) {
					case "plane":
						alert("You chose the Plane!");
						break;
					case "car":
						alert("You chose the Car!");
						break;
					case "bus":
						alert("You chose the Bus!");
						break;
					case "bicycle":
						alert("You chose the Bike!");
						break;
					default:
						alert("Error!");
				}
			}
		});

		$('#myPopUp2').popup({	
			content: starwars,	

			position: "left",	

			style: "red",		

			animation: "flip",	

			event: "click",		

			hideOnClick: true,	

			zIndex: 100,

			popItemClick: function() {
				
				switch ($(event.target).attr('id')) {
					case "rebels":
						window.location = ($('#rebs').attr('href'));
						break;
					case "imperials":
						window.location = ($('#imperial').attr('href'));
						break;
					case "firstOrder":
						window.location = ($('#firstO').attr('href'));
						break;
					default:
						alert("Error!");
				}
			}
		});

		$('#myPopUp3').popup({	
			content: smileys,	

			position: "right",	

			style: "custom",		

			animation: "standard",	

			event: "hover",		

			hideOnClick: true,	

			zIndex: 100,

			popItemClick: function() {
				var self = this;
				var loc;
				var content;				
				var container = $(event.target).attr("id");

				$(document).on('click', function(event) {
					if (($(event.target).attr("id") != container)) {
						$('.moods').remove();						
					} else {
						if ($('.moods').length) {
							$('.moods').remove();
						}
						self.moody = $('<div class="moods" />')
						.append('<div class="pop-mood" />').append('<i class="material-icons"></i>')
						.appendTo('body').css('opacity', 0).hide();
						loc = self.moody.find("i");

						switch ($(event.target).attr('id')) {
							case "v-hap":
								content = ('sentiment_very_satisfied');
								loc.html(content);
								self.moody.find('i').addClass('very-happy');
								self.moody.css('opacity', 1).fadeIn('slow');
								break;
							case "hap":
								content = ('sentiment_satisfied');
								loc.html(content);
								self.moody.find('i').addClass('happy');
								self.moody.css('opacity', 1).fadeIn('slow');
								break;
							case "neut":
								content = ('sentiment_neutral');
								loc.html(content);
								self.moody.find('i').addClass('neutral');
								self.moody.css('opacity', 1).fadeIn('slow');
								break;
							case "unhap":
								content = ('sentiment_dissatisfied');
								loc.html(content);
								self.moody.find('i').addClass('unhappy');
								self.moody.css('opacity', 1).fadeIn('slow');
								break;
							case "v-unhap":
								content = ('sentiment_very_dissatisfied');
								loc.html(content);
								self.moody.find('i').addClass('upset');
								self.moody.css('opacity', 1).fadeIn('slow');
								break;
							default:
								alert("Error!");
						}
					}
				});
			}
		}).draggable({containment: "document"});

		$('#myPopUp4').popup({	
			content: homeCallPic,	

			position: "bottom",	

			style: "green",		

			animation: "standard",	

			event: "click",		

			hideOnClick: true,	

			zIndex: 100,

			popItemClick: function() {
				console.log("Event: ", event.target.innerHTML);
				switch ($(event.target).attr('id')) {
					case "home":
						alert("Go Home!");
						break;
					case "call":
						alert("Call Me!");
						break;
					case "chat":
						alert("Chat to me!");
						break;
					case "mail":
						alert("Email Me!");
						break;
					case "camera":
						alert("Take a picture!");
						break;
					default:
						alert("Error!");
				}
			}
		}).draggable({containment: "document"});

		$('#textPopup').popup({	
			content: transport,	

			position: "bottom",	

			style: "blue",		

			animation: "flip",	

			event: "click",		

			hideOnClick: true,	

			zIndex: 100,

			popItemClick: function() {

				switch ($(event.target).attr('id')) {
					case "plane":
						alert("You chose the Plane!");
						break;
					case "car":
						alert("You chose the Car!");
						break;
					case "bus":
						alert("You chose the Bus!");
						break;
					case "bicycle":
						alert("You chose the Bike!");
						break;
					default:
						alert("Error!");
				}
			}
		}); 

	});
}(jQuery));