<?php
/*
Template Name: Search Results Illinois
*/
?>

<?php get_header(); ?>

<section class="sg-search-results-illinois">
    <!-- search section -->

    <div class="search-section">
        <div class="container">
            <div class="wrapper-1">
                <h2>Find A Business in Illinois</h2>
                <div class="input-wrapper">
                    <img src="/wp-content/themes/svetguide/assets/images/taxonomy-illinois/search-icon.png" alt="">
                    <input type="text" placeholder="Business name & location in Illinois">
                </div>
                <div class="list">
                </div>
                <div class="loader"></div>
                <p class="no-results-found">No Results Found!</p>
            </div>
            <div class="wrapper-2">
                <p>Do you want your business to be found by the local Eastern European Communities?</p>
                <a href="/asdf">Contact us</a>
            </div>
        </div>
    </div>

    <!-- search section end -->

    <!-- section two -->

    <div class="container">

        <!-- section-2 -->

        <div class="section-2">

            <!-- wrapper-1 -->

            <div class="wrapper-1">
                <h3 class="title">Most Searched</h3>
                <div class="most-searched-list">
                    <?php
                    $most_searched_list = get_option('most_searched_list', '');
                    if ($most_searched_list) {
                        echo wp_kses_post($most_searched_list);  // Outputs the WYSIWYG content
                    }
                    ?>
                </div>
            </div>

            <!-- wrapper-1 end -->

            <!-- wrapper-2 -->

            <div class="wrapper-2">

                <div class="sub-wrapper">
                    <div class="message">
                        <p>Cannot find any Result : <span class="query"></span></p>
                    </div>

                </div>

                <div class="wrapper-image">
                    <a href="/asdf">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/view-pages.png" alt="">
                    </a>
                </div>

            </div>

            <!-- end of wrapper-2 -->

        </div>

        <!-- end of section 2 -->
    </div>

    <!-- section two end -->
</section>


<?php get_footer(); ?>