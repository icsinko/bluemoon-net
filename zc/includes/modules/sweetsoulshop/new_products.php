<?php
/**
 * new_products.php module
 *
 * @package modules
 * @copyright Copyright 2003-2006 Zen Cart Development Team
 * @copyright Portions Copyright 2003 osCommerce
 * @license http://www.zen-cart.com/license/2_0.txt GNU Public License V2.0
 * @version $Id: new_products.php 3012 2006-02-11 16:34:02Z wilt $
 */
if (!defined('IS_ADMIN_FLAG')) {
  die('Illegal Access');
}
// display limits
$display_limit = zen_get_products_new_timelimit();

if ( (!isset($new_products_category_id)) || ($new_products_category_id == '0') ) {
  $new_products_query = "select p.products_id, p.products_model, p.products_image, p.products_tax_class_id, p.products_price, p.products_date_added
                           from " . TABLE_PRODUCTS . " p
                           where p.products_status = 1 " . $display_limit;
} else {
  $new_products_query = "select distinct p.products_id, p.products_image, p.products_tax_class_id, p.products_date_added,
                                           p.products_price
                           from " . TABLE_PRODUCTS . " p
                           left join " . TABLE_SPECIALS . " s
                           on p.products_id = s.products_id, " . TABLE_PRODUCTS_TO_CATEGORIES . " p2c, " .
  TABLE_CATEGORIES . " c
                           where p.products_id = p2c.products_id
                           and p2c.categories_id = c.categories_id
                           and c.parent_id = '" . (int)$new_products_category_id . "'
                           and p.products_status = 1 " . $display_limit;
}
$new_products = $db->ExecuteRandomMulti($new_products_query, MAX_DISPLAY_NEW_PRODUCTS);

$row = 0;
$col = 0;
$list_box_contents = array();
$title = '';

$num_products_count = $new_products->RecordCount();

// show only when 1 or more
if ($num_products_count > 0) {
  if ($num_products_count < SHOW_PRODUCT_INFO_COLUMNS_NEW_PRODUCTS || SHOW_PRODUCT_INFO_COLUMNS_NEW_PRODUCTS == 0 ) {
    $col_width = floor(100/$num_products_count);
  } else {
    $col_width = floor(100/SHOW_PRODUCT_INFO_COLUMNS_NEW_PRODUCTS);
  }

  while (!$new_products->EOF) {

    $products_price = zen_get_products_display_price($new_products->fields['products_id']);
		$data_price = floor(zen_get_products_special_price($new_products->fields['products_id'])) . "円";

    $new_products->fields['products_name'] = zen_get_products_name($new_products->fields['products_id']);

    $list_box_contents[$row][$col] = array('params' =>' data-mp3="dl_sample/' . $new_products->fields['products_model'] . '.mp3" data-price="' . $data_price . '" data-title="' . $new_products->fields['products_name'] . ' / the Brand New Heavies"',
    'text' => '<div class="thumb mask">' . zen_image(DIR_WS_IMAGES . $new_products->fields['products_image'], $new_products->fields['products_name'], IMAGE_PRODUCT_NEW_WIDTH, IMAGE_PRODUCT_NEW_HEIGHT) . '<span class="mask-hover player-play"><p><a href="' . zen_href_link(zen_get_info_page($new_products->fields['products_id']), 'products_id=' . $new_products->fields['products_id']) . '">&gt;&nbsp;See Detail</a></p></span></div><p class="desc flag flag-deu"><a href="' . zen_href_link(zen_get_info_page($new_products->fields['products_id']), 'products_id=' . $new_products->fields['products_id']) . '"><strong>' . $new_products->fields['products_name'] . '</strong><br /><span class="caption">' . $new_products->fields['products_name'] . '</span></a></p>');
//    'text' => '<a href="' . zen_href_link(zen_get_info_page($new_products->fields['products_id']), 'products_id=' . $new_products->fields['products_id']) . '">' . zen_image(DIR_WS_IMAGES . $new_products->fields['products_image'], $new_products->fields['products_name'], IMAGE_PRODUCT_NEW_WIDTH, IMAGE_PRODUCT_NEW_HEIGHT) . '</a><br /><a href="' . zen_href_link(zen_get_info_page($new_products->fields['products_id']), 'products_id=' . $new_products->fields['products_id']) . '">' . $new_products->fields['products_name'] . '</a><br />' . $products_price);

    $col ++;
    if ($col > (SHOW_PRODUCT_INFO_COLUMNS_NEW_PRODUCTS - 1)) {
      $col = 0;
      $row ++;
    }
    $new_products->MoveNextRandom();
  }

  if ($new_products->RecordCount() > 0) {
    if (isset($new_products_category_id) && $new_products_category_id != 0) {
      $category_title = zen_get_categories_name((int)$new_products_category_id);
      $title = '<h2 class="centerBoxHeading">' . sprintf(TABLE_HEADING_NEW_PRODUCTS, strftime('%B')) . ($category_title != '' ? ' - ' . $category_title : '' ) . '</h2>';
    } else {
      $title = '<h2 class="centerBoxHeading">' . sprintf(TABLE_HEADING_NEW_PRODUCTS, strftime('%B')) . '</h2>';
    }
    $zc_show_new_products = true;
  }
}
?>