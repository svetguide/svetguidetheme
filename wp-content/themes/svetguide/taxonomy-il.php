<?php
/*
Template Name: Illinois Taxonomy
*/
?>


<?php get_header(); ?>

<section class="sg-illinois-taxonomy">


    <!-- ads section -->

    <div class="ads-section">
        <div class="container">
            <div class="owl-carousel  owl-theme">

                <?php
                $illinois_image_1 = get_option('illinois_image_1');
                $illinois_image_alt_1 = get_option('illinois_image_alt_1'); // Fetch the alt text
                if ($illinois_image_1) {
                ?>
                    <div class="item">
                        <a href="<?php echo esc_attr($illinois_image_alt_1); ?>">
                            <img src="<?php echo esc_url($illinois_image_1); ?>" alt="<?php echo esc_attr($illinois_image_alt_1); ?>">
                        </a>
                    </div>
                <?php
                }
                ?>


                <?php
                $illinois_image_2 = get_option('illinois_image_2');
                $illinois_image_alt_2 = get_option('illinois_image_alt_2'); // Fetch the alt text
                if ($illinois_image_2) {
                ?>
                    <div class="item">
                        <a href="<?php echo esc_attr($illinois_image_alt_2); ?>">
                            <img src="<?php echo esc_url($illinois_image_2); ?>" alt="<?php echo esc_attr($illinois_image_alt_2); ?>">
                        </a>
                    </div>
                <?php
                }
                ?>

                <?php
                $illinois_image_3 = get_option('illinois_image_3');
                $illinois_image_alt_3 = get_option('illinois_image_alt_3'); // Fetch the alt text
                if ($illinois_image_3) {
                ?>
                    <div class="item">
                        <a href="<?php echo esc_attr($illinois_image_alt_3); ?>">
                            <img src="<?php echo esc_url($illinois_image_3); ?>" alt="<?php echo esc_attr($illinois_image_alt_3); ?>">
                        </a>
                    </div>
                <?php
                }
                ?>

                <?php
                $illinois_image_4 = get_option('illinois_image_4');
                $illinois_image_alt_4 = get_option('illinois_image_alt_4'); // Fetch the alt text
                if ($illinois_image_4) {
                ?>
                    <div class="item">
                        <a href="<?php echo esc_attr($illinois_image_alt_4); ?>">
                            <img src="<?php echo esc_url($illinois_image_4); ?>" alt="<?php echo esc_attr($illinois_image_alt_4); ?>">
                        </a>
                    </div>
                <?php
                }
                ?>

                <?php
                $illinois_image_5 = get_option('illinois_image_5');
                $illinois_image_alt_5 = get_option('illinois_image_alt_5'); // Fetch the alt text
                if ($illinois_image_5) {
                ?>
                    <div class="item">
                        <a href="<?php echo esc_attr($illinois_image_alt_5); ?>">
                            <img src="<?php echo esc_url($illinois_image_5); ?>" alt="<?php echo esc_attr($illinois_image_alt_5); ?>">
                        </a>
                    </div>
                <?php
                }
                ?>

                <?php
                $illinois_image_6 = get_option('illinois_image_6');
                $illinois_image_alt_6 = get_option('illinois_image_alt_6'); // Fetch the alt text
                if ($illinois_image_6) {
                ?>
                    <div class="item">
                        <a href="<?php echo esc_attr($illinois_image_alt_6); ?>">
                            <img src="<?php echo esc_url($illinois_image_6); ?>" alt="<?php echo esc_attr($illinois_image_alt_6); ?>">
                        </a>
                    </div>
                <?php
                }
                ?>

                <?php
                $illinois_image_7 = get_option('illinois_image_7');
                $illinois_image_alt_7 = get_option('illinois_image_alt_7'); // Fetch the alt text
                if ($illinois_image_7) {
                ?>
                    <div class="item">
                        <a href="<?php echo esc_attr($illinois_image_alt_7); ?>">
                            <img src="<?php echo esc_url($illinois_image_7); ?>" alt="<?php echo esc_attr($illinois_image_alt_7); ?>">
                        </a>
                    </div>
                <?php
                }
                ?>

                <?php
                $illinois_image_8 = get_option('illinois_image_8');
                $illinois_image_alt_8 = get_option('illinois_image_alt_8'); // Fetch the alt text
                if ($illinois_image_8) {
                ?>
                    <div class="item">
                        <a href="<?php echo esc_attr($illinois_image_alt_8); ?>">
                            <img src="<?php echo esc_url($illinois_image_8); ?>" alt="<?php echo esc_attr($illinois_image_alt_8); ?>">
                        </a>
                    </div>
                <?php
                }
                ?>


            </div>
        </div>
    </div>

    <!-- ads section - end -->


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
                <a href="https://svet.com/contact-us/">Contact us</a>
            </div>
        </div>


    </div>

    <!-- search section - end -->

    <div class="container">
        <!-- section 1 start -->

        <div class="section-1">

            <div>
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/home-icon.png" alt="">
                <a href="/illinois/">All Categories</a>
            </div>
            <div>
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/nav-arrow.png" alt="">
                <p class="ss-illinois-category-name"></p>
            </div>

        </div>

        <!-- section 1 end -->


        <!-- section-2 -->

        <div class="section-2">

            <!-- wrapper-1 -->

            <div class="wrapper-1">
                <h3 class="title">Most Searched</h3>
                <div class="most-searched-list">
                    <?php
                    $illinois_most_searched = get_option('illinois_most_searched_list');
                    if ($illinois_most_searched) {
                        echo wp_kses_post($illinois_most_searched);  // Outputs the WYSIWYG content
                    }
                    ?>
                </div>
            </div>

            <!-- wrapper-1 end -->

            <!-- wrapper-2 -->

            <div class="wrapper-2">
                <div class="list-of-cards">
                    <div class="sub-wrapper">

                        <div class="category-heading-wrapper">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/taxonomy-illinois/svetguide-flower-icon.png" alt="">
                            <h1 class="category-heading"></h1>
                        </div>

                    </div>

                    <div class="page-nav"></div>

                    <div class="prev-next-btn-wrapper">
                        <button class="prev">Prev</button>
                        <button class="next">Next</button>
                    </div>

                    <!-- <div class="load-more-wrapper">
                        <button class="load-more-btn">Load more</button>
                    </div> -->
                </div>

                <div class="wrapper-image">
                    <a href="https://issuu.com/svet-svet/docs/svet_chicago2024-new_print_os" target="_blank">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/view-pages.png" alt="">
                    </a>
                </div>

            </div>


            <!-- end of wrapper-2 -->

        </div>



        <!-- end of section 2 -->
    </div>
</section>


</div>

<?php get_footer(); ?>