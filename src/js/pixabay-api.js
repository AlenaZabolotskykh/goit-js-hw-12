import axios from "axios";



const BASE_URL = 'https://pixabay.com';
const ENDPOINT = 'api/';
const KEY = '44791676-0ec883c6e453828f8c76360bc';


axios.defaults.baseURL = BASE_URL;

export function getPicturesByQuery({q = '', page = 1, pageSize = 15} = {}) {

  return axios.get(ENDPOINT, {
    params: {
key: KEY,
q,
page,
per_page: pageSize,
image_type: 'photo',
orientation: 'horizontal',
safesearch: true
  }})
  .then(({data}) => data)
  .catch(err => {console.log(err)})
}

