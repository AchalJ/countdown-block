<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'init', function() {

	// Register the block.
	register_block_type( 'ideabox/countdown', [
		'style' => 'ib-block-countdown',
		'editor_script' => 'ib-block-countdown',
		'editor_style' => 'ib-block-countdown-editor',
		'render_callback' => function( $attrs, $content ) {
			ib_block_countdown_frontend_js();
			return $content;
		},
	] );

	wp_set_script_translations( 'ideabox/countdown', 'ib-block-countdown' );
} );

add_action( 'enqueue_block_editor_assets', function() {
	wp_enqueue_script( 'ib-block-countdown-frontend' );
} );

function ib_block_countdown_frontend_js() {
	if ( file_exists( plugin_dir_path( __FILE__ ) . 'frontend.js' ) ) {
		$asset_file   = __DIR__ . '/frontend.asset.php';
		$asset        = file_exists( $asset_file ) ? require_once $asset_file : null;
		$dependencies = isset( $asset['dependencies'] ) ? $asset['dependencies'] : [];
		$dependencies[] = 'jquery';
		$version      = isset( $asset['version'] ) ? $asset['version'] : filemtime( __DIR__ . '/frontend.asset.php' );
		wp_enqueue_script(
			'ib-block-countdown-frontend',
			plugins_url( 'frontend.js', __FILE__ ),
			$dependencies,
			filemtime( plugin_dir_path( __FILE__ ) . 'frontend.js' ),
			true
		);
	}
}