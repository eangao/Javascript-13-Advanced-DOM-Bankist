'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

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

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  //old way of smooth scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // modern way smooth scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////////////////////////////////////////
// Page navigation

// // So this will return a node list,
// // and now we can use it for each method
// // in order to attach an event handler to each of the elements
// // that are in the node list.
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     //     And so as we click here then,
//     // it will automatically move to exactly that section.
//     // And we can see it here also in the URL bar, right?
//     // So we basically need to prevent that from happening.
//     // Let me just put this back here,
//     // because in our last lecture we deleted this section one
//     // that was here.
//     // And so, as I was saying,
//     // we need to prevent these default behavior.
//     e.preventDefault();
//     // console.log('LINK');

//     // scrolling
//     const id = this.getAttribute('href');

//     //     And so we can now take this, and select an element,
//     // based on this, and then simply scroll to that element.
//     // So for that,
//     // we're gonna use the scrollIntoView method here again.
//     console.log(id);

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Now, as you see, this actually works just fine,
// but the problem is that it's not really efficient.
// So we are adding here the exact same callback function,
// so this event handler here,
// we are adding it once to each of these three elements.
// So the exact same function is now attached
// to these three elements.
// And that's kind of unnecessary.
// I mean, of course it would be fine for only three elements,
// but what if we had 1000, or like 10,000 elements?
// If we were to attach an event handler
// to 10,000 elements like this,
// so like we did here with the forEach function,
// then we would effectively be creating 10,000 copies
// of this same function here.
// And so that would then certainly impact the performance.
// And it's really just not a clean solution in that case.

// And so, the better solution without a doubt,
// is to use events delegation.
// So in event delegation,
// we use the fact that events bubble up.
// And we do that by putting the eventListener
// on a common parent of all the elements
// that we are interested in.
// And so in our example,
// it's this container that's around all of these links,
// and that we saw in the previous video.
// So remember, that is this element here.
// So we will put our event handler on this element here,
// and then when a user clicks one of the links,
// the event is generated, and bubbles up,
// just as we saw in the last video.
// And then we can basically catch that event
// in this common parent element, and handle it there.
// Because we also know where the event actually originated.

//======
// Event deligation

// All right, so in event delegation,
// we basically need two steps.

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

// and so remember the common element of all these links,
// is nav__links.
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //   and now we just need to figure out
  // where the event actually happened.
  // And remember that, that is stored in event.target,
  console.log(e.target);

  //   but the click that happens here on this nav__links element,
  // is not relevant at all.

  //Matching strategy

  // And so now we need a matching strategy here
  // in order to match only the elements
  // that we are actually interested in now,
  // And in this case, the best way to do that,
  // is to simply check if the target has this nav__link class.
  if (e.target.classList.contains('nav__link')) {
    // console.log('LINK');

    // scrolling
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }

  //   and yeah, we successfully implemented event delegation,
  // which is a lot better, and a lot more efficient
  // than simply attaching the same event handler
  // to multiple elements.
  // Instead, we simply edit one big event handler function
  // to the parent element of all the elements
  // that we're interested in,
  // and then we simply determined
  // where the click event came from.

  // And then we also needed this matching strategy
  // because we wanted to basically ignore clicks
  // that did not happen right on one of these links.

  // And coming up with this matching strategy,
  // as I like to call it,
  // is probably the hardest part
  // of implementing event delegation.

  // But don't worry because there will be plenty of examples
  // throughout the rest of the course.

  // And so, at some point,
  // it will all make a lot of sense to you.
  // So I hope that you're convinced that event delegation
  // is a much better strategy,
  // even though it requires a little bit more work
  // than the first implementation that we did.

  // And in fact,
  // there is actually an even more important use case
  // of event delegation,
  // which is when we are working with elements
  // that are not yet on the page on runtime.
  // So by the time the page loads.

  // And a great example are buttons
  // that are added dynamically while using the application.

  // So it's not possible to add event handlers
  // on two elements that do not exist,

  // but we will still be able to handle events
  // on elements that don't exist at the beginning
  // by using event delegation one more time.
  // And we will actually do this later in this section.
});

////////////////////////////////////////////////////////
// Tabbed component

// doing this here is a bad practice
// because what if we had like 200 tabs?
// Then we would have 200 copies
// of this exact callback function here
// and that would simply slow down the page.
// So that's not at all desirable.
// And so let's get rid of this
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

