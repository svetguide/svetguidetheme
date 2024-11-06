<?php
/*
Template Name: Illinois Single
*/
?>


<?php get_header(); ?>

<section class="sg-illinois-inner">
    <div class="container">

        <!-- section 1 start -->

        <div class="section-1">

            <div>
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/home-icon.png" alt="">
                <a href="/illinois/">All Categories</a>
            </div>
            <div>
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/nav-arrow.png" alt="">
                <a class="ss-illinois-category-name" href="">All Categories</a>
            </div>
            <div>
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/nav-arrow.png" alt="">
                <p><?php the_field('title'); ?></p>
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

                <div class="wrapper-content">

                    <div class="title">
                        <h1><?php the_field('title'); ?></h1>
                        <a href="<?php the_field('website'); ?>">Visit Site

                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/visit-site.png" alt="">
                        </a>
                    </div>

                    <?php if (get_field('about')): ?>
                        <div class="about">
                            <h5>About</h5>
                            <p><?php the_field('about'); ?></p>
                        </div>
                    <?php endif; ?>


                    <?php if (get_field('website')): ?>
                        <div class="website">
                            <div>
                                <img src=" <?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/website.png" alt="">
                                <h5>Website</h5>
                            </div>
                            <a href=''><?php the_field('website'); ?></a>
                        </div>
                    <?php endif; ?>


                    <?php if (get_field('phone')): ?>
                        <div class="phone">
                            <div>
                                <img src=" <?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/phone.png" alt="">
                                <h5>Phone</h5>
                            </div>
                            <p><?php the_field('phone'); ?></p>
                        </div>
                    <?php endif; ?>

                    <?php if (get_field('address')): ?>
                        <div class="address">
                            <div>
                                <img src=" <?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/location.png" alt="">
                                <h5>Address</h5>
                            </div>
                            <a href="<?php the_field('google_link'); ?>"><?php the_field('address'); ?></a>
                        </div>
                    <?php endif; ?>

                    <?php if (get_field('social_media_facebook') || get_field('social_media_instagram') || get_field('social_media_linkdin') || get_field('social_media_youtube') || get_field('social_media_tiktok') || get_field('social_media_pinterest') || get_field('social_media_telegram')): ?>
                        <div class="social-media">

                            <div>
                                <img src=" <?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/social.png" alt="">
                                <h5>Social Media</h5>
                            </div>

                            <div>
                                <?php if (get_field('social_media_facebook')): ?>
                                    <a href="<?php the_field('social_media_facebook'); ?>"> <img src='<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/facebook.png' class="facebook"></img></a>
                                <?php endif; ?>
                                <?php if (get_field('social_media_instagram')): ?>
                                    <a href="<?php the_field('social_media_instagram'); ?>"> <img src='<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/instagram.png' class="instagram"></img></a>
                                <?php endif; ?>
                                <?php if (get_field('social_media_linkdin')): ?>
                                    <a href="<?php the_field('social_media_linkdin'); ?>"> <img src='<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/linkdin.png' class="linkdin"></img></a>
                                <?php endif; ?>
                                <?php if (get_field('social_media_youtube')): ?>
                                    <a href="<?php the_field('social_media_youtube'); ?>"> <img src='<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/youtube.png' class="youtube"></img></a>
                                <?php endif; ?>
                                <?php if (get_field('social_media_tiktok')): ?>
                                    <a href="<?php the_field('social_media_tiktok'); ?>"> <img src='<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/tiktok.png' class="tiktok"></img></a>
                                <?php endif; ?>
                                <?php if (get_field('social_media_pinterest')): ?>
                                    <a href="<?php the_field('social_media_pinterest'); ?>"> <img src='<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/pinterest.png' class="pinterest"></img></a>
                                <?php endif; ?>
                                <?php if (get_field('social_media_telegram')): ?>
                                    <a href="<?php the_field('social_media_telegram'); ?>"> <img src='<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/telegram.png' class="telegram"></img></a>
                                <?php endif; ?>
                            </div>

                        </div>
                    <?php endif; ?>

                    <?php if (get_field('full_description')): ?>
                        <div class="full-description-image">
                            <h5>Full Description</h5>
                            <img src="<?php the_field('full_description'); ?>" alt="">
                        </div>
                    <?php endif; ?>

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


<?php get_footer(); ?>