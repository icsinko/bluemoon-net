/*
 * Catalog : 2012.09.09
 * BlueMoon-Net
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
			viewIndex : 'yes',                 //indexページ表示 yes or no
			viewLogo : 'yes'                   //ロゴ表示 yes or no
		};
		
		return this.each(function() {
			catalogSet.prototype.create(settings,this);
		});
	};
	
	catalogSet.prototype = {
		catalogObj : {
			currentPage : 1,
			slideSpeed : 1000
		},
		
		create: function(settings,elem) {
			this.element = $(elem);
			this.options = settings;
			this.Window = $(window);
			this.init();
		},
		
		init: function() {
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
			if (self.options.viewLogo == "no") {
				this.catalogObj.logo.hide();
			}
			
			var count = 1, 
			images = [];
			
			self.catalogObj.slide = $(self.options.slide);
			self.catalogObj.pages = self.catalogObj.slide.length;
			this.catalogObj.totalpages.html((self.catalogObj.pages));
			self.catalogObj.imgRatio = [];
			
			self.catalogObj.slide.hide();
			self.catalogObj.slide.each(function(i){
				var my = $(this),
				ratio,
				photonum = (i+1)+'';
	
        imgclass = '.i' + photonum;
				images.push({
					src:$(imgclass).attr('src')
				});
				if(photonum.length == 1) {
					photonum = '0'+(i+1);
				}

				var catalogImg = new Image();
				catalogImg.onload = function() {
					ratio = catalogImg.height/catalogImg.width;
					self.catalogObj.imgRatio[i]=ratio;
					
					if(count == self.catalogObj.slide.length) {
						$('#loader').fadeOut(400);
						self.setFlickable(); //フリック処理
					}
					
					count++;
					catalogImg = null;
				}
				catalogImg.src = images[i].src;
			});

			self.setMenu(); //メインボタン類の設定

			$(window).bind("resize", function(){
				if(self.catalogObj.os == 'iphone' || self.catalogObj.os == 'ipad'){
					return;
				}
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
				if(self.catalogObj.currentPage == 1){
					//最初ページ
				}else{
					//最初ページ以外
					self.gotoPage(self.catalogObj.currentPage - 1,self.catalogObj.slideSpeed);
				}
				return false;
			});
			//右ページへ進む
			self.catalogObj.arrowR.find('a').bind('click',function () {
				if(self.catalogObj.currentPage == self.catalogObj.pages){
					//最終ページ
					self.gotoPage(1,self.catalogObj.slideSpeed);
				}else{
					//最終ページ以外
					self.gotoPage(self.catalogObj.currentPage + 1,self.catalogObj.slideSpeed);
				}
				return false;
			});
		},

		//ページ移動
		gotoPage: function(page,speed,updatehash,updateitem) {
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
					easing: 'easeInQuad',
					complete:function(){
						self.catalogObj.isAnimate = false;
						self.checkPage();
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
			
			var tgt_element, tgt_elements = [this.catalogObj.arrowL];
			var i, len=tgt_elements.length;
			
			if(self.catalogObj.currentPage == 1){
				for(i = 0; i < len; i++){
					tgt_element = tgt_elements[i];
					tgt_element.stop().animate(
						{ 'opacity':'0' }, 
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
					tgt_element.stop().show().animate(
						{ 'opacity':'1' }, 
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
			ulwidth = self.catalogObj.pages * browserwidth;
			
			self.catalogObj.slideUL.width(ulwidth);
			self.catalogObj.slideUL.height(browserheight);
			self.catalogObj.slide.height(browserheight);
			self.catalogObj.slide.width(browserwidth);
			if(!self.isSP){
				//PC
				self.catalogObj.slide.each(function(i){
					var ratio = self.catalogObj.imgRatio[i],
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
				});
			}else{
				//SP
				self.catalogObj.slide.each(function(i){
					var ratio = self.catalogObj.imgRatio[i],
					my = $(this),
					slide_img_elm = my.find('.slide_img');
					
					if ((browserheight/browserwidth) < ratio){
						slide_img_elm.height(browserheight);
						slide_img_elm.width(browserheight/ratio);
					} else {
						slide_img_elm.width(browserwidth);
						slide_img_elm.height(browserwidth*ratio);
					}
				});
			}
		},

		//フリック設定
		setFlickable: function() {
			var self = this;
			
			self.ResizeImage('yes');
			self.catalogObj.slide.show();
			self.catalogObj.wrapper.fadeOut(0).css({opacity:1}).fadeIn();

			$('#wrapper').flickable({
				section: 'li'
			})
			.bind('flickchange', function(event, ui) {
						var newslide = $(ui.newSection),
						index = self.catalogObj.slide.index(newslide);

						if(self.catalogObj.currentPage == index+1){
							return false;
						}else{
							self.catalogObj.currentPage = index+1;
							self.catalogObj.currentpagespan.html(self.catalogObj.currentPage);
							self.checkPage();
						}
				}
			);
			self.ResizeImage('yes');
		}		
	};
})(jQuery);

$(window).load(function(){
});
