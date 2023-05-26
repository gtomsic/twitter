$(document).ready(() => {
  $.get("/api/posts", (results) => {
    outputPosts(results, $(".postContainer"));
  });
});

function outputPosts(results, container) {
  container.html("");
  results.forEach((result) => {
    let html = createPostHtml(result);
    container.append(html);
  });
  if (results.lenght == 0) {
    container.append("<span class='noResults'>No posts at the moment</span>");
  }
}
