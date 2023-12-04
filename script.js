'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
