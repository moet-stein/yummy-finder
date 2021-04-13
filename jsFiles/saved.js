// To get the data, I need to parse the string
let recipesData = JSON.parse(localStorage.getItem('recipesData'));
console.log(recipesData);

const savedRow = document.getElementById('savedRow');

const createCards = () => {
  for (let i = 0; i < recipesData.length; i++) {
    // parent <div class="row" id="savedRow">
    //child <div class="col s12 m6">
    const col = document.createElement('div');
    col.classList.add('col', 's12', 'm6', 'l4');
    savedRow.appendChild(col);
    //<div class="card"> child
    const card = document.createElement('div');
    card.classList.add('card');
    col.appendChild(card);
    //<div class="card-image">
    const cardImageDiv = document.createElement('div');
    cardImageDiv.classList.add('card-image');
    card.appendChild(cardImageDiv);
    //<img src="recipesData[i].image" alt="recipesData[i].title" />
    const cardImage = document.createElement('img');
    cardImage.setAttribute('src', recipesData[i].image);
    cardImage.setAttribute('alt', recipesData[i].title);
    cardImageDiv.appendChild(cardImage);
    //parent <div class="card-image">
    //child <a class="halfway-fab waves-effect btn-floating grey">
    const deleteA = document.createElement('a');
    deleteA.classList.add(
      'halfway-fab',
      'waves-effect',
      'btn-floating',
      'grey',
      'modal-trigger'
    );
    deleteA.setAttribute('href', '#deleteCard-' + recipesData[i].id);
    cardImageDiv.appendChild(deleteA);
    //<i class="material-icons">delete_forever</i>
    const deleteI = document.createElement('i');
    deleteI.classList.add('material-icons');
    deleteI.innerHTML = 'delete_forever';
    deleteA.appendChild(deleteI);
    // MODAL FOR DELETE
    //   parent cardImageDiv
    //   <div class="modal" id="deleteCard">
    const deleteModal = document.createElement('div');
    deleteModal.classList.add('modal');
    deleteModal.setAttribute('id', 'deleteCard-' + recipesData[i].id);
    cardImageDiv.appendChild(deleteModal);
    //<div class="modal-content">
    const deleteModalCont = document.createElement('div');
    deleteModalCont.classList.add('modal-content');
    deleteModal.appendChild(deleteModalCont);
    //<h4>TITLE</h4>
    const deleteModalTitle = document.createElement('h4');
    deleteModalTitle.classList.add('green-text', 'center-align');
    deleteModalTitle.innerHTML = recipesData[i].title;
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
    //
    //
    //
    //parent <div class="card">
    //child <div class="card-content">
    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    card.appendChild(cardContent);
    //<span class="card-title center-align">recipesData[i].title</span>
    const cardTitle = document.createElement('span');
    cardTitle.classList.add('card-title', 'center-align');
    cardTitle.innerHTML = recipesData[i].title;
    cardContent.appendChild(cardTitle);
    //parent <div class="card">
    //child <div class="card-action">
    const cardAction = document.createElement('div');
    cardAction.classList.add('card-action', 'center-align', 'my-action');
    card.appendChild(cardAction);
    //<a href="#details" class="modal-trigger">Details</a>
    const action1 = document.createElement('a');
    action1.setAttribute('href', '#details-' + recipesData[i].id);
    action1.classList.add('modal-trigger');
    action1.innerHTML = 'Details';
    cardAction.appendChild(action1);
    //parent <div class="card-action">
    //child <div class="modal" id="details">
    const detailsModal = document.createElement('div');
    detailsModal.classList.add('modal');
    detailsModal.setAttribute('id', 'details-' + recipesData[i].id);
    cardAction.appendChild(detailsModal);
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
    detailsTitle.innerHTML = recipesData[i].title;
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
    // INGREDIENTS LOOP
    if (recipesData[i].ingredients && recipesData[i].ingredients.length > 0) {
      // REMOVE DUPICATE ING. FROM INGREDIENTS ARR
      const origIngArr = recipesData[i].ingredients;
      const uniIngArr = origIngArr.filter(
        (item, index) => origIngArr.indexOf(item) === index
      );
      for (let j = 0; j < uniIngArr.length; j++) {
        //parent ul ingCollection
        //<li class="collection-item">
        const ingColLi = document.createElement('li');
        ingColLi.classList.add('collection-item');
        ingCollection.appendChild(ingColLi);
        //<span class="title">tumeric</span>
        const ingTitle = document.createElement('span');
        ingTitle.classList.add('title');
        ingTitle.innerHTML = uniIngArr[j];
        ingColLi.appendChild(ingTitle);
        //parent li ingColLi
        //child <a href="#" class="secondary-content">
        const addIngA = document.createElement('a');
        addIngA.classList.add('secondary-content');
        ingColLi.appendChild(addIngA);
        //<i class="material-icons">
        const addInI = document.createElement('i');
        addInI.classList.add('material-icons');
        addIngA.appendChild(addInI);
        //<span class="material-icons">add_circle_outline</span>
        const addInSpan = document.createElement('span');
        addInSpan.classList.add('material-icons');
        addInSpan.innerHTML = 'add_circle_outline';
        addInI.appendChild(addInSpan);
      }
    } else {
      const notFoundDiv = document.createElement('div');
      notFoundDiv.classList.add('collection-item');
      notFoundDiv.innerHTML = 'No Ingredients Info Found';
      ingCollection.appendChild(notFoundDiv);
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
    const prepArr = recipesData[i].preparation;
    if (prepArr && prepArr.length > 0) {
      for (let j = 0; j < prepArr.length; j++) {
        //parent ul prepCollection
        //<li class="collection-item">
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
      const prepColLi = document.createElement('li');
      prepColLi.classList.add('collection-item');
      prepCollection.appendChild(prepColLi);
      //<span class="title">Boil water.</span>
      const prepContent = document.createElement('span');
      prepContent.classList.add('title');
      prepContent.innerHTML = 'No Preparation Info Found';
      prepColLi.appendChild(prepContent);
    }
    const websiteA = document.createElement('a');
    websiteA.setAttribute('href', recipesData[i].sourceUrl);
    websiteA.setAttribute('target', '_blank');
    websiteA.innerHTML = 'Recipe Website';
    cardAction.appendChild(websiteA);
  }
};

// DELETING A CARD (FROM BROWSER AND LOCAL STORAGE) BY CLICKING THE DELETE_FOREVER BUTTON
const deleteCard = (i) => {
  recipesData.splice(i, 1);
  localStorage.setItem('recipesData', JSON.stringify(recipesData));
  location.reload();
};

// CALLING FUNCTION TO DISPLAY DATA FROM LOCAL STORAGE WHEN REFRESHING
createCards();

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
