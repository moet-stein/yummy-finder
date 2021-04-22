// To get the data, I need to parse the string
// let recipesData = JSON.parse(localStorage.getItem('recipesData'));
const cards = document.getElementById('cards');
// ON SAVED RECIPES PAGE
onRecipesPage = false;

// get userID when the user is logged in
let userID;
let userName;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    userID = user.uid;
  } else {
    userID = '';
    console.log('not logged in, showSavedRecipes');
  }
});

// Get username from 'users' collection
db.collection('users')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (userID === doc.data().userID) {
        userName = doc.data().name;
      }
    });
  });

// var db = firebase.firestore();
console.log('is this console', firebase.auth());
const showSavedRecipes = () => {
  let savedRecipes = [];
  db.collection('savedRecipes')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().user === userID) {
          savedRecipes.push(doc.data());
        }
      });
      console.log(savedRecipes);
      const noFavorites = document.getElementById('noFavorites');
      const savedRecipesUserName = document.getElementById(
        'savedRecipesUserName'
      );
      if (savedRecipes.length > 0) {
        cards.innerHTML = '';
        noFavorites.classList.add('hidden');
        savedRecipesUserName.classList.remove('hidden');
        savedRecipesUserName.innerHTML = `${userName}'s Favorite Recipes`;
        createCards(savedRecipes);
      } else {
        cards.innerHTML = '';
        noFavorites.classList.remove('hidden');
        savedRecipesUserName.classList.add('hidden');
      }
    });
};
showSavedRecipes();

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
