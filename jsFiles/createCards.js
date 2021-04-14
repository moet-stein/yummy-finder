let onRecipesPage = true;

// CREATING RECIPE CARDS FROM ARRAY (GOT DATA FROM LOCAL STORAGE)
const createCards = (recipes) => {
  for (let i = 0; i < recipes.length; i++) {
    let colDiv = document.createElement('div');
    colDiv.setAttribute('id', 'colDiv-' + recipes[i].id);
    let colSize = onRecipesPage ? 'l6' : 'l4';
    colDiv.classList.add(
      'col',
      's12',
      'm12',
      colSize,
      'col-Div',
      'id-' + recipes[i].id
    );
    cards.appendChild(colDiv);
    // 2
    const card = document.createElement('div');
    card.classList.add('card');
    colDiv.appendChild(card);
    // 3
    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');
    card.appendChild(cardImage);
    // 3-1
    const image = document.createElement('img');
    image.setAttribute('src', recipes[i].image);
    image.setAttribute('alt', recipes[i].title);
    cardImage.appendChild(image);

    onRecipesPage
      ? createIcon(cardImage, 'favorite', recipes[i].id)
      : createIcon(cardImage, 'delete_forever', recipes[i].id);

    // Element that will have orange overlayed after clicking favorite icon
    const colDivId = document.getElementById('colDiv-' + recipes[i].id);
    //  Clicked icon (favorite or delete)
    const cardIcon = document.getElementById('cardIcon-' + recipes[i].id);
    //   Clicked icon's parent a (favorite or delete)
    const cardIconA = document.getElementById('cardIconA-' + recipes[i].id);

    // IF THE USER IS ON THE SEARCH RECIPES PAGE
    // WORKS FOR SAVING RECIPES
    if (onRecipesPage) {
      cardIcon.addEventListener('click', () => {
        // Storing the clicked recipe data into localStorage recipesData
        storeSavedRecipes(recipes[i]);
        // OVERLAYING COLOR & DISABLE THE BUTTON FOR THE RECIPE THAT IS SAVED
        overlaySaved(colDivId, cardIcon, cardIconA);

        cardIcon.removeEventListener('click', () =>
          storeSavedRecipes(recipes[i])
        );
      });
      // When reloading with saved recipe, overlay the recipe which has 'saved' key
      if ('saved' in recipes[i]) {
        overlaySaved(colDivId, cardIcon, cardIconA);
      }
    }
    // IF THE USER IS ON THE SAVE RECIPES PAGE
    // WORKS FOR DELETING RECIPE
    if (!onRecipesPage) {
      cardIconA.classList.add('modal-trigger');
      cardIconA.setAttribute('href', '#deleteCard-' + recipes[i].id);
      createDeleteModal(cardImage, recipes[i], i);
    }

    //4 Card content
    const content = document.createElement('div');
    content.classList.add('card-content');
    card.appendChild(content);
    // 4-1
    const title = document.createElement('span');
    title.classList.add('card-title', 'center-align');
    title.innerHTML = recipes[i].title;
    content.appendChild(title);
    // 5
    const action = document.createElement('div');
    action.classList.add('card-action', 'center-align', 'my-action');
    card.appendChild(action);

    //   MODAL
    // 5-1-1
    const ingredientsA = document.createElement('a');
    ingredientsA.setAttribute('href', '#showIngredients-' + recipes[i].id);
    ingredientsA.classList.add('modal-trigger');
    ingredientsA.innerHTML = 'Ing. & Prep.';
    action.appendChild(ingredientsA);

    //parent <div class="card-action">
    //child <div class="modal" id="details">
    const detailsModal = document.createElement('div');
    detailsModal.classList.add('modal');
    detailsModal.setAttribute('id', 'showIngredients-' + recipes[i].id);
    action.appendChild(detailsModal);
    //<div class="modal-content">
    const detailsModalContent = document.createElement('div');
    detailsModalContent.classList.add('modal-content');
    detailsModal.appendChild(detailsModalContent);
    //   <a href="#" class="modal-close"><i class="material-icons">cancel</i></a>
    const detailsModalCloseA = document.createElement('a');
    detailsModalCloseA.classList.add('modal-close', 'my-right-align');
    detailsModalContent.appendChild(detailsModalCloseA);
    const detailsModalCloseI = document.createElement('i');
    detailsModalCloseI.classList.add('material-icons');
    detailsModalCloseI.innerHTML = 'cancel';
    detailsModalCloseA.appendChild(detailsModalCloseI);

    //   parent detailsModalContent
    //  <h4 class="green-text center-align">TITLE</h4>
    const detailsTitle = document.createElement('h4');
    detailsTitle.classList.add('green-text', 'center-align');
    detailsTitle.innerHTML = recipes[i].title;
    detailsModalContent.appendChild(detailsTitle);
    //   parent detailsModalContent
    //child <div class="row">
    const detailsRow = document.createElement('div');
    detailsRow.classList.add('row');
    detailsModalContent.appendChild(detailsRow);
    //<div class="col s6">
    const detailsCol = document.createElement('div');
    detailsCol.classList.add('col', 's6');
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

    // console.log(recipes[i]);
    if (recipes[i].ingredients && recipes[i].ingredients.length > 0) {
      // REMOVE DUPICATE ING. FROM INGREDIENTS ARR
      const origIngArr = recipes[i].ingredients;
      const uniIngArr = origIngArr.filter(
        (item, index) => origIngArr.indexOf(item) === index
      );
      // Collection items
      for (let j = 0; j < uniIngArr.length; j++) {
        const ingListsLi = document.createElement('li');
        ingListsLi.classList.add('collection-item');
        ingCollection.appendChild(ingListsLi);
        // first content for the collection item
        const ingName = document.createElement('span');
        ingName.innerHTML = uniIngArr[j];
        ingListsLi.appendChild(ingName);
        if (!onRecipesPage) {
          createAddBtn(ingListsLi);
        }
      }
    } else {
      displayNotFound(ingCollection, 'No Ingredients Info Found');
    }

    //  PREPARATION COLLECTION
    //parent row detailsRow
    //child <div class="col s6">
    const prepCol = document.createElement('div');
    prepCol.classList.add('col', 's6');
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
    const prepArr = recipes[i].preparation;
    if (prepArr && prepArr.length > 0) {
      for (let j = 0; j < prepArr.length; j++) {
        const prepColLi = document.createElement('li');
        prepColLi.classList.add('collection-item');
        prepCollection.appendChild(prepColLi);
        //<span class="title">Boil water.</span>
        const prepContent = document.createElement('span');
        prepContent.classList.add('title');
        prepContent.innerHTML = [j + 1] + '. ' + prepArr[j];
        prepColLi.appendChild(prepContent);
      }
    } else {
      displayNotFound(prepColLi, 'No Preparation Info Found');
    }
    const websiteA = document.createElement('a');
    websiteA.setAttribute('href', recipes[i].sourceUrl);
    websiteA.setAttribute('target', '_blank');
    websiteA.innerHTML = 'Recipe Website';
    action.appendChild(websiteA);
  }
};

