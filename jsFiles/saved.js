// To get the data, I need to parse the string
let recipesData = JSON.parse(localStorage.getItem('recipesData'));

// ON SAVED RECIPES PAGE
onRecipesPage = false;
// CALLING FUNCTION TO DISPLAY DATA FROM LOCAL STORAGE WHEN REFRESHING
if (recipesData.length > 0) {
  const noFavorites = document.getElementById('noFavorites');
  noFavorites.classList.add('hidden');
  createCards(recipesData);
} else {
  noFavorites.classList.remove('hidden');
}

// MODAL JS CODE
const modalOptions = {
  opacity: 0.4,
  outDuration: 350,
};

// MODAL FOR RECIPES PAGE
document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.modal');
  const instances = M.Modal.init(elems, modalOptions);
});

const options = {
  edge: 'left',
};

// SIDE NAV
document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.sidenav');
  const instances = M.Sidenav.init(elems, options);
});

// PARALLAX
document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.parallax');
  const instances = M.Parallax.init(elems, options);
});

// COLLAPSIBLE
document.addEventListener('DOMContentLoaded', function () {
  const elem = document.querySelector('.collapsible.expandable');
  const instance = M.Collapsible.init(elem, {
    accordion: false,
  });
});
