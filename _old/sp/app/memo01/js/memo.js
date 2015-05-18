// JavaScript Document

var memoArea = document.getElementsByTagName("textarea");
// データ読み出し
for (var i=0; i<memoArea.length; i++){
	memoArea[i].value = localStorage.getItem("memo"+i);
}
// イベント設定
window.addEventListener("unload", saveData, true);
document.getElementById("saveButton").addEventListener("click",saveData,true);
// データ保存
function saveData(){
	for(var i=0; i<memoArea.length; i++){
		try{
			localStorage.setItem("memo"+i, memoArea[i].value);
		}catch(e){
			alert("保存領域が一杯です。文字数を減らしてください");
			return;
		}
	}
	alert("保存しました");
}
setTimeout(function(){scrollTo(0,1);},100);