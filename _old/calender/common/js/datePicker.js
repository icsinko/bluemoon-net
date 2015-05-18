// JavaScript Document
$(function(){
	$("#datepicker").datepicker({
		showOn: "button",
		buttonImage: "common/images/calendar.gif",
		buttonImageOnly: true,
		numberOfMonths: 2,
		showButtonPanel: false,
		beforeShowDay: function(date) {
				var result;
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = ('00' + m).slice(-2);
				var d = date.getDate();
				d = ('00' + d).slice(-2);
				var c = y + "" + m + "" + d;
				var h = ymd[c];
				if(h == 0) {
						result = [true, "date-holiday", h];
				} else {
						switch (date.getDay()) {
								case 0: //日曜日
										result = [true, "date-holiday"];
										break;
								case 6: //土曜日
										result = [true, "date-holiday"];
										break;
								default:
										result = [true];
										break;
						}
				}
				return result;
		},
		onSelect: function(dateText, inst) {
//				alert(dateText);
		}
	});
	$( "#datepicker" ).datepicker( "option", "dateFormat", "yy-mm-dd (D)" );
});