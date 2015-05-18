$(function(){
	
	var $twtr = $('#twitter');
	
	// Ajaxステータスの表示
	$twtr.empty()
		.append('<p class="msg">ツイートの取得中…</p>');
	

	$.getJSON('http://www.bluemoon-net.jp/twitter/twitter.php?callback=?', function (json) {
		console.log(json);
               
                        var tweetStr = ''; // 縷C~D縷B､縷Cｼ縷C~HHTML諫 ｼ邏~M轜Tｨ
                        var time, icon, name, text;

                        // div縷B~R空縷Aｫ
                        $twtr.empty();
                        // JSON縷C~G縷Cｼ縷Bｿ縷Aｮ蛬Gｦ轜P~F
                        $.each( json, function(i, tweet) {
                                // JSON縷A~K縷B~I縷C~G縷Cｼ縷Bｿ縷B~R諧Jｽ蛬Gｺ
                                name = tweet.user.screen_name;       // 縷Cｦ縷Cｼ縷Bｶ縷Cｼ蛬P~M
                                time = tweet.created_at;             // 諧W･莉~X
                                icon = tweet.user.profile_image_url; // 縷C~W縷Cｭ縷C~U縷B｣縷Cｼ縷Cｫ縷B｢縷B､縷Bｳ縷CｳURL
                                text = tweet.text;                   // 縷C~D縷B､縷Cｼ縷C~H諧\ｬ諧V~G
                                // 諧W･莉~X縷Aｮ縷C~U縷Bｩ縷Cｼ縷C~^縷C~C縷C~H
                                time = formatDate(time);
                                // 縷C~W縷Cｭ縷C~U縷B｣縷Cｼ縷Cｫ縷B｢縷B､縷Bｳ縷Cｳ・~H諧\~@蟆~Q縷Bｵ縷B､縷Bｺ縷B~R使轜Tｨ・~I
                                icon = icon.replace(/_normal/, '_mini');
                                // 縷C~D縷B､縷Cｼ縷C~H蛬F~E縷Aｮ縷Cｪ縷Cｳ縷Bｯ・~O縷Cｦ縷Cｼ縷Bｶ縷Cｼ蛬P~M・~O縷C~O縷C~C縷Bｷ縷C･縷Bｿ縷Bｰ
                                text = text.replace(/(s?https?:\/\/[-_.!~*'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/gi, '<a href="../../../../common/js/$1" class="link">$1</a>');
                                text = text.replace(/#(\w+)/gi,'<a href="http://twitter.com/#!/search?q=%23$1" class="hashtag">#$1</a>' );
                                text = text.replace(/@(\w+)/gi,'<a href="http://twitter.com/#!/$1" class="user">@$1</a>' );
                                // HTML縷Aｮ諧Uｴ蠖｢
                                tweetStr += '<li>';
                                tweetStr += '<span class="icon"><a href="http://twitter.com/#!/' + name + '">'
                                   + '<img src="../../../../twitter/common/js/' + icon + '" alt="' + name + '" width="24" height="24" /></a></span>';
                                tweetStr += '';
                                tweetStr += '<span class="name">' + name + '</span>';
                                tweetStr += '<span class="time">' + time + '</span><span class="text">' + text + '</span>';
                                tweetStr += '</li>';
                        });

                        // HTML縷B~R追蛬J|
                        $('<ul></ul>').html(tweetStr).appendTo($twtr);

	});
//	$.getJSON( 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=icsinko&callback=?&count=6' )
/*
	$.getJSON('http://www.bluemoon-net.jp/twitter/twitter.php?callback=?')
		
		// 読み込み完了時
		.success(function( json ) {
			
			var tweetStr = ''; // ツイートHTML格納用
			var time, icon, name, text;
			
			// divを空に
			$twtr.empty();
			// JSONデータの処理
			$.each( json, function(i, tweet) {
				// JSONからデータを抽出
				name = tweet.user.screen_name;       // ユーザー名
				time = tweet.created_at;             // 日付
				icon = tweet.user.profile_image_url; // プロフィールアイコンURL
				text = tweet.text;                   // ツイート本文
				// 日付のフォーマット
				time = formatDate(time);
				// プロフィールアイコン（最少サイズを使用）
				icon = icon.replace(/_normal/, '_mini');
				// ツイート内のリンク／ユーザー名／ハッシュタグ
				text = text.replace(/(s?https?:\/\/[-_.!~*'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/gi, '<a href="../../../../common/js/$1" class="link">$1</a>');
				text = text.replace(/#(\w+)/gi,'<a href="http://twitter.com/#!/search?q=%23$1" class="hashtag">#$1</a>' );
				text = text.replace(/@(\w+)/gi,'<a href="http://twitter.com/#!/$1" class="user">@$1</a>' );
				// HTMLの整形
				tweetStr += '<li>';
				tweetStr += '<span class="icon"><a href="http://twitter.com/#!/' + name + '">'
				   + '<img src="../../../../common/js/' + icon + '" alt="' + name + '" width="24" height="24" /></a></span>';
				tweetStr += '';
				tweetStr += '<span class="name">' + name + '</span>';
				tweetStr += '<span class="time">' + time + '</span><span class="text">' + text + '</span>';
				tweetStr += '</li>';
			});
			
			// HTMLを追加
			$('<ul></ul>').html(tweetStr).appendTo($twtr);

		})
		
		// 読み込みエラー時
		.error(function( json ) {
console.log(json);
			$twtr.empty()
				.append('<p class="error">エラー：ツイートを取得できませんでした。</p>');
		});
*/
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

	// デフォルトの背景色
	var defaultColor = '#eee';
	
	$('#banner li a')
		// オーバー時のカラーをdataに保存
		.each(function(){
			$(this).data('color', $(this).css('background-color'));
		})
		// オーバー時の動作
		.hover(
			function() {
				$(this).stop(true).animate({
					'background-color': $(this).data('color')
				}, 200, 'swing');
			},
			function() {
				$(this).stop(true).animate({
					'background-color': defaultColor
				}, 400, 'swing');
			}
		)
		
		// 背景色をデフォルトのカラーに
		.css('background-color', defaultColor);
});
