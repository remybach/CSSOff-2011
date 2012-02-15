var MOBILE = (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) != null;

jQuery(function($) {
	checkResponsiveness();

	$('nav').click(function() {
		// The menu only needs to toggle on smaller screens.
		if ($(window).width() <= 720) { $('nav ul').slideToggle(); }
	});

	$('nav a').click(function(e) {
		var href = $(this).attr('href');
		var pOffset = $(href).offset().top;
		$('html,body').animate({ scrollTop:pOffset+'px' }, 1000, 'easeInOutQuint', function() {
			// Do this after the animation completes so as to still preserve hash linking without screwing up the animation.
			location.href = href;
		});
		e.preventDefault();
	});

	$('#obstacles li').click(function(e) {
		// We only want to have this functionality when the area showing more info is visible
		if ($('#obstacles .grid_6.omega').is(':visible')) {
			e.preventDefault();

			if (!$(this).hasClass('current')) {
				$('#obstacles .current').removeClass('current');
				$(this).addClass('current');
				var _this = $(this);

				$('#obstacles .grid_6.omega').fadeOut(150, function() {
					$(this).attr('class', 'grid_6 omega')
						.addClass(_this.data('obstacle'))
						.find('h3').html(_this.find('.title').html()).parents('.splat')
						.find('h4').html(_this.find('.desc').html());
					$(this).fadeIn(150, function() {
						// remove the style="display:block;" here as it messes with our responsive stylesheets.
						$(this).removeAttr('style');
					});
				});
			}
		}
	});

	$('input').superLabels({ labelLeft:17, labelTop:12 });
	$('select').selectBox({
		menuSpeed:'fast',
		menuTransition:'slide'
	});

	// Make the clock tick
	setInterval(function() {
		num = Number($('.clock').html())-1;
		
		if (num < 0) {
			num = 60;
		} else if (num < 10) {
			num = '0'+num;
		}
		$('.clock').html(num);
	}, 75); // create a sense of hurry by making it tick really fast.

	$(window).bind('resize', checkResponsiveness);

	function checkResponsiveness() {
		// Make sure our logo stays center screen.
		if ($('h1').width() > $(window).width()) {
			var _logoLeft = (-1*($('h1').width() - $(window).width())/2)-15; // -15 because the splat means the triple dare text isn't quite centered
			$('h1').css({ left:_logoLeft, position:'relative' });
		}
	}
});