window.addEventListener("load", function(){
	var baseX = 72;	// 時計を表示する最初のX座標
	var baseY = 224;	// 時計を表示するY座標
	setInterval(function(){
		var currentTime = new Date();
		var h = "0"+currentTime.getHours();
		var m = "0"+currentTime.getMinutes();
		var s = "0"+currentTime.getSeconds();
		h = h.substr(h.length-2, 2);
		m = m.substr(m.length-2, 2);
		s = s.substr(s.length-2, 2);
		var timeStr = h+"c"+m+"c"+s;
		// Canvasに描画
		var myCanvas = document.getElementById("clock");
		var context = myCanvas.getContext("2d");
		context.clearRect(0, 0, myCanvas.width, myCanvas.height);
		for(var i=0; i<timeStr.length; i++){
			var img = new Image();
			img.src = "images/"+timeStr.charAt(i)+".png";
			context.drawImage(img, i * img.naturalWidth + baseX, baseY);
		}
	}, 1000);
	setTimeout("window.scrollTo(0,1)", 10);
}, true);

// JavaScript Document

var count = 0;
var max = 6;
var fadeCount = 0;
var canvasObj = document.getElementById("myCanvas");
var context = canvasObj.getContext("2d");
var img = new Image();
function drawPhoto(){
	img.src = "photo/"+count+".jpg";
	img.onload = function(){
		count = (count + 1) % max;
		fadeCount = 0;
		fadeIn();
	}
}
function fadeIn(){
	context.globalAlpha = fadeCount / 20;
	if (fadeCount < 21){
		setTimeout("fadeIn()",50);
		fadeCount++;
	}
	context.drawImage(img,0,0);
}
setTimeout(function(){scrollTo(0,1);},100);
setInterval("drawPhoto()",10000);
drawPhoto();