(function($) {
		  
        //----------------------------------------------------------------------
        //  スライドパターン1:自動スライド
        //----------------------------------------------------------------------
        function imageNavigationSlide(option) {
            option.isBusy = true;
            
			//ナビゲーション移動
			$(".navi:not(:animated)").animate({
                marginLeft : parseInt($(".navi").css("margin-left"))-160 + "px"
			},"fast","swing" ,
			function(){
                $(".navi").css({marginLeft:0});
                $(".navi li:first").appendTo(".navi");
		    });
			 
			//active（stayの有無で切り替え）
			if ($('.stay', option.elem).length != 0 ){
			   var $active = $('.main-image li.stay', option.elem);
			   $('.main-image li.active', option.elem).removeClass('active');
			}else{
			   var $active = $('.main-image li.active', option.elem);
			}
			
			if ( $active.length == 0 ) $active = $('.main-image li:last', option.elem);
			
			//next（左から2番目のナビ（左端のnext）にrel属性で指定しているビジュアルが新しいビジュアルになる）
			var $next =  $(".main-image ."+ $('.navi li:first' ,option.elem).next().attr("rel") +"", option.elem);
			
			//トランジション
			if($next.attr("rel") != $active.attr("rel")){
				$active.addClass('last-active');
                $next.css({opacity: 0.0})
                .addClass('active')
			    .animate({opacity: 1.0}, option.animationTimem, function() {
                    $active.removeClass('stay active last-active');
                    option.isBusy = false;
                });
			}
		}
			
		function startInterval(option){
            if(option.autoPlay) imageNavigationID = setInterval(function(){ imageNavigationSlide(option) }, option.time );
        }
		 
		 
		 
		//----------------------------------------------------------------------
        //スライドパターン2:ナビボタンマウスオーバー時のスライド
        //----------------------------------------------------------------------
        function imageNavigationChange(option) {
			 
            option.isBusy = true;
			
			//active（stayの有無で切り替え）		
			if ($('.stay', option.elem).length != 0 ){
			   var $active = $('.main-image li.stay', option.elem);
			}else{
			   var $active = $('.main-image li.active', option.elem);
			   $active.addClass('stay');
			   $active.removeClass('active');
			}
			
			//next
			var $next = option.nextImage;
			
			//activeとnextが同じだったらトランジションしないけどisBusyだけfalseに戻す
			var ACTIVE = $active.get(0);
			var NEXT = $next.get(0);
			
			if(ACTIVE != NEXT){
			
                $active.addClass('last-stay');
                $next.css({opacity: 0.0});
                $next.addClass('stay');
			
			
                //トランジション
			
                $next
				.stop(true,false)//割り込み処理
			    .animate(
					{opacity:1.0},
					{duration:"slow",
					complete:function(){
					  $active.removeClass('stay last-stay');
					  option.isBusy = false;
                    }
                });
			}else{
				option.isBusy = false;
			}
        }

		//----------------------------------------------------------------------
        //スライドパターン3:[←]ボタンクリック時の逆スライド
		//----------------------------------------------------------------------
        function imageNavigationReverse(option) {
			 
			$(".navi li:last").prependTo(".navi");
			$(".navi").css({marginLeft:-160});	
				  				
			//ナビゲーションの移動
			$(".navi:not(:animated)").animate({
			    marginLeft : parseInt($(".navi").css("margin-left"))+160 + "px"
			},"fast","swing" ,
			function(){
			});
			
			
			//active（stayの有無で切り替え）
			if ($('.stay', option.elem).length != 0 ){
			   var $active = $('.main-image li.stay', option.elem);
			   $('.main-image li.active', option.elem).removeClass('active');
			}else{
			   var $active = $('.main-image li.active', option.elem);
			}
			
			//next（左端のナビにrel属性で指定しているビジュアルが新しいビジュアルになる）
			var $next =  $(".main-image ."+ $('.navi li:first' ,option.elem).attr("rel") +"", option.elem);
			
			
			//トランジション	
			if($next.attr("rel") != $active.attr("rel")){
				$active.addClass('last-active');
                $next.css({opacity: 0.0})
                .addClass('active')
			    .animate({opacity: 1.0}, option.animationTime, function() {
                    $active.removeClass('stay active last-active');
                    option.isBusy = false;
                });
			}
		}


        $.fn.imageNavigation = function(option) {
	
            //----------------------------------------------------------------------	
            //初期化--引数のデフォルト値
            //----------------------------------------------------------------------
            option = $.extend({
                elem:this,
                currentNavi:"",
                nextImage:"",
                time: 4300,
                animationTimem: 1200,
                animationTime: 3600,
                autoPlay: true,
                isBusy:false
            }, option);
			 
            var $active = $('.main-image li.active', option.elem);
            if ( $active.length == 0 ) {
                $active = $('.main-image li:first', option.elem);
                $active.addClass("active");
            }
             
            naviCnt = $(".main-image li", option.elem).size();
            for(i=1;i<=naviCnt;i++) {
                $(".navi li:nth-child("+i+")",option.elem).addClass("navi-"+i).attr("rel","navi-"+i);
                $(".main-image li:nth-child("+i+")",option.elem).addClass("navi-"+i).attr("rel","navi-"+i);
            }
             
            $(".navi li", option.elem).each(function(){
                $(this).css("position", "relative");
            });

            //----------------------------------------------------------------------
			//レイアウト（幅の設定）
            //----------------------------------------------------------------------
            $('.main-image').css("display", "block");
			$(".navi").css("width",160*$(".navi li").size() + "px");

            //----------------------------------------------------------------------
			//ボタンをクリック・ロールオーバー時のイベント
            //----------------------------------------------------------------------
			
			//[→]ボタン
			$(".navi-btn-right").click(function(){
				if(!option.isBusy)imageNavigationSlide(option);
				option.isBusy = true;
			});
			
			//[←]ボタン
			$(".navi-btn-left").click(function(){
                if(!option.isBusy)imageNavigationReverse(option);
                option.isBusy = true;
			});
	
             //ナビにロールオーバー
            $(".navi li:not(:animated)",option.elem).mouseover(function(){
				option.currentNavi = this;
				stackManageTimer(option);
            }).mouseout(function(){
                naviOutFunc();
            });
			 
            //スタック処理
			function stackManageTimer(option){
				try{
                    stackID = setInterval(function(){ naviOverFunc(option) },100);
				}catch(e){
                    //Error
				}
            }
			 
			function naviOverFunc(option){
				if(!option.isBusy){
                    clearInterval(stackID);
                    option.nextImage = $(".main-image li."+$(option.currentNavi).attr("rel")+"", option.elem);
                    imageNavigationChange(option);
                    $('.navi li').not(option.currentNavi).stop(true,false).fadeTo(400,0.5);
				}else{
				  
				} 
			}
			 
			 
            function naviOutFunc(){
                clearInterval(stackID);
				$('.navi li').stop(true,false).fadeTo(400,1.0);
            }
			
            //ロード時にマウスがオーバーしているとIntervalが重複する現象を回避
			$(option.elem).mousemove(function(e){clearInterval(imageNavigationID);})
			 
			//マウスオーバーでスライド一時停止・アウトで再生
            $(option.elem).hover(
				function(){
                    if(option.autoPlay) clearInterval(imageNavigationID);
                },
			    function(){
					startInterval(option);
                });
            startInterval(option);
        }

})(jQuery);