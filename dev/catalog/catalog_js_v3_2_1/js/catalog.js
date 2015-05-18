/*
 * Catalog : 2013.03.07
 * BlueMoon-Net
 * ver : 3.2.1
*/

/*
 * トップサムネイル表示時はviewIndexをyes
 * ロゴ表示時はviewLogoをyes
 * htmlのclassはindex使用時i0からスタート
*/
$(document).ready(function(){
	var os = $.os.name;
	$('body').catalogSet();
});

(function($){
	var catalogSet;
	$.fn.catalogSet = catalogSet = function() {
		// パラメータ設定
		var settings = {
			slide : '.slide',              //スライド子要素
			slideSpeed : 1500,             //slide時のスピード
			viewIndex : 'yes',             //indexページ表示 yes or no
			viewLogo : 'yes',              //ロゴ表示 yes or no
			indexCel : 4                   //index表示時の列数
		};
		
		return this.each(function() {
			catalogSet.setParam.create(settings,this);
		});
	};

	// 初期設定
	catalogSet.setParam = {
		co : {
			currentPage : 0
		},
		
		// 画面設定
		create: function(settings,elem) {
			this.element = $(elem);
			this.options = settings;
			this.Window = $(window);

			var self = this;
			this.co.wrapper = this.element.find('#wrapper'); //#wrapper
			this.co.slideUL = this.element.find('#slide-container'); // ul
			this.co.header = this.element.find('#header'); //#header
			this.co.logo = this.element.find('#logo'); //#logo
			this.co.paging = this.element.find('#paging'); //#paging
			this.co.totalpages = this.co.paging.find('#totalpages');
			this.co.currentpagespan = this.co.paging.find('#currentpage');
			this.co.arrowL = this.element.find('#arrowL');
			this.co.arrowR = this.element.find('#arrowR');
			this.co.slide = $(self.options.slide);

			// IE対応
			this.co.userAgent = window.navigator.userAgent.toLowerCase();
			this.co.appVersion = window.navigator.appVersion.toLowerCase();
			if (this.co.userAgent.indexOf("msie") != -1) {
				if (this.co.appVersion.indexOf("msie 6.") != -1) {
					this.co.ieVer = 'ie6';
				} else if (this.co.appVersion.indexOf("msie 7.") != -1) {
					this.co.ieVer = 'ie7';
				} else if (this.co.appVersion.indexOf("msie 8.") != -1) {
					this.co.ieVer = 'ie8';
				} else if (this.co.appVersion.indexOf("msie 9.") != -1) {
					this.co.ieVer = 'ie9';
				} else {
					this.co.ieVer = 'ie';
				}
			}else{
				this.co.ieVer = 'noie';
			}
			if(this.co.ieVer != 'ie9' && this.co.ieVer != 'noie'){
				// IE8以下の時はflicksnap.jsを使えないため削除
				var flickjs = document.getElementsByTagName("script")[1];
				flickjs.parentNode.removeChild(flickjs);
				// 代わりにflickable.jsを使用
				var d = document,
				$head = $("head"),
				tag = d.createElement("script");
				tag.src = "js/jquery.flickable-1.0b3.min.js";
				tag.type = "text/javascript";
				$head.append(tag);
			}

			// sp対応
			this.co.os = $.os.name;
			if(this.co.os == 'iphone' || this.co.os == 'ipod' || this.co.os == 'android' || this.co.os == 'ipad') {
				this.isSP = true;
			}

			// hash
			this.co.hash = window.location.hash;
			this.co.tgt_page = parseFloat(this.co.hash.substr(this.co.hash.indexOf("#page_") + 6));
//console.log(this.co.tgt_page);

			// 初期非表示
			this.co.slide.hide();
			this.co.logo.hide();
			this.co.arrowL.hide();
			this.co.arrowR.hide();
			this.co.paging.hide();

			// slide設定
			self.setSlide();
			this.co.slide.show();

			//メインボタン類の設定
			self.setMenu();
			
			if(self.options.viewIndex == "no"){
				if(self.options.viewLogo == "yes"){
					this.co.logo.show();
				}
				this.co.arrowR.show();
				this.co.paging.show();
			}
		},

		//各スライド設定
		setSlide: function() {
			var self = this;		

			// ページ数
			self.co.pages = self.co.slide.length;
			if(self.options.viewIndex == "yes"){
				tp = self.co.pages - 1;
			}else{
				tp = self.co.pages;
			}
			self.co.totalpages.html(tp);

			// 各slide画像設定
			var count = 1, 
			images = [];
			self.co.imgRatio = [];
			
			// index内容保持
			if(self.options.viewIndex == "yes"){
				var top_html = $(".dummy").html();
				$(".dummy").remove();
			}

			self.co.slide.each(function(i){
				var my = $(this),
				ratio,
				catalogImg = new Image(),
				photonum = (i)+'';
				
				if(photonum.length == 1) {
					photonum = '0'+(i);
				}
				imgclass = '.i' + photonum;
				images.push({
					src:$(imgclass).attr('src')
				});

				catalogImg.onload = function() {

					ratio = catalogImg.height/catalogImg.width;
					self.co.imgRatio[i]=ratio;
					
					// index
					if(my.hasClass('sIndex') && self.options.viewIndex == "yes"){
						
						my.find('img').remove();

						var toplink_elm = $(top_html).appendTo(my);
						var toplink_elm_a = toplink_elm.find('a');
						
						toplink_elm_a.hide();
						
						toplink_elm_a.bind('mouseover', function(){
							$(this)
								.stop()
								.css({opacity:0.8})
								.animate({opacity:0},600);
						});
						toplink_elm_a.bind('click', function () {
							var a_elm = $(this);
							var a_href = a_elm.attr('href');
							var tgt_page = parseFloat(a_href.substr(a_href.indexOf("#page_") + 6));
							
							if(self.co.ieVer == 'ie9' || self.co.ieVer == 'noie'){
								// ie以外もしくはie9
								self.co.flipsnap.moveToPoint(tgt_page);
							}else{
								// ie8以下
								self.gotoPage(tgt_page);
								return false;
							}
							self.co.currentPage = tgt_page;
							self.co.currentpagespan.html(self.co.currentPage);
							self.checkPage();							
							return false;
						});
					}

					// 読み込み完了後実行
					if(count == self.co.slide.length) {
						$('#loader').fadeOut(400);
						if(self.options.viewIndex == "yes"){
							self.co.slide.find('#indexList a').show().trigger('mouseover');
						}
						self.setFlickable(); //フリック処理
					}
					self.ResizeImage();
					catalogImg = null;
					count++;
				}
				if(!self.isSP){
					catalogImg.src = images[i].src +"?"+ new Date().getTime();
				}else{
					catalogImg.src = images[i].src; 
				}
			});

			// windowサイズ変更時の処理
			$(window).bind("resize", function(){
				self.ResizeImage();
				if(self.co.ieVer == 'ie9' || self.co.ieVer == 'noie'){
					// ie以外もしくはie9
					self.co.flipsnap.refresh();
				}
			});
			window.onorientationchange = function() {
				self.ResizeImage();
				if(self.co.ieVer == 'ie9' || self.co.ieVer == 'noie'){
					// ie以外もしくはie9
					self.co.flipsnap.refresh();
				}
			};
			window.onload = function(){
				if(self.co.tgt_page > 0){
					self.co.currentPage = self.co.tgt_page;
					self.co.currentpagespan.html(self.co.currentPage);
					if(self.co.ieVer == 'ie9' || self.co.ieVer == 'noie'){
						// ie以外もしくはie9
						self.co.flipsnap.moveToPoint(self.co.tgt_page);
					}else{
						// ie8以下
						self.gotoPage(self.co.tgt_page);
						return false;
					}
					self.checkPage();
				}
			};
		},

		//画像とウィンドウのサイズの計算
		ResizeImage: function() {
			var self = this,
			browserwidth = self.Window.width(),
			browserheight = self.Window.height(),
			p = self.co.pages;
			var ulwidth = p * browserwidth;
			
			self.co.slideUL.width(ulwidth);
			self.co.slideUL.height(browserheight);
			self.co.slide.height(browserheight);
			self.co.slide.width(browserwidth);

			self.co.slide.each(function(i){
				var ratio = self.co.imgRatio[i],
				my = $(this),
				slide_img_elm = my.find('.slide_img'),
				slide_credit = my.find('.credit'),
				top = my.find('#indexList');
				
				// 端末によってクレジットの表示非表示制御
				if(self.isSP){
					slide_credit.hide();
				}else{
					slide_credit.show();
				}
				
				// 画面サイズによって表示位置制御
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
				//index
				if(top && self.options.viewIndex == "yes"){
					self.resetToplinkSize(top, slide_img_elm, browserwidth, browserheight, ratio);
				}
			});
			if(self.co.ieVer == 'ie9' || self.co.ieVer == 'noie'){
			}else{
				var tmrfunc = function(){self.updateflickable(browserwidth);};
				setTimeout(tmrfunc,300);
			}
		},

		// windowサイズ変更時表示調整
		updateflickable: function(browserwidth) {
			this.co.wrapper.flickable('refresh');
			this.co.wrapper.scrollLeft((this.co.currentPage) * browserwidth);
		},

		// topページサムネイルリンクサイズ調整
		resetToplinkSize: function(top, slide_img_elm, browserwidth, browserheight, ratio) {
			var self = this,
			my_list = top;
			
			if(slide_img_elm.width()){
				my_list.each(function(){
					var li_size = ((slide_img_elm.width()) / self.options.indexCel) >> 0;
					
					var ul_elm = $(this);
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
				});
			}
		},

		//メインボタン類の設定
		setMenu: function() {
			var self = this;
			
			// LOGO
			if(self.options.viewLogo == "yes"){
				self.co.logo.find('img').bind('click',function () {
					if(self.co.ieVer == 'ie9' || self.co.ieVer == 'noie'){
						// ie以外もしくはie9
						self.co.flipsnap.moveToPoint(0);
					}else{
						// ie8以下
						self.gotoPage(0);
						return false;
					}
					self.co.currentPage = 0;
					if(self.options.viewIndex == "no"){
						self.co.currentPage = self.co.currentPage + 1;
					}
					self.co.currentpagespan.html(self.co.currentPage);
					self.checkPage();
					return false;
				});
			}
			//左ページへ戻る
			self.co.arrowL.find('a').bind('click',function () {
				if(self.co.ieVer == 'ie9' || self.co.ieVer == 'noie'){
					// ie以外もしくはie9
					self.co.flipsnap.toPrev();
				}else{
					// ie8以下
					self.gotoPage(self.co.currentPage - 1);
					return false;
				}
				self.co.currentPage = self.co.currentPage - 1;
				self.co.currentpagespan.html(self.co.currentPage);
				self.checkPage();
				return false;
			});
			//右ページへ進む
			self.co.arrowR.find('a').bind('click',function () {
				if(self.co.ieVer == 'ie9' || self.co.ieVer == 'noie'){
					// ie以外もしくはie9
					self.co.flipsnap.toNext();
				}else{
					// ie8以下
					self.gotoPage(self.co.currentPage + 1);
					return false;
				}
				self.co.currentPage = self.co.currentPage + 1;
				self.co.currentpagespan.html(self.co.currentPage);
				self.checkPage();
				return false;
			});
		},

		//移動後のページをチェック
		checkPage: function() {
			var self = this;
			
			var tgt_element, tgt_elements = [self.co.logo,self.co.paging,self.co.arrowL,self.co.arrowR];
			var i, len=tgt_elements.length;
			var sp = self.co.pages;
			//index
			if(self.options.viewIndex == "yes"){
				sp = sp - 1;
			}
			
			if(self.co.currentPage == 0 && self.options.viewIndex == "yes"){
				//最初ページ
				for(i = 0; i < len; i++){
					tgt_element = tgt_elements[i];
					tgt_element.stop().animate(
						{}, 
						{
							complete: function(){
								$(this).hide();
							}
						});
				}
			}else if(self.co.currentPage == sp){
				//最終ページ
				for(i = 0; i < len; i++){
					tgt_element = tgt_elements[i];
					if(tgt_element == self.co.arrowR){
						tgt_element.stop().animate(
							{}, 
							{
								complete: function(){
									$(this).hide();
								}
							});
					}else{
						tgt_element.stop().animate(
							{}, 
							{
								complete: function(){
									$(this).show();
								}
							});
					}
				}
			}else{
				//0ページ以外
				for(i = 0; i < len; i++){
					tgt_element = tgt_elements[i];
					tgt_element.stop().animate(
						{}, 
						{
							complete: function(){
								$(this).show();
							}
						});
				}
			}
			//logo
			if(self.options.viewLogo == "no"){
				self.co.logo.hide();
			}
			//index
			if(self.options.viewIndex == "no" && self.co.currentPage == 1){
				self.co.arrowL.hide();
			}
		},

		//フリック設定
		setFlickable: function() {
			var self = this;
			
			if(self.co.ieVer == 'ie9' || self.co.ieVer == 'noie'){
				// ie以外もしくはie9
				self.co.flipsnap = Flipsnap('#slide-container',{
					transitionDuration: self.co.slideSpeed
				});
				self.co.flipsnap.element.addEventListener('fstouchend', function(ev) {
					self.co.currentPage = ev.newPoint;
					if(self.options.viewIndex == "no"){
						self.co.currentPage = self.co.currentPage + 1;
					}
					self.co.currentpagespan.html(self.co.currentPage);
					self.checkPage();
				}, false);
			}else{
				self.co.slide.show();
				// ie8以下
				self.co.wrapper.flickable({
					section: '.slide'
				})
				.bind('flickchange', function(event, ui) {
							var newslide = $(ui.newSection),
							index = self.co.slide.index(newslide);
							if(self.options.viewIndex == "no"){
								index = index + 1;
							}
							if(self.co.currentPage == index){
								return false;
							}else{
								self.co.currentPage = index;
								self.co.currentpagespan.html(self.co.currentPage);
								self.checkPage();
							}
				});
	
				self.ResizeImage();
			}
		},

		//ページ移動
		gotoPage: function(page) {
			var self = this,
			dir = page < self.co.currentPage ? -1 : 1,
			n = Math.abs(self.co.currentPage - page);
			var left = self.Window.width() * dir * n;

			if(self.co.wrapper.is(':animated')) {
				return false;
			}
			
			var s = (dir * n * self.co.slideSpeed);
			if(s < self.co.slideSpeed){
				s = self.co.slideSpeed;
			}

			self.co.isAnimate = true;

			self.co.wrapper.animate(
				{
					scrollLeft:'+='+left
				},
				{
					duration:self.co.slideSpeed, 
					complete:function(){
						self.co.isAnimate = false;
						self.checkPage();
					}
				}
			);

			self.co.currentPage = page;
			self.checkPage();
			self.co.currentpagespan.html(self.co.currentPage);
			
			return false;
		}

	};
})(jQuery);

