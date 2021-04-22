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

// GET ingredients specific for the user in array
let savedIngsArr = [];
const showShoppingList = () => {
  db.collection('ingredients')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (userID === doc.data().user) {
          savedIngsArr.push(doc.data().ingredient);
        }
      });
      createShoppingListDOM();
    });
};

// Show the list of saved Ingredients specific for the user
const createShoppingListDOM = () => {
  const shoppingListModal = document.getElementById('shoppingListModal');

  console.log(savedIngsArr);
  //<div class="container"></div>
  const shopContainer = document.createElement('div');
  shopContainer.classList.add('container');
  shoppingListModal.appendChild(shopContainer);
  //  <ul class="collection center-align">
  const shoppingListUl = document.createElement('ul');
  shoppingListUl.classList.add('collection', 'center-align');
  shopContainer.appendChild(shoppingListUl);
  // <li class="collection-item">
  //  <span>Ingredient Name</span>
  //  <a class="secondary-content my-pointer">
  //    <i id="Ingredient Name" class="material-icons">
  //       <span class="material-icons">delete_forever</span>
  //    </i >
  //  </a >
  //</li >;
  savedIngsArr.forEach((ing) => {
    //<li class="collection-item"></li>
    const shoppingListLi = document.createElement('li');
    shoppingListLi.classList.add('collection-item');
    shoppingListUl.appendChild(shoppingListLi);
    //  <span>Ingredient Name</span>
    const ingName = document.createElement('span');
    ingName.innerHTML = ing;
    shoppingListLi.appendChild(ingName);
    //<a class="secondary-content my-pointer">
    const secCont = document.createElement('a');
    secCont.classList.add('secondary-content', 'my-pointer');
    shoppingListLi.appendChild(secCont);
    //<i id="Ingredient Name" class="material-icons">
    const deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('id', ing);
    deleteIcon.classList.add('material-icons');
    secCont.appendChild(deleteIcon);
    // add event to delete the ingredient
    deleteIcon.addEventListener('click', () => deleteIng());
    //<span class="material-icons">delete_forever</span>
    const deleteIconSpan = document.createElement('span');
    deleteIconSpan.classList.add('material-icons');
    deleteIconSpan.innerHTML = 'delete_forever';
    deleteIcon.appendChild(deleteIconSpan);
  });
};

const deleteIng = () => {
  console.log('delete clicked');
};

const shoppingListBtn = document.getElementById('shoppingListIconA');
shoppingListBtn.addEventListener('click', () => showShoppingList());
// Save ingredients (on SavedRecipes page -> store the ingredients in firestore)
const storeIngredientFS = (ingredient) => {
  const userID = firebase.auth().currentUser.uid;
  let data = {
    user: userID,
    ingredient: ingredient,
  };
  db.collection('ingredients').doc(ingredient).set(data);
};

// MATERIALIZE
//***********************************************************************
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
