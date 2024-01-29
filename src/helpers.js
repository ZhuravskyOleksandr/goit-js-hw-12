const loadMoreBtn = document.querySelector('#load-more');
const loader = document.querySelector('#loader');

function showLoadMoreBtn() {
  return loadMoreBtn.classList.replace('hidden', 'load-more');
}

function hideLoadMoreBtn() {
  return loadMoreBtn.classList.replace('load-more', 'hidden');
}

function showLoader() {
    return loader.classList.add('loader');
}

function hideLoader() {
    return loader.classList.remove('loader');
}

export { loadMoreBtn, showLoadMoreBtn, hideLoadMoreBtn, showLoader, hideLoader };