// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
const personalKey = "polina";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export async function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
      return response.json();
    })
    .then((data) => {
      return data.posts.map((post) => {
        return {
          name: post.user?.name,
          description: post.description,
          time: post.createdAt,
          postImg: post.imageUrl,
          userImg: post.user?.imageUrl,
          id: post.user.id,
          idPost: post.id,
          isLiked: post.isLiked,
          likes: post.likes.length,
          whoseLike: post.likes[0]?.name,
        };
      });
    });
}

export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}

export function addPost({ token, description, imageUrl }) {
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description,
      imageUrl,
    }),
  }).then((response) => {
    if(response.status === 400) {
      throw new Error ('Прикрепите картинку и опишите ее')
    } else if(response.status === 500) {
      throw new Error ('У вас пропал интернет')
    }
    return response.json();
  })
};

export function getUserPosts(userId, token) {
  return fetch(postsHost + "/user-posts/" + userId, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts.map((post) => {
        return {
          name: post?.user?.name,
          description: post.description,
          time: post.createdAt,
          postImg: post.imageUrl,
          userImg: post?.user?.imageUrl,
          id: post.user?.id,
          idPost: post.idPost,
          isLiked: post.isLiked,
          likes: post.likes.length,
          whoseLike: post?.likes[0]?.name,
        }
      });
    });
  };


  export function getLiked({ token, idPost }) {
    return fetch(postsHost + "/" + idPost + "/like", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        idPost,
      }),
    })
  };

  export function getDisliked({ token, idPost }) {
    return fetch(postsHost + "/" + idPost + "/dislike", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        idPost,
      }),
     })
  }