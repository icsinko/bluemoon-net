<?php
/**
 * Common Template - tpl_footer.php
 *
 * this file can be copied to /templates/your_template_dir/pagename<br />
 * example: to override the privacy page<br />
 * make a directory /templates/my_template/privacy<br />
 * copy /templates/templates_defaults/common/tpl_footer.php to /templates/my_template/privacy/tpl_footer.php<br />
 * to override the global settings and turn off the footer un-comment the following line:<br />
 * <br />
 * $flag_disable_footer = true;<br />
 *
 * @package templateSystem
 * @copyright Copyright 2003-2005 Zen Cart Development Team
 * @copyright Portions Copyright 2003 osCommerce
 * @license http://www.zen-cart.com/license/2_0.txt GNU Public License V2.0
 * @version $Id: tpl_footer.php 3183 2006-03-14 07:58:59Z birdbrain $
 */
require(DIR_WS_MODULES . zen_get_module_directory('footer.php'));
?>

<?php
if (!$flag_disable_footer) {
?>

<div id="modal-share">
	<a href="#" class="btn-share-facebook"><img src="includes/templates/sweetsoulshop/images/single/btn_share_facebook.png" alt="Share on Facebook" /></a>
	<a href="#" class="btn-share-twitter"><img src="includes/templates/sweetsoulshop/images/single/btn_share_twitter.png" alt="Share on Twitter" /></a>
	<a href="#" class="btn-share-google"><img src="includes/templates/sweetsoulshop/images/single/btn_share_google.png" alt="Share on Google+" /></a><br />
	<a href="#" class="btn-share-close"><img src="includes/templates/sweetsoulshop/images/single/btn_share_close.png" alt="Close" /></a>		
</div>

<footer class="rmt-footer">
	
	<nav class="sp btnlist">
		<ul>
			<li><a href="#">Concept</a></li>
			<li><a href="#">How to Order</a></li>
			<li><a href="#">Inquiry</a></li>
			<li><a href="#">FAQ</a></li>
		</ul>
	</nav>
	
	<div class="rmt-footer-toolbar">
		<div class="rmt-footer-toolbar-social">
			<div class="fb-like" data-href="http://www.example.com/" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false"></div>
			<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://example.com">Tweet</a>
		</div>
		<div class="rmt-footer-toolbar-newsletter">
			<form>
			News Letter&nbsp;
				<input type="text" name="email" />
				<input type="submit" value="Register" />
			</form>
		</div>
		<a href="#content" class="rmt-footer-toolbar-sellbtn"><img src="includes/templates/sweetsoulshop/images/icn_gt_white_large.png" alt="" /> Sell Your Music</a>
	</div>
	
	<div class="rmt-footer-content">
		<ul class="rmt-footer-list">
			<li class="rmt-footer-banners">
				<a href="#" class="rmt-footer-banner rmt-footer-banner-logo"><img src="includes/templates/sweetsoulshop/images/footer_btn_rmt.png" alt="REAL MUSIC TRIBE" /></a>
				<a href="#" class="rmt-footer-banner"><img src="includes/templates/sweetsoulshop/images/footer_btn_facebook.png" alt="Facebook" /></a>
				<a href="#" class="rmt-footer-banner"><img src="includes/templates/sweetsoulshop/images/footer_btn_twitter.png" alt="Twitter" /></a>
				<a href="#" class="rmt-footer-banner"><img src="includes/templates/sweetsoulshop/images/footer_btn_youtube.png" alt="YouTube" /></a>
			</li>
			<li>
				<a href="/concept/">Concept</a><br />
				<a href="?main_page=shippinginfo">How to Order</a><br />
				<a href="?main_page=contact_us">Inquiry</a><br />
				<a href="?main_page=contact_us">FAQ</a><br />
				<a href="?main_page=account">My Account</a><br />
				<a href="?main_page=login">User Registration</a><br />
				<a href="?main_page=shopping_cart">Shopping Cart</a><br />
				<a href="#">Term of Use</a><br />
				<a href="?main_page=privacy">Privacy Policy</a>
			</li>
			<li class="optional">
				<h4>Tag</h4>
				<a href="?main_page=advanced_search_result&search_in_description=1&keyword=Date">Date</a>, <a href="?main_page=advanced_search_result&search_in_description=1&keyword=Day">Day</a>, <a href="?main_page=advanced_search_result&search_in_description=1&keyword=Night">Night</a>, <a href="?main_page=advanced_search_result&search_in_description=1&keyword=Dance">Dance</a>, <a href="?main_page=advanced_search_result&search_in_description=1&keyword=Party">Party</a>,
			</li>
			<li class="optional">
				<a href="#">Jazz Soul</a><br />
				<a href="#">Retro Soul</a><br />
				<a href="#">Neo Soul</a><br />
				<a href="#">Organic Soul</a><br />
				<a href="#">HIP-HOP</a><br />
				<a href="#">R&B</a><br />
				<a href="#">Funk</a><br />
				<a href="#">Compilation</a>
			</li>
			<li class="optional">
				<a href="#">Inquiry</a><br />
				<a href="#">New Releases</a><br />
				<a href="#">Best Sellers</a><br />
				<a href="#">Label</a><br />
				<a href="#">- SWEET SOUL RECORDS</a><br />
				<a href="#">- BBQ</a><br />
				<a href="#">- P-VINE</a><br />
				<a href="#">- Others</a><br />
				<a href="#">IndependentCountry</a>
			</li>
		</ul>
		<p class="copyright"><?php echo FOOTER_TEXT_BODY; ?></p>
	</div>
</footer>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

<!--bof-navigation display -->
<!--
<div id="navSuppWrapper">
<div id="navSupp">
<ul>
<li><?php echo '<a href="' . HTTP_SERVER . DIR_WS_CATALOG . '">'; ?><?php echo HEADER_TITLE_CATALOG; ?></a></li>
<?php if (EZPAGES_STATUS_FOOTER == '1' or (EZPAGES_STATUS_FOOTER == '2' and (strstr(EXCLUDE_ADMIN_IP_FOR_MAINTENANCE, $_SERVER['REMOTE_ADDR'])))) { ?>
<li><?php require($template->get_template_dir('tpl_ezpages_bar_footer.php',DIR_WS_TEMPLATE, $current_page_base,'templates'). '/tpl_ezpages_bar_footer.php'); ?></li>
<?php } ?>
</ul>
</div>
</div>
-->
<!--eof-navigation display -->

<!--bof-ip address display -->
<?php
if (SHOW_FOOTER_IP == '1') {
?>
<div id="siteinfoIP"><?php echo TEXT_YOUR_IP_ADDRESS . '  ' . $_SERVER['REMOTE_ADDR']; ?></div>
<?php
}
?>
<!--eof-ip address display -->

<!--bof-banner #5 display -->
<?php
  if (SHOW_BANNERS_GROUP_SET5 != '' && $banner = zen_banner_exists('dynamic', SHOW_BANNERS_GROUP_SET5)) {
    if ($banner->RecordCount() > 0) {
?>
<div id="bannerFive" class="banners"><?php echo zen_display_banner('static', $banner); ?></div>
<?php
    }
  }
?>
<!--eof-banner #5 display -->

<!--bof- site copyright display -->
<!--
<div id="siteinfoLegal" class="legalCopyright"><?php echo FOOTER_TEXT_BODY; ?></div>
-->
<!--eof- site copyright display -->

<?php
} // flag_disable_footer
?>