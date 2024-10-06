<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SVET GUIDE</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <?php wp_head(); ?>

</head>

<body>
    <section class="sg-nav">
        <div class="container">

            <div class="sg-nav-desktop">
                <img src="https://svetguide.com/images/svetguide-header-logo.png" alt="svetguide logo">

                <div class="city-wrapper">
                    <a href="/illinois" class="city">ILLINOIS</a>
                    <div class="orange-dot"></div>
                    <a href="/florida" class="city">FLORIDA</a>
                </div>
                <a class="advertise" href="/hello">Advertise with us</a>
            </div>
            <div class="sg-nav-mob">
                <img src="https://svetguide.com/images/svetguide-header-logo.png" alt="svetguide logo">
                <!-- Button trigger modal -->
                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <img src="wp-content/themes/svetguide/assets/images/hamburger-menu.svg" alt="">
                </button>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                <div class="modal-inner-wrapper">

                                    <div class="city-wrapper">
                                        <a href="/illinois" class="city">ILLINOIS</a>
                                        <a href="/florida" class="city">FLORIDA</a>
                                    </div>
                                    <a class="advertise" href="/hello">Advertise with us</a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    </section>