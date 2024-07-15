
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { renderImage } from "./js/render-functions";
import { getPicturesByQuery } from "./js/pixabay-api";

const form = document.querySelector("form")
const gallery = document.querySelector('.gallery')
const loader = document.querySelector('.loader')
const loadButton = document.querySelector('.button-load')
const spinner = document.querySelector('.spinner')

hide(loadButton);

form.addEventListener('submit', handlerForm)

const params = {
  q: '',
page: 1,
pageSize:  15,
maxPage: 0,
}

async function handlerForm (evt){
    evt.preventDefault()
    gallery.innerHTML = "";
    params.page = 1; 
  params.q = form.elements.search.value.trim();

   if (!params.q) {
    iziToast.error({
      title: 'Рядок не може бути пустим',
    });
    return;}

    show(loadButton);
    disable(loadButton,loader);

    try{
const {hits, total} = await getPicturesByQuery(params);
params.maxPage = Math.ceil(total / params.pageSize)
renderImage(hits);

if(hits.length > 0 && hits.length !== total) {
enable(loadButton, loader);
loadButton.addEventListener('click', handleLoadMore)
}
else {
  hide(loadButton);
}

    }
    catch (err) {

    }
     finally {
form.reset()
     }
}

async function handleLoadMore(evt) {
  params.page += 1;
disable(loadButton, loader);

try {
  const {hits} = await getPicturesByQuery(params);
renderImage(hits);

const list = document.querySelector('.list');
const listHeight = list.getBoundingClientRect().height;
window.scrollBy({
  top:listHeight * 4,
  behavior: "smooth"
})
}
catch (err) {
console.log(err);
}
finally {
  enable(loadButton, loader) 
if(params.page === params.maxPage) {
  console.log("We're sorry, but you've reached the end of search results.");
  hide(loadButton);
  loadButton.removeEventListener('click', handleLoadMore);
}
}
}


function hide(loadButton){
loadButton.classList.add('is-hidden');
}

function show (loadButton) {
  loadButton.classList.remove('is-hidden');
}

function disable (loadButton, loader) {
loadButton.disabled = true;
        loader.style.display = 'block';
}

function enable(loadButton, loader) {
  loadButton.disabled = false;
        loader.style.display = 'none';
}