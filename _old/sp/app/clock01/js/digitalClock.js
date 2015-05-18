setInterval(function(){
	var currentTime = new Date();
	var h = "0"+currentTime.getHours();
	var m = "0"+currentTime.getMinutes();
	var s = "0"+currentTime.getSeconds();
	h = h.substr(h.length-2,2);
	m = m.substr(m.length-2,2);
	s = s.substr(s.length-2,2);
	var timeStr = h+":"+m+":"+s;
	document.getElementById("clock").innerHTML = timeStr;
},1000);

setTimeout("window.scrollTo(0,1)",10);