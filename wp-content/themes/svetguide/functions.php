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
	if (is_front_page()) {
		wp_register_style('front-page', get_template_directory_uri() . '/assets/css/front-page.css', array(), false, 'all');
		wp_enqueue_style('front-page');
	}
	// load single-illinois.css
	if (is_singular('illinois')) {
		wp_register_style('single-illinois', get_template_directory_uri() . '/assets/css/single-illinois.css', array(), false, 'all');
		wp_enqueue_style('single-illinois');
	}
	// load taxonomy-illinois.css
	if (is_tax('il')) {
		wp_register_style('taxonomy-illinois', get_template_directory_uri() . '/assets/css/taxonomy-illinois.css', array(), false, 'all');
		wp_enqueue_style('taxonomy-illinois');
	}
	// load archive-illinois.css
	if (is_post_type_archive('illinois')) {
		wp_register_style('archive-illinois', get_template_directory_uri() . '/assets/css/archive-illinois.css', array(), false, 'all');
		wp_enqueue_style('archive-illinois');
	}
	// load search-results-illinois.css
	wp_register_style('search-results-illinois', get_template_directory_uri() . '/assets/css/search-results-illinois.css', array(), false, 'all');
	wp_enqueue_style('search-results-illinois');

	// load 404-page.css
	if (is_404()) {
		wp_register_style('404-page', get_template_directory_uri() . '/assets/css/404-page.css', array(), false, 'all');
		wp_enqueue_style('404-page');
	}
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


	// Enqueue Owl Carousel CSS and JS from cdnjs
	wp_enqueue_style('owl-carousel-css', 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css', array(), '2.3.4');
	wp_enqueue_style('owl-carousel-theme', 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css', array(), '2.3.4');
	wp_enqueue_script('owl-carousel-js', 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js', array('jquery'), '2.3.4', true);
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

// code to add acf fields to the REST api call 

function add_acf_to_rest_api()
{
	// Check if ACF is installed and active
	if (!function_exists('get_field')) return;

	// Hook into the REST API for the post type 'cars'
	register_rest_field('illinois', 'acf_fields', array(
		'get_callback'    => function ($post) {
			return get_fields($post['id']);
		},
		'schema'          => null,
	));
}
add_action('rest_api_init', 'add_acf_to_rest_api');

/////////////////////

// function to create the api endpoint to fetch custom post type category(inside the taxonomy eg:brand) items using the category name, otherwise it can 
// only be done using term id of the category

// http://localhost:8888/wp-json/wp/v2/illinois?il_slug=Accounting Services

function filter_illinois_by_il_slug($args, $request)
{
	if (isset($request['il_slug'])) {
		$search_slug = sanitize_text_field($request['il_slug']);

		// Get all terms from the 'il' taxonomy
		$all_terms = get_terms(array(
			'taxonomy' => 'il',
			'hide_empty' => false,
		));

		if (!empty($all_terms) && !is_wp_error($all_terms)) {
			$best_match = null;
			$highest_similarity = 0;

			foreach ($all_terms as $term) {
				// Calculate similarity scores using different methods
				$term_name = strtolower($term->name);
				$term_slug = strtolower($term->slug);
				$search_term = strtolower($search_slug);

				// Check if search term is contained within the term name or slug
				$contains_search = (strpos($term_name, $search_term) !== false) ||
					(strpos($term_slug, $search_term) !== false);

				// Calculate Levenshtein distance (lower is better)
				$lev_distance = levenshtein($search_term, $term_name);
				$max_length = max(strlen($search_term), strlen($term_name));
				$lev_similarity = 1 - ($lev_distance / $max_length);

				// Similar_text percentage
				similar_text($search_term, $term_name, $percent_similarity);
				$percent_similarity = $percent_similarity / 100;

				// Combine similarity scores with weights
				$final_similarity = ($contains_search ? 0.5 : 0) +
					($lev_similarity * 0.25) +
					($percent_similarity * 0.25);

				// Update best match if this term has a higher similarity
				if ($final_similarity > $highest_similarity && $final_similarity > 0.3) { // Threshold of 0.3
					$highest_similarity = $final_similarity;
					$best_match = $term;
				}
			}

			// If we found a match above our threshold, add it to the query
			if ($best_match) {
				$args['tax_query'] = array(
					array(
						'taxonomy' => 'il',
						'field'    => 'term_id',
						'terms'    => $best_match->term_id,
					),
				);
			}
		}
	}
	return $args;
}

// Hook into the REST API for the 'illinois' post type
add_filter('rest_illinois_query', 'filter_illinois_by_il_slug', 10, 2);


///////////////////


//Global Settings page for text field and image field
// Add a custom options page in the admin dashboard 
function custom_theme_options_page()
{
	add_menu_page(
		'Global Settings',            // Page title
		'Global Settings',            // Menu title
		'manage_options',             // Capability required
		'global-settings',            // Menu slug
		'custom_theme_options_page_html', // Callback function
		null,
		99
	);
}
add_action('admin_menu', 'custom_theme_options_page');

// Display the custom options page
function custom_theme_options_page_html()
{
	if (!current_user_can('manage_options')) {
		return;
	}

	// Save the fields if the form is submitted
	if (isset($_POST['most_searched_list'])) {
		update_option('most_searched_list', wp_kses_post($_POST['most_searched_list']));
	}

	// Save the image fields
	for ($i = 1; $i <= 8; $i++) {
		if (isset($_POST["image_$i"])) {
			update_option("image_$i", esc_url_raw($_POST["image_$i"]));
		}
	}

	// Get the current values of the fields
	$most_searched_list = get_option('most_searched_list', '');
	$images = [];
	for ($i = 1; $i <= 8; $i++) {
		$images[$i] = get_option("image_$i", '');
	}

?>
	<div class="wrap">
		<h1>Global Settings</h1>
		<form method="POST">
			<h2>Most Searched List</h2>
			<?php
			// Display WYSIWYG field for "Most Searched List"
			wp_editor($most_searched_list, 'most_searched_list', array(
				'textarea_name' => 'most_searched_list',
				'media_buttons' => true,
				'textarea_rows' => 10,
				'teeny'         => false,
				'quicktags'     => true
			));
			?>

			<h2>Image Uploads</h2>
			<?php for ($i = 1; $i <= 8; $i++): ?>
				<label for="image_<?php echo $i; ?>">Image <?php echo $i; ?></label><br>
				<input type="text" name="image_<?php echo $i; ?>" id="image_<?php echo $i; ?>" value="<?php echo esc_url($images[$i]); ?>" placeholder="Image URL" />
				<input type="button" class="upload_image_button button" value="Upload Image" data-image-index="<?php echo $i; ?>" />
				<br><br>
			<?php endfor; ?>

			<input type="submit" value="Save" class="button button-primary">
		</form>
	</div>

	<script>
		jQuery(document).ready(function($) {
			$('.upload_image_button').click(function(e) {
				e.preventDefault();
				var imageIndex = $(this).data('image-index');
				var fileFrame = wp.media({
					title: 'Select or Upload an Image',
					button: {
						text: 'Use this image'
					},
					multiple: false // Allow single image selection
				});

				fileFrame.on('select', function() {
					var attachment = fileFrame.state().get('selection').first().toJSON();
					$('#image_' + imageIndex).val(attachment.url); // Set the input value to the image URL
				});

				fileFrame.open();
			});
		});
	</script>
<?php
}
