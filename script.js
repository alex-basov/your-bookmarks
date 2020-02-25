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

const bookmarkList = document.querySelector('.bookmarks-list');
const bookmarkForm = document.querySelector('.bookmark-form');
const bookmarkInput = document.querySelector('input[type=text]');

bookmarkForm.addEventListener('submit', createBookrmark);

function createBookrmark (e) {
  e.preventDefault();

  const title = bookmarkInput.value;
  const bookmark = document.createElement('a');
  bookmark.className = 'bookmark';
  bookmark.textContent = title;
  bookmark.href = '#';
  bookmark.target = '_blank';
  console.log(bookmark);

  bookmarkList.appendChild(bookmark);
  bookmarkForm.reset();
}
