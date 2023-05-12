import View from "./View.js";

class PostsView extends View {
  parentElement = document.querySelector(".page-content");
  template = document.querySelector("#post-template");

  generateMarkup() {
    const posts = document.createDocumentFragment();

    this.data.forEach((post) => {
      const postElement = this.template.content.cloneNode(true);
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

      postElement.querySelector(
        ".post__comments-add input[name='post-id']"
      ).value = post.id;

      posts.append(postElement);
    });

    return posts;
  }

  addHandlerPostsRender(handler) {
    window.addEventListener("load", handler);
  }
}

export default new PostsView();
