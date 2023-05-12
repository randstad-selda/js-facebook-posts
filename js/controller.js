import * as model from "./model.js";
import PostsView from "./views/PostsView.js";
/*----------------------
  VARIABLES
-----------------------*/
const commentTemplate = document.querySelector("#comment-template");

/*----------------------
  FUNCTIONS
-----------------------*/
function renderComments(comments, postId) {
  const listCommentsElement = document.querySelector(
    `#post-${postId} .post__comments ul`
  );

  listCommentsElement.innerHTML = "";

  comments.forEach((comment) => {
    const commentElement = commentTemplate.content.cloneNode(true);

    commentElement.querySelector(".comment__author-img > img").src =
      comment.author.avatar;
    commentElement.querySelector(".comment__author-name").textContent =
      comment.author.name;
    commentElement.querySelector(".comment__text").innerHTML = comment.content;

    listCommentsElement.append(commentElement);
  });
}

function fetchComments(postId) {
  fetch(`http://localhost:3000/posts/${postId}/comments`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderComments(data, postId);
    });
}

function addHandlerSubmitComment() {
  const formsAddComment = document.querySelectorAll(".post__comments-add");
  formsAddComment.forEach((form) => {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(this);
      const data = {
        postId: formData.get("post-id"),
        author: {
          name: model.state.user.name,
          avatar: model.state.user.avatar,
        },
        content: formData.get("text"),
      };

      fetch(`http://localhost:3000/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          fetchComments(formData.get("post-id"));
          form.reset();
        });
    });
  });
}

/*--------------------
  INIT - carico tutti i posts
---------------------*/

// contattare le API http://localhost:3000/posts

// pageContentElement.addEventListener("click", function (event) {
//   if (!event.target.classList.contains("post__toggle-comments")) return;

//   event.preventDefault();

//   if (!event.target.nextElementSibling.classList.contains("d-none")) {
//     event.target.nextElementSibling.classList.add("d-none");
//     return;
//   }

//   const postId = Number(event.target.getAttribute("data-post-id"));
//   fetchComments(postId);
//   event.target.nextElementSibling.classList.remove("d-none");
// });

function controlPosts() {
  model.loadPosts().then(function () {
    PostsView.render(model.state.posts);
  });
}

PostsView.addHandlerPostsRender(controlPosts);
