<?php
/*
Template Name: Illinois Single
*/
?>


<?php get_header(); ?>

<section class="sg-illinois-inner">
    <div class="container">

        <!-- wrapper-2 -->

        <div class="wrapper-2">

            <div class="title">
                <h1><?php the_field('title'); ?></h1>
                <a href="<?php the_field('website'); ?>">Visit Site

                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/visit-site.png" alt="">
                </a>
            </div>

            <div class="about">
                <h5>About</h5>
                <p><?php the_field('about'); ?></p>
            </div>

            <div class="website">
                <div>
                    <img src=" <?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/website.png" alt="">
                    <h5>Website</h5>
                </div>
                <p><?php the_field('website'); ?></p>
            </div>

            <div class="phone">
                <div>
                    <img src=" <?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/phone.png" alt="">
                    <h5>Phone</h5>
                </div>
                <p><?php the_field('phone'); ?></p>
            </div>

            <div class="address">
                <div>
                    <img src=" <?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/location.png" alt="">
                    <h5>Address</h5>
                </div>
                <p><?php the_field('address'); ?></p>
            </div>

            <div class="social-media">
                <div>
                    <img src=" <?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/social.png" alt="">
                    <h5>Social Media</h5>
                </div>
                <div>

                    <a href="<?php the_field('social_media_facebook'); ?>"> <img src='<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/facebook.png' class="facebook"></img></a>
                    <a href="<?php the_field('social_media_instagram'); ?>"> <img src='<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/instagram.png' class="instagram"></img></a>
                    <a href="<?php the_field('social_media_linkdin'); ?>"> <img src='<?php echo get_template_directory_uri(); ?>/assets/images/single-illinois/linkdin.png' class="linkdin"></img></a>

                </div>
            </div>

            <div class="full-description-image">
                <h5>Full Description</h5>
                <img src="<?php the_field('full_description'); ?>" alt="">
            </div>
        </div>

        <!-- end of wrapper-2 -->
    </div>
</section>


<?php get_footer(); ?>