// and one more time, use events delegation.
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  //   So that was the reason why we needed
  // the closest method here in this tabs
  // because we had this button,
  // but then we could also click on the span element.
  // And so here we then needed to find the closest element.
  // So the closest button to both of these places,

  // Guard clause
  if (!clicked) return;
  //   So this is a more modern way of writing this.
  // So we could have written instead also,
  // if there is a clicked on element, then do this.
  // And this is the more traditional way
  // if (clicked) {
  //   clicked.classList.add('operations__tab--active');
  // }

  //   Of course, we still get to the null here
  // but no error occurs
  // because null JavaScript is no longer trying to execute
  // this line of code here,

  // remove active class
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  //   So basically clearing the class on all of them
  // and then only add it afterwards on one of them.

  //Activate tab
  clicked.classList.add('operations__tab--active');

  // remove active class
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate content area
  // console.log(clicked.dataset.tab);
  document
    //   and then .data set.tab.
    // So that's only the part after the data.
    // Remember, so it's just tab.
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////
// Menu fade animation

// const handleHover = function (e, opacity) {

const handleHover = function (e) {
  //   because bind, remember, returns a new function.
  // Now in this function,
  // this variable will now be set to this value.

  //   Now, remember that usually,
  // this keyword is equal to current target.

  //   So by default, this keyword is the same
  // as the current target,
  // so the element on which the event listener is attached to,
  // but when we then set this keyword manually,
  // of course, it becomes whatever we set it to.
  // console.log(this, e.currentTarget);

  //   So, you see that this time around,
  // I'm not using the closest methods.
  // And that's because there are simply no child elements
  // that we could accidentally click here
  // in this link, right?
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    //     And so now we would have to move up manually,
    // not just once, but twice.
    // And so instead of doing that,
    // we will again use the closest method, okay?
    // So again, instead of moving up manually,
    // like one or two steps, we can simply search for a parent
    // which matches a certain query.

    //     Even though that's not the closest parent,
    // I mean, there is another parent to these links,
    // which is this one here.
    // But it's no problem of also choosing
    // an even higher up parent like we are doing here.
    // So we are now at a parent of all of the links,

    //     and so now from there,
    // we can search for the nav_links again.
    // And so these are then going to be the siblings
    // of our initial links.
    // And so, as we already learned before,
    // we can use query selector on an element to search
    // for a certain query only in that element.
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    //     And now, let's actually also select the logo,
    // and we could select it manuall also,
    // by its class name, but let's just suppose
    // that there are many navigations on this page.
    // And so, again, to make the solution really robust,
    // it's best to simply move up to the closest parent,
    // in this case, the navigation.,
    // and then from there, we simply search for an image.
    const logo = link.closest('.nav').querySelector('img');

    // now we just need to change the opacity,
    siblings.forEach(el => {
      //       and now we actually need to do
      // that comparison that we did before.
      // So checking if the current element is not the link itself.
      // Because of course, this sibling here
      // so these siblings, they will contain
      // or initial link as well.
      // So it needs to be different from link.

      // But then for all the others that are not the original link,
      // we want to change the opacity to 0.5.
      // And indeed, we want to do the same with the logo.
      // if (el !== link) el.style.opacity = opacity;

      if (el !== link) el.style.opacity = this;
    });

    // logo.style.opacity = opacity;
    logo.style.opacity = this;
  }
};

// But now, of course, we do not want to attach
// an event listener to each of these links.
// So we already know that we should do
// event delegation here instead.

// So let's find the common parent element
// of all of the links,
// and also, including the logo there.
// So if we were only working with the links,
// it would be this element,
// but we also want to work with the logo here.
// And so let's actually use this entire navigation here
// as our parent container on which we will handle the event
// that is gonna bubble up from the links.
// So keep in mind that all of this works
// because events bubble up from their target.

//nav transfer to the upper of the page

// the mouse enter event,
// and mouseover is actually similar to mouseenter,
// with the big difference that mouseenter
// does not bubble, okay?
// But here, we need the event to actually bubble
// so that it can even reach the navigation element.

