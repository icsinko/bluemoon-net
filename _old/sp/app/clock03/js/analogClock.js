// JavaScript Document

setInterval(function(){
	var currentTime = new Date();
	var h = currentTime.getHours() % 12;
	var m = currentTime.getMinutes();
	var s = currentTime.getSeconds();
	h = h * 30 + (m/12) * 6;
	m = m * 6;
	s = s * 6;
	context.clearRect(0,0,myCanvas.width,myCanvas.height);
	context.drawImage(baseImage,0,80);
	context.save();
	context.translate(160,240);
	//短針
	context.save();
	context.rotate(h * Math.PI / 180);
	context.drawImage(shortImage,-160,-170);
	context.restore();
	//長針
	context.save();
	context.rotate(m * Math.PI / 180);
	context.drawImage(longImage,-160,-170);
	context.restore();
	//秒針
	context.save();
	context.rotate(s * Math.PI / 180);
	context.drawImage(secImage,-160,-170);
	context.restore();
	
	context.restore();
},1000);
setTimeout("window.scrollTo(0,1)",100);
var myCanvas = document.getElementById("clock");
var context = myCanvas.getContext("2d");
var baseImage = new Image();
baseImage.src = "images/base.png";
var shortImage = new Image();
shortImage.src = "images/short.png";
var longImage = new Image();
longImage.src = "images/long.png";
var secImage = new Image();
secImage.src = "images/sec.png";
