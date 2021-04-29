const cards = document.getElementById('cards');
// ON SAVED RECIPES PAGE
onRecipesPage = false;

// get userID when the user is logged in

const getUserIDAndName = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userID = user.uid;
    } else {
      userID = '';
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
};

const loader = document.getElementById('loader');

// Show saved recipes that are saved from the user who is logged-in
const showSavedRecipes = () => {
  let savedRecipes = [];

  // Get user id to show the profile icon, and user name to show the name on the browser
  //By calling the function, globally declared userID and userName can be re-declared for the logged-in user
  getUserIDAndName();
  //Show profile icon of the user on the main page
  const savedProfileImage = document.getElementById('savedProfileImage');
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .storage()
        .ref(`users/${userID}/profile.jpg`)
        .getDownloadURL()
        .then((imgUrl) => {
          savedProfileImage.setAttribute('src', imgUrl);
        });
    }
  });

  //Go on looping through the saved recipes in firestore, and find the recipes that have the logged-in userId.
  db.collection('savedRecipes')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().user === userID) {
          savedRecipes.push(doc.data());
        }
        loader.classList.add('hide-loader');
      });
      const noFavorites = document.getElementById('noFavorites');
      const savedRecipesUserName = document.getElementById(
        'savedRecipesUserName'
      );

      if (savedRecipes.length > 0) {
        cards.innerHTML = '';
        noFavorites.classList.add('hidden');
        savedRecipesUserName.classList.remove('hidden');
        savedProfileImage.classList.remove('hidden');
        savedRecipesUserName.innerHTML = `${userName}'s Favorite Recipes`;
        createCards(savedRecipes);
      } else {
        cards.innerHTML = '';
        noFavorites.classList.remove('hidden');
        savedRecipesUserName.classList.add('hidden');
        savedProfileImage.classList.add('hidden');
      }
    });
};
//function called when the user is landing on this page,
//and also when the user delete a recipe
showSavedRecipes();

// GET ingredients specific for the user in array
let savedIngsArr = [];
const showShoppingList = () => {
  db.collection('ingredients')
    .get()
    .then((querySnapshot) => {
      savedIngsArr = [];
      getUserIDAndName();
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
  getUserIDAndName();
  const shoppingListModal = document.getElementById('shoppingListModal');
  shoppingListModal.innerHTML = '';

  // <h4 class="center-align">Shopping List</h4>
  const shoppingListTitle = document.createElement('h4');
  shoppingListTitle.classList.add('center-align', 'red-text', 'text-lighten-2');
  shoppingListTitle.innerHTML = 'Shopping List';
  shoppingListModal.appendChild(shoppingListTitle);

  if (userID.length == 0) {
    const noUserMessage = document.createElement('h5');
    noUserMessage.classList.add('align-center', 'teal-text');
    noUserMessage.innerHTML = 'Please login to make your own shopping list';
    shoppingListTitle.appendChild(noUserMessage);
    const loginBtn = document.createElement('a');
    loginBtn.classList.add(
      'waves-effect',
      'waves-light',
      'btn',
      'teal',
      'lighten-1'
    );
    loginBtn.innerHTML = 'LOGIN';
    loginBtn.setAttribute('href', '../html/login.html');
    shoppingListTitle.appendChild(loginBtn);
  } else {
    //<div class="container"></div>
    const shopContainer = document.createElement('div');
    shopContainer.classList.add('container');
    shoppingListModal.appendChild(shopContainer);

    if (savedIngsArr.length == 0) {
      const noIngMessage = document.createElement('h4');
      noIngMessage.classList.add(
        'collection-item',
        'center-align',
        'pink-text',
        'text-lighten-2'
      );
      noIngMessage.innerHTML = 'No Ingredients Saved';
      shopContainer.appendChild(noIngMessage);
      const noIngMesP = document.createElement('p');
      noIngMesP.innerHTML =
        'You can save ingredients from saved recipe! Try clicking the plus button next to the ingredient name to save :)';
      noIngMesP.classList.add(
        'collection-item',
        'center-align',
        'teal-text',
        'text-lighten-3'
      );
      shopContainer.appendChild(noIngMesP);
    } else {
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
        deleteIcon.addEventListener('click', () => deleteIng(ing));
        //<span class="material-icons">delete_forever</span>
        const deleteIconSpan = document.createElement('span');
        deleteIconSpan.classList.add('material-icons');
        deleteIconSpan.innerHTML = 'delete_forever';
        deleteIcon.appendChild(deleteIconSpan);
      });
    }
  }
};

// Delete ingredient function
const deleteIng = (ing) => {
  db.collection('ingredients')
    .doc(ing)
    .delete()
    .then(() => {
      showShoppingList();
      showSavedRecipes();
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

const shoppingListBtn = document.getElementById('shoppingListIconA');
shoppingListBtn.addEventListener('click', () => showShoppingList());

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
