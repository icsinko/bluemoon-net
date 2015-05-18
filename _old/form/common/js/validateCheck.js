// JavaScript Document
$(function() {
	// アラートボックスのHTML
	var $alertBox = $('<a href="#" class="alertBox"></a>');

	// バリデーションルール
  $.validationRules = $.extend($.validationRules, {
    chkrequired: [
      "入力してください",
      function(txt, t) {
        if ( $(t).hasClass("chkgroup") ) {
          var flag = 0;
          $("input,select",t).each(function() {
            if ( $(this).val().length > 0 ) flag++;
          });
          if ( txt && flag === $("input,select", t).length ) {
            if ( /^[ 　\r\n\t]+$/.test(txt) ) {
              return false;
            } else {
              return true;
            }
          }
        } else {
          if ( txt && txt.length>0 ) {
            if ( /^[ 　\r\n\t]+$/.test(txt) ) {
              return false;
            } else {
              return true;
            }
          }
        }
      }
    ],
    chkselect: [
      "選択してください",
      function(txt, t) {
        if ( txt && txt.length>0 ) {
          if ( /^[ 　\r\n\t]+$/.test(txt) ) {
            return false;
          } else {
            return true;
          }
        }
      }
    ],
    chkretype: [
      "入力内容が異なります",
      function(txt, t) {
        var elm = $("#" + $(t).attr("class").split("retype\-")[1].split(/\b/)[0]);
        if ( elm.hasClass("chkgroup") ) {
          var chktxt = $("input", elm), txt = $("input", t);
          for ( var i = 0, flag = false; i < chktxt.length; i++ ) {
            if ( chktxt[i].value === txt[i].value ) {
              flag = true;
            } else {
              flag = false;
              break;
            }
          }
          if ( flag ) return true;
        } else {
          return elm.val() == txt;
        }
      }
    ],
    chkemail: [
      "正しいメールアドレスの形式を入力してください",
      /^(?:[^\@]+?@[A-Za-z0-9_\.\-]+\.+[A-Za-z\.\-\_]+)*$/
    ],
    chkhankaku: [
      "全角文字は使用できません",
      /^(?:[a-zA-Z0-9@\<\>\;\:\[\]\{\}\|\^\=\/\!\*\`\"\#\$\+\%\&\'\(\)\,\.\-\_\?\\\s]*)*$/
    ], //"
    chkzenkaku: [
      "全角文字で入力してください",
      /^(?:[^a-zA-Z0-9@\<\>\;\:\[\]\{\}\|\^\=\/\!\*\"\#\$\+\%\&\'\(\)\,\.\-\_\?\\\s]+)*$/
    ],
    chkhiragana: [
      "ひらがなで入力してください",
      /^(?:[ぁ-ゞ]+)*$/
    ],
    chkkatakana: [
      "カタカナで入力してください",
      /^(?:[ァ-ヾ]+)*$/
    ],
    chkfurigana: [
      "ふりがなはひらがな、全角数字と〜、ー、（）が利用できます",
      /^(?:[ぁ-ゞ０-９ー～（）\(\)\d 　]+)*$/
    ],
    chknochar: [
      "英数字で入力してください",
      /^(?:[a-zA-Z0-9]+)*$/
    ],
    chknocaps: [
      "英数字(小文字のみ)で入力してください",
      /^(?:[a-z0-9]+)*$/
    ],
    chknumonly: [
      "半角数字のみで入力してください",
      /^(?:[0-9]+)*$/
    ],
    chkmin: [
      "文字以上で入力してください",
      function(txt, t) {
        if ( txt.length === 0 ) return true;
         var length = $(t).attr("class").match(/min(\d+)/) ? RegExp.$1 : null;
        return txt.length >= length;
      }
    ],
    chkmax: [
      "文字以内で入力してください",
      function(txt, t) {
        var length = $(t).attr("class").match(/max(\d+)/) ? RegExp.$1 : null;
        return txt.length <= length;
      }
    ],
    chkradio: [
      "選択してください",
      function(txt, t) {
        return $("input:checked",t).length>0;
      }
    ],
    chkcheckbox: [
      "選択してください",
      function(txt, t) {
        return $("input:checked",t).length>0;
      }
    ],
    chkzip: [
      "正しい郵便番号の形式を入力してください",
      /^(?:\d{3}-?\d{4}$|^\d{3}-?\d{2}$|^\d{3}$)*$/
    ],
    chkurl: [
      "正しいURLの形式を入力してください",
      /^(?:(?:ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)*$/
    ],
    chktel: [
      "正しい電話番号を入力してください",
      /^(?:\(?\d+\)?\-?\d+\-?\d+)*$/
    ],
    chkfax: [
      "正しいファックス番号を入力してください",
      /^(?:\(?\d+\)?\-?\d+\-?\d+)*$/
    ],
    chkfile: [
      "ファイルを選択してください",
      function(txt, t) {
        if ( txt && txt.length>0 ) {
          if ( /^[ 　\r\n\t]+$/.test(txt) ) {
            return false;
          } else {
            return true;
          }
        }
      }
    ]
  });

	// 初期設定定義
	conf = this.conf = $.extend({
		err                : null,
		ok                 : null,
		scrollToErr        : true,
		scrollDuration     : 500,
		scrollAdjust       : -10,
		errInsertPos       : 'before',
    errFocus           : false,
    errZIndex          : 500,
    errHoverHide       : false,
    errMsg             : "\* ",
		errPosition        : 'fixed',
		errTipPos          : "right", // left
		errTipCloseBtn     : true,
		errTipCloseLabel   : "×",
    errOpacity         : undefined,
    stepValidation     : true, // errorが複数の場合一つずつ処理
    customListener     : "blur keyup change focus",
    customAddError     : null, // function(){}
		// チェック対象入力項目定義
		inputs: [
			"input:text",
			"input:password",
			"input:hidden",
			"input:file",
			"textarea",
			"select",
			"input[type=email]",
			"input[type=url]",
			"input[type=tel]",
			"input[type=date]",
			"input[type=datetime]",
			"input[type=month]",
			"input[type=week]",
			"input[type=time]",
			"input[type=datetime-local]",
			"input[type=number]",
			"input[type=range]",
			"input[type=color]",
			"[class*=group]",
			"[class*=radio]",
			"[class*=checkbox]"
		],
		// チェック対象入力項目グループ定義
		groupInputs: [
			"input:text",
			"input:password",
			"input:checkbox",
			"input:radio",
			"input[type=email]",
			"input[type=url]",
			"input[type=tel]",
			"input[type=date]",
			"input[type=datetime]",
			"input[type=month]",
			"input[type=week]",
			"input[type=time]",
			"input[type=datetime-local]",
			"input[type=number]",
			"input[type=range]",
			"input[type=color]",
			"select",
			"textarea"
		],
		// 各項目IDごとのチェック内容定義
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
		}
	});
	
	conf.inputs = conf.inputs.join(",");
	conf.groupInputs = conf.groupInputs.join(",");

	var form = $('form');
	
	// error再入力時アラートクリア
	form.find("input:checkbox,input:radio,input:button,input:submit,input:reset").click(function() {
		errFocusClear(conf.errZIndex);
	});

	// validation rules をクラスに設定
	for ( var c in conf.rules ) {
		$("#" + c).addClass(conf.rules[c]);
	}

	// form ID をセット
	var formID = form.attr("id");

	// input設定
	var inputs = $(conf.inputs, form)
		.filter(function() { return !$(this).parents().hasClass("chkgroup"); }),
		classReg = returnReg(),
		bindValidateFuncs = function(target, group) {
			var self = group ? group : target;
			target.bind(conf.customListener, function() {
				basicValidate(group ? group : this, conf.err, conf.ok);
				errFocus("#err_" + self.attr("id"));
			}).blur(function() {
				errFocusClear();
			});
		};

	inputs.each(function() {
		var self = $(this),
			cl = this.className,
			id = this.id,
			reg1 = undefined,
			reg2 = undefined,
			toggleTarget = undefined;

		if ( conf.errTipPos === "right" ) {
			self.addClass("errPosRight");
		}

		// if target has one of classRegulations
		if ( classReg.test(cl) ) {
			if ( conf.errInsertPos === "body" ) {
				b.append(_this.generateErr(id, formID));
			} else {
				self[conf.errInsertPos](generateErr(id, formID));
				self.addClass(conf.errInsertPos);
			}

			if ( conf.errHoverHide ) {
				$("#err_"+id).mouseenter(function() {
					$(this).fadeOut();
				});
			}
			if ( conf.errTipCloseBtn ) {
				$("#err_"+id).append(
					$("<span></span>")
						.addClass("formErrorClose")
						.text(conf.errTipCloseLabel)
						.click(function() {
							$(this).parent().fadeOut();
						})
				);
			}
			if ( conf.errOpacity !== undefined ) {
				$("#err_"+id).children().css("opacity", conf.errOpacity);
			}
			if ( conf.errPosition === "absolute" ) {
				getErrHeight(id, conf.errZIndex);

				// Reget the position
				$(window).resize(function() {
					getErrHeight(id, conf.errZIndex);
				});
			}
			$("#err_"+id).hide();
		}
	});

	// Checkboxによる分岐
	inputs.each(function() {
		var _self = $(this),
			reg1 = undefined,
			reg2 = undefined,
			toggleTarget = undefined;

		if ( this.className.match(/chktoggle_([^_]+)_([^ ]+)/) ) {
			reg1 = "#" + RegExp.$1;
			reg2 = "#" + RegExp.$2;
			toggleTarget = $(reg2).removeClass("chkrequired");
			$(reg1).click(function() {
				if ( this.checked ) {
					toggleTarget.addClass("chkrequired");
				} else {
					toggleTarget.removeClass("chkrequired");
				}
				laterCall(toggleTarget);
			});
		}

		if ( !conf.firstValidate ) return;
		if ( _self.hasClass("chkgroup") ) {
			bindValidateFuncs($(conf.groupInputs, _self), _self);
		} else {
			bindValidateFuncs(_self);
		}
	});

	// バリデートチェック呼び出し
	function laterCall(t) {
		basicValidate(t, conf.err, conf.ok);
	};

	// errorエリア設定
	function generateErr(id, formID) {
		return [
			'<div id="err_'+id+'" class="formError userformError'+' '+formID+' '+this.conf.errPosition+'">',
				'<div class="formErrorMsg formErrorContent"></div>',
				'<div class="formErrorArrow">',
					'<div class="line10"></div>',
					'<div class="line9"></div>',
					'<div class="line8"></div>',
					'<div class="line7"></div>',
					'<div class="line6"></div>',
					'<div class="line5"></div>',
					'<div class="line4"></div>',
					'<div class="line3"></div>',
					'<div class="line2"></div>',
					'<div class="line1"></div>',
				'</div>',
			'</div>'
		].join("");
	}

	//エラーがあった場合にアラートを表示
	function customAddError() {
		if ($("#alert").length < 1) {
			$("#regist table").before('<div id="alert"><strong>入力内容に誤りがあります。内容を修正して再度［この内容で登録する］ボタンをクリックしてください</strong></div>');
		}
	}

	//スクロール位置の調節
	function customScrollAdjust() {
		var offset = $("#regist").offset(); 
		return offset.top;
	}

  // Common functions
  function returnReg() {
    var vClasse = "";
    for( var c in $.validationRules ) {
      vClasse += "(?:\\s+|^)"+c+"(?:\\s+|$)|";
    }
    vClasse += "(?:\\s+|^)chkmin\\d+(?:\\s+|$)|";
    vClasse += "(?:\\s+|^)chkmax\\d+(?:\\s+|$)|";
    vClasse = vClasse.replace(/\|$/,"");
    return new RegExp(vClasse);
  }
  function fnConfirmation(fn) {
    return fn && typeof fn === "function";
  }

	// エラーメッセージ処理	
	function insertErrMsg(t, id, c, errMsg) {
		var msgs = $(".errMsg", "#err_"+id),
			returnFlg = true;
		if ( msgs.length > 0 ) {
			$.each(msgs, function() {
				if ( $(this).hasClass(c) ) {
					returnFlg = false;
				}
			});
		}
		if ( !returnFlg ) return false;
		$(".formErrorMsg", "#err_"+id).append(
			$("<span></span>")
				.addClass("errMsg")
				.addClass(c)
				.text(errMsg)
			);
		
		getErrHeight(id);
	}

	// エラーメッセージの高さを設定	
	function getErrHeight(id, zIndex) {
		if ( conf.errPosition !== "absolute" ) return false;
		var input = $("#"+id),
			err = $("#err_"+id),
			target = input.is(":hidden") ? input.next() : input,
			pos = target.offset();
		
		if ( !!pos ) {
			var left = target.hasClass("errPosRight")
					? pos.left + target.get(0).offsetWidth - 40
					: pos.left - 20;
					
			err.css({
				position: "absolute",
				top: pos.top - err.get(0).offsetHeight,
				left: left
			});
		}
		
		if ( zIndex ) {
			err.css("zIndex", zIndex);
		}
	}

	// バリデートチェック
	function basicValidate(t, err, ok) {
		var _t = $(t),
			CL = _t.attr("class"),
			chk = $.validationRules,
			id = _t.attr("id"),
			txt = "",
			_this = this;

		if ( _t.hasClass("chkgroup") ) {
			var groupInputs = $(conf.groupInputs, t);
			groupInputs.each(function(i) {
				var self = $(this);
				txt += self.val();
				if( CL.indexOf("chkemail") !== -1 && i==0 && self.val().length > 0 )
					txt += "@";
			});
		} else {
			txt = _t.val();
		}

		var check = {
			isError: false,
			failed: function(t, c) {
				var msg = chk[c][0]; // error message
				if ( c.match(/chkmin/i) && CL.match(/chkmin(\d+)/i) ) {
					msg = RegExp.$1 + msg;
				} else
				if ( c.match(/chkmax/i) && CL.match(/chkmax(\d+)/i) ) {
					msg = RegExp.$1 + msg;
				}

				if( fnConfirmation(err) ) {
					err(t, id, conf.errMsg + msg);
				} else {
					_t.addClass("err");
					$("."+c, "#err_"+id).show();
					$("#err_"+id).stop(true, true).fadeIn();
					insertErrMsg(t, id, c, conf.errMsg + msg);
					getErrHeight(id);
				}
				this.isError = true;

			}
		};

		var c;
		for ( c in chk ) {
			if ( !CL ) continue;
			if ( _t.hasClass(c) || (c === "chkmin" && CL.match(/(?:\s+|^)chkmin\d+(?:\s+|$)/) )
													|| (c === "chkmax" && CL.match(/(?:\s+|^)chkmax\d+(?:\s+|$)/) )
													|| ( CL.indexOf(c) !== -1 && CL.indexOf("chkretype") !== -1 ) ) {
				if ( typeof(chk[c][1]) !== "function" ) {
					if ( !txt.match(chk[c][1]) ) {
						check.failed(t, c);
					} else
					if ( conf.stepValidation ) {
						if ( $(".errMsg:visible", "#err_"+id).length > 1 ) {
							$("."+c, "#err_"+id).hide();
							getErrHeight(id);
						}
					}
				} else {
					if ( !chk[c][1](txt, t) ) {
						check.failed(t, c);
					} else if ( conf.stepValidation ) {
						if ( $(".errMsg:visible", "#err_"+id).length > 1 ) {
							$("."+c, "#err_"+id).hide();
							getErrHeight(id);
						}
					}
				}
			}
		}

		if ( !check.isError ) {
			if ( fnConfirmation(ok) ) {
				ok(t, id);
			} else {
				_t.removeClass("err");
				$("#err_"+id).stop(true, true).fadeOut();
			}
		}

	}


	// submit時処理
	function checkValidation(){
		// form check
		inputs.each(function() {
			var self = $(this);

			basicValidate(this, conf.err, conf.ok, true);

			if ( self.hasClass("chkgroup") ) {
				bindValidateFuncs($(conf.groupInputs, self), self);
			} else {
				bindValidateFuncs(self);
			}
		});

		var err = $(".formError:visible[class*='"+formID+"']");
		// エラーがある場合
		if ( err.length > 0 ) {
			// message表示
			customAddError();
			
			if ( conf.scrollToErr ) {
				var reverseOffsetTop,
					infoErr, errTop,
					scrollTarget = $.support.boxModel
						? navigator.appName.indexOf("Opera") !== -1 ?
							"html" : "html,body"
						: "body";
				if ( !conf.customScrollAdjust ) {
					reverseOffsetTop = parseFloat(-10);
				} else {
					reverseOffsetTop = fnConfirmation(conf.customScrollAdjust)
						? parseFloat(conf.customScrollAdjust()) : parseFloat(conf.customScrollAdjust);
				}

				$(scrollTarget).animate({
					scrollTop: reverseOffsetTop + conf.scrollAdjust
				}, {
					easing: $.easing.easeInOutCirc ? "easeInOutCirc" : "swing",
					duration: conf.scrollDuration
				});
			}
			return false;

		// エラーが無い場合
		} else {

			$alertBox
				.clone(true)
				.text('送信完了しました。ありがとうございました。')
				.hide().appendTo('body').slideDown()
				.delay(5000).fadeOut();
					
			return false;
		}
	}
	
	// エラーフォーカスクリア処理
  function errFocusClear(errZIndex) {
    $(".formError")
      .removeClass("fadeOut")
      .css("zIndex", errZIndex)
  }
	// エラーフォーカス処理
  function errFocus(id, errZIndex) {
    var formError = $(".formError");
    formError.removeClass("fadeOut").css("zIndex", errZIndex);
    formError.not(id).addClass("fadeOut");
    $(id).css({
      zIndex: errZIndex + 100
    });
  }

	// submit実行
	$('form').submit(checkValidation);
	
	return false;
});
