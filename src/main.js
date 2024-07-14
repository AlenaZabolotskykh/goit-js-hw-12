
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { renderImage } from "./js/render-functions";
import { getPicturesByQuery } from "./js/pixabay-api";

const form = document.querySelector("form")
const gallery = document.querySelector('.gallery')
const loader = document.querySelector('.loader')
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

    try{
const {hits, total} = await getPicturesByQuery(params)
console.log(hits, total)
params.maxPage = Math.ceil(total / params.pageSize)
renderImage(hits)
    }
    catch (err) {

    }
     finally {
form.reset()
     }
    // loader.style.display = 'block';
// getPicturesByQuery(inputValue)
// .then(data => {renderImage(data.hits)
// })
// .catch((err)=>console.log(err))
// .finally(() => {
//   loader.style.display = 'none'
// })
}
