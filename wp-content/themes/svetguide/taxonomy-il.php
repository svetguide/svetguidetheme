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
                if ($illinois_image_1) {
                    echo  ' <div class="item">';
                    echo '<img src="' . esc_url($illinois_image_1) . '" alt="Image One">';
                    echo '</div>';
                }
                ?>

                <?php
                $illinois_image_2 = get_option('illinois_image_2');

                if ($illinois_image_2) {
                    echo  ' <div class="item">';
                    echo '<img src="' . esc_url($illinois_image_2) . '" alt="Image One">';
                    echo '</div>';
                }
                ?>

                <?php
                $illinois_image_3 = get_option('illinois_image_3');

                if ($illinois_image_3) {
                    echo  ' <div class="item">';
                    echo '<img src="' . esc_url($illinois_image_3) . '" alt="Image One">';
                    echo '</div>';
                }
                ?>

                <?php
                $illinois_image_4 = get_option('illinois_image_4');

                if ($illinois_image_4) {
                    echo  ' <div class="item">';
                    echo '<img src="' . esc_url($illinois_image_4) . '" alt="Image One">';
                    echo '</div>';
                }
                ?>

                <?php
                $illinois_image_5 = get_option('illinois_image_5');

                if ($illinois_image_5) {
                    echo  ' <div class="item">';
                    echo '<img src="' . esc_url($illinois_image_5) . '" alt="Image One">';
                    echo '</div>';
                }
                ?>

                <?php
                $illinois_image_6 = get_option('illinois_image_6');

                if ($illinois_image_6) {
                    echo  ' <div class="item">';
                    echo '<img src="' . esc_url($illinois_image_6) . '" alt="Image One">';
                    echo '</div>';
                }
                ?>

                <?php
                $illinois_image_7 = get_option('illinois_image_7');

                if ($illinois_image_7) {
                    echo  ' <div class="item">';
                    echo '<img src="' . esc_url($illinois_image_7) . '" alt="Image One">';
                    echo '</div>';
                }
                ?>

                <?php
                $illinois_image_8 = get_option('illinois_image_8');

                if ($illinois_image_8) {
                    echo  ' <div class="item">';
                    echo '<img src="' . esc_url($illinois_image_8) . '" alt="Image One">';
                    echo '</div>';
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
                <a href="/asdf">Contact us</a>
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

                    <div class="page-nav">
                        <button class="prev">Prev</button>
                        <button class="next">Next</button>
                    </div>

                    <div class="load-more-wrapper">
                        <button class="load-more-btn">Load more</button>
                    </div>
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