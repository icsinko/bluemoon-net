/*
sData
sFData > sFDataInner
sHeader > sHeaderInner
*/
//table custum scroll 縦
(function($){
		$(window).load(function(){
			/* custom scrollbar fn call */
			$(".sData").mCustomScrollbar({
				autoDraggerLength:false,
				scrollButtons:{
					enable:false
				}
			});
			$(".sFDataInner").mCustomScrollbar({
				autoDraggerLength:false,
				scrollButtons:{
					enable:false
				}
			});
		});
})(jQuery);

//table custum scroll 横
(function($){
		$(window).load(function(){
			/* custom scrollbar fn call */
			$(".scrollListHorizontal").mCustomScrollbar({
				horizontalScroll:true,
				autoDraggerLength:false,
				scrollButtons:{
					enable:false
				}
			});
		});
})(jQuery);
