// JavaScript Document

var penSize = 10;
var oldX = 0;
var oldY = 0;
var drawFlag = false;
var canvasObj = document.getElementById("myCanvas");
canvasObj.addEventListener("touchmove", function(evt){
	evt.preventDefault();
	if (evt.touches.length > 1){
		penSize = Math.pow(2,evt.touches.length);
		alert("ペンサイズ:"+penSize);
		return;
	}
	//描画処理
	var x = evt.touches[0].pageX;
	var y = evt.touches[0].pageY;
	var context = canvasObj.getContext("2d");
	context.strokeStyle = "rgba(255, 255, 255,1)";
	context.lineWidth = penSize;
	context.lineCap = "round";
	context.beginPath();
	context.moveTo(oldX, oldY);
	if (!drawFlag) {
		context.moveTo(x, y);
		drawFlag = true;
	}
	context.lineTo(x, y);
	context.stroke();
	context.closePath();
	oldX = x;
	oldY = y;
}, false);
canvasObj.addEventListener("touchend", function(evt){
	drawFlag = false;
}, false);
setTimeout(function(){ scrollTo(0,1); }, 100);
// 左に90度回転したらCanvasの内容を消去するか確認
window.addEventListener("orientationchange", function(){
	if (window.orientation == 90){
		var flag = confirm("キャンバス内容を消しますか？");
		if(flag == false){ return; }
		var context = canvasObj.getContext("2d");
		context.clearRect(0,0, canvasObj.width, canvasObj.height);
	}
}, true);