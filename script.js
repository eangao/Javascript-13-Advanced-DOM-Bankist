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

////////////////////////////////////////////////////////////////////
// Selecting, Creating, and Deleting Elements
////////////////////////////////////////////////////////////////////
// // In this lecture we're gonna learn
// // how to select, create and delete elements with JavaScript.
// // Now, the goal of this lecture is more to be
// // like a quick reference for you in the future
// // because these methods that I'm gonna show you here
// // are actually way more difficult to find
// // and to understand from the MDN documentation.
// // And so when you need some of these methods in the future
// // then all you have to do is to come back
// // to this lecture and see how it works.

// // So for example if we want to apply CSS styles
// // to the entire page we always need
// // to select document element,
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// // So for these special elements
// // we don't even need to write any selector
// // but otherwise as you already know,
// // we can use query selector.
// const header = document.querySelector('.header');

// // Now, if we want to select multiple elements
// // then we should use document.queryselectorAll.
// const allSections = document.querySelectorAll('.section');

// // But as you know already, this will return a node list
// // and then that will contain all of the elements
// // that are a section so that are selected by this selector.
// // So these ones we have been using all the time.

// // And in fact they are the most used ways
// // of selecting elements.
// // Now, as you learned hopefully from the previous lecture
// // these are available not only on the document here
// // like this, but also on all the elements, okay?
// console.log(allSections);

// // Next I think we also already talked
// // about get element by ID.
// // And so here we only pass the ID name itself
// // without the selector.
// // So this section here has ID section one
// // and so, yeah, we don't need the selector here.
// // #section--1'
// document.getElementById('section--1');

// // And so let's say we want to get all the buttons.
// // So all the elements with the name of button basically.
// const allButtons = document.getElementsByTagName('button');

// // And so here now you see all the buttons
// // that are on our page.
// // Now, what I wanted to show you is
// // that this method actually returns an HTML collection.
// // So that's different from a node list
// // because an HTML collection is actually
// // a so-called life collection.
// // And that means that if the DOM changes then this collection
// // is also immediately updated automatically.

// // And sometimes it's actually quite helpful
// // to have an HTML collection like this
// // which updates automatically
// // because of course we can also delete elements
// // from the DOM programmatically not just manually

// // like I just deleted this button here earlier, all right.
// // Now the same does not happen with a node list.
// // So if I take this whole section here and delete it
// // and if I then try to read all the sections
// // then I still have the same four elements here
// // in the node list.
// // And that's because this variable here was created
// // by the time that this section still existed.
// // And it didn't update itself
// // as I deleted one of its elements, all right?
// console.log(allButtons);

// // So this one and this one in case that you really need
// // an HTML collection which in some situations is useful
// // but most of the time, I simply keep using query selector
// // and query selector all,
// console.log(document.getElementsByClassName('btn'));

// // creating and inserting elements
// // .insertAdjacentHTML

// // So we used insert adjacent HTML to create movements, right?
// // And this is a quick and easy way of creating elements
// // that I really like a lot and use the most actually.

// // instead focus
// // on some other ways of creating elements
// // because sometimes it's more useful
// // to actually build the element a bit more
// // from scratch, like more programmatically using
// // a combination of some other methods.
// // So let's see how and then it will all make sense, okay?

// const message = document.createElement('div');

// // So again, this here creates a DOM element
// // and then stores that element into the message.
// // Now that element is not yet anywhere in our DOM.

// // All this is is a DOM object that we can now use
// // to do something on it but it is not yet in the DOM itself.
// // So it's nowhere to be found on our webpage here, okay?

// // If we want it on the page then we need
// // to manually insert it into the page.
// // But first let's actually do something with it.

// // It's just an object that represents a DOM element.
// message.classList.add('cookie-message');
// // message.textContent =
// //   'We use cookied for improved functionality and analytics.';

// //   but of course we can also insert a HTML.
// // And so that is then inner HTML
// // which we also already used before.
// // And remember that we can use both of these properties
// message.innerHTML =
//   'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// //   So prepending basically adds the element
// // as the first child of this element

