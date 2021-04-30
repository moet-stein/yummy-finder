let onRecipesPage = true;

// CREATING RECIPE CARDS FROM ARRAY
const createCards = (recipes) => {
  cards.innerHTML = '';

  if (recipes) {
    recipes.forEach((recipe) => {
      let colDiv = document.createElement('div');
      colDiv.setAttribute('id', `colDiv-${recipe.id}`);
      let colSizeM = onRecipesPage ? 'm12' : 'm6';
      let colSizeL = onRecipesPage ? 'l6' : 'l4';
      colDiv.classList.add(
        'col',
        's12',
        colSizeM,
        colSizeL,
        'col-Div',
        'my-card-height',
        'id-' + recipe.id
      );
      cards.appendChild(colDiv);
      //
      const card = document.createElement('div');
      card.classList.add('card', 'my-card-margin');
      colDiv.appendChild(card);
      //
      const cardImage = document.createElement('div');
      cardImage.classList.add('card-image');
      card.appendChild(cardImage);
      //
      const image = document.createElement('img');
      image.setAttribute('src', recipe.image);
      image.setAttribute('alt', recipe.title);
      cardImage.appendChild(image);
      onRecipesPage
        ? createIcon(cardImage, 'favorite', recipe.id)
        : createIcon(cardImage, 'delete_forever', recipe.id);

      // Element that will have orange overlayed after clicking favorite icon
      const colDivId = document.getElementById(`colDiv-${recipe.id}`);
      //  Clicked icon (favorite or delete)
      const cardIcon = document.getElementById(`cardIcon-${recipe.id}`);
      //   Clicked icon's parent a (favorite or delete)
      const cardIconA = document.getElementById(`cardIconA-${recipe.id}`);

      // IF THE USER IS ON THE SEARCH RECIPES PAGE
      // CAN SAVE RECIPES
      if (onRecipesPage) {
        //<span class="popuptext" id="myPopup">A Simple Popup!</span>
        const popModal = document.createElement('div');
        popModal.classList.add('myModal');
        popModal.setAttribute('id', `popup-${recipe.id}`);
        cardImage.appendChild(popModal);
        const popup = document.createElement('div');
        popup.classList.add(
          'modal-content',
          'red-text',
          'text-ligten-2',
          'center-align'
        );
        // popup.setAttribute('id', ``);
        popup.innerHTML = `Please login to save favorite recipes :)`;
        popModal.appendChild(popup);

        // if the user is logged-in, he can save the recipe when clicking favorite icon.
        // if not logged-in, he will see the pop-up that is created above.
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            let userID = user.uid;
            cardIcon.addEventListener('click', () => {
              // Storing the clicked recipe data into localStorage recipesData
              storeSavedRecipesFS(recipe, userID);
              // OVERLAYING COLOR & DISABLE THE BUTTON FOR THE RECIPE THAT IS SAVED
              overlaySaved(colDivId, cardIcon, cardIconA);
            });
            cardIcon.removeEventListener('click', () =>
              storeSavedRecipesFS(recipe, userID)
            );
            //  IF any recipe (showed on the browser) has the same id like saved recipes in firestore storage, overlay the orange filter.
            db.collection('savedRecipes')
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  if (doc.data().id == recipe.id && doc.data().user == userID) {
                    overlaySaved(colDivId, cardIcon, cardIconA);
                  }
                });
              });
          } else {
            cardIcon.addEventListener('click', () => {
              console.log('clicked-block');
              popModal.style.display = 'block';
            });
            // When the user clicks anywhere outside of the modal, close it
            window.addEventListener('click', (event) => {
              if (event.target == popModal) {
                popModal.style.display = 'none';
              }
            });
          }
        });
      }
      // IF THE USER IS ON THE SAVE RECIPES PAGE
      // USER CAN DELETE RECIPE
      if (!onRecipesPage) {
        cardIconA.classList.add('modal-trigger');
        cardIconA.setAttribute('href', `#deleteCard-${recipe.id}`);
        createDeleteModal(cardImage, recipe, cardIconA);
      }

      //4 Card content
      const content = document.createElement('div');
      content.classList.add('card-content');
      card.appendChild(content);
      // 4-1
      const title = document.createElement('span');
      title.classList.add(
        'card-title',
        'center-align',
        'green-text',
        'text-darken-3'
      );
      title.innerHTML = recipe.title;
      content.appendChild(title);
      // 5
      const action = document.createElement('div');
      action.classList.add('card-action', 'center-align', 'my-action');
      card.appendChild(action);

      //   MODAL
      // 5-1-1
      const ingredientsA = document.createElement('a');
      ingredientsA.setAttribute('href', `#showIngredients-${recipe.id}`);
      ingredientsA.setAttribute('id', `modalBtn-${recipe.id}`);
      // ingredientsA.classList.add('modal-trigger');
      ingredientsA.innerHTML = 'Ing. & Prep.';
      action.appendChild(ingredientsA);

      //parent <div class="card-action">
      //child <div class="modal" id="details">
      const detailsModal = document.createElement('div');
      detailsModal.classList.add('myModal');
      detailsModal.setAttribute('id', `showIngredients-${recipe.id}`);
      action.appendChild(detailsModal);
      //<div class="modal-content">
      const detailsModalContent = document.createElement('div');
      detailsModalContent.classList.add('modal-content');
      detailsModal.appendChild(detailsModalContent);
      //   <a href="#" class="modal-close"><i class="material-icons">cancel</i></a>
      const detailsModalCloseA = document.createElement('a');
      detailsModalCloseA.classList.add(
        'my-modal-close',
        'my-right-align',
        'my-pointer'
      );
      detailsModalCloseA.setAttribute('id', `modalClose-${recipe.id}`);
      detailsModalContent.appendChild(detailsModalCloseA);
      const detailsModalCloseI = document.createElement('i');
      detailsModalCloseI.classList.add('material-icons');
      detailsModalCloseI.innerHTML = 'cancel';
      detailsModalCloseA.appendChild(detailsModalCloseI);
      detailsModalCloseA.addEventListener(
        'click',
        () => (detailsModal.style.display = 'none')
      );

      //   parent detailsModalContent
      //  <h4 class="green-text center-align">TITLE</h4>
      const detailsTitle = document.createElement('h4');
      detailsTitle.classList.add('green-text', 'center-align');
      detailsTitle.innerHTML = recipe.title;
      detailsModalContent.appendChild(detailsTitle);
      //   parent detailsModalContent
      //child <div class="row">
      const detailsRow = document.createElement('div');
      detailsRow.classList.add('row', 'my-flex-responsive');
      detailsModalContent.appendChild(detailsRow);
      //<div class="col s6">
      const detailsCol = document.createElement('div');
      detailsCol.classList.add('col', 's12', 'm6');
      detailsRow.appendChild(detailsCol);
      //<ul class="collection with-header">
      const ingCollection = document.createElement('ul');
      ingCollection.classList.add('collection', 'with-header');
      detailsCol.appendChild(ingCollection);
      //<li class="collection-header">Ingredients</li>
      const ingColHeader = document.createElement('li');
      ingColHeader.classList.add('collection-header', 'orange-text');
      ingColHeader.innerHTML = 'Ingredients';
      ingCollection.appendChild(ingColHeader);

      if (recipe.ingredients && recipe.ingredients.length > 0) {
        // REMOVE DUPICATE ING. FROM INGREDIENTS ARR
        const origIngArr = recipe.ingredients;
        const uniIngArr = origIngArr.filter(
          (item, index) => origIngArr.indexOf(item) === index
        );
        // Collection items
        uniIngArr.forEach((ing) => {
          const ingListsLi = document.createElement('li');
          ingListsLi.classList.add('collection-item');
          ingCollection.appendChild(ingListsLi);
          // first content for the collection item
          const ingName = document.createElement('span');
          ingName.innerHTML = ing;
          ingListsLi.appendChild(ingName);
          if (!onRecipesPage) {
            createAddBtn(ingListsLi, ing, recipe);
          }
        });
      } else {
        displayNotFound(ingCollection, 'No Ingredients Info Found');
      }

      //  PREPARATION COLLECTION
      //parent row detailsRow
      //child <div class="col s6">
      const prepCol = document.createElement('div');
      prepCol.classList.add('col', 's12', 'm6');
      detailsRow.appendChild(prepCol);
      //<ul class="collection with-header">
      const prepCollection = document.createElement('ul');
      prepCollection.classList.add('collection', 'with-header');
      prepCol.appendChild(prepCollection);
      //<li class="collection-header">Preparation</li>
      const prepColHeader = document.createElement('li');
      prepColHeader.classList.add('collection-header', 'orange-text');
      prepColHeader.innerHTML = 'Preparation';
      prepCollection.appendChild(prepColHeader);
      // PREPARATION LOOP

      const prepArr = recipe.preparation;
      if (prepArr && prepArr.length > 0) {
        prepArr.forEach((prep, index) => {
          const prepColLi = document.createElement('li');
          prepColLi.classList.add('collection-item');
          prepCollection.appendChild(prepColLi);
          //<span class="title">Boil water.</span>
          const prepContent = document.createElement('span');
          prepContent.classList.add('title');
          prepContent.innerHTML = `${index + 1} . ${prep}`;
          prepColLi.appendChild(prepContent);
        });
      } else {
        const prepColLi = document.createElement('li');
        prepColLi.classList.add('collection-item');
        prepCollection.appendChild(prepColLi);
        displayNotFound(prepColLi, 'No Preparation Info Found');
      }
      const websiteA = document.createElement('a');
      websiteA.setAttribute('href', recipe.sourceUrl);
      websiteA.setAttribute('target', '_blank');
      websiteA.innerHTML = 'Recipe Website';
      action.appendChild(websiteA);

      // modal
      const modal = document.getElementById(`showIngredients-${recipe.id}`);

      // Get the button that opens the modal
      const modalBtn = document.getElementById(`modalBtn-${recipe.id}`);

      // Get the <span> element that closes the modal
      const modalClose = document.getElementById(`modalClose-${recipe.id}`);

      // When the user clicks on the button, open the modal
      modalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
      });

      // When the user clicks on <span> (x), close the modal
      modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
      });

      // When the user clicks anywhere outside of the modal, close it
      window.addEventListener('click', (event) => {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      });
    });
  }
};

