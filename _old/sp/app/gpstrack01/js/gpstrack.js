// JavaScript Document

var lat = 0;	// 初期の緯度
var lng = 0;	// 初期の経度
var polylines = [ ];	// 連続直線オブジェクトを格納する配列変数
var pos = [ ];	// ローカルストレージ用に座標値を保存する配列変数
var myPath;	// 連続直線を描画するための変数
// 現在地の緯度、経度を表示
navigator.geolocation.watchPosition(
	function(position){
		lat = position.coords.latitude;
		lng = position.coords.longitude;
		map.setCenter(new google.maps.LatLng(lat, lng));	// 現在地を地図の中心にする
		pos.push([lat, lng]);	// 座標を配列に追加
		polylines.push(new google.maps.LatLng(lat, lng));	// 描画用の配列に座標を追加
		myPath.setMap(null);	// 連続直線を消す
		drawPolyline();	// 連続直線を描画する
	},
	function(error){
		document.getElementById("stat").innerHTML = "エラーコード："+error.code;
	},
	{
		enableHighAccuracy : true,	// 高精度で取得
		maximumAge : 2*1000,	// 2秒以内であれば位置情報を再利用
		timeout : 30*1000	// 30秒経過しても位置が取得できない場合はエラーコールバックを呼び出す
	}
);
// グーグルマップを表示
var map = new google.maps.Map(
	document.getElementById("myMap"),{
		zoom : 15,
		center : new google.maps.LatLng(lat, lng),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	}
);
setTimeout("window.scrollTo(0,1)", 10);	// ナビゲーションバーを消す

// 連続直線を描画
function drawPolyline(){
	myPath = new google.maps.Polyline({
		path: polylines,
		strokeColor: "#ff0000",	// color:赤色
		strokeOpacity: 0.5,	// 透明度:50%
		strokeWeight: 5	// 線の太さ(px)
	});
	myPath.setMap(map);	// 連続直線を描画する
}

// ボタンがクリックされたら軌跡を全て削除
document.getElementById("clearTrack").addEventListener("click", function(){
	myPath.setMap(null);
	polylines = [ ];
	pos = [ ];
}, true);

// データ読み出し、マップ上に表示
var data = localStorage.getItem("posData");	// データがなければnullがdataに入る
if (data){
	data = data.split(",");	// ,で分割し配列に変換
	for(var i=0; i<data.length; i+=2){
		lat = data[i];	// 緯度
		lng = data[i+1];	// 経度
		pos.push([lat, lng]);	// 座標を配列に追加
		polylines.push(new google.maps.LatLng(lat, lng));	// 描画用の配列に座標を追加
	}
	drawPolyline();	// 連続直線を描画する
}
// ページ切り換え時にローカルストレージに座標値を保存
window.addEventListener("unload", function(){
	try{
		localStorage.setItem("posData", pos.toString());	// 文字列に変換し保存
	}catch(e){
		alert("容量オーバーでこれ以上保存できません");
	}
}, true);