// // header.prepend(message);

// // But we can also edit as the last child.
// // And so that is a append.

// header.append(message);

// // Now what we see here is that the element
// // was actually only insert at once,
// // now that's because this element here
// // so message is now indeed a life element living in the DOM.

// // And so therefore it cannot be
// // at multiple places at the same time.
// // It's just like a person that also cannot be
// // at two places simultaneously, right?

// // So what's happened here is that we first prepended
// // the element and then we appended it.
// // And what this appends did here
// // was to basically move the element
// // from being the first child to being the last child.
// // All right, so basically it moved the element
// // and didn't really insert it
// // because it was already inserted here by prepend
// // So what this means is that we can use
// // the prepend and append methods not only to insert elements
// // but also to move them.
// // And again, that is because a DOM element is unique.
// // So it can always only exist at one place at a time.

// ///=====
// // But now what if we actually wanted
// // to insert multiple copies of the same element?
// // Well, in that case we actually would have
// // to first copy the first element.

// // header.append(message.cloneNode(true));

// // header.before(message);
// // header.after(message);

// //delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     //     And again here, we don't have to select
//     // the message element again
//     // because we already have it in memory.
//     // So we already have it stored in a variable.
//     // So there's no need to run a document or query selector.
//     // Of course we could do it and it would work as well.
//     message.remove();

//     // now this remove method here is actually very recent.

//     // Before this method existed all we could do
//     // was to remove child elements.
//     // And so back then we had to select the parent element first
//     // and then remove the child from there.
//     // So that would look like this.
//     // So message and then we would move up in a DOM tree,
//     // remove child and then again the name of the element
//     // that we want to remove.
//     // So this is a bit cumbersome
//     // but again, this is how we used to do it.
//     message.parentElement.removeChild(message);

//     // And I'm sure you will see this in some code basis
//     // because many people also don't yet know
//     // about this newer way of doing things.
//   });

// // And by the way, this way of moving up and down
// // in the DOM tree like selecting, the parent element
// // is called DOM traversing.
// // And there a whole lecture on that a bit later

// // So this is how we select, create, insert and delete elements
// // and to make this 100% complete, just make sure
// // that you review the insert adjacent HTML method as well
// // that we used before in the Bankist application.

////////////////////////////////////////////////////////////////////
// Styles, Attributes and Classes
////////////////////////////////////////////////////////////////////
// Let's now start working on the Bankist website,
// and we're gonna start by implementing smooth scrolling.
// And the functionality that we're going to implement now
// is when we click on this button,
// then it will smoothly scroll to this first section.

// So we're gonna see two ways of doing this.

// First one a bit more old school,
// which will allow me to show you a couple of interesting

// stuff, and then finally,
// I will show you the more modern way,
// which only works in super modern browsers.

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  //   So this BoundingClientRect is basically relative
  // to this visible view port,
  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   // However, what happens when I click again?
  //   // So now it doesn't really work, does it?
  //   // Well that's because this top here that we specified
  //   // is always relative to the view port,
  //   // but not to the document.
  //   // So not to the top of the page basically,
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  // //   but the solution to this problem is to simply add
  // // the current scroll position to the top value.

  //   all right, now we can even make this better.
  // So dot scrollTo again,
  // because there is a way of making this animation
  // nice and smooth.
  // And this works by passing in an object now,
  // instead of just one argument.

  //   smooth, all right?
  // So to implement smooth scrolling like this,
  // we need to specify an object with the left top
  // and behavior properties.

  //old way of smooth scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // modern way smooth scrolling
  //   But there is a more modern way
  // and it works like this.
  section1.scrollIntoView({ behavior: 'smooth' });
});

// And by the way,
// these client height and width here are not counting
// with the scroll bars.
// It's dusty dimensions of the view port,
// that are actually available for the content.
// And of course that excludes any scroll bars.
