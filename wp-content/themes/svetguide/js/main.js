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
    categoryNav.href = `${window.location.origin}/illinois/${pathnameArray[2]}`;
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

    // search function

    let searchBar = document.querySelector(".search-section input");
    let list = document.querySelector(".search-section .list");
    let arr = [];

    function listItems(data) {
      let item = document.createElement("div");
      item.classList.add(".list-item");
      item.innerHTML = `<div class="list-item"><a href="${data?.link}">${data?.title?.rendered}</a></div> `;
      list.append(item);
    }

    function unlistItem() {
      document.querySelectorAll(".list-item").forEach((val) => {
        val.remove();
      });
    }

    searchBar.addEventListener("input", async function (e) {
      arr = [];
      if (e.target.value.length > 0) {
        try {
          let res = await axios(
            `${window.location.origin}/wp-json/wp/v2/illinois?search=${e.target.value}&_fields=title,link`
          );
          let data = await res.data;
          unlistItem();
          arr = [...data];

          arr.map((item) => {
            listItems(item);
          });
        } catch {}
      }
      if (e.target.value.length === 0) {
        unlistItem();
      }
    });
  })();
}

// archive illinois

if (document.querySelector(".sg-illinois-archive")) {
  (function () {
    let listArray = [];
    let categoryList = document.querySelectorAll(".category-list");
    categoryList.forEach((item) => {
      listArray.push(item);
    });

    async function showItems() {
      try {
        const res = await axios.get(
          `${window.location.origin}/wp-json/wp/v2/il?_fields=link,name`
        );
        const dataArr = await res.data;

        for (let i of listArray) {
          dataArr.forEach((item) => {
            if (item?.name[0] === i.textContent.trim()[0]) {
              i.classList.add("show-category-list");
              let element = document.createElement("div");
              element.classList.add("category-list-item");
              element.innerHTML = `<a href="${item?.link}">${item?.name}</a>`;
              i.appendChild(element);
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    showItems();

    // carousel

    jQuery(document).ready(function ($) {
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

    // search function

    let searchBar = document.querySelector(".search-section input");
    let list = document.querySelector(".search-section .list");
    let arr = [];

    function listItems(data) {
      let item = document.createElement("div");
      item.classList.add(".list-item");
      item.innerHTML = `<div class="list-item"><a href="${data?.link}">${data?.title?.rendered}</a></div>`;
      list.append(item);
    }

    function unlistItem() {
      document.querySelectorAll(".list-item").forEach((val) => {
        val.remove();
      });
    }

    function debounce(func, timeout = 500) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    }

    async function searching(e) {
      arr = [];
      if (e.target.value.length > 0) {
        try {
          let res = await axios(
            `${window.location.origin}/wp-json/wp/v2/illinois?search=${e.target.value}&_fields=title,link`
          );
          let data = await res.data;
          // //////////////

          let tagsRes = await axios(
            `${window.location.origin}/wp-json/wp/v2/illinois?_fields=acf_fields.tags,title,link`
          );

          let tagsData = await tagsRes.data;

          let searchedArray = e.target.value.split(" ");

          let filteredValue = tagsData.filter((item) => {
            return searchedArray.some((val) => {
              return item.acf_fields.tags
                .toLowerCase()
                .includes(val.toLowerCase());
            });
          });

          console.log(filteredValue);

          ///////////
          unlistItem();
          arr = [...data];

          arr.map((item) => {
            listItems(item);
          });
        } catch (err) {
          console.error(err);
        }
      }
      if (e.target.value.length === 0) {
        unlistItem();
      }
    }

    searchBar.addEventListener(
      "input",
      debounce((e) => searching(e))
    );
  })();
}
