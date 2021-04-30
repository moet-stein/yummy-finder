// SHOW AND HIDE (ABOUT SECTION)
const showHide = (downArrow, moreText) => {
  let pAndIcon = downArrow.childNodes;
  let moreOrLess = pAndIcon[0];
  let arrowIcon = pAndIcon[2];
  if (moreText.classList.contains('hide')) {
    moreText.classList.remove('hide');
    moreOrLess.innerHTML = 'Show Less';
    arrowIcon.innerHTML = 'expand_less';
  } else {
    moreText.classList.add('hide');
    moreOrLess.innerHTML = 'Show More';
    arrowIcon.innerHTML = 'expand_more';
  }
};
// ABOUT
let downArrow1 = document.getElementById('downArrow1');
const moreText1 = document.getElementById('moreText1');
downArrow1.addEventListener('click', () => showHide(downArrow1, moreText1));
// Search recipes
let downArrow2 = document.getElementById('downArrow2');
const moreText2 = document.getElementById('moreText2');
downArrow2.addEventListener('click', () => showHide(downArrow2, moreText2));
// Save recipes
let downArrow3 = document.getElementById('downArrow3');
const moreText3 = document.getElementById('moreText3');
downArrow3.addEventListener('click', () => showHide(downArrow3, moreText3));
// Search Cooking Videos
let downArrow4 = document.getElementById('downArrow4');
const moreText4 = document.getElementById('moreText4');
downArrow4.addEventListener('click', () => showHide(downArrow4, moreText4));

var options = {
  edge: 'left',
};

// SIDE NAV
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, options);
});

// PARALLAX
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.parallax');
  var instances = M.Parallax.init(elems, options);
});

// COLLAPSIBLE
document.addEventListener('DOMContentLoaded', function () {
  var elem = document.querySelector('.collapsible.expandable');
  var instance = M.Collapsible.init(elem, {
    accordion: false,
  });
});
