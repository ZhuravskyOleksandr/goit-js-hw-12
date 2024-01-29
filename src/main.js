import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

import * as helpers from "./helpers";

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const galleryList = document.querySelector('.gallery-list');

searchForm.addEventListener('submit', searchImages);
helpers.loadMoreBtn.addEventListener('click', loadMore);

let lightbox;
let page = 1;
let per_page = 40;
let searchQuery = '';

async function searchImages(event) {
    event.preventDefault();
    galleryList.innerHTML = '';
    helpers.showLoader();
    helpers.hideLoadMoreBtn();
    page = 1;
    searchQuery = searchInput.value;
    
  try {
    const data = await serviceImages(searchQuery);
    if (data.hits.length === 0) {
      throw new Error('Sorry, there are no images matching your search query. Please try again!');
    }

    galleryList.innerHTML = createMarkup(data.hits);
    lightbox = new SimpleLightbox('.gallery-link', {
            captionsData: 'alt',
            captionDelay: 250,
            });
    lightbox.refresh();
    helpers.showLoadMoreBtn();
  } catch (error) {
    iziToast.error({
      title: '',
      message: error.message,
      position: "topRight",
    });
    helpers.hideLoadMoreBtn();
  } finally {
    searchForm.reset();
    helpers.hideLoader();
  }
};

async function loadMore() {
  page++;
  helpers.hideLoadMoreBtn();
  helpers.showLoader();

  try {
    const data = await serviceImages(searchQuery);
    galleryList.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    lightbox.refresh();
    helpers.showLoadMoreBtn();

    const li = galleryList.firstElementChild;
    const liCoordinates = li.getBoundingClientRect();

    window.scrollBy({
      top: liCoordinates.height * 2,
      behavior: 'smooth',
    });
    
    if (page * per_page > data.totalHits) {
      throw new Error('We\'re sorry, but you\'ve reached the end of search results.');
    }
  } catch (error) {
    helpers.hideLoadMoreBtn();
      iziToast.info({
        title: '',
        message: error.message,
        position: 'topRight',
      });
  } finally {
    helpers.hideLoader();
  }
}

async function serviceImages(query) {
    const API_KEY = '14812482-32fb1dc9e3056dda489954fb4';
    const BASE_URL = 'https://pixabay.com/api/';

    const response = await axios(BASE_URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: "photo",
            orientation: 'horizontal',
            safesearch: true,
            per_page,
            page,
        }
    });
    return response.data;
};

function createMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
          <li class="gallery-item">
        <div class="img-wrapper">
          <a class="gallery-link" href="${largeImageURL}">
            <img
            class="gallery-img"
            src="${webformatURL}"
            alt="${tags}"
            width="360"
            height="200"
          />
          </a>
        </div>
        <div class="info-wrapper">
          <div class="info-block">
            <h3 class="info-caption">Likes</h3>
            <p class="info-text">${likes}</p>
          </div>
          <div class="info-block">
            <h3 class="info-caption">Views</h3>
            <p class="info-text">${views}</p>
          </div>
          <div class="info-block">
            <h3 class="info-caption">Comments</h3>
            <p class="info-text">${comments}</p>
          </div>
          <div class="info-block">
            <h3 class="info-caption">Downloads</h3>
            <p class="info-text">${downloads}</p>
          </div>
        </div>
      </li>`).join('');
};