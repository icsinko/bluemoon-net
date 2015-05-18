// JavaScript Document

// 現在地の緯度、経度を表示
navigator.geolocation.watchPosition(
	function(position){
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		map.setCenter(new google.maps.LatLng(lat,lng)); //現在地を地図の中心にする
	},
	function(error){
		document.getElementById("postStatus").innerHTML = "エラーコード:"+error.code;
	}
);
// グーグルマップ表示
var map = new google.maps.Map(
	document.getElementById("myMap"),{
		zoom : 15,
		center : new google.maps.LatLng(35.68897326134837,139.7002923488617),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	}
);
// 夜の地図
var nightStyle = [{
	featureType:"all",
	elementType:"all",
	stylers:[
		{hue:"#0000ff"},
		{saturation:0},
		{lightness:-50},
		{visibility:"on"}
	]
}];
map.mapTypes.set("night",new google.maps.StyleMapType(nightStyle));
//現在の時刻を取得して地図の表示タイプを設定
var h = (new Date()).getHours();
if ((h >= 18) || (h <= 5)){
	map.setMapTypeId("night");
}else{
	map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
}
setTimeout("window.scrollTo(0,1)",10); //ナビゲーションバーを消す