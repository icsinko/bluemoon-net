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
<link href="common/css/twitter.css" rel="stylesheet" type="text/css" media="all" />
<!--共通JS-->
<script type="text/javascript" src="../common/js/jquery-1.6.4.min.js"></script>
<script type="text/javascript" src="../common/js/jquery.easing.1.3.js" language="JavaScript"></script>
<script type="text/javascript" src="../common/js/browser.js"></script>
<script type="text/javascript" src="../common/js/modernizr.js"></script>
<script type="text/javascript" src="../common/js/menu.js"></script>
<script type="text/javascript" src="../common/js/slidebreadcrumbslist.js" language="JavaScript"></script>
<!--ページ別JS-->
<script type="text/javascript" src="../common/js/jquery.color.js"></script>
<script type="text/javascript" src="common/js/script.js"></script>
</head>
<body>
<div id="wrapper">
	<?php include '../temp/header.php'; ?>
	<?php include '../temp/menu.php'; ?>
    <div id="contents">
		<ul id="breadcrumbslist">
           	<li class="home"><a href="/">HOME</a></li>
           	<li class="current"><span>Twitter</span></li>
        </ul>
		<div id="side">
			<div id="sideInner">
				<div id="alpha">
					<h2 class="sideTtl">Twitter</h2>
					<div id="twitter">JavaScriptを有効に設定してください。</div>
				</div>
				<div id="beta">
					<h2 class="sideTtl">Banner</h2>
					<ul id="banner">
						<li><a href="http://twitter.com/#!/icsinko" class="color-twitter"><img src="../common/images/twitter/bnr_twitter.gif" alt="@icsinko" width="215" height="65" /></a></li>
					</ul>
				</div>
			</div>
		</div>
    </div>
	<?php include '../temp/footer.php'; ?>
</div>
</body>
</html>