// and there are also kind of opposite events
// of mouseover and mouseenter.
// And we use these to basically undo
// what we do on the hover.
// So the opposite of mouseenter is mouseleave,
// and the opposite of this mouseover is mouseout.
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// all we do here is to pass in that function
// and then it's going to work just like this, right?
// So we have done this many times
// throughout this course, right?
// But now, the problem is that we actually want
// to pass in values into this function, right?
// So we need to tell this function to use
// the opacity of 0.5 in this case,
// and have one in this case.
// Now, right?
// Also, we need a way of passing this event.
// So right now, none of this would work.
// So let me show that to you.
// So I'm not clicking, of course,
// but you see, it would not really work, okay?
// So, maybe you would think that we could do this.
// So like, maybe passing an event here,
// and then 0.5, which is the opacity that we want.
// But this, of course, is not going to work.
// So the first problem is that e is of course, not defined.
// But the main problem really here
// is that addEventListener here expects a function.
// So we need to pass a function.
// But if we call the function,
// then all of this here will become some other value.
// In this case, that's undefined,
// because we don't return anything
// from this function, all right?
// And so this is simply not gonna work.
// So we talked about this many times,
// but it's always good to remember
// that JavaScript indeed expects here a function,
// and not just some other regular value
// which would be the result of calling the function like this.
////======
// nav.addEventListener('mouseover', handleHover(e, 1));

// And so as I just said, we can do even better,
// and that is by using the bind method
// that we already studied before.
// So, remember that the bind method
// creates a copy of the function that it's called on,
// and it will set the disc keyword in this function call
// to whatever value that we pass into bind,

// So handleHover.bind and then one.
// And so this is gonna work
// because this is gonna be also a function,
// because bind, remember, returns a new function.

// Passing "argument" into handler

// Passing an argument into a handler.
// And I'm using quotes here, because of course,
// this is not really an argument.
// So in fact, we don't even need this here.
// And in fact, it is impossible to pass another argument
// into an eventHandler function.
// So any handler function like this one
// can only ever have one real argument.
// And so, in this case, can only ever have one real parameter,
// and that is the event.
// But if we want to pass additional values
// into the handler function,
// then we need to use the disk keywords,
// like we just did here.
// And if we wanted multiple values,
// then we could of course, pass in here
// like an array or an object instead of just one value.
// So this is kind of a workaround into the fact
// that the handler function can only take one argument.
// So, it's really nice effect and as I said in the beginning,
// it also taught us how we can pass arguments,
// essentially, into handler functions.
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

////////////////////////////////////////////
// A Better Way: The Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries; //same as entries[0]
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,

  // Indeed, now the navigation appeared exactly 90 pixels
  // before the threshold was actually reached.
  // rootMargin: '-90px', //rem and percent does not work

  rootMargin: `-${navHeight}px`, //to make height dynamic
});

headerObserver.observe(header);

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
// // Let's now start working on the Bankist website,
// // and we're gonna start by implementing smooth scrolling.
// // And the functionality that we're going to implement now
// // is when we click on this button,
// // then it will smoothly scroll to this first section.

// // So we're gonna see two ways of doing this.

// // First one a bit more old school,
// // which will allow me to show you a couple of interesting

// // stuff, and then finally,
// // I will show you the more modern way,
// // which only works in super modern browsers.

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   //   So this BoundingClientRect is basically relative
//   // to this visible view port,
//   console.log(e.target.getBoundingClientRect());

//   console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

//   console.log(
//     'height/width viewport',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   // Scrolling
//   // window.scrollTo(
//   //   // However, what happens when I click again?
//   //   // So now it doesn't really work, does it?
//   //   // Well that's because this top here that we specified
//   //   // is always relative to the view port,
//   //   // but not to the document.
//   //   // So not to the top of the page basically,
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // );
//   // //   but the solution to this problem is to simply add
//   // // the current scroll position to the top value.

//   //   all right, now we can even make this better.
//   // So dot scrollTo again,
//   // because there is a way of making this animation
//   // nice and smooth.
//   // And this works by passing in an object now,
//   // instead of just one argument.

//   //   smooth, all right?
//   // So to implement smooth scrolling like this,
//   // we need to specify an object with the left top
//   // and behavior properties.

//   //old way of smooth scrolling
//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   // modern way smooth scrolling
//   //   But there is a more modern way
//   // and it works like this.
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// // And by the way,
// // these client height and width here are not counting
// // with the scroll bars.
// // It's dusty dimensions of the view port,
// // that are actually available for the content.
// // And of course that excludes any scroll bars.

//////////////////////////////////////////////////////////////
// Types of Events and Event Handlers
//////////////////////////////////////////////////////////////

// // In this lecture and the next ones,
// // we're gonna talk a little bit more about events.
// // Now, we already worked with events before, of course,
// // but now let's add some more important concepts
// // and also make things a bit more clear.
// // So, an event is basically a signal
// // that is generated by a certain dumb node
// // and a signal means that something has happened,
// // for example, a click somewhere or the mouse moving,
// // or the user triggering the full screen mode
// // and really anything of importance,
// // that happens on our webpage, generates an event.

