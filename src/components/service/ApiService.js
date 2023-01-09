import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '29186730-3f44e5d7f92932d3e32146242';

async function fetchPics(searchQuery,page) {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  console.log(page);
  return response.data;

}

export default fetchPics;
