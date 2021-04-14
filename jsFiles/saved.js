// To get the data, I need to parse the string
let recipesData = JSON.parse(localStorage.getItem('recipesData'));

const cards = document.getElementById('cards');

// ON SAVED RECIPES PAGE
onRecipesPage = false;
// CALLING FUNCTION TO DISPLAY DATA FROM LOCAL STORAGE WHEN REFRESHING
createCards(recipesData);

// MODAL JS CODE
var modalOptions = {
  opacity: 0.4,
  outDuration: 350,
};

// MODAL FOR RECIPES PAGE
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, modalOptions);
});

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
