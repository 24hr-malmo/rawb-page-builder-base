<?php
/**
 * Plugin Name: RAWB Page Builder Base
 * Plugin URI: https://github.com/24hr-malmo/rawb-page-builder-base
 * Description: Page Builder blocks for section and column
 * Author: Dr Tapia
 * Author URI: https://24hr.se/
 * Version: 1.1.1
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
