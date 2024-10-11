// single illinois inner page

if (document.querySelector(".sg-illinois-inner")) {
  (function () {
    let categoryNav = document.querySelector(".ss-illinois-category-name");
    let pageUrl = window.location.pathname;
    let pathnameArray = pageUrl.split("/");
    let categoryName = pathnameArray[2].split("-");
    let capitalCaseArray = categoryName.map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });
    let combinedName = capitalCaseArray.join(" ");
    categoryNav.textContent = combinedName;
    categoryNav.href = `https://svetguide.com/illinois/${pathnameArray[2]}`;
  })();
}
// taxonomy illinois

if (document.querySelector(".sg-illinois-taxonomy")) {
  (function () {
    let categoryNav = document.querySelector(".ss-illinois-category-name");
    let categoryTitle = document.querySelector(".category-heading");
    let subWrapper = document.querySelector(".wrapper-2 .sub-wrapper");
    let pageUrl = window.location.pathname;
    let pathnameArray = pageUrl.split("/");
    let categoryName = pathnameArray[2].split("-");
    let capitalCaseArray = categoryName.map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });
    let combinedName = capitalCaseArray.join(" ");
    categoryNav.textContent = combinedName;
    categoryNav.href = `https://svetguide.com/illinois/${pathnameArray[2]}`;
    categoryTitle.textContent = combinedName;

    function createBusinessCard(data) {
      let wrapper = document.createElement("div");
      wrapper.classList.add("wrapper-content");
      wrapper.innerHTML = `<div class="title">
                            <a href="${data?.slug}">${data?.acf_fields?.title}</a>
                          </div>

                            <div class="about">
                                <p>${data?.acf_fields?.about}</p>
                            </div>

                            <div class="phone">
                                <div>
                                    <img src="/wp-content/themes/svetguide/assets/images/single-illinois/phone.png" alt="">
                                    <p><?php the_field('phone'); ?>${data?.acf_fields?.phone}</p>
                                </div>
                            </div>

                            <div class="website">
                                <div>
                                    <img src="/wp-content/themes/svetguide/assets/images/single-illinois/website.png" alt="">
                                    <p>${data?.acf_fields?.website}</p>
                                </div>
                            </div>

                            <div class="address">
                                <div>
                                    <img src="/wp-content/themes/svetguide/assets/images/single-illinois/location.png" alt="">
                                    <p>${data?.acf_fields?.address}</p>
                                </div>
                            </div>`;

      subWrapper.appendChild(wrapper);
    }

    async function fetchData() {
      try {
        let res = await axios(
          `${window.location.origin}/wp-json/wp/v2/illinois?il_slug=${combinedName}&_fields=acf_fields,slug`
        );
        let data = await res.data;
        data.map((item) => {
          createBusinessCard(item);
        });
      } catch {}
    }

    fetchData();

    // carousel

    jQuery(document).ready(function ($) {
      // Your jQuery code here
      $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        animateOut: "fadeOut",
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          1000: {
            items: 1,
          },
        },
      });
    });
  })();
}
