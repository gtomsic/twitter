$("#postTextarea").keyup((event) => {
  let textbox = $(event.target);
  let value = textbox.val().trim();

  let submitButton = $("#submitPostButton");

  if (submitButton.length == 0) return alert("No submit button found");

  if (value == "") {
    submitButton.prop("disabled", true);
    return;
  }
  submitButton.prop("disabled", false);
});

$("#submitPostButton").click((event) => {
  let button = $(event.target);
  let textbox = $("#postTextarea");

  let data = {
    content: textbox.val(),
  };

  $.post("/api/posts", data, (postData) => {
    let html = createPostHtml(postData);
    $(".postContainer").prepend(html);
    textbox.val("");
    button.prop("disabled", true);
  });
});

function createPostHtml(postData) {
  const postedBy = postData.postedBy;
  if (postedBy._id === undefined) {
    return console.log("No user object.");
  }
  const displayName = postedBy.firstName + " " + postedBy.lastName;
  var timestamps = postData.createdAt;

  return `<div class="post">
            <div class="mainContentContainer">
              <div class="userImageContainer">
                <img src="${postedBy.profilePic}"/>
              </div>
              <div class="postContentContainer">
                <div class="header">
                  <a href="/profile/${postedBy.username}" class="displayName">${displayName}</a>
                  <span class="username">@${postedBy.username}</span>
                  <span class="date">${timestamps}</span>
                </div>
                <div class="postBody">
                  <span>${postData.content}</span>
                </div>
                <div class="postFooter">
                  <div class="postButtonContainer">
                    <button>
                     <i class="fa-solid fa-comment-dots"></i>
                    </button>
                  </div>
                  <div class="postButtonContainer">
                    <button>
                      <i class="fa-solid fa-retweet"></i>
                    </button>
                  </div>
                  <div class="postButtonContainer">
                    <button>
                      <i class="fa-regular fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
}
