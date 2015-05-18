<!DOCTYPE HTML>
<html lang="ja-JP">
<head>
<meta charset="UTF-8">
<title>BLUEMOON-NET</title>
<!--共通CSS-->
<link href="../common/css/style.css" rel="stylesheet" type="text/css" media="all" />
<link href="../common/css/design.css" rel="stylesheet" type="text/css" media="all" />
<link href='http://fonts.googleapis.com/css?family=Nova+Square' rel='stylesheet' type='text/css'>
<!--ページ別CSS-->
<link href="common/css/facebook.css" rel="stylesheet" type="text/css" media="all" />
<!--共通JS-->
<script type="text/javascript" src="../common/js/jquery-1.6.4.min.js"></script>
<script type="text/javascript" src="../common/js/jquery.easing.1.3.js" language="JavaScript"></script>
<script type="text/javascript" src="../common/js/browser.js"></script>
<script type="text/javascript" src="../common/js/modernizr.js"></script>
<script type="text/javascript" src="../common/js/menu.js"></script>
<script type="text/javascript" src="../common/js/slidebreadcrumbslist.js" language="JavaScript"></script>
<!--ページ別JS-->
<script type="text/javascript" src="../common/js/jquery.color.js"></script>
<script type="text/javascript" src="common/js/facebook.js"></script>
</head>
<body>
<div id="wrapper">
	<?php include '../temp/header.php'; ?>
	<?php include '../temp/menu.php'; ?>
  <div id="contents">
		<ul id="breadcrumbslist">
        <li class="home"><a href="/">HOME</a></li>
        <li class="current"><span>Facebook</span></li>
    </ul>
    <div id="main">
    	<div id="fbline">
      	<ul></ul>
      </div>
    </div>
		<div id="side">
			<div id="sideInner">
				<div id="alpha">
					<h2 class="sideTtl">Facebook</h2>
          <p class="fbBtn">
            <a class="fb-like" href="http://www.facebook.com/plugins/like.php?href=http://www.bluemoon-net.jp/facebook/" onclick="javascript:window.open('http://www.facebook.com/plugins/like.php?href=http://www.bluemoon-net.jp/facebook/' ,null ,'width=650 ,height=450'); return false;" rel="nofollow"><img src="common/images/facebook.png" alt="facebook" width="35" height="35"></a>
            <span id="likeCount1"></span>
          </p>
				</div>
			</div>
		</div>
  </div>
	<?php include '../temp/footer.php'; ?>
</div>
</body>
</html>