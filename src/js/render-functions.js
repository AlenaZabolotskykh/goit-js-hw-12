import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const gallery = document.querySelector('.gallery')

 let lightbox = new SimpleLightbox('.gallery a', 
    {docClose: true,
    close: true,})

export function renderImage(images) {
    if (images.length === 0) {
        iziToast.show({
            message: 'Sorry, there are no images matching your search query. Please try again!'
          });
        gallery.innerHTML = "";
      }
      else {
    const listItems = images
    .map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => `<li class="list">
  <a href="${largeImageURL}">
    <img src='${webformatURL}' alt='${tags}'/>
    <div class="item-wrap">
    <h2 class="item-text">Like<p>${likes}</p></h2>
    <h2 class="item-text">Views<p>${views}</p></h2>
    <h2 class="item-text">Comments<p>${comments}</p></h2>
    <h2 class="item-text">Downloads<p>${downloads}</p></h2>
  </div>
  </li>`)
    .join("");

  gallery.innerHTML = listItems;
if (lightbox){
  lightbox.refresh();}
  else {lightbox}
  }}

 