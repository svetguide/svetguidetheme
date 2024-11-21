<?php
/*
Template Name: Illinois Archive
*/
?>


<?php get_header(); ?>

<section class="sg-illinois-archive">


    <!-- ads section -->

    <div class="ads-section ">
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




        </div>

        <!-- section 1 end -->

        <div class="browse-by-categories">
            <img src="/wp-content/themes/svetguide/assets/images/archive-illinois/browse-by-categories.png" alt="">
            <p>Browse by Categories</p>
        </div>
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
                <div class="wrapper-image">
                    <a href="https://issuu.com/svet-svet/docs/svet_chicago2024-new_print_os" target="_blank">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/view-pages.png" alt="">
                    </a>
                </div>
            </div>

            <!-- wrapper-1 end -->

            <!-- wrapper-2 -->

            <div class="wrapper-2">

                <div class="category-list-wrapper">
                    <div class="category-list">
                        <p>A</p>
                    </div>
                    <div class="category-list">
                        <p>B</p>
                    </div>
                    <div class="category-list">
                        <p>C</p>
                    </div>
                    <div class="category-list">
                        <p>D</p>
                    </div>
                    <div class="category-list">
                        <p>E</p>
                    </div>
                    <div class="category-list">
                        <p>F</p>
                    </div>
                    <div class="category-list">
                        <p>G</p>
                    </div>
                    <div class="category-list">
                        <p>H</p>
                    </div>
                    <div class="category-list">
                        <p>I</p>
                    </div>
                    <div class="category-list">
                        <p>J</p>
                    </div>
                    <div class="category-list">
                        <p>K</p>
                    </div>
                    <div class="category-list">
                        <p>L</p>
                    </div>
                    <div class="category-list">
                        <p>M</p>
                    </div>
                    <div class="category-list">
                        <p>N</p>
                    </div>
                    <div class="category-list">
                        <p>O</p>
                    </div>
                    <div class="category-list">
                        <p>P</p>
                    </div>
                    <div class="category-list">
                        <p>Q</p>
                    </div>
                    <div class="category-list">
                        <p>R</p>
                    </div>
                    <div class="category-list">
                        <p>S</p>
                    </div>
                    <div class="category-list">
                        <p>T</p>
                    </div>
                    <div class="category-list">
                        <p>U</p>
                    </div>
                    <div class="category-list">
                        <p>V</p>
                    </div>
                    <div class="category-list">
                        <p>W</p>
                    </div>
                    <div class="category-list">
                        <p>X</p>
                    </div>
                    <div class="category-list">
                        <p>Y</p>
                    </div>
                    <div class="category-list">
                        <p>Z</p>
                    </div>
                </div>




            </div>

            <!-- end of wrapper-2 -->

        </div>

        <!-- end of section 2 -->
    </div>
</section>


</div>

<?php get_footer(); ?>