// // that event will always happen when a user clicks.
// // So, it doesn't matter if we're actually
// // listening for it or not.
// const h1 = document.querySelector('h1');

// // o, the mouseenter event here,
// // is a little bit like the hover event in CSS.
// // So, it fires whenever a mouse enters a certain element.
// // h1.addEventListener('mouseenter', function (e) {
// //   alert('addEventListener: Great! You are reading the heading :D');
// // });

// // mdn event reference
// // https://developer.mozilla.org/en-US/docs/Web/Events

// // but anyway, let me now show you another way
// // of attaching an EventListener to an element.
// // And that is by using the so-called on-event property
// // directly on the element.
// // So for example, when we want to listen for mouseenter,
// // there is a property called onmouseenter,
// // h1.onmouseenter = function (e) {
// //   alert('addEventListener: Great! You are reading the heading :D');
// // };

// // However, this way of listening to events
// // is a bit old school.
// // So, it used to be done like this in the old days,

// // but now we usually always use addEventListener.
// // So, I'm just showing you this in case you ever come across
// // this way of listening for events.

// // Now, there are two ways why addEventListener is better.
// // And the first one is that it allows us to add
// // multiple event listeners to the same event.

// // And the second one even more important
// // is that we can actually remove an event handler
// // in case we don't need it anymore.
// // And this is something that we hadn't done before,
// // but it's actually very simple
// // and very useful from time to time.

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');

//   //   So, after we listened for an event
//   // and then handle that event here in dysfunction,
//   // we can then remove that event listener.

//   // but of course this doesn't have to be in here.
//   // h1.removeEventListener('mouseenter', alertH1);
// };
// h1.addEventListener('mouseenter', alertH1);

// // So you can remove the EventListener
// // at any place in our code.

// // For example, we could remove it
// // after a certain time has passed.
// // So, let's use set time out here
// // and a simple arrow function.
// // And let's say, that after three seconds have passed,
// // we want to remove the EventListener.

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// // Finally, there's also a third way of handling events,
// // which is by using an HTML attribute.

// // Now this one should actually not be used,
// // but just for the sake of curiosity
// // I'm gonna show it to you here.

// // So, let's actually this time use the onclick,
// // just to, we have a different one.
// // But so, this is quite similar to what we did here before
// // in the JavaScript with the onmouseenter.
// // We're simply defining it directly in HTML.
// // Then here, we basically specify a string
// // and then we say what we want to happen.
// // So, this is pretty weird, but well,
// // this is kind of old school JavaScript
// // from the early days, alert.
// // And so, now when we click here,
// // then we get HTML alert.
// // But anyway, we don't need to bother with this one,
// // but I'm just gonna leave it here for you as a reference.

// // <h1 onClick="alert('HTML alert')">

////////////////////////////////////////////////////////////
// Event Propagation: Bubbling and Capturing
////////////////////////////////////////////////////////////

// JavaScript events have a very important property.
// They have a so-called capturing phase and a bubbling phase.
// So what does that mean?

// see PDF lecture

// Well, let's find out.
// So here we have a very simple HTML document
// along with a dumb tree,
// but only for the anchor element
// that's represented in red here.
// So here we can see exactly all the parent elements
// of that red anchor element.

// And that's because we're gonna simulate what exactly happens
// with an event when someone clicks on that link.
// So maybe pause the video for a minute,
// and analyze this structure here.

// But anyway, let's now say that a click happens on the link.
// And as we already know,
// the dumb then generates a click event right away.
// However, this event is actually not generated
// at the target element.

// So at the element, where the event happened,
// in this case, the click on the anchor element.
// Instead, the event is actually generated
// at the root of the document,
// so at the very top of the dumb tree.

// And from there, the so-called capturing phase happens,
// where the event then travels all the way down
// from the document route to the target element.
// And as the event travels down the tree,
// it will pass through every single parent element
// of the target element.

// So in our example, here, the HTML element,
// the body element, the section, then the paragraph,
// until it finally reaches its target.

// As soon as the event reaches the target,
// the target phase begins,
// where events can be handled right at the target.

// And as we already know,
// we do that with event listeners, such as this one.

// So event listeners wait for a certain event
// to happen on a certain element,
// and as soon as the event occurs,
// it runs the attached callback function.

// In this example,
// it will simply create this alert window, all right?
// And again, this happens in the target phase.

