// JavaScript Document
$(function(){
	// 初期設定
	myDate    = new Date();                                    // 今日の日付データ取得
	myWeekTbl = new Array("日","月","火","水","木","金","土"); // 曜日テーブル定義
	myMonthTbl= new Array(31,28,31,30,31,30,31,31,30,31,30,31);// 月テーブル定義
	myYear = myDate.getYear();                                 // 下２桁の西暦取得
	myYear = (myYear<2000) ? (1900+myYear) : (myYear);         // ４桁の西暦に変換
	if (((myYear%4)==0 && (myYear%100)!=0) || (myYear%400)==0) {
		 myMonthTbl[1] = 29;                                     // うるう年
	}
	myMonth = myDate.getMonth();                               // 月を取得(0月～11月)
	myToday = myDate.getDate();                                // 今日の'日'を取得
	myDate.setDate(1);                                         // 日付を'１日'に
	myWeek = myDate.getDay();                                  // '１日'の曜日を取得
	myTblLine = Math.ceil((myWeek+myMonthTbl[myMonth])/7);     // カレンダーの行数
	myTable   = new Array(7*myTblLine);                        // 表のセル数分定義
	
	for(i=0; i<7*myTblLine; i++) {
		myTable[i]="";              // myTableを掃除する
	}
	for(i=0; i<myMonthTbl[myMonth]; i++) {
		myTable[i+myWeek]=i+1; // 日付を埋め込む
	}

	var div = $("#celender");
	div.prepend('<table id="calenderTbl"></table>');
	div.prepend("<strong>" + myYear + "年" + (myMonth+1) + "月カレンダー</strong>");
	var calenderTbl = $('#calenderTbl');
 
	// calender生成
	function crtCalender(){
		var th = '<tr>';
		for(i=0; i<7; i++){
			 th += "<th>";
			 th += myWeekTbl[i];          // 曜日の表示
			 th += "</th>";
		}
		th += '</tr>';

		var t = '';
		for(i=0; i<myTblLine; i++){
			 t += "<tr>";
			 for(j=0; j<7; j++){
					myDat = myTable[j+(i*7)]; // 日取得
					ed = ymd[myYear][myMonth+1][myDat];
					if( ed == 0){
						t += '<td class="holiday">';
					}else if( myDat == myToday){
						t += '<td class="today">';
					}else{
						t += "<td>";
					}
					t += myDat;               // 日付セット
					t += "</td>";
			 }
			 t += "</tr>";
		}

		var tt = th + t;
		calenderTbl.append(tt);
	}
	
	crtCalender();
})
