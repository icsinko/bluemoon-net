/*
 * Catalog : 2012.09.09
*/
$(document).ready(function(){
	var os = $.os.name;
	var imgsuffix = '';

if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
	 os = 'iphone';
}

	if(os == 'iphone' || os == 'ipod' || os == 'android') {
		imgsuffix = 'sp/';
	}
	
	$.spLoadStyle({
		common: "./css/catalog_sp.css"
	});
	
	$('body').delta({imgSuffix:imgsuffix});
});

(function($){
	var delta;
	$.fn.delta = delta = function(options) {

		var settings = {
			header : '#header',
			logo : '#logo',
			photodiv : '#photo',
			arrowleft : '#arrowL',
			arrowright : '#arrowR',
			loaderwrapper : '#loaderwrapper',
			sliderwrapper : '#wrapper',
			slideparent : '#wrapper ul',
			slide : '.slide',
			NumStyleThumb : 10,
			NumItemThumb : 10,
			thumbwidth : 80,
			thumbhoverwidth : 92,
			thumbpadding: 10,
			thumbarrowwidth: 30,
			imgDir : '',
			imgSuffix : '',
			startheight : '800',
			startwidth : '1200', 
			orientationChangeDelay : 0, 
			isSP : false, 
			isIE : false, 
			isIE7 : false, 
			isIE8 : false, 
			isLogoBlink: false
		};
		
		return this.each(function() {
			if ( options ) { 
				$.extend( settings, options );
			}
			delta.prototype.create(settings,this);
		});
	};
	
	delta.prototype = {
		
		galleryObj : {
			collectionObj : {
				photo : [],
				photothumb : [],
				itemxml : [],
				item : {
					itemthumb : [],
					itemphoto : [],
					modelName : [],
					modelNum : [],
					spec : [],
					eshop : [],
					schedule : [],
					storefinder : [],
					limited : []
				}
			},
			currentPage : 1,
			pages : 0,
			stylenavipage : 1, 
			isAnimate : false, 
			isShowLogo : false, 
			
			gotoFadeFunc : null, 
			gotoSlideFunc : null, 
			orientationChangeFunc : null

		},
		
		
		create: function(settings,elem) {
			this.element = $(elem);
			this.options = settings;
			this.Window = $(window);
			this.galleryObj.hash = window.location.hash.replace('/','#').split('#');
			this.galleryObj.os = $.os.name;
			this.galleryObj.mode = 'style';

if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
this.galleryObj.os = 'iphone';
}

			if(this.galleryObj.os == 'iphone' || this.galleryObj.os == 'ipod' || this.galleryObj.os == 'android' || this.galleryObj.os == 'ipad') {
				this.isSP = true;
				if (this.galleryObj.os === 'android') {
					this.orientationChangeDelay = 400
				}
				if (this.galleryObj.os === 'iphone') {
					this.orientationChangeDelay = 0;
				}
			}

			this.options.isIE = $('html').hasClass('msie');
			this.options.isIE7 = $('html').hasClass('msie7');
			this.options.isIE8 = $('html').hasClass('msie8');
			
			this.init();
		},
		
		
		init: function() {
			var self = this;
			this.galleryObj.wrapper = this.element.find(this.options.sliderwrapper);
			this.galleryObj.slideUL = this.element.find('#slide-container');
			this.galleryObj.header = this.element.find(this.options.header);
			this.galleryObj.logo = this.element.find(this.options.logo);
			this.galleryObj.photodiv = this.element.find(this.options.photodiv);
			this.galleryObj.totalpages = this.galleryObj.photodiv.find('#totalpages');
			this.galleryObj.currentpagespan = this.galleryObj.photodiv.find('#currentpage');
			this.galleryObj.arrowL = this.element.find(this.options.arrowleft);
			this.galleryObj.arrowR = this.element.find(this.options.arrowright);
			
//			this.galleryObj.logo.hide();
//			this.galleryObj.photodiv.hide();
			this.galleryObj.arrowL.hide();
//			this.galleryObj.arrowR.hide();
			
			this.setUpHtml();
		},
		
		setUpHtml: function() {
			var self = this, 
			count = 1, 
			images = [];
			
			self.options.imgDir = 'images/';
			
				var item_class = 'white';
				var image_src = self.options.imgDir + 'collection_01.jpg';
				var image_alt = 'alt';
				images.push({
					src:image_src, 
					alt:image_alt
				});
				
				self.galleryObj.collectionObj.itemxml[2] = {
					class_name: item_class, 
					image_title: image_alt, 
					image_src: image_src
				};

				var item_class = 'white';
				var image_src = self.options.imgDir + 'collection_03.jpg';
				var image_alt = 'alt';
				images.push({
					src:image_src, 
					alt:image_alt
				});
				
				self.galleryObj.collectionObj.itemxml[3] = {
					class_name: item_class, 
					image_title: image_alt, 
					image_src: image_src
				};
			
			self.galleryObj.slide = $(self.options.slide);
			self.galleryObj.pages = self.galleryObj.slide.length;
			self.galleryObj.logos = self.galleryObj.header.find('h1 img');
			this.galleryObj.totalpages.html((self.galleryObj.pages));
			self.galleryObj.imgRatio = [];
			
			self.galleryObj.slide.hide();
			self.galleryObj.slide.each(function(i){
				var my = $(this),
				ratio,
				photonum = (i+1)+'';
				
				if(photonum.length == 1) {
					photonum = '0'+(i+1);
				}
				var collectionimg = new Image();
				collectionimg.onload = function() {
					ratio = collectionimg.height/collectionimg.width;
					self.galleryObj.imgRatio[i]=ratio;
					
					//------------------------------------
					
					if(count == self.galleryObj.slide.length) {
						$('#loader').fadeOut(400);
						//------------------------------------
						self.galleryObj.slide.find('.toplink a').show().trigger('mouseover');
						self.setFlickable();
						//------------------------------------
					}
					my.children().filter(':first').fadeIn(400);
					self.ResizeImage('yes');
					
					count++;
					
					collectionimg = null;
				}
				collectionimg.src = images[i].src;
				
			});
			
			self.setiPhone();
			self.setInterface();

			$(window).bind("resize", function(){
				if(self.galleryObj.os == 'iphone' || self.galleryObj.os == 'ipad'){
					return;
				}
				self.ResizeImage('yes');
			});
			window.onorientationchange = function() {
				self.ResizeImage('yes');
			};

		}, 
		
		//iPhoneアクセス時に画像差し替える
		setiPhone: function() {
			var self = this;
			if(self.galleryObj.os == 'iphone' || self.galleryObj.os == 'ipod') {
				$('.credit').remove();
				self.galleryObj.header.css({left:8,top:10});
				self.galleryObj.arrowL.css({left:5});
				self.galleryObj.arrowR.css({right:5});
				
			}else{
				return false;
			}
		},
		
		//フリック設定
		setFlickable: function() {
			var self = this;
			
			if(!self.isSP){
				self.galleryObj.wrapper
					.flickable({
						section: '.slide',
						friction:0.4,
						elasticConstant:0.7
					})
					.bind('flickchange', function(event, ui) {
						var newslide = $(ui.newSection),
						index = self.galleryObj.slide.index(newslide);
						
						if(self.galleryObj.currentPage == index+1){
							self.changeBG();
							return false;
						}else{
							self.galleryObj.currentPage = index+1;
							self.galleryObj.currentpagespan.html((self.galleryObj.currentPage));
							self.changeBG();
						
							//window.location.hash = 'collection'+self.galleryObj.currentPage;
						}
						self.checkPage();
					});
				//self.ResizeImage('yes');
				//self.gotoPage(1);
				
			}else{
				$('#slide-container li.slide').flickSlide({
					target:'ul#slide-container', 
					afterInit: self.afterInitFunc, 
					startSlide: self.startSlideFunc, 
					afterSlide: self.afterSlideFunc
				});
				self.changeBG();
			}
			
			self.galleryObj.slide.show();
			self.galleryObj.wrapper.fadeOut(0).css({opacity:1}).fadeIn();
			
		},
		//flickSlide INIT CallBack
		afterInitFunc: function(slideFunc, fadeFunc, orientationChangeFunc) {
			var self = delta.prototype;
			
			self.galleryObj.slideUL = $('div#wrapper .flickSlideContainer div.moveWrap ul.move');
			self.galleryObj.slide = self.galleryObj.slideUL.find('.slideUnit');
			
			self.ResizeImage('yes');
			
			self.galleryObj.gotoSlideFunc = slideFunc;
			self.galleryObj.gotoFadeFunc = fadeFunc;
			self.galleryObj.orientationChangeFunc = orientationChangeFunc;
			self.galleryObj.orientationChangeFunc();
		}, 
		//flickSlide startSlide CallBack
		startSlideFunc: function(event) {
			var self = delta.prototype;
			self.galleryObj.isAnimate = true;
			//< START >
			
			if(event){
				//TouchEnd
			}else{
				//Click
			}
			
		}, 
		//flickSlide webkitTransitionEnd CallBack
		afterSlideFunc: function(event, slideCount, currentX) {
			var self = delta.prototype;
			self.galleryObj.isAnimate = false;
			//< END >
			
			if(self.galleryObj.currentPage == slideCount+1){
				self.changeBG();
				return false;
			}else{
				self.galleryObj.currentPage = slideCount+1;
				self.galleryObj.currentpagespan.html((self.galleryObj.currentPage));
				self.changeBG();
			}
			self.checkPage();
			
		}, 
		
		//画像とウィンドウのサイズの計算
		ResizeImage: function(resizeOrNot) {
			var self = this,
			//ratio = self.options.startheight/self.options.startwidth,
			browserwidth = self.Window.width(),
			browserheight = self.Window.height(),
			ulwidth = self.galleryObj.pages * browserwidth;
			
			self.galleryObj.slideUL.width(ulwidth);
			self.galleryObj.slideUL.height(browserheight);
			self.galleryObj.slide.height(browserheight);
			self.galleryObj.slide.width(browserwidth);
			
			if(!self.isSP){
				//PC
				self.galleryObj.slide.each(function(i){
					var ratio = self.galleryObj.imgRatio[i],
					my = $(this),
					slide_img_elm = my.find('.slide_img');
					
					if ((browserheight/browserwidth) < ratio){
						slide_img_elm
							.height(browserheight);
						slide_img_elm
							.width(browserheight/ratio);
						slide_img_elm
							.css({
								left: '50%',
								'margin-left': -((browserheight/ratio)/2),
								'margin-top': 0,
								top: 0,
								position: 'absolute'
							});
					} else {
						slide_img_elm
							.width(browserwidth);
						slide_img_elm
							.height(browserwidth*ratio);
						slide_img_elm
							.css({
								left: 0,
								top: '50%',
								'margin-top': -((browserwidth*ratio)/2),
								'margin-left': 0,
								position: 'absolute'
							});
					}
					self.resetToplinkSize(my, slide_img_elm, browserwidth, browserheight, ratio);
				});
			}else{
				//SP
				
				self.galleryObj.slide.each(function(i){
					var ratio = self.galleryObj.imgRatio[i],
					my = $(this),
					slide_img_elm = my.find('.slide_img');
					
					if ((browserheight/browserwidth) < ratio){
						slide_img_elm.height(browserheight);
						slide_img_elm.width(browserheight/ratio);
					} else {
						slide_img_elm.width(browserwidth);
						slide_img_elm.height(browserwidth*ratio);
					}
					self.resetToplinkSize(my, slide_img_elm, browserwidth, browserheight, ratio);
				});
			}
			
			if(resizeOrNot == 'yes'){
				var tmrfunc = function(){self.updateflickable(browserwidth);};
				//self.galleryObj.wrapper.flickable('refresh');
				//self.galleryObj.wrapper.scrollLeft(((self.galleryObj.currentPage - 1) * browserwidth)+(browserwidth/2));
				setTimeout(tmrfunc,300);
			}
		},
		resetToplinkSize: function(my, slide_img_elm, browserwidth, browserheight, ratio) {
			var self = this;
			
			if(slide_img_elm.width()){
				my.find('.toplink').each(function(){
					//var li_size = (slide_img_elm.width()) / self.options.topThumbColumnNum;
					var li_size = ((slide_img_elm.width()) / self.options.topThumbColumnNum) >> 0;
					self.setToplinkImageWH($(this), li_size);
				});
				
				if(self.isSP){
					var m_t = ((browserheight - (browserwidth * ratio)) * 0.5) > 0 ? ((browserheight - (browserwidth * ratio)) * 0.5) : 0;
					slide_img_elm.css({
						'margin-top': m_t
					});
				}
			}
		},
		setToplinkImageWH: function(ul_elm, li_size) {
			var self = this;
			
			ul_elm.find('li').each(function(){
				$(this).find('img').each(function(){
					var $img = $(this);
					
					var img_w = 0;
					var img_h = 0;
					
					var num = 0;
					if (num == 0)(function () {
						try {
							num++;
							img_w = $img.width();
							img_h = $img.height();
							if (num <= 10 && img_h == 0) {
								throw "Madayo";
							}
						} catch (error) {
							setTimeout(arguments.callee, 0);
							return;
						}
						if(num >= 10){
							img_w = li_size;
							img_h = li_size;
						}
						var li_scale_w = li_size / img_w;
						
						var $a = $img.parent().find('a');
						
						$a.width(li_size);
						$a.height(img_h * li_scale_w);
						$img.width(li_size);
						$img.height(img_h * li_scale_w);
						
					})();
				});
				
			});
			
		}, 
		
		updateflickable: function(browserwidth) {
			this.galleryObj.wrapper.flickable('refresh');
			this.galleryObj.wrapper.scrollLeft(((this.galleryObj.currentPage - 1) * browserwidth)+(browserwidth/2));
		},
		
		//メインボタン類の設定
		setInterface: function() {
			var self = this;
			
			self.galleryObj.arrowL.find('a').bind('click',function () {
				if(self.galleryObj.currentPage == 1){
					if(!self.isSP){
						self.gotoPageFade(self.galleryObj.pages, 1000, false);
					}else{
						
					}
				}else{
					if(!self.isSP){
						self.gotoPage(self.galleryObj.currentPage - 1,1000);
					}else{
						if(!self.galleryObj.isAnimate){
							if(self.galleryObj.gotoSlideFunc){
								self.galleryObj.gotoSlideFunc(self.galleryObj.currentPage - 2);
							}
						}
					}
				}
				
				return false;
			});
				
			self.galleryObj.arrowR.find('a').bind('click',function () {
				if(self.galleryObj.currentPage == self.galleryObj.pages){
					if(!self.isSP){
						self.gotoPage(2,1000);
					}else{
						if(!self.galleryObj.isAnimate){
							if(self.galleryObj.gotoSlideFunc){
								self.galleryObj.gotoSlideFunc(1);
							}
						}
					}
				}else{
					if(!self.isSP){
						self.gotoPage(self.galleryObj.currentPage + 1,1000);
					}else{
						if(!self.galleryObj.isAnimate){
							if(self.galleryObj.gotoSlideFunc){
								self.galleryObj.gotoSlideFunc(self.galleryObj.currentPage);
							}
						}
					}
				}
				
				return false;
			});
			
		},
		
		//移動後のページをチェック
		checkPage: function() {
			var self = this;
			
			var tgt_element, tgt_elements = [this.galleryObj.arrowL];
			var i, len=tgt_elements.length;
			
			if(self.galleryObj.currentPage == 1){
				for(i = 0; i < len; i++){
					tgt_element = tgt_elements[i];
					tgt_element.stop().animate(
						{ 'opacity':'0' }, 
						{
							complete: function(){
								$(this).hide();
								self.galleryObj.isShowLogo = false;
							}
						}
					);
				}
			}else{
				if(!self.galleryObj.isShowLogo){
					self.galleryObj.isShowLogo = true;
					for(i = 0; i < len; i++){
						tgt_element = tgt_elements[i];
						tgt_element.stop().show().animate(
							{ 'opacity':'1' }, 
							{
								complete: function(){
									self.deleteFilter($(this));
									if(self.galleryObj.isAnimate) {
										return false;
									}
									self.logoBlink();
								}
							}
						);
					}
				}else{
					if(self.galleryObj.isAnimate) {
						return false;
					}
					self.logoBlink();
				}
			}
		}, 
		
		logoBlink: function() {
			var self = this;
			
			if(!self.options.isLogoBlink){
				self.options.isLogoBlink = true;
				
				self.galleryObj.logo.stop().delay(300).animate(
					{ 'opacity': '0' }, 
					{ duration: 0 }
				).animate(
					{ 'opacity': '1' }, 
					{ 
						duration: 500, 
						complete: function(){
							self.deleteFilter($(this));
//							self.deleteFilter(self.galleryObj.photodiv);
							
						}
					}
				);
			}
			
		}, 
		
		deleteFilter: function(_elm) {
			var self = this;
			
			//if (! $.support.opacity) {
			if(self.options.isIE){
				//$('img').attr('src').find('.png').parent.css({
				_elm.css({
					'filter' : ''
				});
			}
			
			this.galleryObj.wrapper.css({
				'filter' : ''
			});
		}, 
		
		//hash付きURLでのアクセス時の処理 例:index.html#collection3/detail4
		checkhash: function() {
			var self = this;
			
			if(this.galleryObj.hash.length > 1) {
				if(this.galleryObj.hash[1] != 'collection1') {
					var page = Number(self.galleryObj.hash[1].replace('collection','')),
					tmrfunc = function() {self.checksecondhash();};
					
					self.gotoPage(page,1000);
					setTimeout(tmrfunc,1000);
				}
			}else {
				self.galleryObj.hash = [];
			}
			return false;
		},
		
		//hashに「/」以降がある場合の処理
		checksecondhash: function() {
			var self = this,
			firstimg = $('<img />')
							.attr({
								'src':self.galleryObj.collectionObj.photo[0],
								'class':'collectionphoto collection1'
							});
			
			self.galleryObj.slide.filter(':first').html(firstimg);
			
			if(self.galleryObj.hash.length < 3){
				_gaq.push(['_trackEvent', 'PAGE LOAD', 'DIRECT URL', self.galleryObj.hash[1]]);
				_gaq.push(['_trackPageview', self.galleryObj.hash[1]]);
				self.galleryObj.hash = [];
			}else{
				var tmrfunc = function() {clickhashitem();},
				clickhashitem = function() {
					$("#iteminfo a").click();
					if($('a[href*=#'+self.galleryObj.hash[2]+']').length > 0){
						$('a[href*=#'+self.galleryObj.hash[2]+']').filter(':first').click();
						_gaq.push(['_trackEvent', 'PAGE LOAD', 'DIRECT URL', self.galleryObj.hash[1]+'/'+self.galleryObj.hash[2]]);
						_gaq.push(['_trackPageview', self.galleryObj.hash[1]+'/'+self.galleryObj.hash[2]]);
					}
					self.galleryObj.hash = [];
				};
				
				setTimeout(tmrfunc,500);
			}
			self.galleryObj.wrapper.flickable('refresh');
			return false;
		},
		
		
		//ギャラリーのスライド処理
		gotoPageFade: function(page, speed, flg) {
			var self = this;
			
			if(flg){
				if(!self.isSP){
					//PC
					var dir = page < self.galleryObj.currentPage ? -1 : 1,
					n = Math.abs(self.galleryObj.currentPage - page),
					left = self.Window.width() * dir * n;
					
					if(self.options.isIE8){
						$('#slide-container li img').fadeIn(speed);
					}
					
					self.galleryObj.wrapper.scrollLeft(self.galleryObj.wrapper.scrollLeft() + left)
					.animate(
						{
							'opacity':'1'
						},
						{
							duration:speed, 
							complete:function(){
								self.checkPage();
							}
						}
					);
				}else{
					//SP
					if(self.galleryObj.gotoFadeFunc){
						self.galleryObj.gotoFadeFunc((page - 1));
						self.galleryObj.wrapper.animate(
							{
								'opacity':'1'
							},
							{
								duration:speed, 
								complete:function(){
									self.checkPage();
								}
							}
						);
					}
				}
				self.galleryObj.currentPage = page;
				self.checkPage();
				self.changeBG();
			}else{
				if(self.galleryObj.wrapper.is(':animated')) {
					return false;
				}
				
				if(self.options.isIE8){
					$('#slide-container li img').fadeOut(speed);
				}
				
				self.galleryObj.wrapper.animate(
					{
						'opacity':'0'
					},
					{
						duration:speed, 
						complete:function(){
							self.gotoPageFade(page, speed, true);
						}
					}
				);
			}
			
			self.checkPage();
			return false;
		},
		gotoPage: function(page,speed,updatehash,updateitem) {
			var self = this,
			dir = page < self.galleryObj.currentPage ? -1 : 1,
			n = Math.abs(self.galleryObj.currentPage - page),
			left = self.Window.width() * dir * n;
			
			if(self.galleryObj.wrapper.is(':animated')) {
				return false;
			}
			
			self.galleryObj.isAnimate = true;
			self.galleryObj.wrapper.animate(
				{
					scrollLeft:'+='+left
				},
				{
					duration:speed, 
					complete:function(){
						self.galleryObj.isAnimate = false;
						self.checkPage();
					}
				}
			);
			
			self.galleryObj.currentPage = page;
			self.checkPage();
			self.galleryObj.currentpagespan.html((self.galleryObj.currentPage));
			self.changeBG();
			
			if(updatehash !== false){
				//window.location.hash = 'collection'+self.galleryObj.currentPage;
			}
			return false;
		},
		
		changeBG: function() {
			var self = this;
			
			var bg_color = '#000';
			var txt_color = '#FFF';
			
			var logo_filter = ':first';
			
			var i, len;
			var classes = [];
			var color_class = '';
			var colors = [];
			
			if(!self.isSP){
				//PC
				var currSlide = self.galleryObj.slide.filter(function(index){return index == self.galleryObj.currentPage - 1;});
				
				if(currSlide.hasClass('black')===true){
					bg_color = '#000';
					txt_color = '#FFF';
					
					logo_filter = ':first';
					
				}else if(currSlide.hasClass('white')===true){
					bg_color = '#FFF';
					txt_color = '#000';
					
					logo_filter = ':last';
					
				}else {
					classes = currSlide.attr('class').split(' ');
					len = classes.length;
					for(i = 0; i < len; i++){
						color_class = classes[i];
						if(color_class.indexOf('colorbg') != -1){
							colors = color_class.split('-');
							bg_color = '#' + colors[0].substr(8);
							txt_color = '#' + colors[1].substr(9);
						}
					}
					logo_filter = ':first';
				}
				
			}else{
				//SP
				var item_obj = self.galleryObj.collectionObj.itemxml[self.galleryObj.currentPage - 1];
				logo_filter = ':first';
				
			}
			
			self.element.stop().animate({
				backgroundColor: bg_color
			},400);
			if(self.galleryObj.logos.filter(logo_filter).css('display') == 'block') {
				return false;
			}else {
				self.galleryObj.logos.css({display:'none'}).filter(logo_filter).css({display:'block'});
				self.galleryObj.photodiv.css({color: txt_color});
			}
			
		}
		
		
	};
})(jQuery);

$(window).load(function(){
});



$.extend({
	spLoadStyle: function(opt) {
		var opt = jQuery.extend({
			common: false,
			landscape: false,
			portrait: false
		}, opt),
		isSP = /ipod/.test(navigator.userAgent.toLowerCase()) || /iphone/.test(navigator.userAgent.toLowerCase()) || /ipad/.test(navigator.userAgent.toLowerCase()) || /android/.test(navigator.userAgent.toLowerCase()),
		d = document,
		$head = $("head"),
		linktag = function(h,m){
			var tag = d.createElement("link");
			tag.href = h;
			tag.media = m;
			tag.type = "text/css";
			tag.rel = "stylesheet";
			return tag;
		},
		addMeta_name = function(n,c){
			var tag = d.createElement("meta");
			tag.name = n;
			tag.content = c;
			return tag;
		};

		if(isSP){
			//meta
			//common
			if(opt.common) $head.append(linktag(opt.common,"only screen and (max-device-width: 1024px)"));
			//landscape
			if(opt.landscape) $head.append(linktag(opt.landscape,"all and (orientation:landscape)"));
			//portrait
			if(opt.portrait) $head.append(linktag(opt.portrait,"all and (orientation:portrait)"));
		}
		return this;
	}
});