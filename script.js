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

fillBookmarksList(bookmarks);

function createBookrmark(e) {
  e.preventDefault();

  // add a new bookmark to the bookmarks
  const title = bookmarkInput.value;
  const bookmark = {
    title: title
  };
  bookmarks.push(bookmark);
  fillBookmarksList(bookmarks);
  storeBookmarks(bookmarks);
  bookmarkForm.reset();

  console.table(bookmarks);
  // const bookmark       = document.createElement('a');
  // bookmark.className   = 'bookmark';
  // bookmark.textContent = title;
  // bookmark.href        = '#';
  // bookmark.target      = '_blank';
  // console.log(bookmark);
  // bookmarksList.appendChild(bookmark);
}

function fillBookmarksList(bookmarks = []) {
  const bookmarksHtml = bookmarks.map((bookmark, i) => {
    return `
      <a href="#" class="bookmark" data-id="${i}">
        <div class="img"></div>
        <div class="title">${bookmark.title}</div>
        <svg class="octicon octicon-x" viewBox="0 0 12 16" version="1.1" width="48" aria-hidden="true">
          <path fill-rule="evenodd" fill="currentColor" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
        </svg>
      </a>
    `
  }).join('');

  bookmarksList.innerHTML = bookmarksHtml;
  // let bookmarksHtml =  '';
  // for (let i = 0; i < bookmarks.length; i++) {
  //   bookmarksHtml += `
  //     <a href="#" class="bookmark">
  //       ${bookmarks[i].title}
  //     </a>
  //   `;
  // }
  // console.log(bookmarksHtml);
}

function removeBookmark(e) {
  if (!e.target.matches('.octicon-x')) return;

  // find the index
  // remove from te bookmarks using splice
  // fill the list
  // store back to localStorage
  const index = e.target.parentNode.dataset.id;
  bookmarks.splice(index,1);
  fillBookmarksList(bookmarks);
  storeBookmarks(bookmarks);
}

function storeBookmarks(bookmarks = []) {
  // save the bookmarks to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

bookmarkForm.addEventListener('submit', createBookrmark);
bookmarksList.addEventListener('click', removeBookmark);
