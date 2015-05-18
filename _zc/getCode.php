<?php
 
define('APP_ID', '211903255634177');
define('APP_SECRET', 'eadf1ffb05e0c07fd23fcb946d195a8e');
define('CALLBACK', 'http://www.bluemoon-net.jp/zc/callback.php');
 
$authURL = 'http://www.facebook.com/dialog/oauth?client_id=' .
    APP_ID . '&redirect_uri=' . urlencode(CALLBACK);
 
header("Location: " . $authURL);