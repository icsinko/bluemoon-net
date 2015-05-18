<?php
/**
 * Module Template - categories_tabs
 *
 * Template stub used to display categories-tabs output
 *
 * @package templateSystem
 * @copyright Copyright 2003-2005 Zen Cart Development Team
 * @copyright Portions Copyright 2003 osCommerce
 * @license http://www.zen-cart.com/license/2_0.txt GNU Public License V2.0
 * @version $Id: tpl_modules_categories_tabs.php 3395 2006-04-08 21:13:00Z ajeh $
 */

  include(DIR_WS_MODULES . zen_get_module_directory(FILENAME_CATEGORIES_TABS));
?>
<?php if (CATEGORIES_TABS_STATUS == '1' && sizeof($links_list) >= 1) { ?>
<nav class="gnav">
  <ul>
<!--
<?php for ($i=0, $n=sizeof($links_list); $i<$n; $i++) { ?>
  <li><?php echo chop($links_list[$i]);?></li>
<?php } ?>
-->
    <li class="gnav-item gnav-start">&nbsp;</li>
    <li class="gnav-item gnav-tools">
      <a href="/"><img src="includes/templates/sweetsoulshop/images/icn_home.png" alt="Home" class="gnav-tools-home" /></a>
      <a href="javascript:history.back();"><img src="includes/templates/sweetsoulshop/images/icn_prev.png" alt="Prev" /></a>
      <a href="javascript:history.forward();"><img src="includes/templates/sweetsoulshop/images/icn_next.png" alt="Next" /></a>
    </li>
    <li class="gnav-item sp gnav-login"><a href="#">Log In</a></li>
    <li class="gnav-item gnav-search-pc optional">
      <a href="">Music Search&nbsp;<img src="includes/templates/sweetsoulshop/images/icn_musicsearch.png" alt="" /></a>
      <div class="gnav-search-pulldown">
        <ul>
<?php for ($i=0, $n=sizeof($links_list); $i<$n; $i++) { ?>
  <li><?php echo chop($links_list[$i]);?></li>
<?php } ?>
        </ul>
      </div>
    </li>
    <li class="gnav-item gnav-search-sp sp"><a href="#">Music Search&nbsp;<img src="img/common/icn_menu.png" alt="Menu" class="sp gnav-search-icn-sp" width="20" /></a></li>
    <li class="gnav-item optional"><a href="concept/">Concept</a></li>
    <li class="gnav-item optional"><a href="#">How To Order</a></li>
    <li class="gnav-item optional"><a href="#">Sell Your Music</a></li>
    <li class="gnav-item gnav-end">&nbsp;</li>
</ul>
</nav>
<?php } ?>
