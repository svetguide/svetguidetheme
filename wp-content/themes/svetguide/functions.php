<?php

/**
 * SvetguideTheme's functions and definitions
 *
 * @package SvetguideTheme
 * @since SvetguideTheme 1.0
 */

/**
 * First, let's set the maximum content width based on the theme's
 * design and stylesheet.
 * This will limit the width of all uploaded images and embeds.
 */
if (! isset($content_width)) {
	$content_width = 800; /* pixels */
}


if (! function_exists('svetguidetheme_setup')) :

	/**
	 * Sets up theme defaults and registers support for various
	 * WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme
	 * hook, which runs before the init hook. The init hook is too late
	 * for some features, such as indicating support post thumbnails.
	 */
	function svetguidetheme_setup()
	{

		/**
		 * Make theme available for translation.
		 * Translations can be placed in the /languages/ directory.
		 */
		load_theme_textdomain('svetguidetheme', get_template_directory() . '/languages');

		/**
		 * Add default posts and comments RSS feed links to <head>.
		 */
		add_theme_support('automatic-feed-links');

		/**
		 * Enable support for post thumbnails and featured images.
		 */
		add_theme_support('post-thumbnails');

		/**
		 * Add support for two custom navigation menus.
		 */
		register_nav_menus(array(
			'primary'   => __('Primary Menu', 'svetguidetheme'),
			'secondary' => __('Secondary Menu', 'svetguidetheme'),
		));

		/**
		 * Enable support for the following post formats:
		 * aside, gallery, quote, image, and video
		 */
		add_theme_support('post-formats', array('aside', 'gallery', 'quote', 'image', 'video'));
	}
endif; // svetguidetheme_setup
add_action('after_setup_theme', 'svetguidetheme_setup');


// css styles 

function load_css()
{


	// load main.css for all pages eg: header.php footer.php etc or we can have seperate files for header and footer
	wp_register_style('main', get_template_directory_uri() . '/assets/css/main.css', array(), false, 'all');
	wp_enqueue_style('main');

	// load front-page.css
	wp_register_style('front-page', get_template_directory_uri() . '/assets/css/front-page.css', array(), false, 'all');
	wp_enqueue_style('front-page');

	// load single-illinois.css
	wp_register_style('single-illinois', get_template_directory_uri() . '/assets/css/single-illinois.css', array(), false, 'all');
	wp_enqueue_style('single-illinois');
}
add_action('wp_enqueue_scripts', 'load_css');



function theme_enqueue_styles()
{
	wp_enqueue_style('theme-style', get_template_directory_uri() . '/assets/css/style.css');
}
add_action('wp_enqueue_scripts', 'theme_enqueue_styles');


// jquery , main.js, bootstrap

function load_js()
{

	//  this line will automatically add all the jquery files needed automatically no need of js folders or files
	wp_enqueue_script('jquery');

	wp_register_script('main', get_template_directory_uri() . '/js/main.js', 'jquery', false, true);
	wp_enqueue_script('main');

	// Bootstrap JS
	wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'load_js');


// Register Custom Post Type (Illinois)

function register_illinois_post_type()
{
	$args = array(
		'labels' => array(
			'name' => 'Illinois',
			'singular_name' => 'Illinois',

		),
		'public' => true,
		'has_archive' => true,
		'supports' => array('title', 'editor', 'thumbnail'),
		'rewrite' => array(
			'slug' => 'illinois', // Base slug for illinois
			'with_front' => false
		),
		// 'publicly_queryable'    => true,
		'show_in_rest' => true // added so that posts can be accessed through REST api eg: http://localhost:8888/wp-json/wp/v2/illinois
	);

	register_post_type('illinois', $args);
}
add_action('init', 'register_illinois_post_type');


// Register Custom Taxonomy (il)
function register_illinois_il_taxonomy()
{
	$args = array(
		'labels' => array(
			'name' => 'il',
			'singular_name' => 'il',
		),
		'hierarchical' => true,
		'public' => true,
		'rewrite' => array('slug' => 'illinois'), // Base slug for il
		'show_in_rest' => true // added so that posts can be accessed through REST api (http://localhost:8888/wp-json/wp/v2/il)
	);

	register_taxonomy('il', array('illinois'), $args);
}
add_action('init', 'register_illinois_il_taxonomy');


// Adjust Permalink Structure to Include il
function illinois_permalink_structure($post_link, $post)
{
	if (is_object($post) && $post->post_type === 'illinois') {
		$terms = wp_get_object_terms($post->ID, 'il');
		if ($terms) {
			$term = $terms[0]; // Get the first il term
			$val = "illinois/$term->slug";
			$post_link = str_replace('illinois', $val, $post_link);
		}
	}
	return $post_link;
}
add_filter('post_type_link', 'illinois_permalink_structure', 10, 2);

// Add Custom Rewrite Rules
if (!function_exists('add_custom_rewrite_rules')) {
	function add_custom_rewrite_rules()
	{

		// Rule for il archive (e.g., /illinois/toyota/)
		add_rewrite_rule(
			'^illinois/([^/]+)/?$',
			'index.php?taxonomy=il&term=$matches[1]',
			'top'
		);

		// Rule for single illinois posts (e.g., /illinois/toyota/innova/)
		add_rewrite_rule(
			'^illinois/([^/]+)/([^/]+)/?$',
			'index.php?post_type=illinois&il=$matches[1]&name=$matches[2]',
			'top'
		);
	}
	add_action('init', 'add_custom_rewrite_rules');
}
