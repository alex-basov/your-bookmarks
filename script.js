const body    = document.body;
const input   = document.querySelector('input[type=text]');
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

const bookmarksList  = document.querySelector('.bookmarks-list');
const bookmarkForm  = document.querySelector('.bookmark-form');
const bookmarkInput = document.querySelector('input[type=text]');
const bookmarks     = JSON.parse(localStorage.getItem('bookmarks')) || [];

fillBookmarksList(bookmarks);

function createBookrmark (e) {
  e.preventDefault();

  // add a new bookmark to the bookmarks
  const title          = bookmarkInput.value;
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
  const bookmarksHtml = bookmarks.map((bookmark) => {
    return `
      <a href="#" class="bookmark">
        ${bookmark.title}
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

function storeBookmarks(bookmarks = []) {
  // save the bookmarks to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

bookmarkForm.addEventListener('submit', createBookrmark);