// All right, now, after reaching the target,
// the event then actually travels
// all the way up to the document route again,
// in the so-called bubbling phase.

// So we say that events bubble up
// from the target to the document route.

// And just like in the capturing phase,
// the event passes through all its parent elements,
// and really just the parents,
// so not through any sibling elements.

// So as an event travels down and up the tree,
// they pass through all the parent elements,
// but not through any sibling element.

// But now you might be wondering why is this so important?
// Why are we learning about all this detail?
// Well, it is indeed very important because basically,

// it's as if the event also happened
// in each of the parent elements.
// So again, as the event bubbles through a parent element,
// it's as if the event had happened
// right in that very element.

// What this means is that if we attach
// the same event listener, also for example,
// to the section element, then we would get
// the exact same alert window for the section element as well.

// So we would have handled the exact same event twice,
// once at its target, and once at one of its parent elements.

// And this behavior will allow us
// to implement really powerful patterns,
// as we will see throughout the rest of the section.

// So this really is very, very important to understand.
// Now by default, events can only be handled in the target,
// and in the bubbling phase.

// However, we can set up event listeners in a way
// that they listen to events in the capturing phase instead.

// Also, actually not all types of events
// that do have a capturing and bubbling phase.

// Some of them are created right on the target element,
// and so we can only handle them there.

// But really, most of the events do capture and bubble
// such as I described it here in this lecture.

// We can also say that events propagate,
// which is really what capturing and bubbling is.

// It's events propagating from one place to another.

///////////////////////////////////////////////////////////////
// Event Propagation in Practice
///////////////////////////////////////////////////////////////

// // rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   // console.log('LINK');

//   //   So we can say this,
//   // and remember that in an event handler
//   // that this keyword, points always to the element
//   // on which that event handler is attached.
//   // document.querySelector('.nav__link')  this link
//   this.style.backgroundColor = randomColor();

//   //   And the target is essentially where the event originated.
//   // So where the event first happened.
//   // So this is not the element on which the handler
//   // is actually attached, okay?
//   // So again, this is where the event happened.
//   // So in this case where the click happened,
//   // and it is not the element
//   // on which the event handler was attached.
//   console.log('LINK', e.target, e.currentTarget);

//   //   And so you might have noticed
//   // that the currentTarget
//   // is exactly the same as the this keyword.
//   // So, the this keyword
//   // is also the one pointing to the element
//   // on which the EventListener is attached to.
//   console.log(e.currentTarget === this);

//   //stop propagation
//   // e.stopPropagation();

//   //   Now in practice, that's usually not a good idea
//   // to stop propagation,
//   // but I still showed it to you here
//   // in case you really need it sometime.
//   // So stopping the event propagation like this
//   // can sometimes fix problems in very complex applications
//   // with many handlers for the same events,

//   // but in general,
//   // it's not really a good idea
//   // to stop the propagation of events.
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   // console.log('LINK');

//   //   and again, keep in mind that this nav_links element
//   // is the parent of this link.
//   // So it's all of this block here.
//   // So when I click this link now here,
//   // what do you think is gonna happen
//   // to the nav_links element
//   // so to that whole container.
//   this.style.backgroundColor = randomColor();

//   //   why do you think this is happening?
//   // Well, just as we learned before the event actually happens
//   // at the document root and from there
//   // it then travels down to the target element.
//   // And so in this case, that is this link.
//   // And then from there, it bubbles up.
//   // And bubbling up means that basically it's as if the event
//   // had also happened in all of the parent elements.
//   // And so that is the reason why this exact event
//   // is now also being handled by this event listener here
//   // that is on nav_links,

//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// // document.querySelector('.nav').addEventListener('click', function (e) {
// //   // console.log('LINK');
// //   this.style.backgroundColor = randomColor();
// //   console.log('NAV', e.target, e.currentTarget);
// // });

// // So as we just saw, these three event handlers
// // that we set up here receive events
// // from the target elements
// // and also from the bubbling phase

// // Well, as we learned, events are captured
// // when they come down from the document route
// // all the way to the target,
// // but our event handlers are not picking up these events
// // during the capture phase.
// // Remember that?

// // So I mentioned that at event listener here,
// // it's only listening for events in the bubbling phase,
// // but not in the capturing phase.
// // So that is the default behavior
// // of the add event listener method,
// // and the reason for that is that the capturing phase
// // is usually irrelevant for us.

// // Now, on the other hand, the bubbling phase
// // can be very useful for something called event delegation.

