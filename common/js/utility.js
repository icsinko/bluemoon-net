(function( window, undefined ) {

  utility = {
		
        conf: function(){
        },
        
		/***
		* sp 判別 = isSp
		* パラメータ　ua true = useragentで判別
		*             ua false = widthで判別
		*/
		spChk: function(set) {
			isSp = false;
			if(set.ua){			
				// userAgentで端末を判別する場合
				if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
					isSp = true;
				}
			} else {
				// 横幅で端末を判別する場合
				windowWidth = $(window).width();
				if (windowWidth <= 599) {
					isSp = true;
				}
			}
		},

        moveInit : function(set) {
            utility.move(set);

	        $(window).resize(function() {
                utility.move(set);
            });
        },
        move : function(set) {
            var sec = $("section");
            var num = sec.length;
            var page = 1;
            var w = $(window).width();

            var navRight = $(set.right);
            var navLeft = $(set.left);
            navRight.show();
//            navLeft.show();

//scrollの度に起動　メモ
            pageSet();

            //right
            navRight.bind("click",function(){
                var mv = (page-page)*100*-1;

                mv = page * 100 * -1;

                sec.stop()
                .animate({
                  'marginLeft': mv+"%"
                },  1400,'',
                function(){
                    pageSet();
                });
            });
            
            //left
            navLeft.bind("click",function(){
                var mv = (page-page)*100;

                sec.stop()
                .animate({
                  'marginLeft': mv+"%"
                },  1400,'',
                function(){
                    pageSet();
                });
            });
            
            //down
            $(set.down).bind("click",function(){
               
            });
            
            function pageSet() {
                now = Math.abs(parseInt(sec.css("margin-left"),10));
                var p = now/w;
                page = p + 1;
                
                var menuList = $("menu ul li a");
                $(".act").removeClass("act");
                $(menuList[p]).addClass("act");
                
                if(page > 1) {
                    navLeft.show();
                } else {
                    navLeft.hide();
                }
                if(page >= num) {
                    navRight.hide();
                } else {
                    navRight.show();
                }
            }
        },
        
		/***
		* facebook api 
		* パラメータ　url 対象facebookページ
		* 　　　　　　targetid リスト表示対象ULid
		* 　　　　　　targetClassName facebook名表示対象class
		* 　　　　　　num 取得件数
		*/
		getFacebookList: function(set) {
			var itemsArr = new Array(1);
			
			function build(){
                console.log(set.url);
                
				$.getJSON(
					'http://ajax.googleapis.com/ajax/services/feed/load?callback=?',
					{
					 q:set.url,
					 v:'1.0',
					 num:set.num
					},
					function (data) {
						 console.log(data.responseData.feed);
					$('.' + set.targetClassName).append('<span class="fName"><a href="https://www.facebook.com/pages/Cynthia-Rowley/106076969516" target="_blank">' + data.responseData.feed.entries[0].author + '</a></span>');
					$.each(data.responseData.feed.entries, function(i, item){
							var text = item.content;
							while ( text.indexOf('href="/',0) != -1 ) {
								text = text.replace('href="/','target="_blank" href="http://facebook.com/' );
							}
							while ( text.indexOf('_s.png',0) != -1 ) {
								text = text.replace('_s.png','_n.png' );
							}
							while ( text.indexOf('_s.jpg',0) != -1 ) {
								text = text.replace('_s.jpg','_n.jpg' );
							}
							while ( text.indexOf('_s.gif',0) != -1 ) {
								text = text.replace('_s.gif','_n.gif' );
							}
							$('#' + set.targetid).append('<li><p>' + text + '</p><span class="fDate">'+ formatData(item.publishedDate) +'</span></li>');
						});
						$('a[href^="http"]').filter('[href*="facebook"]').attr("target","_blank");
					}
				);
				
				var formatData = function(date) {
					 var d = new Date(date);
					 return (d.getFullYear() + '.' + ("0"+(d.getMonth()+1)).slice(-2)  + '.' + ("0"+d.getDate()).slice(-2));
				};
			}
						
			$(document).ready(function(){
				//トリガー
				build();
			})
		},
		
		/***
		* selevt onchange 都市選択時をページ遷移
		* パラメータ targetid 対象selectのid名
		*/
		goCategoryPage: function(set) {
			$(set.targetid).change(function(){
				var self = $(this),
				val = self.val();
				var url = "";
				if (val != "0") {
					var url = val + "/";
					// redirect
					location.href = url;
				}
			});
		},
        
        getTwitterList : function() {
            var $twtr = $('#twitter');
            
            // Ajaxステータスの表示
            $twtr.empty().append('<p class="msg">ツイートの取得中…</p>');
            $.getJSON('/common/php/twitter.php?callback=?', function (json) {
//console.log(json);
                var tweetStr = '';
                var time, icon, name, text;
//console.log(1);

                $twtr.empty();
                $.each( json, function(i, tweet) {
                        name = tweet.user.screen_name;
                        time = tweet.created_at;
                        icon = tweet.user.profile_image_url;
                        text = tweet.text;
                        time = formatDate(time);
                        icon = icon.replace(/_normal/, '_mini');
                        text = text.replace(/(s?https?:\/\/[-_.!~*'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/gi, '<a href="../../../../common/js/$1" class="link">$1</a>');
                        text = text.replace(/#(\w+)/gi,'<a href="http://twitter.com/#!/search?q=%23$1" class="hashtag">#$1</a>' );
                        text = text.replace(/@(\w+)/gi,'<a href="http://twitter.com/#!/$1" class="user">@$1</a>' );

                        tweetStr += '<li>';
                        tweetStr += '<span class="icon"><a href="http://twitter.com/#!/' + name + '">'
                           + '<img src="../../../../twitter/common/js/' + icon + '" alt="' + name + '" width="24" height="24" /></a></span>';
                        tweetStr += '';
                        tweetStr += '<span class="name">' + name + '</span>';
                        tweetStr += '<span class="time">' + time + '</span><span class="text">' + text + '</span>';
                        tweetStr += '</li>';
                });
//console.log(1);
                $('<ul></ul>').html(tweetStr).appendTo($twtr);

            });

            // 日付フォーマット用関数
            function formatDate( date ) {
                var dArr, dStr, d;
                
                // IEでパースできないフォーマットのため、
                // 文字列の順序を入れ替える
                dArr = date.split(" ");
                dStr = [dArr[0], dArr[1], dArr[2], dArr[5], dArr[3], dArr[4]].join(' ');
                d = new Date(dStr);
                
                return d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate();
            }
        }

	};
//	for (var i in utility) utility[i]();
}(window));
