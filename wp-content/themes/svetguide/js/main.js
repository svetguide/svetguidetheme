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
    let loader = document.querySelector(".loader");
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
                            <a href="${data?.slug}">${
        data?.acf_fields?.title
      }</a>
                          </div>

                            <div class="about">
                                <p>${
                                  data?.acf_fields?.category_description ||
                                  data?.acf_fields?.about
                                }</p>
                            </div>

                            <div class="phone">
                                <div>
                                    <img src="/wp-content/themes/svetguide/assets/images/single-illinois/phone.png" alt="">
                                    <p><?php the_field('phone'); ?>${
                                      data?.acf_fields?.phone
                                    }</p>
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
      if (e.target.value.trim().length > 0) {
        loader.style.display = "grid";
        try {
          let res = await axios(
            `${
              window.location.origin
            }/wp-json/wp/v2/illinois?search=${e.target.value.trim()}&_fields=title,link`
          );
          let data = await res.data;

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
          arr = [...data, ...filteredValue].map((item) => {
            delete item.acf_fields;
            return item;
          });

          let val = Array.from(
            new Set(arr.map((item) => JSON.stringify(item)))
          ).map((item) => JSON.parse(item));

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

// archive illinois

if (document.querySelector(".sg-illinois-archive")) {
  (function () {
    let listArray = [];
    let loader = document.querySelector(".loader");
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
      if (e.target.value.trim().length > 0) {
        loader.style.display = "grid";
        try {
          let res = await axios(
            `${
              window.location.origin
            }/wp-json/wp/v2/illinois?search=${e.target.value.trim()}&_fields=title,link`
          );
          let data = await res.data;

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
          arr = [...data, ...filteredValue].map((item) => {
            delete item.acf_fields;
            return item;
          });

          let val = Array.from(
            new Set(arr.map((item) => JSON.stringify(item)))
          ).map((item) => JSON.parse(item));

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

//search results page illinois

if (document.querySelector(".sg-search-results-illinois")) {
  (function () {
    let subWrapper = document.querySelector(".wrapper-2 .sub-wrapper");

    // search on input
    let loader = document.querySelector(".loader");
    let searchBar = document.querySelector(".search-section input");
    let list = document.querySelector(".search-section .list");
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
      if (e.target.value.trim().length > 0) {
        loader.style.display = "grid";
        try {
          let res = await axios(
            `${
              window.location.origin
            }/wp-json/wp/v2/illinois?search=${e.target.value.trim()}&_fields=title,link`
          );
          let data = await res.data;

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
          arr = [...data, ...filteredValue].map((item) => {
            delete item.acf_fields;
            return item;
          });

          let val = Array.from(
            new Set(arr.map((item) => JSON.stringify(item)))
          ).map((item) => JSON.parse(item));

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

    function createBusinessCard(data) {
      let wrapper = document.createElement("div");
      wrapper.classList.add("wrapper-content");
      wrapper.innerHTML = `<div class="title">
                            <a href="${data?.link}">${data?.acf_fields?.title}</a>
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

    function removeCards() {
      document.querySelectorAll(".wrapper-content").forEach((val) => {
        val.remove();
      });
    }

    async function searchOnEnter(e) {
      arrayOnEnter = [];
      if (e.key === "Enter") {
        if (e.target.value.trim().length > 0) {
          try {
            let res = await axios(
              `${window.location.origin}/wp-json/wp/v2/illinois?search=${e.target.value}&_fields=title,link,acf_fields`
            );
            let data = await res.data;

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
                  // return regex.test(

                  // );
                });
              }

              // Case 3: Ignore if only "service" or "services" is searched as a single word
              return false;
            });

            unlistItem();
            removeCards();
            arrayOnEnter = [...data, ...filteredValue].map((item) => {
              return item;
            });

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

            val.map((item) => {
              console.log(item);
              createBusinessCard(item);
            });
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
        try {
          let res = await axios(
            `${window.location.origin}/wp-json/wp/v2/illinois?search=${queryTerm}&_fields=title,link,acf_fields`
          );
          let data = await res.data;

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
                // return regex.test(

                // );
              });
            }

            // Case 3: Ignore if only "service" or "services" is searched as a single word
            return false;
          });

          let val = Array.from(
            new Set(
              [...data, ...filteredValue].map((item) => JSON.stringify(item))
            )
          ).map((item) => JSON.parse(item));

          if (val.length !== 0) {
            noResultsElement.style.display = "none";
          }
          if (val.length === 0) {
            noResultsElement.style.display = "block";
            query.textContent = searchParams.get("searchterm").trim();
          }

          val.map((item) => {
            createBusinessCard(item);
          });
        } catch (err) {
          console.error(err);
        }
      }
      showCardsOnPageLoad();
    } else {
      noResultsElement.style.display = "block";
    }
  })();
}
