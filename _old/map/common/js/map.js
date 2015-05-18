$(function(){
	
	// Googleマップの埋め込み
	var gmap = $("#gmap").gmap3({
		
		// 初期表示位置の指定
		latitude:   35.692125, // 緯度
		longitude: 139.742649, // 経度
		zoom: 15,              // ズームレベル
		
		// 各コントロールの表示／非表示
		navigationControl: true,
		mapTypeControl: false,
		scaleControl: true,
		
		// マーカーの設置
		markers: [
			{
				address: '〒324-0047 栃木県大田原市',
				title: 'BLUEMOON-NET',
				content: '<div class="popup"><h4>BLUEMOON-NET</h4><p>〒324-0047<br />栃木県大田原市</p></div>',
				icon: '../images/map/icn_marker.png',
				openInfo: true
			}
		]
	
	}).data('gmap');
	
	// カスタムマップタイプを設定
	var myStyledMapType = new google.maps.StyledMapType(
		[
			{
				featureType: "all",
				elementType: "all",
				stylers: [
					{ hue: '#f9c631' },
					{ lightness: 10 },
					{ saturation: -40 },
					{ gamma: .7 }
				]
			}
		]
	);
	
	// カスタムマップタイプの登録
	gmap.mapTypes.set('myMapType', myStyledMapType);
	gmap.setMapTypeId('myMapType');

});
