// FlickSlide v1.0.2
// Copyright (c) 2011 Kosuke Araki - twitter：@kaleido_kosuke
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
// 変更：
(function ($)
{
    $.fn.flickSlide = function (settings)
    {
        var strUA = navigator.userAgent.toLowerCase(), 
		webkitUA = ['ipod', 'iphone', 'android', 'ipad'], 
		runiLayout = false, 
        iLayoutLocation = '', 
		currentX = 0, 
		maxX = 0, 
		slideObj = {}, 
		slideLock = 0, 
		slideTimer = {},
        slideLotation = {}, 
		slideDuration = 4000, 
		slideCount = 0, 
		pagerMax = 0, 
		orientationChangeDelay = 0;
		
		var settings = $.extend({
            target : '', 
			colum : 1, 
			height : 170, 
			duration : 4000, 
			pager : false, 
			autoSlide : false, 
			afterInit : null, 
			startSlide : null, 
			afterSlide : null
        }, settings);
		
		
        for (var i = 0; i < webkitUA.length; i++)
        {
            if (strUA.indexOf(webkitUA[i], 0) !=- 1)
            {
                runiLayout = true;
                if (webkitUA[i] === 'android') {
                    orientationChangeDelay = 400
                }
                if (webkitUA[i] === 'iphone') {
                    orientationChangeDelay = 0;
                }
            }
        }
        if (runiLayout !== true) {
            return;
        }
        if (typeof $(this) === undefined || $(this).length === 0) {
            return;
        }
        window.addEventListener("orientationchange", function ()
        {
            if (runiLayout !== true) {
                return
            }
            switch (window.orientation)
            {
                case 0:
                    orientationChangeCore();
                    break;
                case 90:
                    orientationChangeCore();
                    break;
                case - 90:
                    orientationChangeCore();
                    break;
				case 180:
                    orientationChangeCore();
                    break;
            }
        }, false);
        function orientationChangeCore()
        {
			if(settings.autoSlide){
				clearTimeout(slideTimer);
			}
            setTimeout(function ()
            {
                var styles = getComputedStyle($('.moveWrap').get(0));
                if (styles)
                {
                    $('.resizable').css('width', styles.width);
                    $('.slideMask').css('height', $('.move').outerHeight()).css('width', styles.width - 1);
                    maxX = Number($('.flickSlideContainer li.slideUnit').length - 1) * Number(styles.width.replace('px', '')) *- 1;
                    
					/*
					$('div.flickSlideContainer ul.move').get(0).style.webkitTransform = 'translate3d(0,0,0)';
                    currentX = 0;
                    slideCount = 0;
                    slidePager();
					if(settings.autoSlide){
						slideTimer = setTimeout(lotation, slideDuration);
					}
					*/
					
					slideObj.get(0).style.webkitTransition = '-webkit-transform 0.0s ease-out';
					var slideUnitWidth = wrap.contents().find('li.slideUnit').outerWidth();
					slideLock = 1;
					currentX = -(slideUnitWidth * slideCount);
					//console.log(slideCount + " : " + currentX);
					slideObj.get(0).style.webkitTransform = 'translate3d(' + currentX + 'px, 0, 0)';
					slidePager();
					if(settings.autoSlide){
						slideTimer = setTimeout(lotation, slideDuration);
					}
					slideLock = 0;
					
                }
                else{}
            },
            orientationChangeDelay);
        }
        function lotation()
        {
            if (slideLock === 0)
            {
                var slideUnitWidth = slideObj.children('li.slideUnit').outerWidth();
                slideObj.get(0).style.webkitTransition = '-webkit-transform 0.6s ease-out';
                diffX =- 151;
                if (currentX === maxX)
                {
                    slideObj.get(0).style.webkitTransform = 'translate3d(0, 0, 0)';
                    currentX = 0;
                    slideCount = 0;
                    slidePager();
                }
                else
                {
                    currentX = currentX - slideUnitWidth;
                    slideObj.get(0).style.webkitTransform = 'translate3d(' + currentX + 'px, 0, 0)';
                    slideCount++;
                    slidePager();
                }
            }
            slideLock = 0;
			if(settings.autoSlide){
				slideTimer = setTimeout(lotation, slideDuration);
			}
        }
        function slidePager()
        {
            var currentPager = $('.slidePagerPointer.active');
            var nextID = '#pager' + String(slideCount);
            currentPager.removeClass('active');
            $(nextID).addClass('active');
            switch (slideCount)
            {
                case 0:
                    $('.flickSlideBottom .bottomLeft').addClass('off');
                    $('.flickSlideBottom .bottomRight').removeClass('off');
                    break;
                case pagerMax:
                    $('.flickSlideBottom .bottomRight').addClass('off');
                    $('.flickSlideBottom .bottomLeft').removeClass('off');
                    break;
                default:
                    $('.flickSlideBottom .bottomLeft').removeClass('off');
                    $('.flickSlideBottom .bottomRight').removeClass('off');
                    break;
            }
        }
		function webkitTransitionStart(event)
        {
			diffX = 0;
			if(settings.startSlide){
				settings.startSlide(event, slideCount, currentX);
			}
		}
		function webkitTransitionComplete(event)
        {
			if(settings.afterSlide){
				if(event){
					settings.afterSlide(event, slideCount, currentX);
				}else{
					settings.afterSlide(null, slideCount, currentX);
				}
			}
		}
		function gotoSlide(num)
        {
			var dNum = num - slideCount;
			var direction = 'prev';
			if(dNum > 0){
				direction = 'next';
			}
			if(dNum != 0){
				slideCount = num;
				
				webkitTransitionStart();
				
				var slideUnitWidth = wrap.contents().find('li.slideUnit').outerWidth();
				slideLock = 1;
				if(settings.autoSlide){
					clearTimeout(slideTimer);
				}
				slideObj.get(0).style.webkitTransition = '-webkit-transform 0.6s ease-out';
				if (direction === 'prev')
				{
					if (currentX == 0)
					{
						slideObj.get(0).style.webkitTransform = 'translate3d(0, 0, 0)';
						if(settings.autoSlide){
							slideTimer = setTimeout(lotation, slideDuration);
						}
						slideLock = 0;
					}
					else
					{
						currentX = currentX - (slideUnitWidth * dNum);
						slideObj.get(0).style.webkitTransform = 'translate3d(' + currentX + 'px, 0, 0)';
						//slideCount--;
						slidePager();
						if(settings.autoSlide){
							slideTimer = setTimeout(lotation, slideDuration);
						}
						slideLock = 0;
					}
				}
				else if (direction === 'next')
				{
					if (currentX === maxX)
					{
						slideObj.get(0).style.webkitTransform = 'translate3d(' + maxX + 'px, 0, 0)';
						if(settings.autoSlide){
							slideTimer = setTimeout(lotation, slideDuration);
						}
						slideLock = 0;
					}
					else
					{
						currentX = currentX - (slideUnitWidth * dNum);
						slideObj.get(0).style.webkitTransform = 'translate3d(' + currentX + 'px, 0, 0)';
						//slideCount++;
						slidePager();
						if(settings.autoSlide){
							slideTimer = setTimeout(lotation, slideDuration);
						}
						slideLock = 0;
					}
				}
			}
		}
		function gotoFade(num)
        {
			var dNum = num - slideCount;
			slideCount = num;
			
			webkitTransitionStart();
			
			var slideUnitWidth = wrap.contents().find('li.slideUnit').outerWidth();
			slideLock = 1;
			if(settings.autoSlide){
				clearTimeout(slideTimer);
			}
			slideObj.get(0).style.webkitTransition = '-webkit-transform 0.0s ease-out';
			
			currentX = currentX - (slideUnitWidth * dNum);
			slideObj.get(0).style.webkitTransform = 'translate3d(' + currentX + 'px, 0, 0)';
			//slideCount--;
			slidePager();
			if(settings.autoSlide){
				slideTimer = setTimeout(lotation, slideDuration);
			}
			slideLock = 0;
			
			webkitTransitionComplete();
		}
        $.fn.slideButton = function (settings)
        {
            var settings = $.extend({
                direction : 'prev', widthSource : {}
            }, settings);
            var self = $(this);
            self.click(function ()
            {
				webkitTransitionStart();
				
                var slideUnitWidth = settings.widthSource.outerWidth();
                slideLock = 1;
				if(settings.autoSlide){
					clearTimeout(slideTimer);
				}
                slideObj.get(0).style.webkitTransition = '-webkit-transform 0.6s ease-out';
                if (settings.direction === 'prev')
                {
                    if (currentX == 0)
                    {
                        slideObj.get(0).style.webkitTransform = 'translate3d(0, 0, 0)';
                        if(settings.autoSlide){
							slideTimer = setTimeout(lotation, slideDuration);
						}
                        slideLock = 0;
                    }
                    else
                    {
                        currentX = currentX + slideUnitWidth;
                        slideObj.get(0).style.webkitTransform = 'translate3d(' + currentX + 'px, 0, 0)';
                        slideCount--;
                        slidePager();
						if(settings.autoSlide){
							slideTimer = setTimeout(lotation, slideDuration);
						}
                        slideLock = 0;
                    }
                }
                else if (settings.direction === 'next')
                {
                    if (currentX === maxX)
                    {
                        slideObj.get(0).style.webkitTransform = 'translate3d(' + maxX + 'px, 0, 0)';
                        if(settings.autoSlide){
							slideTimer = setTimeout(lotation, slideDuration);
						}
                        slideLock = 0;
                    }
                    else
                    {
                        currentX = currentX - slideUnitWidth;
                        slideObj.get(0).style.webkitTransform = 'translate3d(' + currentX + 'px, 0, 0)';
                        slideCount++;
                        slidePager();
                        if(settings.autoSlide){
							slideTimer = setTimeout(lotation, slideDuration);
						}
                        slideLock = 0;
                    }
                }
				
            });
        }
        $.fn.touchDrag = function (settings)
        {
			diffX = 0;
			
            var settings = $.extend({
                slideDuration : 4000
            }, settings);
            slideObj = $(this);
            slideDuration = settings.slideDuration;
            slideObj.bind('touchstart', {
                type : 'start'
            }, touchHandler);
            slideObj.bind('touchmove', {
                type : 'move'
            }, touchHandler);
            slideObj.bind('touchend', {
                type : 'end'
            }, touchHandler);
			
			slideObj.bind('webkitTransitionEnd', webkitTransitionComplete);
			
            function touchHandler(e)
            {
				if(slideCount != 0){
					e.preventDefault();
				}
                
				var slideUnitWidth = slideObj.children('li.slideUnit').outerWidth();
                var touch = e.originalEvent.touches[0];
                if (e.type == "touchstart")
                {
					if(settings.autoSlide){
						clearTimeout(slideTimer);
					}
                    startX = touch.pageX;
                    startY = touch.pageY;
                    startTime = (new Date()).getTime();
                }
                else if (e.type == "touchmove")
                {
                    diffX = touch.pageX - startX;
                    diffY = touch.pageY - startY;
                    if (Math.abs(diffX) - Math.abs(diffY) > 0)
                    {
                        e.preventDefault();
                        moveX = Number(currentX + diffX);
                        slideObj.css('-webkit-transition', 'none');
                        slideObj.get(0).style.webkitTransform = 'translate3d( ' + moveX + 'px, 0, 0)';
						
						//webkitTransitionStart(e);
                    }
                }
                else if (e.type == "touchend")
                {
                    var endTime = (new Date()).getTime();
                    var diffTime = endTime - startTime;
                    if (diffTime < 300) {
                        slideObj.get(0).style.webkitTransition = '-webkit-transform 0.5s ease-out';
                    }
                    else {
                        slideObj.get(0).style.webkitTransition = '-webkit-transform 0.6s ease-out';
                    }
                    if (diffX > 150 || (diffX > 60 && diffTime < 400 && orientationChangeDelay === 0))
                    {
                        if (currentX == 0) {
                            slideObj.get(0).style.webkitTransform = 'translate3d(0, 0, 0)';
                        }
                        else
                        {
                            currentX = currentX + slideUnitWidth;
                            slideObj.get(0).style.webkitTransform = 'translate3d(' + currentX + 'px, 0, 0)';
                            slideCount--;
                            slidePager();
                        }
                    }
                    else if (diffX <- 150 || (diffX <- 60 && diffTime < 400 && orientationChangeDelay === 0))
                    {
                        if (currentX === maxX) {
                            slideObj.get(0).style.webkitTransform = 'translate3d(' + maxX + 'px, 0, 0)';
                        }
                        else
                        {
                            currentX = currentX - slideUnitWidth;
                            slideObj.get(0).style.webkitTransform = 'translate3d(' + currentX + 'px, 0, 0)';
                            slideCount++;
                            slidePager();
                        }
                    }
                    else
                    {
                        if (currentX === 0) {
                            slideObj.get(0).style.webkitTransform = 'translate3d(0, 0, 0)';
                        }
                        else if (currentX === maxX) {
                            slideObj.get(0).style.webkitTransform = 'translate3d(' + maxX + 'px, 0, 0)';
                        }
                        else {
                            slideObj.get(0).style.webkitTransform = 'translate3d(' + currentX + 'px, 0, 0)';
                        }
                    }
					if(settings.autoSlide){
						slideTimer = setTimeout(lotation, slideDuration);
					}
                    slideLock = 0;
					webkitTransitionStart(e);
					if(diffX == 0){
						webkitTransitionComplete(null);
					}
                }
            }
            if(settings.autoSlide){
				slideTimer = setTimeout(lotation, slideDuration);
			}
        }
        
        var contents = $(this);
		var contentsLength = contents.length;
        var wrap = $('<div class="flickSlideContainer"><div class="moveWrap"><ul class="move"></ul></div></div>');
        var slideMask = $('<div class="slideMask resizable"></div>');
		if(!settings.pager){
			var bottom = $('<div class="flickSlideBottom"><div class="bottomLeft off"></div><ul class="slidePager"></ul><div class="bottomRight"></div></div>');
		}
        $(this).contents().find('img').not('.toplink_img').removeAttr('width').removeAttr('height').css({
            width : '100%', height : 'auto'
        });
        var loop = Math.floor(contentsLength / settings.colum);
        loop = contentsLength % settings.colum > 0 ? loop++: loop;
        pagerMax = loop - 1;
        var contentsCount = 0;
        for (var i = 0; i < loop; i++)
        {
            var unitElem = $('<li/>').addClass('slideUnit').addClass('resizable');
            var pager = $('<li id="pager' + i + '" class="slidePagerPointer"></li>');
            if (i === 0) {
                pager.addClass('active')
            }
            for (var j = 0; j < settings.colum; j++)
            {
                var itemElem = $('<div/>');
				if (typeof contents[contentsCount] !== undefined) {
                    itemElem.append($(contents[contentsCount]).children());
                }
				//itemElem.append($(contents[contentsCount]).children().html());
				unitElem.append(itemElem);
				contentsCount++;
            }
			wrap.contents().find('ul.move').append(unitElem);
			if(!settings.pager){
				bottom.children('ul.slidePager').append(pager);
			}
        }
		
        $(settings.target).after(wrap);
        $(settings.target).remove();
		if(!settings.pager){
			bottom.children('.bottomLeft').slideButton({
				direction : 'prev', widthSource : wrap.contents().find('li.slideUnit')
			});
			bottom.children('.bottomRight').slideButton({
				direction : 'next', widthSource : wrap.contents().find('li.slideUnit')
			});
		}
        wrap.contents().find('ul.move').touchDrag({
            duration : settings.duration
        });
		
		if(!settings.pager){
			wrap.after(bottom);
			//bottom.hide();
		}
		
		$(function() {
			var styles = getComputedStyle($('.moveWrap').get(0));
			if (styles) {
				$('.resizable').css('width', styles.width);
				$('.slideMask').css('height', $('.move').outerHeight()).css('width', styles.width);
				maxX = Number($('.flickSlideContainer li.slideUnit').length - 1) * Number(styles.width.replace('px', '')) *- 1;
			}
			var slideFirstChild = $('ul.move li:first').clone();
			$('ul.move').show();
			
			if(settings.afterInit){
				settings.afterInit(gotoSlide, gotoFade, orientationChangeCore);
			}
		});
    }
})(jQuery);
var is = 
{
    ie : navigator.appName == 'Microsoft Internet Explorer', java : navigator.javaEnabled(), ns : navigator.appName == 'Netscape', 
    ua : navigator.userAgent.toLowerCase(), version : parseFloat(navigator.appVersion.substr(21)) || parseFloat(navigator.appVersion), 
    win : navigator.platform == 'Win32'
}
is.mac = is.ua.indexOf('mac') >= 0;
if (is.ua.indexOf('opera') >= 0) {
    is.ie = is.ns = false;
    is.opera = true;
}
if (is.ua.indexOf('gecko') >= 0) {
    is.ie = is.ns = false;
    is.gecko = true;
}