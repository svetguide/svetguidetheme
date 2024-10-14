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
            <div class="owl-carousel owl-theme">

                <?php
                $image_one = get_option('image_1', '');
                if ($image_one) {
                    echo  ' <div class="item">';
                    echo '<img src="' . esc_url($image_one) . '" alt="Image One">';
                    echo '</div>';
                }
                ?>

                <?php
                $image_two = get_option('image_2', '');
                if ($image_two) {
                    echo  ' <div class="item">';
                    echo '<img src="' . esc_url($image_two) . '" alt="Image One">';
                    echo '</div>';
                }
                ?>

                <?php
                $image_three = get_option('image_3', '');
                if ($image_three) {
                    echo  ' <div class="item">';
                    echo '<img src="' . esc_url($image_three) . '" alt="Image One">';
                    echo '</div>';
                }
                ?>

                <?php
                $image_four = get_option('image_4', '');
                if ($image_four) {
                    echo  ' <div class="item">';
                    echo '<img src="' . esc_url($image_four) . '" alt="Image One">';
                    echo '</div>';
                }
                ?>

                <?php
                $image_five = get_option('image_5', '');
                if ($image_five) {
                    echo  ' <div class="item">';
                    echo '<img src="' . esc_url($image_five) . '" alt="Image One">';
                    echo '</div>';
                }
                ?>

                <?php
                $image_six = get_option('image_6', '');
                if ($image_six) {
                    echo  ' <div class="item">';
                    echo '<img src="' . esc_url($image_six) . '" alt="Image One">';
                    echo '</div>';
                }
                ?>

                <?php
                $image_seven = get_option('image_7', '');
                if ($image_seven) {
                    echo  ' <div class="item">';
                    echo '<img src="' . esc_url($image_seven) . '" alt="Image One">';
                    echo '</div>';
                }
                ?>

                <?php
                $image_eight = get_option('image_8', '');
                if ($image_eight) {
                    echo  ' <div class="item">';
                    echo '<img src="' . esc_url($image_eight) . '" alt="Image One">';
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

                    <div class="category-heading-wrapper">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/taxonomy-illinois/svetguide-flower-icon.png" alt="">
                        <h1 class="category-heading"></h1>
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
</section>


</div>

<?php get_footer(); ?>