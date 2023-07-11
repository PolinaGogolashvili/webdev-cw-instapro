import { renderHeaderComponent } from "./header-component.js";
import { posts, likeEventListener } from "../index.js";
export function renderUserPageComponent({appEl}) {
    const postsHtml = posts.map((post, index) => {
            return `<li class="post">
        <div class="post-header" data-user-id="${post.id}">
            <img src=${post.userImg} class="post-header__user-image">
            <p class="post-header__user-name">${post.name}</p>
        </div>
        <div class="post-image-container">
        <img class="post-image" src=${post.postImg}>
        </div>
        <div class="post-likes">
        <button data-post-id="${post.idPost} data-index="${index}" class="like-button">
            <img src="${post.isLiked? ` ./assets/images/like-active.svg` : `./assets/images/like-not-active.svg`}>
            </button>
              <p class="post-likes-text"> Нравится: <strong>${post.whoseLike} ${post.likes > 1? `и еще ${post.likes - 1}` : `` }</strong>
          </div>
        <p class="post-text">
        <span class="user-name">${post.name}</span>
        ${post.description}
        </p>
        <p class="post-date">
        Только что
        </p>
    </li>`
    })
    const appHtml = `
    <div class="page-container">
    <div class="header-container"></div>
      <ul class="posts">
        ${postsHtml}
      </ul>
    </div>`;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
        element: document.querySelector(".header-container"),
    });

    likeEventListener();
}