// CREATE DELETE MODAL (title: YummyFinder - Saved)
const createDeleteModal = (parent, recipe, modalBtn) => {
  const deleteModal = document.createElement('div');
  deleteModal.classList.add('myModal');
  deleteModal.setAttribute('id', `deleteCard-${recipe.id}`);
  parent.appendChild(deleteModal);
  //<div class="modal-content">
  const deleteModalCont = document.createElement('div');
  deleteModalCont.classList.add('modal-content');
  deleteModal.appendChild(deleteModalCont);
  //<h4>TITLE</h4>
  const deleteModalTitle = document.createElement('h4');
  deleteModalTitle.classList.add('green-text', 'center-align');
  deleteModalTitle.innerHTML = recipe.title;
  deleteModalCont.appendChild(deleteModalTitle);
  // <h4>Do you want to delete this recipe?</h4>
  const deleteModalTex = document.createElement('h5');
  deleteModalTex.classList.add('orange-text', 'center-align');
  deleteModalTex.innerHTML = 'Do you want to delete this recipe?';
  deleteModalCont.appendChild(deleteModalTex);
  // parent deleteModal
  // <div class="modal-footer">
  const deleteModalFooter = document.createElement('div');
  deleteModalFooter.classList.add('modal-footer', 'delete-modal-a');
  deleteModalCont.appendChild(deleteModalFooter);
  // <a id="deleting" class="btn orange">Delete</a>
  const deleteModalBtn = document.createElement('a');
  deleteModalBtn.setAttribute('id', 'deleting');
  // deleteModalBtn.setAttribute('onclick', 'deleteCard(recipe.title));
  deleteModalBtn.classList.add('btn', 'orange');
  deleteModalBtn.innerHTML = 'DELETE';
  deleteModalFooter.appendChild(deleteModalBtn);
  deleteModalBtn.addEventListener('click', () => deleteCard(recipe.title));
  // <a href="#" class="modal-close btn orange">Cancel</a>
  const deleteModalCancelBtn = document.createElement('a');
  deleteModalCancelBtn.classList.add('modal-close', 'btn', 'grey');
  deleteModalCancelBtn.setAttribute('id', `modalClose-${recipe.id}`);
  deleteModalCancelBtn.innerHTML = 'CANCEL';
  deleteModalFooter.appendChild(deleteModalCancelBtn);

  // modal
  const modal = document.getElementById(`deleteCard-${recipe.id}`);

  // Get the <span> element that closes the modal
  const modalClose = document.getElementById(`modalClose-${recipe.id}`);

  // When the user clicks on the button, open the modal
  modalBtn.addEventListener('click', function () {
    modal.style.display = 'block';
  });

  // When the user clicks on <span> (x), close the modal
  modalClose.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
};

