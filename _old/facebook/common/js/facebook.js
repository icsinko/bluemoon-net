//get facebook count
var likeCount = function (_id, _url) {
	if(!_id) return;
	var pageURL = (_url) ? _url : location.href;
	//JSONの読み込み
	$.ajax({
		type: 'GET',
		url: 'http://graph.facebook.com/' + pageURL,
		dataType: 'jsonp',
		success: function(data) {
			//読み込み結果
			var count = (data.shares)? data.shares : 0;
			$('#' + _id).text(count);
		}
	});
}

$(function(){
	likeCount('likeCount1');
});


$(function() {
var formatData = function(date) {
     var d = new Date(date);
     //ゼロパディング（2桁）にしない場合
     //return (d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate());
     return (d.getFullYear() + '.' + ("0"+(d.getMonth()+1)).slice(-2)  + '.' + ("0"+d.getDate()).slice(-2));
};
$.getJSON(
     'http://ajax.googleapis.com/ajax/services/feed/load?callback=?',
     {
          //xxxxxxxを表示したいFacebookページのidに置き換えてください。
          q: 'http://www.facebook.com/feeds/page.php?id=100002197303854&format=rss20',
          v: '1.0',
          num: 10
     },
     function (data) {
          $.each(data.responseData.feed.entries, function(i, item){
              $('#fbline ul').append('<li><span>'+
               formatData(item.publishedDate)
              +'</span><br />' + item.content + '</li>');
          });
     }
);
});

