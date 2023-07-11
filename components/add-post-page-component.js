import { renderUploadImageComponent } from "./upload-image-component.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `<div class="page-container">
      <div class="header-container">
        <div class="form">
          <h3 class="form-title">Добавить пост</h3>
            <div class="form-inputs">
              <div class="upload-image-container">
                <div class="upload=image">
                  <label class="file-upload-label secondary-button">
                    <input type="file" class="file-upload-input" style="display:none">Выберите фото
                  </label>
                </div>
              </div>  
            </div>
          <label>Опишите фотографию:
          <textarea class="input textarea" id="description-input" rows="2"></textarea>
          </label>
          <button class="button" id="add-button">Добавить</button>
        </div>
      </div>
    </div>`;

    appEl.innerHTML = appHtml;

    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    const descriptionEl = document.getElementById("description-input");


    let imageUrl;

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"), 
        onImageUrlChange(newImageUrl) { 
          imageUrl = newImageUrl;
        },
      });
    }

    const buttonElement = document.getElementById("add-button");

    buttonElement.addEventListener("click", () => {
      buttonElement.disabled = false;
      onAddPostClick({
        description: descriptionEl.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
        imageUrl: imageUrl,
      });
    });
  };

  render();
} 
