$(function(){
  var scripts = {
		s1: function() {
			/***
			* sp 判別 = isSp
			* パラメータ　ua true = useragentで判別
			*             ua false = widthで判別
			*/
			utility.spChk({
				ua : false
			});
		},
        
        s2:function() {
            utility.moveInit({
                left : "#navLeft",
                right : "#navRight",
                down : "#navDown"
            });
        },

		s3: function() {
				/***
				* facebook api 
				* パラメータ　url 対象facebookページ
				* 　　　　　　targetid リスト表示対象ULid
				* 　　　　　　targetClassName facebook名表示対象class
				* 　　　　　　num 取得件数
				*/
				utility.getFacebookList({
					url : 'https://www.facebook.com/feeds/page.php?format=rss20&id=360936353990171',
					targetid : "facebook",
					targetClassName : "facebookName",
					num : 2
				});
		},

        s4:function() {
            utility.getTwitterList();
        }
		
	}
	for (var i in scripts) scripts[i]();
/*
	var timer = false;
	$(window).resize(function() {
			if (timer !== false) {
					clearTimeout(timer);
			}
			timer = setTimeout(function() {
				for (var i in scripts) {
					scripts[i]()
				};
			}, 200);
	});
*/
});