// // However, if we really do want to catch events
// // during the capturing phase,
// // we can define a third parameter
// // in the addEventlistener function.
// // For example here,
// // we can set the third parameter to true or false.

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     // console.log('LINK');
//     this.style.backgroundColor = randomColor();

//     console.log('NAV', e.target, e.currentTarget);
//   },
//   true
// );

// // And so in this case where this used capture parameter
// // is set to true,
// // the event handler will no longer listen to bubbling events,
// // but instead, to capturing events.
// // Now, in practice, that's gonna look the same here,
// // but as we take a look here in our log,
// // you will see that now,
// // the NAV is actually the first appearing.

// // And the reason for that
// // is that this element is now actually listening
// // for the event as it travels down from the DOM,
// // while these other ones are listening for the event,
// // as it travels back up.
// // And so that happens later
// // and therefore, the NAV is now the first one to show up
// // because this, of course, is the first one to happen.
// // Because first event travels down all the way to the target
// // and only then, it bubbles back up.

// // So, as I said, capturing is actually rarely used these days.
// // And the only reason why both capturing
// // and bubbling actually exist,
// // is only for historical reasons.
// // So, from the time where different browsers
// // implemented different versions of JavaScript.

// // But anyway, what really matters
// // that you really understand here,
// // is that why these three boxes here
// // get three different background colors,
// // even though the click only happened on this element.
// // And I think I made that really clear in this video
// // and also in the last one.

////////////////////////////////////////////////////////////////////////
// Event Delegation: Implementing Page Navigation
////////////////////////////////////////////////////////////////////////

// Let's now use the power of event bubbling
// to implement something called event delegation.

//////////////////////////////////////////////////////////////////////////
// DOM Traversing
//////////////////////////////////////////////////////////////////////////
// // This lecture
// // is gonna be about Traversing the Dom.
// // So Dom traversing is basically walking through the Dom.
// // Which means that we can select an element
// // based on another element.
// // And this is very important
// // because sometimes we need to select elements
// // relative to a certain other element.

// // For example, a direct child or a direct parent element.
// // Or sometimes we don't even know the structure
// // of the Dom at runtime.
// // And in all these cases, we need Dom traversing.

// const h1 = document.querySelector('h1');

// // Going downward: child

// // So the first way of doing that is to use querySelector
// // because we already know that querySelector
// // also works on elements, not only on the document.
// console.log(h1.querySelectorAll('.highlight'));

// // All right, now, in this case these two elements here
// // are direct children of the h1
// // but as I said, it would go down as deep as necessary
// // into the Dom tree.

// // Okay, and also if there were other highlight elements
// // on the page, so elements with this class,
// // they would not get selected,
// // because they would not be children of the h1 element.

// // Now, sometimes all we need are actually direct children.
// console.log(h1.childNodes);
// // And so here we actually get all kinds of stuff.
// // So we get texts we get the comment,
// // and we get then these elements.
// // And that's because we already know
// // that nodes can be anything so they can be texts
// // or elements or even comments as we have here.

// // But many times we are simply interested
// // in the elements themselves.
// console.log(h1.children);
// // And this then gives us an HTMLCollection
// // which remembers is a live collection, so it's updated,
// // and so here we indeed only get the three elements
// // that are actually inside of the h1.
// // but this one works only for direct children.
// // So keep that in mind.

// // Finally, there's also
// // first and
// // last element child.
// // So these names are a little bit confusing,
// // but one more time,
// // that's because of the messy nature of JavaScript
// // with all of these things being implemented
// // at different points in time.
// // And so therefore it was difficult
// // to keep consisting naming conventions.
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// ////// Going upwards: parents
// // Okay, but now let's go upwards.
// // So going upwards.
// // So basically selecting parents
// // and for direct parents, it's actually very straightforward.
// console.log(h1.parentNode);
// // And so this is the direct parent,

// // Then there's also the parentElement,
// // which is usually the one that we are interested in.
// // But in this case, it's simply the same.
// console.log(h1.parentElement);
// // But in this case, it's simply the same.

// // However, most of the time we actually need a parent element
// // which is not a direct parent.
// // Or in other words, we might need to find a parent element
// // no matter how far away it is and the Dom tree.
// // And for that, we have the closest method.
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// // So let's say that on the page, we had multiple headers
// // so multiple elements with a class of header,
// // but for some reason
// // we only wanted to find the one
// // that is a parent element of h1.
// // So of all h1 element here.
// // And so for that, we can use closest.
// // And so the closest method receives a query string
// // just like querySelector and querySelectorAll.

