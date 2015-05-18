<!DOCTYPE HTML>
<html lang="ja-JP">
<head>
<meta charset="UTF-8">
<title>BLUEMOON-NET</title>
<!--共通CSS-->
<link href="common/css/style.css" rel="stylesheet" type="text/css" media="all" />
<link href="common/css/design.css" rel="stylesheet" type="text/css" media="all" />
<link href='http://fonts.googleapis.com/css?family=Nova+Square' rel='stylesheet' type='text/css'>
<!--ページ別CSS-->
<link href="common/css/top.css" rel="stylesheet" type="text/css" media="all" />
<!--共通JS-->
<script type="text/javascript" src="common/js/jquery-1.6.4.min.js"></script>
<script type="text/javascript" src="common/js/jquery.easing.1.3.js" language="JavaScript"></script>
<script type="text/javascript" src="common/js/browser.js"></script>
<script type="text/javascript" src="common/js/modernizr.js"></script>
<script type="text/javascript" src="common/js/menu.js"></script>
<script type="text/javascript" src="common/js/slidebreadcrumbslist.js" language="JavaScript"></script>
<!--ページ別JS-->
<script src="common/js/slider.js"></script>
<script>
$(function(){

		// 初期設定は、自動＆左＆linear＆10ms
		$("#slider-0").slider({
			time: 32
		});
		// 手動で動かす
		$("#slider-1").slider({
			auto: false,
			pause: false
		});
		// 早送り・巻き戻し
		$("#slider-2").slider({
			direction: "right",
			time: 24,
			speed: 3
		});
		
});
</script>
</head>
<body>
<div id="wrapper">
	<?php include 'temp/header.php'; ?>
	<?php include 'temp/menu.php'; ?>
    <div id="contents">
    
    <p>BlueMoon-Net<br/>
    Web create and Design<br/>
    Application create</p>

	<div class="slideFrame" id="slider-0">
		<ul class="slideGuide">
			<li class="slideCell"><img src="common/images/top/photo/150/01.jpg" width="200" height="150" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/150/02.JPG" width="200" height="150" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/150/03.JPG" width="200" height="150" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/150/04.jpg" width="200" height="150" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/150/05.JPG" width="200" height="150" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/150/06.JPG" width="200" height="150" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/150/07.JPG" width="200" height="150" alt="topImage"></li>
		</ul>
	</div>

	<div class="slideFrame" id="slider-1">
		<ul class="slideGuide">
			<li class="slideCell"><img src="common/images/top/photo/75/01.jpg" width="75" height="75" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/75/02.JPG" width="75" height="75" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/75/03.JPG" width="75" height="75" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/75/04.jpg" width="75" height="75" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/75/05.JPG" width="75" height="75" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/75/06.JPG" width="75" height="75" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/75/07.JPG" width="75" height="75" alt="topImage"></li>
		</ul>
		<div class="slideCtrl left">&lt; prev</div>
		<div class="slideCtrl right">next &gt;</div>
	</div>

	<div class="slideFrame" id="slider-2">
		<ul class="slideGuide">
			<li class="slideCell"><img src="common/images/top/photo/150/08.JPG" width="200" height="150" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/150/09.JPG" width="200" height="150" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/150/10.JPG" width="200" height="150" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/150/11.jpg" width="200" height="150" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/150/12.jpg" width="200" height="150" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/150/13.JPG" width="200" height="150" alt="topImage"></li>
			<li class="slideCell"><img src="common/images/top/photo/150/14.JPG" width="200" height="150" alt="topImage"></li>
		</ul>
	</div>
    </div>
	<?php include 'temp/footer.php'; ?>
</div>
</body>
</html>