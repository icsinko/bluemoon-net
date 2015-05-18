// JavaScript Document
$(document).ready(function(){
	
	//パスワード強度表示用要素を追加
	$("#pass").after('<span class="passwordScore"></span>');
	$("#pass").password({
		score: ".passwordScore"
	});
	
	//exValidationの初期設定
	var validation = $("#regist").exValidation({
	
		//バリデーションルールの設定
		rules: {
			id: "chkhankaku chkrequired",
			pass: "chkhankaku chkrequired chkmin6",
			passConfirm: "chkhankaku chkrequired chkretype-pass chkmin6",
			name: "chkrequired",
			kana: "chkrequired chkkatakana",
			mailGroup: "chkgroup chkrequired chkhankaku chkemail",
			mailConfirmGroup: "chkgroup chkrequired chkhankaku chkemail chkretype-mailGroup",
				mediaGroup: "chkgroup chkcheckbox chktoggle_media4_otherValue",
					otherValue: "chkrequired",
			job: "chkselect"
		},
	
		//エラーがあった場合にアラートを表示
		customAddError: function() {
			if ($("#alert").length < 1) {
				$("#regist table").before('<div id="alert"><strong>入力内容に誤りがあります。内容を修正して再度［この内容で登録する］ボタンをクリックしてください</strong></div>');
			}
		},
	
		//スクロール位置の調節
		customScrollAdjust: function() {
			var offset = $("#regist").offset(); 
			return offset.top;
		},
	
		//その他オプション
		errFocus: true,
		errInsertPos: 'before',
		errPosition: 'fixed',
		stepValidation: true,
		scrollToErr: true
	});
});