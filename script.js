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
