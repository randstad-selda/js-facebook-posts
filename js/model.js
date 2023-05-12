export const state = {
  posts: [],
  user: {
    name: "Samuele Madrigali",
    avatar:
      "https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512",
  },
};

export const loadPosts = () => {
  return new Promise(function (resolve, reject) {
    fetch(`http://localhost:3000/posts`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        state.posts = data;
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  });
};
