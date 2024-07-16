
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { renderImage } from "./js/render-functions";
import { getPicturesByQuery } from "./js/pixabay-api";

const form = document.querySelector("form")
const gallery = document.querySelector('.gallery')
const loader = document.querySelector('.loader')
const loadButton = document.querySelector('.button-load')
const spinner = document.querySelector('.spinner')

hide(loader);
hide(loadButton)

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

    show(loader);
    hide(loadButton);

    try{
const {hits, total} = await getPicturesByQuery(params);
params.maxPage = Math.ceil(total / params.pageSize)
renderImage(hits);

if(hits.length > 0 && hits.length !== total) {
show(loadButton);
hide(loader);
loadButton.addEventListener('click', handleLoadMore);
}
else {
  hide(loadButton);
  hide(loader)
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
hide(loadButton);
show(loader);

try {
  const {hits} = await getPicturesByQuery(params);
renderImage(hits);

const list = document.querySelector('.list');
const listHeight = list.getBoundingClientRect().height;
window.scrollBy({
  top: listHeight * 4,
  behavior: "smooth"
})
}
catch (err) {
console.log(err);
}
finally {
  hide(loader);
  show(loadButton);
if(params.page === params.maxPage) {
  iziToast.show({
    message: "We're sorry, but you've reached the end of search results."
  });
  hide(loadButton);
  loadButton.removeEventListener('click', handleLoadMore);
}
}
}


function hide(element){
  element.style.display = 'none';
}

function show (element) {
  element.style.display = 'flex';
}

