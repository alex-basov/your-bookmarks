const body = document.body;
const input = document.querySelector('input[type=text]');
const overlay = document.querySelector('.overlay');

input.addEventListener('focusin', showFloater);
input.addEventListener('focusout', closeFloater);
overlay.addEventListener('click', closeFloater);

function showFloater() {
  body.classList.add('show-floater');
}

function closeFloater() {
  if (body.classList.contains('show-floater')) {
    body.classList.remove('show-floater');
  }
}

// =======================
localStorage.setItem('my_thing', 'something');

const bookmarksList = document.querySelector('.bookmarks-list');
const bookmarkForm = document.querySelector('.bookmark-form');
const bookmarkInput = document.querySelector('input[type=text]');
const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
const apiUrl = 'https://opengraph.io/api/1.1/site/';
const appId = '7ae3c4c0-6b2a-4505-bc14-cd94b639f884';

const myUrl = encodeURIComponent('https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data');

fillBookmarksList(bookmarks);

function createBookrmark(e) {
  e.preventDefault();

  if (!bookmarkInput.value) {
    alert('enter you link, please');
    return;
  }

  const url = encodeURIComponent(bookmarkInput.value);

  fetch(apiUrl + url + '?app_id=' + appId)
    .then(response => response.json())
    .then(data => {
      const bookmark = {
        title: data.hybridGraph.title,
        image: data.hybridGraph.image,
        link: data.hybridGraph.url
      };

      bookmarks.push(bookmark);
      fillBookmarksList(bookmarks);
      storeBookmarks(bookmarks);
      bookmarkForm.reset();
    })
    .catch(error => {
      alert('There was a problem getting info');
    })
}

function fillBookmarksList(bookmarks = []) {
  bookmarksList.innerHTML = bookmarks.map((bookmark, i) => {
    return `
      <a href="${bookmark.link}" class="bookmark" data-id="${i}"  target=”_blank”>
        <div class="img" style="background-image: url('${bookmark.image}')"></div>
        <div class="title">${bookmark.title}</div>
        <svg class="octicon octicon-x" aria-hidden="true">
          <path fill-rule="evenodd" fill="currentColor" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
        </svg>
      </a>
    `
  }).join('');
}

function removeBookmark(e) {
  if (!e.target.matches('.octicon-x')) return;

  // find the index
  // remove from te bookmarks using splice
  // fill the list
  // store back to localStorage
  const index = e.target.parentNode.dataset.id;
  bookmarks.splice(index, 1);
  fillBookmarksList(bookmarks);
  storeBookmarks(bookmarks);
}

function storeBookmarks(bookmarks = []) {
  // save the bookmarks to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

bookmarkForm.addEventListener('submit', createBookrmark);
bookmarksList.addEventListener('click', removeBookmark);
