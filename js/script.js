/*----------------------
  VARIABLES
-----------------------*/
const pageContentElement = document.querySelector(".page-content");
const postTemplate = document.querySelector("#post-template");
const commentTemplate = document.querySelector("#comment-template");

const user = {
  name: "Samuele Madrigali",
  avatar:
    "https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512",
};

/*----------------------
  FUNCTIONS
-----------------------*/
function renderPost(post) {
  const postElement = postTemplate.content.cloneNode(true);
  postElement.querySelector(".post").id = `post-${post.id}`;
  // Post Header
  postElement.querySelector(".post__author-img").src = post.author.avatar;
  postElement.querySelector(
    ".post__author-img"
  ).alt = `${post.author.name} ${post.author.surname}`;
  postElement.querySelector(
    ".post__author-name"
  ).textContent = `${post.author.name} ${post.author.surname}`;
  postElement.querySelector(".post__time").textContent = post.time;

  // Post Content
  postElement.querySelector(".post__content").innerHTML = post.content;

  // Post Image
  if (post.image) {
    postElement.querySelector(
      ".post__image"
    ).innerHTML = `<img src="${post.image}">`;
  }

  postElement
    .querySelector(".post__toggle-comments")
    .setAttribute("data-post-id", post.id);

  postElement.querySelector(".post__comments-add input[name='post-id']").value =
    post.id;

  // Inietto il post nella pagina
  pageContentElement.append(postElement);
}

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
          name: user.name,
          avatar: user.avatar,
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
window.addEventListener("load", function () {
  fetch(`http://localhost:3000/posts`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.forEach(renderPost);
      addHandlerSubmitComment();
    });
});

pageContentElement.addEventListener("click", function (event) {
  if (!event.target.classList.contains("post__toggle-comments")) return;

  event.preventDefault();

  if (!event.target.nextElementSibling.classList.contains("d-none")) {
    event.target.nextElementSibling.classList.add("d-none");
    return;
  }

  const postId = Number(event.target.getAttribute("data-post-id"));
  fetchComments(postId);
  event.target.nextElementSibling.classList.remove("d-none");
});
