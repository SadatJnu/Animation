$(document).ready( function() {
	
	// themes
	var $theme1 = 'blue',
		$theme2 = 'teal';
	
	// handlers
	var $card = $('#card'),
		$mainmenu = $card.find('.mainmenu'),
		$submenu = $card.find('.submenu');
	
	// initial setup
	$mainmenu.children('li').addClass($theme1).addClass('blue-border');
	$card.find('#front,#back').addClass($theme1);
	$submenu.find('.expand-triangle').addClass($theme1);
	$submenu.hide();
	
	// clicking on submenu items puts green light on left
	$submenu.on('click','li', function() {
		$submenu.siblings().find('li:not(#theme1,#theme2)').removeClass('chosen');
		$(this).addClass('chosen');
	});
	
	// set theme1
	$submenu.on('click', '#theme1', function() {
		$(this).next('#theme2').removeClass('chosen');
		$mainmenu.children('li')
			.addClass($theme1).addClass('blue-border')
			.removeClass($theme2).removeClass('teal-border');
		$card.find('#front,#back')
			.addClass($theme1)
			.removeClass($theme2);
		$submenu.find('.expand-triangle').addClass($theme1).removeClass($theme2);
	});
	
	// set theme2
	$submenu.on('click', '#theme2', function() {
		$(this).prev('#theme1').removeClass('chosen');
		$mainmenu.children('li')
			.addClass($theme2).addClass('teal-border')
			.removeClass($theme1).removeClass('blue-border');
		$card.find('#front,#back')
			.addClass($theme2)
			.removeClass($theme1);
		$submenu.find('.expand-triangle').addClass($theme2).removeClass($theme1);
	});

	// click on menu expands submenu and closes others' submenu
	$mainmenu.on('click', 'li', function() {
		$(this).next('.submenu').slideToggle().siblings('.submenu').slideUp();
	});
	
	// click logout -> flip to power
	$mainmenu.children('li:last-child').on('click', function() {
		
		// close all submenus before flipping,
		// so height of card is always same at flip time
		$submenu.slideUp(200);
		
		setTimeout(function(){
			$card.addClass('flipback');
		},300);
		
		if($card.hasClass('flip')) {
			setTimeout(function(){
				$card.removeClass('flip');
			},300);
		}
	});
	
	// click on power -> flip to menu
	$('.power').on('click', function() {
		
		setTimeout(function(){
			$card.addClass('flip');
		},300);
		
		if($card.hasClass('flipback')) {
			setTimeout(function(){
				$card.removeClass('flipback');
			},300);
		}
		
		$submenu.first().delay(900).slideDown(400);
	});
});