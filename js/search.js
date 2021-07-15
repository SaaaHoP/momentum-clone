const searchBox = document.querySelector('.search-box');
const searchIcon = document.querySelector('.search-icon');
const searchInput = document.querySelector('.search-input');
const searchEngine = document.querySelector('.search-engine');
const searchHiddenBox = document.querySelector('.search-hidden-box');
const google = document.querySelector('.google');
const naver = document.querySelector('.naver');
let isGoogle = true;

searchBox.addEventListener('mouseover', () => {
  searchHiddenBox.classList.add('search-reveal');
  searchInput.style.borderBottom = '2px solid rgba(255, 255, 255, 0.7)';
});

searchInput.addEventListener('click', () => {
  searchInput.style.borderBottom = '2px solid white';
});

searchBox.addEventListener('mouseout', () => {
  searchHiddenBox.classList.remove('search-reveal');
});

google.addEventListener('click', () => {
  google.classList.add('hidden');
  naver.classList.remove('hidden');
  isGoogle = false;
  console.log('clicked');
});

naver.addEventListener('click', () => {
  naver.classList.add('hidden');
  google.classList.remove('hidden');
  isGoogle = true;
});

searchBox.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchText = searchInput.value;
  const searchGoogle = `https://www.google.com/search?q=${searchText}`;
  const searchNaver = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${searchText}`;
  searchInput.value = '';
  if (isGoogle) {
    window.open(searchGoogle, '_blank');
  } else {
    window.open(searchNaver, '_blank');
  }
});

// if (clicked === true) {
//   searchBox.addEventListener('mouseout', () => {
//     searchHiddenBox.classList.add('search-reveal');
//   });
// } else {
//   searchBox.addEventListener('mouseout', () => {
//     searchHiddenBox.classList.remove('search-reveal');
//   });
// }
