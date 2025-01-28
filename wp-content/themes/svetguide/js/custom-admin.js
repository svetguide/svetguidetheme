document.addEventListener("DOMContentLoaded", function () {
  const permalinkAnchor = document.querySelector("#sample-permalink a");
  const postIdElement = document.querySelector("#post_ID"); // Hidden input with post ID

  if (permalinkAnchor && postIdElement) {
    const postId = postIdElement.value;

    // Make an AJAX request to fetch the preview URL
    fetch(ajaxurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        action: "generate_preview_url",
        post_id: postId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data.preview_url) {
          // Update the permalink anchor href
          permalinkAnchor.href = data.data.preview_url;

          // Optional: Log the new preview URL
          console.log("Updated preview URL:", data.data.preview_url);
        } else {
          console.error("Failed to fetch preview URL:", data);
        }
      })
      .catch((error) => console.error("Error fetching preview URL:", error));
  }
});
