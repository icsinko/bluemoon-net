var rmtPlayer = null;
var ua = getUa();

if(ua[0] === 'android' && ua[1] <= 2.3) {
	soundManager.useHTML5Audio = false;
}


$(function() {
	if(ua[0] === 'android' && ua[1] <= 2.3) {
		$('.gnav').css('position', 'absolute');
	}

	$('.carousel-1').carousel({
		pagination: false,
		continuous: true,
		itemsPerTransition: 5
	});

	// Player
	soundManager.setup({
	  url: 'includes/templates/sweetsoulshop/jscript/swf/soundmanager2_flash9_debug.swf',
	  flashVersion: 9,
	  onready: function() {
	  }
	});

	rmtPlayer = new RmtPlayer();
	
	$('.player-play p').on('click', function(e) {
		e.stopPropagation();
	});
	$('.player-play').on('click', function(e) {
		var mp3url = $(this).data('mp3');
		if(typeof(mp3url) === 'undefined') mp3url = $(this).closest('li').data('mp3');
		if(typeof(mp3url) === 'undefined') return false;

		var title = $(this).data('title');
		if(typeof(title) === 'undefined') title = $(this).closest('li').data('title');
		if(typeof(title) === 'undefined') return false;		

		var price = $(this).data('price');
		if(typeof(price) === 'undefined') price = $(this).closest('li').data('price');
		if(typeof(price) === 'undefined') return false;		

		e.preventDefault();
		
		rmtPlayer.setSong(mp3url, {
			title: title,
			price: price,
			autoPlay: true
		});
		
		return false;
	});

	//Thumbnail mask 
	$('.mask').on({
		"mouseenter": function() {
			$(this).addClass('hover');
		},
		"mouseleave": function() {
			$(this).removeClass('hover');
		},
		"touchend": function() {
			if($(this).hasClass('hover')) {
				$(this).removeClass('hover');
			} else {
				$(this).addClass('hover');
			}
		}
	});
	
	//Share
	var showModalShare = function(e) {
		var x = e.clientX - 64;
		var y = e.clientY - 70;
		$('#modal-share').css({"top": y, "left": x, "display": "block"}).animate({"opacity": 1}, 300);
	};

	var $modalShare = $('#modal-share');
	$('.btn-share').click(function(e) {
		var url = $(this).closest('.share-item').data('shareurl');
		var title = $(this).closest('.share-item').data('sharetitle');

		$modalShare.data({url: url, title: title});
		if($modalShare.css('display') !== 'none') {
			$modalShare.animate({"opacity": 0}, 300, function() {
				showModalShare(e);
			})
		} else {
			showModalShare(e);
		}
	})
	
	$('.btn-share-close').click(function() {
		$modalShare.animate({"opacity": 0}, 300, function() {
			$(this).css({"display": "none"});
		})
	});
	
	$('.btn-share-facebook').click(function(e) {
		e.preventDefault();
		
		var url = $(this).closest('#modal-share').data('url');
		var title = $(this).closest('#modal-share').data('title');
		var target = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(title);
		window.open(target, null, 'width=550px,height=350px');
		
		return false;
	});	
		
	$('.btn-share-twitter').click(function(e) {
		e.preventDefault();
		
		var url = $(this).closest('#modal-share').data('url');
		var title = $(this).closest('#modal-share').data('title');
		var target = 'https://twitter.com/intent/tweet?status=' + encodeURIComponent(title) + ' ' + encodeURIComponent(url) + '&url=' + encodeURIComponent(title);
		window.open(target, null, 'width=550px,height=350px');
		
		return false;
	});	
		
	$('.btn-share-google').click(function(e) {
		e.preventDefault();
		
		var url = $(this).closest('#modal-share').data('url');
		var title = $(this).closest('#modal-share').data('title');
		var target = 'https://plus.google.com/share?url=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(title) + '&gpsrc=frameless&partnerid=frameless';
;
		window.open(target, null, 'width=550px,height=350px');
		
		return false;
	});	
			


	//Pulldown
	$('.gnav-search-pc').on({
		"mouseenter": function() {
			$('.gnav-search-pulldown').fadeIn(200);
		},
		"mouseleave": function() {
			$('.gnav-search-pulldown').fadeOut(140);
		}
	});

	
	//Drawbar
	var adjustDrawbar = function() {
		$('.rmt-drawbar').height($('#content').height());
	};

	var hideDrawbar = function() {
		$(document.body).removeClass('on-drawbar').data('isDrawing', 0);
	};
	
	var showDrawbar = function() {
		$('#content').css({"padding-top": "0"});
		$('.rmt-drawbar').css({
			"display": "block",
			"transition-duration": 0});
		$(document.body).addClass('on-drawbar').data('isDrawing', 1);
	  $('body,html').animate({scrollTop:0}, 300, 'swing');
	};
	
	$('.gnav-search-sp a').on('mouseup touchend', function(e) {
		e.preventDefault();
		switch($(document.body).data('isDrawing')) {
			case 1:
				hideDrawbar();
				break;
			default:
				showDrawbar();
				break;
		}
	});
	
	$('#content').on('oTransitionEnd mozTransitionEnd webkitTransitionEnd', function() {
		if($(document.body).data('isDrawing') == 1) {
			adjustDrawbar();
		} else {
			$('#content').css({"padding-top": ""});
			$('.rmt-drawbar').css({"display": "none"});
		}
	});
	

	$(window).on('resize', adjustDrawbar);

	//SmoothScroll
	$('a[rel=smoothScroll]').click(function() {
	  var speed = 400;
	  var href= $(this).attr("href");
	  var target = $(href == "#" || href == "" ? 'html' : href);
	  var position = target.offset().top;
	  $('body,html').animate({scrollTop:position}, speed, 'swing');
	  return false;
	});

	//CSS3 pie
  if (window.PIE) {
    $('.gnav li, .btn-buy').each(function() {
      PIE.attach(this);
    });
  }
	
});




