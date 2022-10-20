<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if (! defined('ABSPATH')) {
	exit;
}

include 'block/section/index.php';

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */

add_action( 'init', function () {
	wp_register_script(
		'rawb-page-builder-base',
		plugins_url('/build/blocks.js', dirname(__FILE__)),
		['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'],
		filemtime(plugin_dir_path( __DIR__ ) . 'build/blocks.js'),
		true
	);

	wp_localize_script(
		'rawb-page-builder-base',
		'cgbGlobal',
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
		]
	);

	register_block_type(
      	'next24hr/section',
      	[
	    	'editor_script' => 'rawb-page-builder-base',
	  	]
   );

    register_block_type('next24hr/column');
});

