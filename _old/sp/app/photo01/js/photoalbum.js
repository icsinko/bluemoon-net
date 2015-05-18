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
setInterval("drawPhoto()",4000);
drawPhoto();