// // So this is a very important one
// // and we're gonna use it all the time
// // especially for event delegation.

// // Now, if this selector here actually matches the element
// // on which we're calling closest,
// // then that's actually the element that's gonna be returned.
// h1.closest('h1').style.background = 'var(--gradient-primary)';
// // So we can think of closest here
// // as basically being the opposite of querySelector.
// // So both receive a query string as an input
// // but querySelector, finds children,
// // no matter how deep in the Dom tree,
// // while the closest method finds parents.
// // And also no matter how far up in the Dom tree.
// // All right, so very important method here to keep in mind,

// //Going sideways: siblings

// // and for some reason in JavaScript,
// // we can only access direct siblings.
// // So basically only the previous and the next one.
// console.log(h1.previousElementSibling);
// // So this is the first child of this parent element,
// // and therefore it doesn't have a previous sibling

// // but it has a next sibling.
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// // And just like before, we also have the same methods
// // or actually the same properties for nodes.
// // So that's just previous sibling
// // and next sibling.
// // So let's see, and here the previous sibling
// // is now actually text,
// // so not sure what that is.
// // Well, that's not really important because again,
// // most of the time we're gonna be working
// // with the elements anyway.

// // Now, if we really need all the siblings
// // and not just the previous and the next one,
// // then we can use the trick of moving up to the parent element
// // and then read all the children from there.
// console.log(h1.parentElement.children);
// // So this is an HTMLCollection,
// // remember, so it's one more time not an array,
// // but it is still an iterable
// // that we can spread into an array.
// [...h1.parentElement.children].forEach(function (el) {
//   // And so comparisons between elements actually work just fine.
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
// // are now like 50% smaller.
// // All right?
// // And so this is how we can work
// // with all the sibling elements of one element.

// // Great, and that's actually the fundamentals
// // of Dom traversing.
// // And we're gonna need them all the time, and especially,
// // when we're doing some more complex event delegation
// // likely will do throughout the rest of the section.

//////////////////////////////////////////////////////////////////
// Building a Tabbed Component
//////////////////////////////////////////////////////////////////

// In this video we're gonna implement
// a very popular component which is a tabbed component.
// And you will see tabbed components
// on many websites these days.
// So it's great to learn how to build one yourself.

// Now a tabbed component can appear in many different ways,
// but what they all have in common
// is that they have some kind of tabs like this here.
// And when you clicked it up
// then the content of this area below will change.
// And so that's exactly what happens here with these buttons.
// So basically these three are our tabs.
// And then as we click on one of the tabs,
// it will reveal the associated content.
// So a little bit like tabs here in our browser, right?
// So each browser tab has its own webpage.
// And so here each tab has its own content area, basically.

// So let's just quickly recap.
// And as I just mentioned a minute ago
// the whole idea when we build components like this
// is to just add and remove classes
// as necessary to manipulate the content to our needs.

// That's actually the exact same thing
// we did with a modal window.
// So if you take a look at the code, it's a bit similar.
// So to hide and display the modal window
// all we do is to add and remove this hidden class.

// Now, in this case, it's a little bit more complex
// but the idea is always the same.
// It's to work with classes
// that have some styles for showing and hiding the classes.
// And so if you're not yet really familiar with CSS,
// it's also important that you really check out to CSS
// to build these components for yourself
// and the same goes for the HTML.

// But of course, I could not write this code here as well
// because then this tutorial would take
// like one hour instead of 15 minutes.
// But anyway, I hope that this was fun
// and that make sure to understand what we did here
// including the HTML and CSS.

//////////////////////////////////////////////////////
// Passing Arguments to Event Handlers
//////////////////////////////////////////////////////

// Let's now create a nice effect
// on our page navigation,
// where all the links fade out when we hover
// over one of them, except for the link
// that we actually hovered over.
// And this will teach us something really valuable,
// which is how to pass arguments
// into event handler functions.

//////////////////////////////////////////////////////
// Implementing a Sticky Navigation: The Scroll Event
//////////////////////////////////////////////////////

// // Let's implement another pretty common feature
// // on webpages, which is that the navigation bar
// // becomes attached to the top of the page
// // after we scroll to a certain point.
// // And this is called a sticky navigation.

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// // So, the scroll event is available on Window.
// // All right.
// // So, not document, but really window.addeventlistener
// // and then scroll.
// // Okay.
// // So, this event will be fired off
// // each time that we scroll on our page.