//Deleting the card and data from firestore (title: YummyFinder - Saved)
const deleteCard = (recipeTitle) => {
  db.collection('savedRecipes')
    .doc(recipeTitle)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!');

      showSavedRecipes();
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

// DISPLAY NOT FOUND MESSAGE ON DETAILS MODAL
const displayNotFound = (parent, message) => {
  const notFoundDiv = document.createElement('div');
  notFoundDiv.classList.add('collection-item');
  notFoundDiv.innerHTML = message;
  parent.appendChild(notFoundDiv);
};

// CREAT ICON (EITHER FAVORITE OR DELETE ICON DEPENDING ON THE PAGE)
const createIcon = (parent, iconName, id) => {
  const iconA = document.createElement('a');
  iconA.setAttribute('id', `cardIconA-${id}`);
  let iconColor = iconName === 'favorite' ? 'orange' : 'grey';
  iconA.classList.add(
    'halfway-fab',
    'btn-floating',
    iconColor,
    'lighten-3',
    'my-icon'
  );
  parent.appendChild(iconA);
  // 3-2-1
  const iconI = document.createElement('i');
  iconI.setAttribute('id', `cardIcon-${id}`);
  iconI.classList.add('material-icons');
  iconI.innerHTML = iconName;
  iconA.appendChild(iconI);
};

// CREATING ADD(PLUS) BUTTON FOR ADDING INGREDIENTS TO SHOPPING LIST ((title: YummyFinder - Saved))
//SAVING INGREDIENT DATA IN FIRESTORE WHEN CLICKING
const createAddBtn = (parent, ing, recipe) => {
  //child <a href="#" class="secondary-content">
  const addIngA = document.createElement('a');
  addIngA.classList.add('secondary-content', 'my-pointer');
  parent.appendChild(addIngA);
  //<i class="material-icons">
  const addInI = document.createElement('i');
  addInI.setAttribute('id', `${recipe.title}-${ing}`);
  addInI.classList.add('material-icons');

  addIngA.appendChild(addInI);
  //<span class="material-icons">add_circle_outline</span>
  const addInSpan = document.createElement('span');
  addInSpan.classList.add('material-icons');
  addInSpan.innerHTML = 'add_circle_outline';
  addInI.appendChild(addInSpan);
  //

  // eventlistener
  // When plus icon is clicked, save the ingredient
  addInI.addEventListener('click', () => {
    addInSpan.innerHTML = 'check_circle';
    addIngA.classList.add('grey-text');
    addIngA.classList.remove('my-pointer');
    addIngA.setAttribute('disabled', '');
    addInI.setAttribute('disabled', '');
    saveIngredientFS(ing, `${recipe.title}-${ing}`);
  });
  // if the ingredient's id match between the one from saved recipe and firebase stored saved ingredient,
  //show the checked icon instead of plus
  db.collection('ingredients')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().ingID == `${recipe.title}-${ing}`) {
          addInSpan.innerHTML = 'check_circle';
          addIngA.classList.add('grey-text');
          addIngA.classList.remove('my-pointer');
          addIngA.setAttribute('disabled', '');
          addInI.setAttribute('disabled', '');
        }
      });
    });
};

