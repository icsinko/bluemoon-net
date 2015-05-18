<!DOCTYPE HTML>
<html lang="ja-JP">
<head>
<meta charset="UTF-8">
<title>BLUEMOON-NET</title>
<script type="text/javascript" src="../common/js/prototype.js"></script>
<script type="text/javascript" src="../common/js/box2d.js"></script>
<script type="text/javascript" src="../common/js/protoBox2d.js"></script>
<script type="text/javascript" src="../common/js/jquery-1.6.4.min.js"></script>
<script src="../common/js/jquery.easing.1.3.js" language="JavaScript" type="text/javascript"></script>
<script type="text/javascript" charset="utf-8">
			var j$ = jQuery.noConflict();
			
			j$(function() {
				// smooth scroller
				j$("a[href^=#]").click(function() {
					var hash = this.hash;
					j$(j$.browser.safari ? 'body' : 'html')
						.animate({scrollTop: j$(hash).offset().top}, 1500, "easeInOutBounce");
					return false;
				});
				
				j$("#dobox2d").click(function() {
					new protoBox2d().init();
				});
			});
		</script>
<style type="text/css" media="screen">
		.protoBox2d{
			margin-bottom: 20px;
		}
		
		#imageWraper1 {
			margin: 0px auto;
			width: 700px;
			height: 280px;
			border: 1px dashed;
			text-align: center;
		}

		.btn {
			text-align: center;
		}
	</style>
</head>
<body>
<div id="wrapper">
  <div id="contents">
    <div id="imageWraper1">  
      <br>  
      <input class="box2d" type="text" style="width: 400px">  
      <br><br>  
      <input class="box2d" type="button" value="Google検索">  
      <input class="box2d" type="button" value="I'm Feeling Lucky">  
      <br><br>  
      <input class="box2d" type="radio"/><span class="box2d">ウェブ全体から検索</span>  
      <input class="box2d" type="radio" value="lang_ja" /><span class="box2d">日本語のページを検索</span>  
      <a class="box2d" href="#">検索オプション</a> <span class="box2d">|</span> <a class="box2d" href="#">表示設定</a> <span class="box2d">|</span> <a class="box2d" href="#">言語ツール</a>  
    </div>
    <br>
    <div class="btn">
      <input type="button" id="dobox2d" value="do box2d" alt="Do Box2dJs" title="do box2d"/>
    </div>
  </div>
</div>
</body>
</html>
