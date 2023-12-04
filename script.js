'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  //   and not a button and on the link
  // when we have this # here as the hyperlink.
  // So as HRF, then that will make the page jump to the top.
  // So that's the default behavior.
  // When we click a link that has this hyperlink here.
  // And so if that is the default,
  // we already know a way of preventing debt default
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// And now the second part that I want to quickly fix
// is getting rid of this old school
// for a loop that we have here,

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// because now we know of a better way of doing this,
// which is the, for each loop.

// So we have this buttons open modal, which is a node list.
// And it's a node list
// because it's the result of querySelectorAll, all right.
// Now remember that a note list is not an array,
// but still it does have default for each method.
// So it doesn't have most of the methods that erase have,
// but for each is one of the methods
// that in node list has as well.

// which is by simply providing a callback function here,
// two for each.
// So each one will be a button.
// And then on that button,
// we will simply add an event listener.
// And so that's simply this part.
// And so now, this is exactly the same as this,
// but in a lot easier way.
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////////////
// How the DOM Really Works
/////////////////////////////////////////////////////////////////////////

// Let's start this section by learning
// how the DOM really works behind the scenes
// and more specifically how the DOM is organized internally.
// This will make it easier to understand everything else
// that's gonna follow in this section.

// see pdf lecture
