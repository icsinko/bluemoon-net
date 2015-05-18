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
<link href="common/css/dev.css" rel="stylesheet" type="text/css" media="all" />
<!--共通JS-->
<script type="text/javascript" src="../common/js/jquery-1.6.4.min.js"></script>
<script type="text/javascript" src="../common/js/jquery.easing.1.3.js" language="JavaScript"></script>
<script type="text/javascript" src="../common/js/browser.js"></script>
<script type="text/javascript" src="../common/js/modernizr.js"></script>
<script type="text/javascript" src="../common/js/menu.js"></script>
<script type="text/javascript" src="../common/js/slidebreadcrumbslist.js" language="JavaScript"></script>
<!--ページ別JS-->
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script type="text/javascript" src="../common/js/jquery.gmap3.js"></script>
<script type="text/javascript" src="../common/js/map.js"></script>
</head>

<body>
<div id="wrapper">
	<?php include '../temp/header.php'; ?>
	<?php include '../temp/menu.php'; ?>
  <div id="contents">
		<ul id="breadcrumbslist">
     	<li class="home"><a href="/">HOME</a></li>
     	<li class="current"><span>Map</span></li>
    </ul>
		<div class="section" id="map">
			<h2 class="sideTtl">Map</h2>
			<div id="gmap"></div>
		</div>
	</div>
	<?php include '../temp/footer.php'; ?>
</div>
</body>
</html>
