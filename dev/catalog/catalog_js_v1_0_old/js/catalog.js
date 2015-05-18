/*
 * Catalog : 2012.09.09
 * BlueMoon-Net
 * ver : 1.0.0
*/
/*
 * トップサムネイル表示時はviewIndexをyes
 * ロゴ表示時はviewLogoをyes
 * htmlのclassはi0からスタート
*/
$(document).ready(function(){
	$('body').catalogSet();
});

(function($){
	var catalogSet;
	$.fn.catalogSet = catalogSet = function() {

		var settings = {
			slide : '.slide',                 //スライド子要素
			imgDir : 'images/',               //イメージディレクトリ
			slideSpeed : 1000,                //slide時のスピード
			spSize : 480,                     //スマホ時サイズ
			viewIndex : 'yes',                 //indexページ表示 yes or no
			viewLogo : 'yes'                   //ロゴ表示 yes or no
		};
		
		return this.each(function() {
			catalogSet.prototype.create(settings,this);
		});
	};
	
	catalogSet.prototype = {
		catalogObj : {
			currentPage : 1
		},
		
		create: function(settings,elem) {
			this.element = $(elem);
			this.options = settings;
			this.Window = $(window);

			var self = this;
			this.catalogObj.wrapper = this.element.find('#wrapper'); //#wrapper
			this.catalogObj.slideUL = this.element.find('#slide-container');
			this.catalogObj.header = this.element.find('#header'); //#header
			this.catalogObj.logo = this.element.find('#logo'); //#logo
			this.catalogObj.paging = this.element.find('#paging'); //#paging
			this.catalogObj.totalpages = this.catalogObj.paging.find('#totalpages');
			this.catalogObj.currentpagespan = this.catalogObj.paging.find('#currentpage');
			this.catalogObj.arrowL = this.element.find('#arrowL');
			this.catalogObj.arrowR = this.element.find('#arrowR');
			this.catalogObj.arrowL.hide(); //初期表示時非表示
			if (self.options.viewIndex == "yes") {
				this.catalogObj.arrowR.hide();
				this.catalogObj.currentPage = this.catalogObj.currentPage - 1; 
			}
			if (self.options.viewLogo == "no") {
				this.catalogObj.logo.hide();
			}else{
				var t = 1;
				if(self.options.viewIndex == "yes"){
					t = 0;
				}
				// logoクリック時トップへ移動
				this.catalogObj.logo.bind('click', function () {
					self.gotoPage(t, self.options.slideSpeed);
					return false;
				});
			}
			this.catalogObj.hash = window.location.hash.replace('/','#').split('#');
			
			var count = 1, 
			images = [];

			self.catalogObj.slide = $(self.options.slide);
			if (self.options.viewIndex == "yes") {
				self.catalogObj.pages = self.catalogObj.slide.length - 1;
			}else{
				self.catalogObj.pages = self.catalogObj.slide.length;
			}
			this.catalogObj.totalpages.html((self.catalogObj.pages));
			self.catalogObj.imgRatio = [];
			
			var top_html = $(".dummy").html();
			
			self.catalogObj.slide.hide();
			self.catalogObj.slide.each(function(i){
				var my = $(this),
				ratio,
				photonum = (i)+'';
	
				imgclass = '.i' + photonum;
				images.push({
					src:$(imgclass).attr('src')
				});
				if(photonum.length == 1) {
					photonum = '0'+(i);
				}

				var catalogImg = new Image();
				catalogImg.onload = function() {

					ratio = catalogImg.height/catalogImg.width;
					self.catalogObj.imgRatio[i]=ratio;
					
					if(self.options.viewIndex == "yes" && my.hasClass('sIndex')){
						
						my.find(".dummy").remove();
						my.find('img').remove();

						var toplink_elm = $(top_html).appendTo(my);
						var toplink_elm_a = toplink_elm.find('a');
						
						toplink_elm_a.hide();
						
						toplink_elm_a.bind('mouseover', function(){
							$(this)
								.stop()
								.css({opacity:0.8})
								.animate({opacity:0},600,'easeOutExpo');
						});
						toplink_elm_a.bind('click', function () {
							var a_elm = $(this);
							var a_href = a_elm.attr('href');
							var tgt_page = parseFloat(a_href.substr(a_href.indexOf("#page_") + 6));
							
							self.gotoPage(tgt_page,self.options.slideSpeed);
							
							return false;
						});

						self.catalogObj.logo.hide();
						self.catalogObj.paging.hide();
					}
					if(count == self.catalogObj.slide.length) {
						$('#loader').fadeOut(400);
						self.catalogObj.slide.find('#indexList a').show().trigger('mouseover');
						self.setFlickable(); //フリック処理
					}
					self.ResizeImage('yes');
					catalogImg = null;
					count++;
				}
				catalogImg.src = images[i].src +"?"+ new Date().getTime(); 
			});

			self.setMenu(); //メインボタン類の設定

			$(window).bind("resize", function(){
				self.ResizeImage('yes');
			});
			window.onorientationchange = function() {
				self.ResizeImage('yes');
			};

		}, 
		
		//メインボタン類の設定
		setMenu: function() {
			var self = this;

			//左ページへ戻る
			self.catalogObj.arrowL.find('a').bind('click',function () {
				if(self.catalogObj.currentPage == 0){
					//最初ページ
				}else{
					//最初ページ以外
					self.gotoPage(self.catalogObj.currentPage - 1,self.options.slideSpeed);
				}
				return false;
			});
			//右ページへ進む
			self.catalogObj.arrowR.find('a').bind('click',function () {
				if(self.catalogObj.currentPage == self.catalogObj.pages){
					//最終ページ
					if(self.options.viewIndex == "yes"){
						t = 1;
					}else{
						t = 1;
					}
					self.gotoPage(t,self.options.slideSpeed);
				}else{
					//最終ページ以外
					self.gotoPage(self.catalogObj.currentPage + 1,self.options.slideSpeed);
				}
				return false;
			});
		},

		//ページ移動
		gotoPage: function(page,speed) {
			var self = this,
			dir = page < self.catalogObj.currentPage ? -1 : 1,
			n = Math.abs(self.catalogObj.currentPage - page),
			left = self.Window.width() * dir * n;

			if(self.catalogObj.wrapper.is(':animated')) {
				return false;
			}
			
			self.catalogObj.isAnimate = true;
			self.catalogObj.wrapper.animate(
				{
					scrollLeft:'+='+left
				},
				{
					duration:speed, 
//					easing: 'easeInQuad',
					complete:function(){
						self.catalogObj.isAnimate = false;
					}
				}
			);
			
			self.catalogObj.currentPage = page;
			self.checkPage();
			self.catalogObj.currentpagespan.html(self.catalogObj.currentPage);
			
			return false;
		},

		//移動後のページをチェック
		checkPage: function() {
			var self = this;
			
			var tgt_element, tgt_elements = [self.catalogObj.logo,self.catalogObj.paging,self.catalogObj.arrowL,self.catalogObj.arrowR];
			var i, len=tgt_elements.length;
			
			if(self.catalogObj.currentPage == 0 && self.options.viewIndex == "yes"){
				for(i = 0; i < len; i++){
					tgt_element = tgt_elements[i];
					tgt_element.stop().animate(
						{}, 
						{
							complete: function(){
								$(this).hide();
							}
						}
					);
				}
			}else{
				for(i = 0; i < len; i++){
					tgt_element = tgt_elements[i];
					if(
						(self.options.viewLogo == "no" && tgt_element == self.catalogObj.logo) ||
						(self.catalogObj.currentPage == 1 && tgt_element == self.catalogObj.arrowL)
					){
						continue;
					}
					tgt_element.stop().show().animate(
						{}, 
						{
							complete: function(){
								if(self.catalogObj.isAnimate) {
									return false;
								}
							}
						}
					);
				}
			}
		},
		
		//画像とウィンドウのサイズの計算
		ResizeImage: function(resizeOrNot) {
			var self = this,
			browserwidth = self.Window.width(),
			browserheight = self.Window.height(),
			p = self.catalogObj.pages;
			if (self.options.viewIndex == "yes"){
				p = p + 1;
			}
			var ulwidth = p * browserwidth;
			
			self.catalogObj.slideUL.width(ulwidth);
			self.catalogObj.slideUL.height(browserheight);
			self.catalogObj.slide.height(browserheight);
			self.catalogObj.slide.width(browserwidth);

			self.catalogObj.slide.each(function(i){
				var ratio = self.catalogObj.imgRatio[i],
				my = $(this),
				slide_img_elm = my.find('.slide_img'),
				slide_credit = my.find('.credit'),
				top = my.find('#indexList');
				
				// 画面幅によってクレジットの表示非表示制御
				if(browserwidth <= self.options.spSize){
					slide_credit.hide();
				}else{
					slide_credit.show();
				}
				
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
				if(top){
					self.resetToplinkSize(my, slide_img_elm, browserwidth, browserheight, ratio);
				}
			});
			if(resizeOrNot == 'yes'){
				var tmrfunc = function(){self.updateflickable(browserwidth);};
				setTimeout(tmrfunc,300);
			}
		},

		// windowサイズ変更時表示調整
		updateflickable: function(browserwidth) {
			this.catalogObj.wrapper.flickable('refresh');
			this.catalogObj.wrapper.scrollLeft(((this.catalogObj.currentPage) * browserwidth)+(browserwidth/2));
		},

		// topページサムネイルリンクサイズ調整
		resetToplinkSize: function(my, slide_img_elm, browserwidth, browserheight, ratio) {
			var self = this,
			my_list = my.find('#indexList');
			
			if(slide_img_elm.width()){
				my_list.each(function(){
					var li_size = ((slide_img_elm.width()) / 4) >> 0;
					
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

		//フリック設定
		setFlickable: function() {
			var self = this;
			
			self.catalogObj.slide.show();

			$('#wrapper').flickable({
				section: '.slide'
			})
			.bind('flickchange', function(event, ui) {
						var newslide = $(ui.newSection),
						index = self.catalogObj.slide.index(newslide);
						if(self.options.viewIndex == "no"){
							index = index + 1;
						}
						if(self.catalogObj.currentPage == index){
							return false;
						}else{
							self.catalogObj.currentPage = index;
							self.catalogObj.currentpagespan.html(self.catalogObj.currentPage);
							self.checkPage();
						}
				}
			);
			self.ResizeImage('yes');
		}		
	};
})(jQuery);
