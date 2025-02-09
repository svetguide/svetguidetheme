//header

(function () {
  // Hamburger menu toggle
  document
    .querySelector(".hamburger-menu")
    .addEventListener("click", function (event) {
      event.preventDefault();
      document.querySelector(".bar").classList.toggle("animate");
      document.querySelector(".mobile-menu").classList.toggle("active");
    });
})();

//illinois

// archive illinois

if (document.querySelector(".sg-illinois-archive")) {
  (function () {
    let listArray = [];
    let loader = document.querySelector(".loader");
    let noResultsFound = document.querySelector(".no-results-found");
    let categoryList = document.querySelectorAll(".category-list");
    categoryList.forEach((item) => {
      listArray.push(item);
    });

    async function showItems() {
      try {
        let page = 1;
        let allData = [];
        let hasMoreItems = true;

        // Fetch all pages
        while (hasMoreItems) {
          const res = await axios.get(
            `${window.location.origin}/wp-json/wp/v2/il?_fields=link,name,count&per_page=100&page=${page}`
          );
          const dataArr = res.data;

          if (dataArr.length > 0) {
            allData = allData.concat(dataArr);
            page++;
          } else {
            hasMoreItems = false;
          }
        }

        // Display items based on listArray
        for (let i of listArray) {
          allData.forEach((item) => {
            if (
              item?.name[0].toLowerCase() ===
                i.textContent.trim()[0].toLowerCase() &&
              item.count > 0
            ) {
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
      list.style.display = "block";
      let item = document.createElement("div");
      item.classList.add(".list-item");
      item.innerHTML = `<div class="list-item"><a href="${data?.link}">${data?.title?.rendered}</a></div>`;
      list.append(item);
    }

    function unlistItem() {
      document.querySelectorAll(".list-item").forEach((val) => {
        val.remove();
      });
      list.style.display = "none";
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
      if (e.target.value.trim().length === 0) {
        noResultsFound.style.display = "none";
      }
      if (e.target.value.trim().length > 0) {
        loader.style.display = "grid";
        try {
          let res = await axios(
            `${
              window.location.origin
            }/wp-json/wp/v2/illinois?search=${e.target.value.trim()}&_fields=title,link`
          );
          let data = await res.data;

          let taxRes = await axios(
            `${
              window.location.origin
            }/wp-json/wp/v2/illinois?il_slug=${e.target.value.trim()}&_fields=title,link`
          );

          let taxData = await taxRes.data;

          let tagsRes = await axios(
            `${window.location.origin}/wp-json/wp/v2/illinois?_fields=acf_fields.search_terms,title,link,acf_fields.address`
          );

          let tagsData = await tagsRes.data;

          let filteredValue = tagsData.filter((item) => {
            // Trim the input and split it into an array of words
            let searchedArray = e.target.value.trimEnd().split(" ");

            // Check if the first word is "service" or "services"
            const firstWordIsService =
              searchedArray[0]?.toLowerCase() === "service" ||
              searchedArray[0]?.toLowerCase() === "services";

            // Case 1: If the first word is "service" or "services", there must be at least two words
            if (firstWordIsService && searchedArray.length >= 2) {
              // Ensure all search terms match as whole words
              return searchedArray.every((val) => {
                let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                return regex.test(item.acf_fields.search_terms.toLowerCase());
              });
            }

            // Case 2: If the first word is not "service" or "services", apply the original filtering logic
            if (!firstWordIsService) {
              return searchedArray.every((val) => {
                let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                let searchTermAndAddress =
                  item.acf_fields.address.replace(/,/g, "").toLowerCase() +
                  " " +
                  item.acf_fields.search_terms.toLowerCase();
                return regex.test(searchTermAndAddress);
                // return regex.test(

                // );
              });
            }

            // Case 3: Ignore if only "service" or "services" is searched as a single word
            return false;
          });

          unlistItem();
          arr = [...data, ...filteredValue, ...taxData].map((item) => {
            delete item.acf_fields;
            return item;
          });

          console.log(data, filteredValue, taxData);

          let val = Array.from(
            new Set(arr.map((item) => JSON.stringify(item)))
          ).map((item) => JSON.parse(item));

          if (val.length === 0 && e.target.value.trim().length > 0) {
            noResultsFound.style.display = "block";
          } else {
            noResultsFound.style.display = "none";
          }

          val.map((item) => {
            listItems(item);
          });

          loader.style.display = "none";
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

    //redirect to search results page on pressing enter
    searchBar.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        window.location = `${window.location.origin}/search-results-illinois/?searchterm=${e.target.value}`;
      }
    });
  })();
}

// taxonomy illinois

if (document.querySelector(".sg-illinois-taxonomy")) {
  (function () {
    let categoryNav = document.querySelector(".ss-illinois-category-name");
    let categoryTitle = document.querySelector(".category-heading");
    let subWrapper = document.querySelector(".wrapper-2 .sub-wrapper");
    let loader = document.querySelector(".loader");
    let noResultsFound = document.querySelector(".no-results-found");

    let pageUrl = window.location.pathname;
    let pathnameArray = pageUrl.split("/");
    let categoryName = pathnameArray[2].split("-");
    let capitalCaseArray = categoryName.map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });
    let combinedName = capitalCaseArray.join(" ");

    function createBusinessCard(data) {
      let wrapper = document.createElement("div");
      wrapper.classList.add("wrapper-content");
      wrapper.innerHTML = `<div class="title">
                            <a href="${data?.slug}">${data?.title?.rendered}</a>
                          </div>

                            <div class="about">
                                <p>${
                                  data?.acf_fields?.category_description ||
                                  data?.acf_fields?.about
                                }</p>
                            </div>

                            ${
                              data?.acf_fields?.phone &&
                              `<div class="phone">
                              <div>
                                  <img src="/wp-content/themes/svetguide/assets/images/single-illinois/phone.png" alt="">
                                  <a href="tel:${data?.acf_fields?.phone}"><?php the_field('phone'); ?>
                                  ${data?.acf_fields?.phone}</a>
                              </div>
                          </div>`
                            }
                          
                          ${
                            data?.acf_fields?.website &&
                            `<div class="website">
                                <div>
                                    <img src="/wp-content/themes/svetguide/assets/images/single-illinois/website.png" alt="">
                                    <p>${data?.acf_fields?.website}</p>
                                </div>
                            </div>`
                          }

                           ${
                             data?.acf_fields?.address &&
                             `<div class="address">
                                <div>
                                    <img src="/wp-content/themes/svetguide/assets/images/single-illinois/location.png" alt="">
                                    <p>${data?.acf_fields?.address}</p>
                                </div>
                            </div>`
                           }
                            `;

      subWrapper.appendChild(wrapper);
    }

    //  pagination functionality
    let dataItems = [];
    let paginationContainer = document.querySelector(".page-nav");
    let previousButton = document.querySelector(".prev");
    let nextButton = document.querySelector(".next");
    // let loadMoreWrapper = document.querySelector(".load-more-wrapper");
    // let loadMoreBtn = document.querySelector(".load-more-btn");
    // let currentStartIndex = 0;
    // let currentEndIndex = 5;

    let num = 1;
    let totalNumberOfPosts;
    let allPaginationNumber;

    function createbtn(val) {
      let ele = document.createElement("button");
      ele.classList.add("page-number");
      ele.innerText = val;
      paginationContainer.appendChild(ele);
    }

    async function fetchData() {
      try {
        let response = await axios(
          `${window.location.origin}/wp-json/wp/v2/illinois?il_slug=${combinedName}&_fields=acf_fields,slug,category_name,title&per_page=100`
        );
        let data = await response.data;
        dataItems = [...data];

        totalNumberOfPosts = dataItems.length;

        // category name and breadcrumb name (only appears if category contains posts)
        categoryNav.textContent = dataItems[0]?.category_name;
        if (categoryNav.textContent.includes("&amp;")) {
          categoryNav.innerText = categoryNav.textContent.replace("&amp;", "&");
        }
        categoryTitle.textContent = dataItems[0]?.category_name;
        if (categoryTitle.textContent.includes("&amp;")) {
          categoryTitle.textContent = categoryTitle.textContent.replace(
            "&amp;",
            "&"
          );
        }

        let sortedData = data.sort((a, b) => {
          return a.title.rendered.toLowerCase() < b.title.rendered.toLowerCase()
            ? -1
            : 1;
        });

        sortedData.slice(0, 5).forEach((item) => createBusinessCard(item));

        for (let i = 1; i <= totalNumberOfPosts; i++) {
          if (i % 5 === 0) {
            createbtn(num++);
          }
          if (totalNumberOfPosts - i > 0 && totalNumberOfPosts - i < 2) {
            createbtn(num++);
            break;
          }
        }
        getPaginationNumber(document.querySelectorAll(".page-number"));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();

    async function commonFunction(value) {
      window.scrollTo(
        0,
        categoryTitle.getBoundingClientRect().top + window.scrollY - 100
      );

      try {
        let response = await axios(
          `${window.location.origin}/wp-json/wp/v2/illinois?il_slug=${combinedName}&_fields=acf_fields,slug,category_name,title&per_page=100`
        );
        let data = await response.data;
        dataItems = [...data];

        let items = document.querySelectorAll(".wrapper-content");
        items.forEach((item) => {
          item.remove();
        });

        let sortedData = data.sort((a, b) => {
          return a.title.rendered.localeCompare(b.title.rendered, "en", {
            sensitivity: "base",
          });
        });

        sortedData
          .slice(value * 5 - 5, value * 5)
          .forEach((item) => createBusinessCard(item));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    let commonNumber = 1;

    //pagination
    paginationContainer.addEventListener("click", async function (e) {
      let pageNumberElements = document.querySelectorAll(".page-number");

      pageNumberElements.forEach((item) => {
        if (item.classList.contains("active")) {
          item.classList.remove("active");
        }
      });

      e.target.classList.add("active");

      commonFunction(Number(e.target.textContent));
      commonNumber = Number(e.target.textContent);
    });

    // next-prev function
    function getPaginationNumber(items) {
      let newArr = [...items];
      const itemsPerPage = 5;

      if (newArr.length <= 1) {
        nextButton.style.display = "none";
        previousButton.style.display = "none";
      }

      // Initial display
      function updateDisplay(
        startIndex = 0,
        endIndex = startIndex + itemsPerPage
      ) {
        newArr.forEach((item, index) => {
          item.style.display =
            index >= startIndex && index < endIndex ? "block" : "none";
        });
      }
      updateDisplay();

      // next button
      nextButton.addEventListener("click", function () {
        if (newArr.length === commonNumber) {
          return;
        }

        if (commonNumber % 5 === 0) {
          updateDisplay(commonNumber);
        }

        commonNumber++;

        newArr.forEach((item) => {
          if (item.innerText === commonNumber.toString()) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
        commonFunction(commonNumber);
      });

      // prev button
      previousButton.addEventListener("click", function () {
        if (commonNumber === 1) {
          return;
        }
        commonNumber--;
        if (commonNumber % 5 === 0) {
          updateDisplay(commonNumber - itemsPerPage, commonNumber);
        }
        newArr.forEach((item) => {
          if (item.innerText === commonNumber.toString()) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
        commonFunction(commonNumber);
      });
    }

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
      list.style.display = "block";
      let item = document.createElement("div");
      item.classList.add(".list-item");
      item.innerHTML = `<div class="list-item"><a href="${data?.link}">${data?.title?.rendered}</a></div>`;
      list.append(item);
    }

    function unlistItem() {
      document.querySelectorAll(".list-item").forEach((val) => {
        val.remove();
      });
      list.style.display = "none";
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
      if (e.target.value.trim().length === 0) {
        noResultsFound.style.display = "none";
      }
      if (e.target.value.trim().length > 0) {
        loader.style.display = "grid";
        try {
          let res = await axios(
            `${
              window.location.origin
            }/wp-json/wp/v2/illinois?search=${e.target.value.trim()}&_fields=title,link`
          );
          let data = await res.data;

          let taxRes = await axios(
            `${
              window.location.origin
            }/wp-json/wp/v2/illinois?il_slug=${e.target.value.trim()}&_fields=title,link`
          );

          let taxData = await taxRes.data;

          let tagsRes = await axios(
            `${window.location.origin}/wp-json/wp/v2/illinois?_fields=acf_fields.search_terms,title,link,acf_fields.address`
          );

          let tagsData = await tagsRes.data;

          let filteredValue = tagsData.filter((item) => {
            // Trim the input and split it into an array of words
            let searchedArray = e.target.value.trimEnd().split(" ");

            // Check if the first word is "service" or "services"
            const firstWordIsService =
              searchedArray[0]?.toLowerCase() === "service" ||
              searchedArray[0]?.toLowerCase() === "services";

            // Case 1: If the first word is "service" or "services", there must be at least two words
            if (firstWordIsService && searchedArray.length >= 2) {
              // Ensure all search terms match as whole words
              return searchedArray.every((val) => {
                let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                return regex.test(item.acf_fields.search_terms.toLowerCase());
              });
            }

            // Case 2: If the first word is not "service" or "services", apply the original filtering logic
            if (!firstWordIsService) {
              return searchedArray.every((val) => {
                let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                let searchTermAndAddress =
                  item.acf_fields.address.replace(/,/g, "").toLowerCase() +
                  " " +
                  item.acf_fields.search_terms.toLowerCase();
                return regex.test(searchTermAndAddress);
                // return regex.test(

                // );
              });
            }

            // Case 3: Ignore if only "service" or "services" is searched as a single word
            return false;
          });

          unlistItem();
          arr = [...data, ...filteredValue, ...taxData].map((item) => {
            delete item.acf_fields;
            return item;
          });

          let val = Array.from(
            new Set(arr.map((item) => JSON.stringify(item)))
          ).map((item) => JSON.parse(item));

          if (val.length === 0) {
            noResultsFound.style.display = "block";
          } else {
            noResultsFound.style.display = "none";
          }

          val.map((item) => {
            listItems(item);
          });
          loader.style.display = "none";
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

    //redirect to search results page on pressing enter
    searchBar.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        window.location = `${window.location.origin}/search-results-illinois/?searchterm=${e.target.value}`;
      }
    });
  })();
}

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

    // categoryNav.textContent = combinedName;
    categoryNav.href = `${window.location.origin}/illinois/${pathnameArray[2]}`;

    async function getCategoryName() {
      let response = await axios(
        `${window.location.origin}/wp-json/wp/v2/illinois?il_slug=${combinedName}&_fields=category_name&per_page=1`
      );
      let data = await response.data[0].category_name;
      categoryNav.textContent = data;
      if (categoryNav.textContent.includes("&amp;")) {
        categoryNav.textContent = categoryNav.textContent.replace("&amp;", "&");
      }
    }
    getCategoryName();
  })();
}

//search results page illinois

if (document.querySelector(".sg-search-results-illinois")) {
  (function () {
    let subWrapper = document.querySelector(".wrapper-2 .sub-wrapper");

    // search on input
    let loader = document.querySelector(".loader");
    let searchBar = document.querySelector(".search-section input");
    let list = document.querySelector(".search-section .list");
    let noResultsFound = document.querySelector(".no-results-found");
    let noResultsElement = document.querySelector(".message");
    let query = document.querySelector(".query");
    let arr = [];
    let arrayOnEnter = [];

    function debounce(func, timeout = 500) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    }

    function listItems(data) {
      list.style.display = "block";
      let item = document.createElement("div");
      item.classList.add(".list-item");
      item.innerHTML = `<div class="list-item"><a href="${data?.link}">${data?.title?.rendered}</a></div>`;
      list.append(item);
    }

    function unlistItem() {
      document.querySelectorAll(".list-item").forEach((val) => {
        val.remove();
      });
      list.style.display = "none";
    }

    async function searching(e) {
      arr = [];
      if (e.target.value.trim().length === 0) {
        noResultsFound.style.display = "none";
      }
      if (e.target.value.trim().length > 0) {
        loader.style.display = "grid";
        try {
          let res = await axios(
            `${
              window.location.origin
            }/wp-json/wp/v2/illinois?search=${e.target.value.trim()}&_fields=title,link,acf_fields`
          );
          let data = await res.data;

          let taxRes = await axios(
            `${
              window.location.origin
            }/wp-json/wp/v2/illinois?il_slug=${e.target.value.trim()}&_fields=title,link,acf_fields&per_page=100`
          );

          let taxData = await taxRes.data;

          let tagsRes = await axios(
            `${window.location.origin}/wp-json/wp/v2/illinois?_fields=acf_fields.search_terms,title,link,acf_fields.address`
          );

          let tagsData = await tagsRes.data;

          let filteredValue = tagsData.filter((item) => {
            // Trim the input and split it into an array of words
            let searchedArray = e.target.value.trimEnd().split(" ");

            // Check if the first word is "service" or "services"
            const firstWordIsService =
              searchedArray[0]?.toLowerCase() === "service" ||
              searchedArray[0]?.toLowerCase() === "services";

            // Case 1: If the first word is "service" or "services", there must be at least two words
            if (firstWordIsService && searchedArray.length >= 2) {
              // Ensure all search terms match as whole words
              return searchedArray.every((val) => {
                let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                return regex.test(item.acf_fields.search_terms.toLowerCase());
              });
            }

            // Case 2: If the first word is not "service" or "services", apply the original filtering logic
            if (!firstWordIsService) {
              return searchedArray.every((val) => {
                let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                let searchTermAndAddress =
                  item.acf_fields.address.replace(/,/g, "").toLowerCase() +
                  " " +
                  item.acf_fields.search_terms.toLowerCase();
                return regex.test(searchTermAndAddress);
                // return regex.test(

                // );
              });
            }

            // Case 3: Ignore if only "service" or "services" is searched as a single word
            return false;
          });

          unlistItem();
          arr = [...data, ...filteredValue, ...taxData].map((item) => {
            delete item.acf_fields;
            return item;
          });

          let val = Array.from(
            new Set(arr.map((item) => JSON.stringify(item)))
          ).map((item) => JSON.parse(item));

          if (val.length === 0) {
            noResultsFound.style.display = "block";
          } else {
            noResultsFound.style.display = "none";
          }

          val.map((item) => {
            listItems(item);
          });
          loader.style.display = "none";
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

    // search on press enter

    let dataItems = [];
    let paginationContainer = document.querySelector(".page-nav");
    let previousButton = document.querySelector(".prev");
    let nextButton = document.querySelector(".next");
    // let loadMoreWrapper = document.querySelector(".load-more-wrapper");
    // let loadMoreBtn = document.querySelector(".load-more-btn");
    // let currentStartIndex = 0;
    // let currentEndIndex = 5;
    let num = 1;
    let totalNumberOfPosts;

    function createbtn(val) {
      let ele = document.createElement("button");
      ele.classList.add("page-number");
      ele.innerText = val;
      paginationContainer.appendChild(ele);
    }

    function createBusinessCard(data) {
      let wrapper = document.createElement("div");
      wrapper.classList.add("wrapper-content");
      wrapper.innerHTML = `<div class="title">
                            <a href="${data?.link}">${data?.title?.rendered}</a>
                          </div>

                            <div class="about">
                                <p>${data?.acf_fields?.category_description}</p>
                            </div>

                             ${
                               data?.acf_fields?.phone &&
                               `<div class="phone">
                              <div>
                                  <img src="/wp-content/themes/svetguide/assets/images/single-illinois/phone.png" alt="">
                                  <a href="tel:${data?.acf_fields?.phone}"><?php the_field('phone'); ?>
                                  ${data?.acf_fields?.phone}</a>
                              </div>
                          </div>`
                             }
                          
                          ${
                            data?.acf_fields?.website &&
                            `<div class="website">
                                <div>
                                    <img src="/wp-content/themes/svetguide/assets/images/single-illinois/website.png" alt="">
                                    <p>${data?.acf_fields?.website}</p>
                                </div>
                            </div>`
                          }

                           ${
                             data?.acf_fields?.address &&
                             `<div class="address">
                                <div>
                                    <img src="/wp-content/themes/svetguide/assets/images/single-illinois/location.png" alt="">
                                    <p>${data?.acf_fields?.address}</p>
                                </div>
                            </div>`
                           }
                            
                            `;

      subWrapper.appendChild(wrapper);
    }

    function removeCards() {
      document.querySelectorAll(".wrapper-content").forEach((val) => {
        val.remove();
      });
    }

    async function searchOnEnter(e) {
      num = 1;
      dataItems = [];
      arrayOnEnter = [];
      if (e.key === "Enter") {
        if (e.target.value.trim().length > 0) {
          try {
            let res = await axios(
              `${window.location.origin}/wp-json/wp/v2/illinois?search=${e.target.value}&_fields=title,link,acf_fields`
            );
            let data = await res.data;

            let taxRes = await axios(
              `${
                window.location.origin
              }/wp-json/wp/v2/illinois?il_slug=${e.target.value.trim()}&_fields=title,link,acf_fields&per_page=100`
            );

            let taxData = await taxRes.data;

            let tagsRes = await axios(
              `${window.location.origin}/wp-json/wp/v2/illinois?_fields=acf_fields,title,link,acf_fields.address`
            );

            let tagsData = await tagsRes.data;

            let filteredValue = tagsData.filter((item) => {
              // Trim the input and split it into an array of words
              let searchedArray = e.target.value.trimEnd().split(" ");

              // Check if the first word is "service" or "services"
              const firstWordIsService =
                searchedArray[0]?.toLowerCase() === "service" ||
                searchedArray[0]?.toLowerCase() === "services";

              // Case 1: If the first word is "service" or "services", there must be at least two words
              if (firstWordIsService && searchedArray.length >= 2) {
                // Ensure all search terms match as whole words
                return searchedArray.every((val) => {
                  let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                  return regex.test(item.acf_fields.search_terms.toLowerCase());
                });
              }

              // Case 2: If the first word is not "service" or "services", apply the original filtering logic
              if (!firstWordIsService) {
                return searchedArray.every((val) => {
                  let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                  let searchTermAndAddress =
                    item.acf_fields.address.replace(/,/g, "").toLowerCase() +
                    " " +
                    item.acf_fields.search_terms.toLowerCase();
                  return regex.test(searchTermAndAddress);
                });
              }

              // Case 3: Ignore if only "service" or "services" is searched as a single word
              return false;
            });

            unlistItem();
            removeCards();
            arrayOnEnter = [...data, ...filteredValue, ...taxData].map(
              (item) => {
                return item;
              }
            );

            let val = Array.from(
              new Set(arrayOnEnter.map((item) => JSON.stringify(item)))
            ).map((item) => JSON.parse(item));

            if (val.length !== 0) {
              noResultsElement.style.display = "none";
            }
            if (val.length === 0) {
              noResultsElement.style.display = "block";
              query.textContent = e.target.value.trim();
            }

            // isDataItemEmpty(dataItems);
            let sortedData = val.sort((a, b) => {
              return a.title.rendered.toLowerCase() <
                b.title.rendered.toLowerCase()
                ? -1
                : 1;
            });
            sortedData.slice(0, 5).forEach((item) => createBusinessCard(item));
            dataItems = [...sortedData];
            totalNumberOfPosts = dataItems.length;

            if (document.querySelectorAll(".page-number")) {
              let wrapperElements = document.querySelectorAll(".page-number");
              wrapperElements.forEach((item) => {
                item.remove();
              });
            }

            for (let i = 1; i <= totalNumberOfPosts; i++) {
              if (i % 5 === 0) {
                createbtn(num++);
              }
              if (totalNumberOfPosts - i > 0 && totalNumberOfPosts - i < 2) {
                createbtn(num++);
                break;
              }
            }
            getPaginationNumber(document.querySelectorAll(".page-number"));
          } catch (err) {
            console.error(err);
          }
        }
      }
    }

    searchBar.addEventListener(
      "keypress",
      debounce((e) => searchOnEnter(e))
    );

    // show cards on page load if searchterm is there

    const searchParams = new URLSearchParams(window.location.search);
    if (
      searchParams.has("searchterm") &&
      searchParams.get("searchterm").trim().length !== 0
    ) {
      const queryTerm = searchParams.get("searchterm").trim();

      async function showCardsOnPageLoad() {
        num = 1;
        try {
          let res = await axios(
            `${window.location.origin}/wp-json/wp/v2/illinois?search=${queryTerm}&_fields=title,link,acf_fields`
          );
          let data = await res.data;

          let taxRes = await axios(
            `${window.location.origin}/wp-json/wp/v2/illinois?il_slug=${queryTerm}&_fields=title,link,acf_fields&per_page=100`
          );

          let taxData = await taxRes.data;

          let tagsRes = await axios(
            `${window.location.origin}/wp-json/wp/v2/illinois?_fields=acf_fields,title,link,acf_fields.address`
          );

          let tagsData = await tagsRes.data;

          let filteredValue = tagsData.filter((item) => {
            // Trim the input and split it into an array of words
            let searchedArray = queryTerm.trimEnd().split(" ");

            // Check if the first word is "service" or "services"
            const firstWordIsService =
              searchedArray[0]?.toLowerCase() === "service" ||
              searchedArray[0]?.toLowerCase() === "services";

            // Case 1: If the first word is "service" or "services", there must be at least two words
            if (firstWordIsService && searchedArray.length >= 2) {
              // Ensure all search terms match as whole words
              return searchedArray.every((val) => {
                let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                return regex.test(item.acf_fields.search_terms.toLowerCase());
              });
            }

            // Case 2: If the first word is not "service" or "services", apply the original filtering logic
            if (!firstWordIsService) {
              return searchedArray.every((val) => {
                let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                let searchTermAndAddress =
                  item.acf_fields.address.replace(/,/g, "").toLowerCase() +
                  " " +
                  item.acf_fields.search_terms.toLowerCase();
                return regex.test(searchTermAndAddress);
              });
            }

            // Case 3: Ignore if only "service" or "services" is searched as a single word
            return false;
          });

          let val = Array.from(
            new Set(
              [...data, ...filteredValue, ...taxData].map((item) =>
                JSON.stringify(item)
              )
            )
          ).map((item) => JSON.parse(item));

          if (val.length !== 0) {
            noResultsElement.style.display = "none";
          }
          if (val.length === 0) {
            noResultsElement.style.display = "block";
            query.textContent = searchParams.get("searchterm").trim();
          }
          // dataItems = [...val];
          // isDataItemEmpty(dataItems);
          // val.splice(0, 5).map((item) => {
          //   createBusinessCard(item);
          // });

          let sortedData = val.sort((a, b) => {
            return a.title.rendered.toLowerCase() <
              b.title.rendered.toLowerCase()
              ? -1
              : 1;
          });
          sortedData.slice(0, 5).forEach((item) => createBusinessCard(item));
          dataItems = [...sortedData];
          totalNumberOfPosts = dataItems.length;

          if (document.querySelectorAll(".page-number")) {
            let wrapperElements = document.querySelectorAll(".page-number");
            wrapperElements.forEach((item) => {
              item.remove();
            });
          }

          for (let i = 1; i <= totalNumberOfPosts; i++) {
            if (i % 5 === 0) {
              createbtn(num++);
            }
            if (totalNumberOfPosts - i > 0 && totalNumberOfPosts - i < 2) {
              createbtn(num++);
              break;
            }
          }
          getPaginationNumber(document.querySelectorAll(".page-number"));
        } catch (err) {
          console.error(err);
        }
      }
      showCardsOnPageLoad();
    } else {
      noResultsElement.style.display = "block";
      [previousButton, nextButton].map((item) => {
        item.style.display = "none";
      });
    }

    async function commonFunction(value) {
      let cardElements = document.querySelectorAll(".wrapper-content");

      window.scrollTo(
        0,
        document.querySelector(".list-of-cards").getBoundingClientRect().top +
          window.scrollY -
          100
      );

      cardElements.forEach((item) => {
        item.remove();
      });

      let pageNumberElements = document.querySelectorAll(".page-number");

      pageNumberElements.forEach((item) => {
        if (item.classList.contains("active")) {
          item.classList.remove("active");
        }
      });

      dataItems
        .slice(value * 5 - 5, value * 5)
        .forEach((item) => createBusinessCard(item));
    }

    let commonNumber = 1;

    //pagination

    paginationContainer.addEventListener("click", function (e) {
      commonFunction(Number(e.target.innerText));
      commonNumber = Number(e.target.textContent);
      e.target.classList.add("active");
    });

    // next-prev function
    function getPaginationNumber(items) {
      let newArr = [...items];
      const itemsPerPage = 5;

      // Initial display
      function updateDisplay(
        startIndex = 0,
        endIndex = startIndex + itemsPerPage
      ) {
        newArr.forEach((item, index) => {
          item.style.display =
            index >= startIndex && index < endIndex ? "block" : "none";
        });
      }
      updateDisplay();

      if (newArr.length <= 1) {
        nextButton.style.display = "none";
        previousButton.style.display = "none";
      }

      // next button
      nextButton.addEventListener("click", function () {
        if (newArr.length === commonNumber) {
          return;
        }

        if (commonNumber % 5 === 0) {
          updateDisplay(commonNumber);
        }

        commonNumber++;
        commonFunction(commonNumber);
        newArr.forEach((item) => {
          if (item.innerText === commonNumber.toString()) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      });

      // prev button
      previousButton.addEventListener("click", function () {
        if (commonNumber === 1) {
          return;
        }
        commonNumber--;
        if (commonNumber % 5 === 0) {
          updateDisplay(commonNumber - itemsPerPage, commonNumber);
        }
        commonFunction(commonNumber);
        newArr.forEach((item) => {
          if (item.innerText === commonNumber.toString()) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      });
    }
  })();
}

// florida

// archive florida

if (document.querySelector(".sg-florida-archive")) {
  (function () {
    let listArray = [];
    let loader = document.querySelector(".loader");
    let noResultsFound = document.querySelector(".no-results-found");
    let categoryList = document.querySelectorAll(".category-list");
    categoryList.forEach((item) => {
      listArray.push(item);
    });

    async function showItems() {
      try {
        let page = 1;
        let allData = [];
        let hasMoreItems = true;

        // Fetch all pages
        while (hasMoreItems) {
          const res = await axios.get(
            `${window.location.origin}/wp-json/wp/v2/fl?_fields=link,name,count&per_page=100&page=${page}`
          );
          const dataArr = res.data;

          if (dataArr.length > 0) {
            allData = allData.concat(dataArr);
            page++;
          } else {
            hasMoreItems = false;
          }
        }

        // Display items based on listArray
        for (let i of listArray) {
          allData.forEach((item) => {
            if (
              item?.name[0].toLowerCase() ===
                i.textContent.trim()[0].toLowerCase() &&
              item.count > 0
            ) {
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
      list.style.display = "block";
      let item = document.createElement("div");
      item.classList.add(".list-item");
      item.innerHTML = `<div class="list-item"><a href="${data?.link}">${data?.title?.rendered}</a></div>`;
      list.append(item);
    }

    function unlistItem() {
      document.querySelectorAll(".list-item").forEach((val) => {
        val.remove();
      });
      list.style.display = "none";
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
      if (e.target.value.trim().length === 0) {
        noResultsFound.style.display = "none";
      }
      if (e.target.value.trim().length > 0) {
        loader.style.display = "grid";
        try {
          let res = await axios(
            `${
              window.location.origin
            }/wp-json/wp/v2/florida?search=${e.target.value.trim()}&_fields=title,link`
          );
          let data = await res.data;

          let taxRes = await axios(
            `${
              window.location.origin
            }/wp-json/wp/v2/florida?fl_slug=${e.target.value.trim()}&_fields=title,link`
          );

          let taxData = await taxRes.data;

          let tagsRes = await axios(
            `${window.location.origin}/wp-json/wp/v2/florida?_fields=acf_fields.search_terms,title,link,acf_fields.address`
          );

          let tagsData = await tagsRes.data;

          let filteredValue = tagsData.filter((item) => {
            // Trim the input and split it into an array of words
            let searchedArray = e.target.value.trimEnd().split(" ");

            // Check if the first word is "service" or "services"
            const firstWordIsService =
              searchedArray[0]?.toLowerCase() === "service" ||
              searchedArray[0]?.toLowerCase() === "services";

            // Case 1: If the first word is "service" or "services", there must be at least two words
            if (firstWordIsService && searchedArray.length >= 2) {
              // Ensure all search terms match as whole words
              return searchedArray.every((val) => {
                let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                return regex.test(item.acf_fields.search_terms.toLowerCase());
              });
            }

            // Case 2: If the first word is not "service" or "services", apply the original filtering logic
            if (!firstWordIsService) {
              return searchedArray.every((val) => {
                let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                let searchTermAndAddress =
                  item.acf_fields.address.replace(/,/g, "").toLowerCase() +
                  " " +
                  item.acf_fields.search_terms.toLowerCase();
                return regex.test(searchTermAndAddress);
                // return regex.test(

                // );
              });
            }

            // Case 3: Ignore if only "service" or "services" is searched as a single word
            return false;
          });

          unlistItem();
          arr = [...data, ...filteredValue, ...taxData].map((item) => {
            delete item.acf_fields;
            return item;
          });

          let val = Array.from(
            new Set(arr.map((item) => JSON.stringify(item)))
          ).map((item) => JSON.parse(item));

          if (val.length === 0 && e.target.value.trim().length > 0) {
            noResultsFound.style.display = "block";
          } else {
            noResultsFound.style.display = "none";
          }

          val.map((item) => {
            listItems(item);
          });

          loader.style.display = "none";
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

    //redirect to search results page on pressing enter
    searchBar.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        window.location = `${window.location.origin}/search-results-florida/?searchterm=${e.target.value}`;
      }
    });
  })();
}

// taxonomy florida

if (document.querySelector(".sg-florida-taxonomy")) {
  (function () {
    let categoryNav = document.querySelector(".ss-illinois-category-name");
    let categoryTitle = document.querySelector(".category-heading");
    let subWrapper = document.querySelector(".wrapper-2 .sub-wrapper");
    let loader = document.querySelector(".loader");
    let noResultsFound = document.querySelector(".no-results-found");
    let pageUrl = window.location.pathname;
    let pathnameArray = pageUrl.split("/");
    let categoryName = pathnameArray[2].split("-");
    let capitalCaseArray = categoryName.map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });
    let combinedName = capitalCaseArray.join(" ");

    function createBusinessCard(data) {
      let wrapper = document.createElement("div");
      wrapper.classList.add("wrapper-content");
      wrapper.innerHTML = `<div class="title">
                            <a href="${data?.slug}">${data?.title?.rendered}</a>
                          </div>

                            <div class="about">
                                <p>${
                                  data?.acf_fields?.category_description ||
                                  data?.acf_fields?.about
                                }</p>
                            </div>

                           
                            ${
                              data?.acf_fields?.phone &&
                              `<div class="phone">
                              <div>
                                  <img src="/wp-content/themes/svetguide/assets/images/single-illinois/phone.png" alt="">
                                  <a href="tel:${data?.acf_fields?.phone}"><?php the_field('phone'); ?>
                                  ${data?.acf_fields?.phone}</a>
                              </div>
                          </div>`
                            }
                          
                          ${
                            data?.acf_fields?.website &&
                            `<div class="website">
                                <div>
                                    <img src="/wp-content/themes/svetguide/assets/images/single-illinois/website.png" alt="">
                                    <p>${data?.acf_fields?.website}</p>
                                </div>
                            </div>`
                          }

                          ${
                            data?.acf_fields?.address &&
                            `<div class="address">
                                <div>
                                    <img src="/wp-content/themes/svetguide/assets/images/single-illinois/location.png" alt="">
                                    <p>${data?.acf_fields?.address}</p>
                                </div>
                            </div>`
                          }
                           
                            `;

      subWrapper.appendChild(wrapper);
    }

    //  pagination functionality
    let dataItems = [];
    let paginationContainer = document.querySelector(".page-nav");
    let previousButton = document.querySelector(".prev");
    let nextButton = document.querySelector(".next");
    // let loadMoreWrapper = document.querySelector(".load-more-wrapper");
    // let loadMoreBtn = document.querySelector(".load-more-btn");
    // let currentStartIndex = 0;
    // let currentEndIndex = 5;

    let num = 1;
    let totalNumberOfPosts;

    function createbtn(val) {
      let ele = document.createElement("button");
      ele.classList.add("page-number");
      ele.innerText = val;
      paginationContainer.appendChild(ele);
    }

    async function fetchData() {
      try {
        let response = await axios(
          `${window.location.origin}/wp-json/wp/v2/florida?fl_slug=${combinedName}&_fields=acf_fields,slug,category_name,title&per_page=100`
        );
        let data = response.data;
        dataItems = [...data];

        totalNumberOfPosts = dataItems.length;

        // category name and breadcrumb name (only appears if category contains posts)
        categoryNav.textContent = dataItems[0]?.category_name;
        if (categoryNav.textContent.includes("&amp;")) {
          categoryNav.innerText = categoryNav.textContent.replace("&amp;", "&");
        }
        categoryTitle.textContent = dataItems[0]?.category_name;
        if (categoryTitle.textContent.includes("&amp;")) {
          categoryTitle.textContent = categoryTitle.textContent.replace(
            "&amp;",
            "&"
          );
        }

        let sortedData = data.sort((a, b) => {
          return a.title.rendered.toLowerCase() < b.title.rendered.toLowerCase()
            ? -1
            : 1;
        });

        sortedData.slice(0, 5).forEach((item) => createBusinessCard(item));

        for (let i = 1; i <= totalNumberOfPosts; i++) {
          if (i % 5 === 0) {
            createbtn(num++);
          }
          if (totalNumberOfPosts - i > 0 && totalNumberOfPosts - i < 2) {
            createbtn(num++);
            break;
          }
        }
        getPaginationNumber(document.querySelectorAll(".page-number"));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();

    async function commonFunction(value) {
      window.scrollTo(
        0,
        categoryTitle.getBoundingClientRect().top + window.scrollY - 100
      );

      try {
        let response = await axios(
          `${window.location.origin}/wp-json/wp/v2/florida?fl_slug=${combinedName}&_fields=acf_fields,slug,category_name,title&per_page=100`
        );
        let data = await response.data;
        dataItems = [...data];

        let items = document.querySelectorAll(".wrapper-content");
        items.forEach((item) => {
          item.remove();
        });

        let sortedData = data.sort((a, b) => {
          return a.title.rendered.localeCompare(b.title.rendered, "en", {
            sensitivity: "base",
          });
        });

        sortedData
          .slice(value * 5 - 5, value * 5)
          .forEach((item) => createBusinessCard(item));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    let commonNumber = 1;

    //pagination
    paginationContainer.addEventListener("click", async function (e) {
      let pageNumberElements = document.querySelectorAll(".page-number");

      pageNumberElements.forEach((item) => {
        if (item.classList.contains("active")) {
          item.classList.remove("active");
        }
      });

      e.target.classList.add("active");
      commonFunction(Number(e.target.textContent));
      commonNumber = Number(e.target.textContent);
    });

    // next-prev function
    function getPaginationNumber(items) {
      let newArr = [...items];
      const itemsPerPage = 5;

      // Initial display
      function updateDisplay(
        startIndex = 0,
        endIndex = startIndex + itemsPerPage
      ) {
        newArr.forEach((item, index) => {
          item.style.display =
            index >= startIndex && index < endIndex ? "block" : "none";
        });
      }
      updateDisplay();

      if (newArr.length <= 1) {
        nextButton.style.display = "none";
        previousButton.style.display = "none";
      }

      // next button
      nextButton.addEventListener("click", function () {
        if (newArr.length === commonNumber) {
          return;
        }

        if (commonNumber % 5 === 0) {
          updateDisplay(commonNumber);
        }

        commonNumber++;

        newArr.forEach((item) => {
          if (item.innerText === commonNumber.toString()) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
        commonFunction(commonNumber);
      });

      // prev button
      previousButton.addEventListener("click", function () {
        if (commonNumber === 1) {
          return;
        }
        commonNumber--;
        if (commonNumber % 5 === 0) {
          updateDisplay(commonNumber - itemsPerPage, commonNumber);
        }
        newArr.forEach((item) => {
          if (item.innerText === commonNumber.toString()) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
        commonFunction(commonNumber);
      });
    }

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
      list.style.display = "block";
      let item = document.createElement("div");
      item.classList.add(".list-item");
      item.innerHTML = `<div class="list-item"><a href="${data?.link}">${data?.title?.rendered}</a></div>`;
      list.append(item);
    }

    function unlistItem() {
      document.querySelectorAll(".list-item").forEach((val) => {
        val.remove();
      });
      list.style.display = "none";
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
      if (e.target.value.trim().length === 0) {
        noResultsFound.style.display = "none";
      }
      if (e.target.value.trim().length > 0) {
        loader.style.display = "grid";
        try {
          let res = await axios(
            `${
              window.location.origin
            }/wp-json/wp/v2/florida?search=${e.target.value.trim()}&_fields=title,link`
          );
          let data = await res.data;

          let taxRes = await axios(
            `${
              window.location.origin
            }/wp-json/wp/v2/florida?fl_slug=${e.target.value.trim()}&_fields=title,link`
          );

          let taxData = await taxRes.data;

          let tagsRes = await axios(
            `${window.location.origin}/wp-json/wp/v2/florida?_fields=acf_fields.search_terms,title,link,acf_fields.address`
          );

          let tagsData = await tagsRes.data;

          let filteredValue = tagsData.filter((item) => {
            // Trim the input and split it into an array of words
            let searchedArray = e.target.value.trimEnd().split(" ");

            // Check if the first word is "service" or "services"
            const firstWordIsService =
              searchedArray[0]?.toLowerCase() === "service" ||
              searchedArray[0]?.toLowerCase() === "services";

            // Case 1: If the first word is "service" or "services", there must be at least two words
            if (firstWordIsService && searchedArray.length >= 2) {
              // Ensure all search terms match as whole words
              return searchedArray.every((val) => {
                let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                return regex.test(item.acf_fields.search_terms.toLowerCase());
              });
            }

            // Case 2: If the first word is not "service" or "services", apply the original filtering logic
            if (!firstWordIsService) {
              return searchedArray.every((val) => {
                let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                let searchTermAndAddress =
                  item.acf_fields.address.replace(/,/g, "").toLowerCase() +
                  " " +
                  item.acf_fields.search_terms.toLowerCase();
                return regex.test(searchTermAndAddress);
                // return regex.test(

                // );
              });
            }

            // Case 3: Ignore if only "service" or "services" is searched as a single word
            return false;
          });

          unlistItem();
          arr = [...data, ...filteredValue, ...taxData].map((item) => {
            delete item.acf_fields;
            return item;
          });

          let val = Array.from(
            new Set(arr.map((item) => JSON.stringify(item)))
          ).map((item) => JSON.parse(item));

          if (val.length === 0) {
            noResultsFound.style.display = "block";
          } else {
            noResultsFound.style.display = "none";
          }

          val.map((item) => {
            listItems(item);
          });
          loader.style.display = "none";
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

    //redirect to search results page on pressing enter
    searchBar.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        window.location = `${window.location.origin}/search-results-florida/?searchterm=${e.target.value}`;
      }
    });
  })();
}

// single florida inner page

if (document.querySelector(".sg-florida-inner")) {
  (function () {
    let categoryNav = document.querySelector(".ss-florida-category-name");
    let pageUrl = window.location.pathname;
    let pathnameArray = pageUrl.split("/");
    let categoryName = pathnameArray[2].split("-");
    let capitalCaseArray = categoryName.map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });
    let combinedName = capitalCaseArray.join(" ");
    // categoryNav.textContent = combinedName;
    categoryNav.href = `${window.location.origin}/florida/${pathnameArray[2]}`;

    async function getCategoryName() {
      let response = await axios(
        `${window.location.origin}/wp-json/wp/v2/florida?fl_slug=${combinedName}&_fields=category_name&per_page=1`
      );
      let data = await response.data[0].category_name;
      categoryNav.textContent = data;
      if (categoryNav.textContent.includes("&amp;")) {
        categoryNav.textContent = categoryNav.textContent.replace("&amp;", "&");
      }
    }
    getCategoryName();
  })();
}

//search results page florida

if (document.querySelector(".sg-search-results-florida")) {
  (function () {
    let subWrapper = document.querySelector(".wrapper-2 .sub-wrapper");

    // search on input
    let loader = document.querySelector(".loader");
    let searchBar = document.querySelector(".search-section input");
    let list = document.querySelector(".search-section .list");
    let noResultsFound = document.querySelector(".no-results-found");
    let noResultsElement = document.querySelector(".message");
    let query = document.querySelector(".query");
    let arr = [];
    let arrayOnEnter = [];

    function debounce(func, timeout = 500) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    }

    function listItems(data) {
      list.style.display = "block";
      let item = document.createElement("div");
      item.classList.add(".list-item");
      item.innerHTML = `<div class="list-item"><a href="${data?.link}">${data?.title?.rendered}</a></div>`;
      list.append(item);
    }

    function unlistItem() {
      document.querySelectorAll(".list-item").forEach((val) => {
        val.remove();
      });
      list.style.display = "none";
    }

    async function searching(e) {
      arr = [];
      if (e.target.value.trim().length === 0) {
        noResultsFound.style.display = "none";
      }
      if (e.target.value.trim().length > 0) {
        loader.style.display = "grid";
        try {
          let res = await axios(
            `${
              window.location.origin
            }/wp-json/wp/v2/florida?search=${e.target.value.trim()}&_fields=title,link,acf_fields`
          );
          let data = await res.data;

          let taxRes = await axios(
            `${
              window.location.origin
            }/wp-json/wp/v2/florida?fl_slug=${e.target.value.trim()}&_fields=title,link,acf_fields&per_page=100`
          );

          let taxData = await taxRes.data;

          let tagsRes = await axios(
            `${window.location.origin}/wp-json/wp/v2/florida?_fields=acf_fields.search_terms,title,link,acf_fields.address`
          );

          let tagsData = await tagsRes.data;

          let filteredValue = tagsData.filter((item) => {
            // Trim the input and split it into an array of words
            let searchedArray = e.target.value.trimEnd().split(" ");

            // Check if the first word is "service" or "services"
            const firstWordIsService =
              searchedArray[0]?.toLowerCase() === "service" ||
              searchedArray[0]?.toLowerCase() === "services";

            // Case 1: If the first word is "service" or "services", there must be at least two words
            if (firstWordIsService && searchedArray.length >= 2) {
              // Ensure all search terms match as whole words
              return searchedArray.every((val) => {
                let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                return regex.test(item.acf_fields.search_terms.toLowerCase());
              });
            }

            // Case 2: If the first word is not "service" or "services", apply the original filtering logic
            if (!firstWordIsService) {
              return searchedArray.every((val) => {
                let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                let searchTermAndAddress =
                  item.acf_fields.address.replace(/,/g, "").toLowerCase() +
                  " " +
                  item.acf_fields.search_terms.toLowerCase();
                return regex.test(searchTermAndAddress);
                // return regex.test(

                // );
              });
            }

            // Case 3: Ignore if only "service" or "services" is searched as a single word
            return false;
          });

          unlistItem();
          arr = [...data, ...filteredValue, ...taxData].map((item) => {
            delete item.acf_fields;
            return item;
          });

          let val = Array.from(
            new Set(arr.map((item) => JSON.stringify(item)))
          ).map((item) => JSON.parse(item));

          if (val.length === 0) {
            noResultsFound.style.display = "block";
          } else {
            noResultsFound.style.display = "none";
          }

          val.map((item) => {
            listItems(item);
          });
          loader.style.display = "none";
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

    // search on press enter

    let dataItems = [];
    let paginationContainer = document.querySelector(".page-nav");
    let previousButton = document.querySelector(".prev");
    let nextButton = document.querySelector(".next");
    // let loadMoreWrapper = document.querySelector(".load-more-wrapper");
    // let loadMoreBtn = document.querySelector(".load-more-btn");
    // let currentStartIndex = 0;
    // let currentEndIndex = 5;
    let num = 1;
    let totalNumberOfPosts;

    function createbtn(val) {
      let ele = document.createElement("button");
      ele.classList.add("page-number");
      ele.innerText = val;
      paginationContainer.appendChild(ele);
    }

    function createBusinessCard(data) {
      let wrapper = document.createElement("div");
      wrapper.classList.add("wrapper-content");
      wrapper.innerHTML = `<div class="title">
                            <a href="${data?.link}">${data?.title?.rendered}</a>
                          </div>

                            <div class="about">
                                <p>${data?.acf_fields?.category_description}</p>
                            </div>

                             ${
                               data?.acf_fields?.phone &&
                               `<div class="phone">
                              <div>
                                  <img src="/wp-content/themes/svetguide/assets/images/single-illinois/phone.png" alt="">
                                  <a href="tel:${data?.acf_fields?.phone}"><?php the_field('phone'); ?>
                                  ${data?.acf_fields?.phone}</a>
                              </div>
                          </div>`
                             }
                          
                          ${
                            data?.acf_fields?.website &&
                            `<div class="website">
                                <div>
                                    <img src="/wp-content/themes/svetguide/assets/images/single-illinois/website.png" alt="">
                                    <p>${data?.acf_fields?.website}</p>
                                </div>
                            </div>`
                          }

                           ${
                             data?.acf_fields?.address &&
                             `<div class="address">
                                <div>
                                    <img src="/wp-content/themes/svetguide/assets/images/single-illinois/location.png" alt="">
                                    <p>${data?.acf_fields?.address}</p>
                                </div>
                            </div>`
                           }
                            `;

      subWrapper.appendChild(wrapper);
    }

    function removeCards() {
      document.querySelectorAll(".wrapper-content").forEach((val) => {
        val.remove();
      });
    }

    async function searchOnEnter(e) {
      num = 1;
      dataItems = [];
      arrayOnEnter = [];
      if (e.key === "Enter") {
        if (e.target.value.trim().length > 0) {
          try {
            let res = await axios(
              `${window.location.origin}/wp-json/wp/v2/florida?search=${e.target.value}&_fields=title,link,acf_fields`
            );
            let data = await res.data;

            let taxRes = await axios(
              `${
                window.location.origin
              }/wp-json/wp/v2/florida?fl_slug=${e.target.value.trim()}&_fields=title,link,acf_fields&per_page=100`
            );

            let taxData = await taxRes.data;

            let tagsRes = await axios(
              `${window.location.origin}/wp-json/wp/v2/florida?_fields=acf_fields,title,link,acf_fields.address`
            );

            let tagsData = await tagsRes.data;

            let filteredValue = tagsData.filter((item) => {
              // Trim the input and split it into an array of words
              let searchedArray = e.target.value.trimEnd().split(" ");

              // Check if the first word is "service" or "services"
              const firstWordIsService =
                searchedArray[0]?.toLowerCase() === "service" ||
                searchedArray[0]?.toLowerCase() === "services";

              // Case 1: If the first word is "service" or "services", there must be at least two words
              if (firstWordIsService && searchedArray.length >= 2) {
                // Ensure all search terms match as whole words
                return searchedArray.every((val) => {
                  let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                  return regex.test(item.acf_fields.search_terms.toLowerCase());
                });
              }

              // Case 2: If the first word is not "service" or "services", apply the original filtering logic
              if (!firstWordIsService) {
                return searchedArray.every((val) => {
                  let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                  let searchTermAndAddress =
                    item.acf_fields.address.replace(/,/g, "").toLowerCase() +
                    " " +
                    item.acf_fields.search_terms.toLowerCase();
                  return regex.test(searchTermAndAddress);
                });
              }

              // Case 3: Ignore if only "service" or "services" is searched as a single word
              return false;
            });

            unlistItem();
            removeCards();
            arrayOnEnter = [...data, ...filteredValue, ...taxData].map(
              (item) => {
                return item;
              }
            );

            let val = Array.from(
              new Set(arrayOnEnter.map((item) => JSON.stringify(item)))
            ).map((item) => JSON.parse(item));

            if (val.length !== 0) {
              noResultsElement.style.display = "none";
            }
            if (val.length === 0) {
              noResultsElement.style.display = "block";
              query.textContent = e.target.value.trim();
            }

            // isDataItemEmpty(dataItems);
            let sortedData = val.sort((a, b) => {
              return a.title.rendered.toLowerCase() <
                b.title.rendered.toLowerCase()
                ? -1
                : 1;
            });
            sortedData.slice(0, 5).forEach((item) => createBusinessCard(item));
            dataItems = [...sortedData];
            totalNumberOfPosts = dataItems.length;

            if (document.querySelectorAll(".page-number")) {
              let wrapperElements = document.querySelectorAll(".page-number");
              wrapperElements.forEach((item) => {
                item.remove();
              });
            }

            for (let i = 1; i <= totalNumberOfPosts; i++) {
              if (i % 5 === 0) {
                createbtn(num++);
              }
              if (totalNumberOfPosts - i > 0 && totalNumberOfPosts - i < 2) {
                createbtn(num++);
                break;
              }
            }
            getPaginationNumber(document.querySelectorAll(".page-number"));
          } catch (err) {
            console.error(err);
          }
        }
      }
    }

    searchBar.addEventListener(
      "keypress",
      debounce((e) => searchOnEnter(e))
    );

    // show cards on page load if searchterm is there

    const searchParams = new URLSearchParams(window.location.search);
    if (
      searchParams.has("searchterm") &&
      searchParams.get("searchterm").trim().length !== 0
    ) {
      const queryTerm = searchParams.get("searchterm").trim();

      async function showCardsOnPageLoad() {
        num = 1;
        try {
          let res = await axios(
            `${window.location.origin}/wp-json/wp/v2/florida?search=${queryTerm}&_fields=title,link,acf_fields`
          );
          let data = await res.data;

          let taxRes = await axios(
            `${window.location.origin}/wp-json/wp/v2/florida?fl_slug=${queryTerm}&_fields=title,link,acf_fields&per_page=100`
          );

          let taxData = await taxRes.data;

          let tagsRes = await axios(
            `${window.location.origin}/wp-json/wp/v2/florida?_fields=acf_fields,title,link,acf_fields.address`
          );

          let tagsData = await tagsRes.data;

          let filteredValue = tagsData.filter((item) => {
            // Trim the input and split it into an array of words
            let searchedArray = queryTerm.trimEnd().split(" ");

            // Check if the first word is "service" or "services"
            const firstWordIsService =
              searchedArray[0]?.toLowerCase() === "service" ||
              searchedArray[0]?.toLowerCase() === "services";

            // Case 1: If the first word is "service" or "services", there must be at least two words
            if (firstWordIsService && searchedArray.length >= 2) {
              // Ensure all search terms match as whole words
              return searchedArray.every((val) => {
                let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                return regex.test(item.acf_fields.search_terms.toLowerCase());
              });
            }

            // Case 2: If the first word is not "service" or "services", apply the original filtering logic
            if (!firstWordIsService) {
              return searchedArray.every((val) => {
                let regex = new RegExp(`\\b${val.toLowerCase()}\\b`, "i");
                let searchTermAndAddress =
                  item.acf_fields.address.replace(/,/g, "").toLowerCase() +
                  " " +
                  item.acf_fields.search_terms.toLowerCase();
                return regex.test(searchTermAndAddress);
              });
            }

            // Case 3: Ignore if only "service" or "services" is searched as a single word
            return false;
          });

          let val = Array.from(
            new Set(
              [...data, ...filteredValue, ...taxData].map((item) =>
                JSON.stringify(item)
              )
            )
          ).map((item) => JSON.parse(item));

          if (val.length !== 0) {
            noResultsElement.style.display = "none";
          }
          if (val.length === 0) {
            noResultsElement.style.display = "block";
            query.textContent = searchParams.get("searchterm").trim();
          }
          // dataItems = [...val];
          // isDataItemEmpty(dataItems);
          // val.splice(0, 5).map((item) => {
          //   createBusinessCard(item);
          // });

          let sortedData = val.sort((a, b) => {
            return a.title.rendered.toLowerCase() <
              b.title.rendered.toLowerCase()
              ? -1
              : 1;
          });

          sortedData.slice(0, 5).forEach((item) => createBusinessCard(item));
          dataItems = [...sortedData];
          totalNumberOfPosts = dataItems.length;

          if (document.querySelectorAll(".page-number")) {
            let wrapperElements = document.querySelectorAll(".page-number");
            wrapperElements.forEach((item) => {
              item.remove();
            });
          }

          for (let i = 1; i <= totalNumberOfPosts; i++) {
            if (i % 5 === 0) {
              createbtn(num++);
            }
            if (totalNumberOfPosts - i > 0 && totalNumberOfPosts - i < 2) {
              createbtn(num++);
              break;
            }
          }
          getPaginationNumber(document.querySelectorAll(".page-number"));
        } catch (err) {
          console.error(err);
        }
      }
      showCardsOnPageLoad();
    } else {
      noResultsElement.style.display = "block";
      [previousButton, nextButton].map((item) => {
        item.style.display = "none";
      });
    }

    async function commonFunction(value) {
      let cardElements = document.querySelectorAll(".wrapper-content");

      window.scrollTo(
        0,
        document.querySelector(".list-of-cards").getBoundingClientRect().top +
          window.scrollY -
          100
      );

      cardElements.forEach((item) => {
        item.remove();
      });

      let pageNumberElements = document.querySelectorAll(".page-number");

      pageNumberElements.forEach((item) => {
        if (item.classList.contains("active")) {
          item.classList.remove("active");
        }
      });

      dataItems
        .slice(value * 5 - 5, value * 5)
        .forEach((item) => createBusinessCard(item));
    }

    let commonNumber = 1;

    paginationContainer.addEventListener("click", function (e) {
      commonFunction(Number(e.target.innerText));
      commonNumber = Number(e.target.textContent);
      e.target.classList.add("active");
    });

    // next-prev function
    function getPaginationNumber(items) {
      let newArr = [...items];
      const itemsPerPage = 5;

      // Initial display
      function updateDisplay(
        startIndex = 0,
        endIndex = startIndex + itemsPerPage
      ) {
        newArr.forEach((item, index) => {
          item.style.display =
            index >= startIndex && index < endIndex ? "block" : "none";
        });
      }
      updateDisplay();

      if (newArr.length <= 1) {
        nextButton.style.display = "none";
        previousButton.style.display = "none";
      }

      // next button
      nextButton.addEventListener("click", function () {
        if (newArr.length === commonNumber) {
          return;
        }

        if (commonNumber % 5 === 0) {
          updateDisplay(commonNumber);
        }

        commonNumber++;
        commonFunction(commonNumber);
        newArr.forEach((item) => {
          if (item.innerText === commonNumber.toString()) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      });

      // prev button
      previousButton.addEventListener("click", function () {
        if (commonNumber === 1) {
          return;
        }
        commonNumber--;
        if (commonNumber % 5 === 0) {
          updateDisplay(commonNumber - itemsPerPage, commonNumber);
        }
        commonFunction(commonNumber);
        newArr.forEach((item) => {
          if (item.innerText === commonNumber.toString()) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      });
    }
  })();
}