const createDeleteModal = (parent, recipe, i) => {
  const deleteModal = document.createElement('div');
  deleteModal.classList.add('modal');
  deleteModal.setAttribute('id', 'deleteCard-' + recipe.id);
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
  deleteModal.appendChild(deleteModalFooter);
  // <a id="deleting" class="btn orange">Delete</a>
  const deleteModalBtn = document.createElement('a');
  deleteModalBtn.setAttribute('id', 'deleting');
  deleteModalBtn.setAttribute('onclick', 'deleteCard(' + i + ')');
  deleteModalBtn.classList.add('btn', 'orange');
  deleteModalBtn.innerHTML = 'DELETE';
  deleteModalFooter.appendChild(deleteModalBtn);
  // <a href="#" class="modal-close btn orange">Cancel</a>
  const deleteModalCancelBtn = document.createElement('a');
  deleteModalCancelBtn.classList.add('modal-close', 'btn', 'grey');
  deleteModalCancelBtn.innerHTML = 'CANCEL';
  deleteModalFooter.appendChild(deleteModalCancelBtn);
};

// DELETING A CARD (FROM BROWSER AND LOCAL STORAGE) BY CLICKING THE DELETE_FOREVER BUTTON
const deleteCard = (i) => {
  recipesData.splice(i, 1);
  localStorage.setItem('recipesData', JSON.stringify(recipesData));
  location.reload();
};

const displayNotFound = (parent, message) => {
  const notFoundDiv = document.createElement('div');
  notFoundDiv.classList.add('collection-item');
  notFoundDiv.innerHTML = message;
  parent.appendChild(notFoundDiv);
};

const createIcon = (parent, iconName, id) => {
  const iconA = document.createElement('a');
  iconA.setAttribute('id', 'cardIconA-' + id);
  //favorite.setAttribute('href', '#');
  let iconColor = iconName === 'favorite' ? 'orange' : 'grey';
  iconA.classList.add('halfway-fab', 'btn-floating', iconColor, 'lighten-3');
  parent.appendChild(iconA);
  // 3-2-1
  const iconI = document.createElement('i');
  iconI.setAttribute('id', 'cardIcon-' + id);
  iconI.classList.add('material-icons');
  iconI.innerHTML = iconName;
  iconA.appendChild(iconI);
};

const createAddBtn = (parent) => {
  //child <a href="#" class="secondary-content">
  const addIngA = document.createElement('a');
  addIngA.classList.add('secondary-content');
  parent.appendChild(addIngA);
  //<i class="material-icons">
  const addInI = document.createElement('i');
  addInI.classList.add('material-icons');
  addIngA.appendChild(addInI);
  //<span class="material-icons">add_circle_outline</span>
  const addInSpan = document.createElement('span');
  addInSpan.classList.add('material-icons');
  addInSpan.innerHTML = 'add_circle_outline';
  addInI.appendChild(addInSpan);
};

const overlaySaved = (parent, icon, iconA) => {
  const shadow = document.createElement('div');
  shadow.classList.add('overlay-favorite');
  //   const colDivId = document.getElementById('colDiv-' + recipeId);
  parent.appendChild(shadow);
  // OVERLAY TEXT
  const overlayText = document.createElement('h2');
  overlayText.innerHTML = 'SAVED!';
  overlayText.classList.add('saved-recipe');
  shadow.appendChild(overlayText);
  // CHANGE ICON AND DISABLE THE BUTTON
  icon.innerHTML = 'check_circle_outline';
  iconA.classList.add('disabled');
};

const storeSavedRecipes = (recipe) => {
  storeData(
    recipe,
    recipesData,
    recipe.ingredients ? recipe.ingredients : [],
    recipe.preparation
  );
  recipe['saved'] = true;
  // STROING FAVORITE RECIPE DATA INTO LOCAL STORAGE
  localStorage.setItem('recipesData', JSON.stringify(recipesData));
  localStorage.setItem('searchedRecipes', JSON.stringify(searchedRecipes));
};