// // So, to scroll event is not really efficient
// // and usually it should be avoided.
// // But again for now, let's use that.
// window.addEventListener('scroll', function (e) {
//   // console.log(e);

//   console.log(window.scrollY);

//   //   But now the question is, when exactly should
//   // the navigation actually become sticky?
//   // Well, it should happen here as soon as we reach
//   // the first section.

//   //   the size of this element that comes before
//   // is actually dependent on the view port size.
//   // So, if I do this, then you see that
//   // the first section starts way earlier, so like at 300.
//   // And so we cannot hard coat to value
//   // and therefore we need to calculate it dynamically.

//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//     console.log('add sticky');
//   } else {
//     nav.classList.remove('sticky');
//     console.log('remove sticky');
//   }
// });

// // So, this works just fine now, but as I mentioned before,
// // this is pretty bad for performance.
// // So, using the scroll event for performing a certain action
// // at a certain position of the page
// // is really not the way to go.
// // And again, that's because the scroll event here
// // fires all the time, no matter how small
// // the change is here in the scroll.
// // And so that makes for a pretty bad performance
// // and especially on mobile.
// // Like on the modern computer, of course,
// // you're not gonna notice anything,
// // but if you're using this page maybe on an older smartphone,
// // then it's not gonna be so nice.
// // All right.
// // And so in the next video, we're gonna look at a better
// // and way more efficient tool,
// // which is the intersection of server API.

//////////////////////////////////////////////////////
// A Better Way: The Intersection Observer API
//////////////////////////////////////////////////////

// // So let's now implement the same sticky navigation
// // that we implemented in the last video,
// // but this time, using the new intersection observer API.
// // But what actually is the intersection observer API,
// // and why is it so helpful?
// // Well, this API allows our code to basically
// // observe changes to the way that a certain target element
// // intersects another element, or the way
// // it intersects the viewport.
// // And so from this definition alone,
// // I think you can see that this will actually
// // be useful in implementing our sticky navigation.
// // But let's actually start this video by learning
// // how the intersection observer API actually works,
// // but without our sticky navigation,
// // because at the beginning, this can seem
// // a bit intimidating and confusing, okay?

// const obsCallback = function (entries, observer) {
//   //   So this callback function here will get called
//   // each time that the observed element,
//   // so our target element here, is intersecting
//   // the root element at the threshold that we defined, okay?
//   // So take note of this because this is actually
//   // a bit hard to figure out from reading the documentation.
//   // And so it's a good idea to keep note
//   // of what I'm saying here.

//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   // this object needs
//   // first a root property.
//   // And this root is the element
//   // that the target is intersecting.
//   // So again, this here is the target,
//   // and the root element will be the element
//   // that we want our target element to intersect.
//   // And again, this will all make more sense
//   // once you see this in action.
//   // So we could now here select an element
//   // or as an alternative, we can write null,
//   // and then we will be able to observe our target element
//   // intersecting the entire viewport, all right?.
//   // So basically, this entire rectangle here,
//   // which shows the current portion of the page, okay?
//   root: null,

//   // And then second, we can define a threshold.
//   // Threshold, and this is basically the percentage
//   // of intersection at which
//   // the observer callback will be called,
//   // so this callback here.
//   // So again that's very confusing,
//   // let's just set it to 10%, which is 0.1,

//   //   So you can think of this threshold here
//   // at the percentage that we want to have visible in our root.
//   // So in our viewport in this case
//   // threshold: 0.1,

//   //   Now what I'm gonna do here is to now specify an array,
//   // so to specify different thresholds,
//   // and one of them is gonna be zero,
//   // and the other one 0.2, so that's 20%.
//   // So 0% here means that basically our callback
//   // will trigger each time that the target element
//   // moves completely out of the view,
//   // and also as soon as it enters the view,
//   // threshold: [0, 0.2],

//   //   On the other hand, if we specified one here,
//   // like this, then that means that the callback
//   // will only be called when 100% of the target
//   // is actually visible in the viewport.
//   // So in the case of this section one,
//   // that would be impossible because the section itself
//   // is already bigger than the viewport.
//   // threshold: [0, , 1, 0.2],

//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// // When do we want our navigation to become sticky?
// // Well, we want that to happen essentially
// // when the header moves completely out of view.
// // So basically, all of this part here,
// // which is the header, when we can no longer see it,
// // that's when we want then to display the navigation, okay?
// // And so this time, we are going
// // to observe the header element.
