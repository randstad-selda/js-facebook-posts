/*----------------------
  VARIABLES
-----------------------*/
const pageContentElement = document.querySelector(".page-content");
const postTemplate = document.querySelector("#post-template");

/*----------------------
  FUNCTIONS
-----------------------*/
function renderPost(post) {
  const postElement = postTemplate.content.cloneNode(true);
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

  // Comments event
  postElement
    .querySelector(".post__toggle-comments")
    .addEventListener("click", function (event) {
      event.preventDefault();
      this.nextElementSibling.classList.toggle("d-none");
    });

  // Inietto il post nella pagina
  pageContentElement.append(postElement);
}

/*--------------------
  INIT - carico tutti i posts
---------------------*/

// contattare le API http://localhost:3000/posts
fetch(`http://localhost:3000/posts`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    data.forEach(renderPost);
  });
// ciclare sui posts