/**
	@return ['iphone'|'ipad'|'android'|'opera'|'ie', (versionNum)|'legacy']
*/
function getUa() {
	var userAgent = window.navigator.userAgent.toLowerCase(),
		appVersion = window.navigator.appVersion.toLowerCase(),
		ua = '',ver = '';
	if (userAgent.indexOf('iphone') > 0 && userAgent.indexOf('ipad') === -1) {
		ua = 'iphone';
		if(userAgent.indexOf('iphone os 6') > 0) ver = 6;
		else if(userAgent.indexOf('iphone os 5') > 0) ver = 5;
		else ver = 4;
	} else if (userAgent.indexOf('ipad') > 0) {
		ua = 'ipad';
		if(userAgent.indexOf('cpu os 6') > 0) ver = 6;
		else if(userAgent.indexOf('cpu os 5') > 0) ver = 5;
		else ver = 4;
	} else if (userAgent.indexOf('android') > 0) {
		ua = 'android';
 		ver = userAgent.substr(userAgent.indexOf('android')+8, 3);
	} else if (userAgent.indexOf('opera') != -1) {
	  ua = 'opera';
	} else if (userAgent.indexOf('msie') != -1) {
		if (appVersion.indexOf("msie 6.") != -1 || appVersion.indexOf("msie 7.") != -1 || appVersion.indexOf("msie 8.") != -1) {
	    ua = 'ie';
	    ver = 'legacy';
	  } else {
	    ua = 'ie';
	  }	
	} else if (userAgent.indexOf('chrome') != -1) {
	  ua = 'chrome';
	} else if (userAgent.indexOf('safari') != -1) {
	  ua = 'safari';
	} else if (userAgent.indexOf('gecko') != -1) {
	  ua = 'gecko';
	} else {
	  ua = 'unknown';
	}
	return [ua,ver];
}



/* jQuery.tile.js */
(function(a){a.fn.tile=function(b){var c,d,e,f,g=this.length-1,h;if(!b)b=this.length;this.each(function(){h=this.style;if(h.removeProperty)h.removeProperty("height");else if(h.removeAttribute)h.removeAttribute("height")});return this.each(function(h){e=h%b;if(e==0)c=[];c[e]=a(this);f=c[e].height();if(e==0||f>d)d=f;if(h==g||e==b-1)a.each(c,function(){this.height(d)})})}})(jQuery)

