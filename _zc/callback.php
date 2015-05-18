<?php
 
define('APP_ID', '211903255634177');
define('APP_SECRET', 'eadf1ffb05e0c07fd23fcb946d195a8e');
 
$code = $_REQUEST['code'];
 
$token_url = 'https://graph.facebook.com/oauth/access_token?client_id='.
    APP_ID . '&redirect_uri=' . urlencode(CALLBACK) . '&client_secret='.
    APP_SECRET . '&code=' . $code;
 
// access token 取得
$access_token = file_get_contents($token_url);
 
// ユーザ情報json取得してdecode
$user_json = file_get_contents('https://graph.facebook.com/me?' . $access_token);
$user = json_decode($user_json);
 
// facebook の user_id + name(表示名)をセット
$user_id = $user->id;
$name    = $user->name;
 
// 初回ユーザかチェックするロジック
//if(){
 
    // 初回ユーザならDatabaseへの登録処理・・・などなど
 
//}
 
// ログイン後の画面へ遷移
header("Location: http://www.bluemoon-net.jp/zc/" );