// // Save ingredients (on SavedRecipes page -> store the ingredients in firestore)
const saveIngredientFS = (ing, ingID) => {
  const userID = firebase.auth().currentUser.uid;
  let data = {
    user: userID,
    ingredient: ing,
    ingID: ingID,
  };
  db.collection('ingredients').doc(ing).set(data);
};

// OVERLAY ORANGE LAYER ON THE SAVED RECIPE
const overlaySaved = (parent, icon, iconA) => {
  const shadow = document.createElement('div');
  shadow.classList.add('overlay-favorite');
  //   const colDivId = document.getElementById('colDiv-' + recipeId);
  parent.appendChild(shadow);
  // OVERLAY TEXT
  const overlayText = document.createElement('h2');
  overlayText.innerHTML = 'SAVED!';
  overlayText.classList.add('saved-recipe', 'center-align');
  shadow.appendChild(overlayText);
  // CHANGE ICON AND DISABLE THE BUTTON
  icon.innerHTML = 'check_circle_outline';
  iconA.classList.add('disabled');
};

// Fire store
// Click the favorite button (searchRecipe page -> store the recipe in firestore)
const storeSavedRecipesFS = (recipe, userID) => {
  // const userID = firebase.auth().currentUser.uid;
  let data = {
    user: userID,
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    ingredients: recipe.ingredients,
    preparation: recipe.preparation,
    sourceUrl: recipe.sourceUrl,
    saved: true,
    vegan: recipe.vegan,
    vegetarian: recipe.vegetarian,
    veryHealthy: recipe.veryHealthy,
    dairyFree: recipe.dairyFree,
    glutenFree: recipe.glutenFree,
  };
  db.collection('savedRecipes').doc(recipe.title).set(data);
};
