<?php
require_once("twitteroauth/twitteroauth.php");
 
$consumerKey = "yPYzfebsNg4GPaDzMFiBPw";
$consumerSecret = "JwCuGbpPzQa93imuxPfb1mlS5zb2ZTSEum8LcpTh8";
$accessToken = "99205679-q28sBj5L4floGowhy3DjsEx9cCJVmIchbYXK9QY0";
$accessTokenSecret = "5IIgYbLGkqYaKKMRVUYhSQVmajLB8Hh8CnFdV1K44";
 
$twObj = new TwitterOAuth($consumerKey,$consumerSecret,$accessToken,$accessTokenSecret);
$req = $twObj->OAuthRequest("https://api.twitter.com/1.1/statuses/user_timeline.json","GET",array("count"=>"10"));
echo $_GET['callback'] . '(' . $req. ')';
$tw_arr = json_decode($req);

if (isset($tw_arr)) {
	foreach ($tw_arr as $key => $val) {
		echo $tw_arr[$key]->text;
		echo date('Y-m-d H:i:s', strtotime($tw_arr[$key]->created_at));
		echo '<br>';
	}
} else {
	echo 'つぶやきはありません。';
}