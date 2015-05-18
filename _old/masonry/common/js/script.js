// JavaScript Document
(function($) {

	// infinite scroll
	// スクロールバーがでない場合は動作しない。
	$(function() {
		var $container = $("#container");

		$container.imagesLoaded(function() {
			this.masonry({
				itemSelector: ".box",
				isAnimated: !Modernizr.csstransitions
			});
		});

		// container.infinitescroll(options, callback)
		$container.infinitescroll({
			navSelector: "#page-nav",	 // selector for the paged navigation 
			nextSelector: "#page-nav a",  // selector for the NEXT link (to page 2)
			itemSelector: ".box",	 // selector for all items you'll retrieve
			loading: {
				msgText: "読み込み中。。。",
				finishedMsg: "読込完了",
				img: "http://www.infinite-scroll.com/loading.gif"
			}
		}, function(newElements) {  // 引数には取得した要素が渡されます。
			// 画像の読み込みが終わるまで取得した要素を一旦非表示にしておきます。
			var $items = $(newElements).css({ opacity: 0 });
			// 画像読込
			$items.imagesLoaded(function() {
				// 読み込み完了後、要素を表示させます。
				$items.animate({ opacity: 1 });
				// 取得した要素を既存の要素に追加して、レイアウト配置を適用させます。
				$container.masonry("appended", $items, true);
			});
		});

	});

}(jQuery));
