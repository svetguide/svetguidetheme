<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SVET GUIDE</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <!-- <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"> -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    <?php wp_head(); ?>

</head>

<body>
    <section class="sg-nav">
        <div class="container">

            <div class="sg-nav-desktop">
                <a href="/">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/svetguide-header-logo.png" alt="svetguide logo">
                </a>

                <div class="city-wrapper">
                    <a href="/illinois" class="city">ILLINOIS</a>
                    <div class="orange-dot"></div>
                    <a href="/florida" class="city">FLORIDA</a>
                </div>
                <a class="advertise" href="https://svet.com/contact-us/">Advertise with us</a>
            </div>
            <div class="sg-nav-mob">
                <a href="/">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/svetguide-header-logo.png" alt="svetguide logo">
                </a>

                <div class="hamburger-menu">
                    <div class="bar"></div>
                </div>

                <nav class="mobile-menu">
                    <ul>
                        <li><a href="/illinois">Illinois</a></li>
                        <li><a href="/florida">Florida</a></li>
                        <li><a href="/florida">Advertise with us</a></li>
                    </ul>

                </nav>


            </div>


        </div>
    </section>