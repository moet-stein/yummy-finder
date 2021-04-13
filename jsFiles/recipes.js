const myKey = config.MY_KEY;

const cards = document.getElementById('cards');
const newRecipesBtn = document.getElementById('newRecipes');

// STORING SEARCHED RECIEPS in LOCAL STORAGE
let searchedRecipes = localStorage.getItem('searchedRecipes')
  ? JSON.parse(localStorage.getItem('searchedRecipes'))
  : [];

// STORING SAVED RECIPES  in LOCAl STORAGE
let recipesData = localStorage.getItem('recipesData')
  ? JSON.parse(localStorage.getItem('recipesData'))
  : [];

// FUNCTION THAT TELLS HOW TO STORE DATA (WILL BE PASSED INTO LOCALSTORAGE AFTER CALLING THIS FUNCTION )
const storeData = (recipe, pushedTo, ingredients, preparation) => {
  let recipeObject = {};
  recipeObject['id'] = recipe.id;
  recipeObject['title'] = recipe.title;
  recipeObject['image'] = recipe.image;
  recipeObject['vegan'] = recipe.vegan;
  recipeObject['vegetarian'] = recipe.vegetarian;
  recipeObject['glutenFree'] = recipe.glutenFree;
  recipeObject['dairyFree'] = recipe.dairyFree;
  recipeObject['veryHealthy'] = recipe.veryHealthy;
  recipeObject['sourceUrl'] = recipe.sourceUrl;
  ingredients && ingredients.length > 0
    ? (recipeObject['ingredients'] = [...ingredients])
    : (recipeObject['ingredients'] = null);
  preparation && preparation.length > 0
    ? (recipeObject['preparation'] = [...preparation])
    : (recipeObject['preparation'] = null);
  pushedTo.push(recipeObject);
};

// CREATING RECIPE CARDS FROM ARRAY (GOT DATA FROM LOCAL STORAGE)
const createCards1 = (searchedRecipes) => {
  for (let i = 0; i < searchedRecipes.length; i++) {
    let colDiv = document.createElement('div');
    colDiv.setAttribute('id', 'colDiv');
    colDiv.classList.add(
      'col',
      's12',
      'm12',
      'l6',
      'col-Div',
      'id-' + searchedRecipes[i].id
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
    image.setAttribute('src', searchedRecipes[i].image);
    image.setAttribute('alt', searchedRecipes[i].title);
    cardImage.appendChild(image);
    // 3-2
    const favorite = document.createElement('a');
    //favorite.setAttribute('href', '#');
    favorite.classList.add(
      'halfway-fab',
      'btn-floating',
      'orange',
      'lighten-3'
    );
    cardImage.appendChild(favorite);
    // 3-2-1
    const favoriteIcon = document.createElement('i');
    favoriteIcon.classList.add('material-icons');
    favoriteIcon.innerHTML = 'favorite';
    favorite.appendChild(favoriteIcon);
    // FAVORITE ICON CLICKED EVENTLISTENER

    // OVERLAYING COLOR & DISABLE THE BUTTON FOR THE RECIPE THAT IS SAVED(WHEN FAVORITE ICON IS CLICKED)
    const overlaySaved = () => {
      const shadow = document.createElement('div');
      shadow.classList.add('overlay-favorite');
      let colDivId = document.querySelector('.id-' + searchedRecipes[i].id);
      colDivId.appendChild(shadow);
      // OVERLAY TEXT
      const overlayText = document.createElement('h2');
      overlayText.innerHTML = 'SAVED!';
      overlayText.classList.add('saved-recipe');
      shadow.appendChild(overlayText);
      // CHANGE ICON AND DISABLE THE BUTTON
      favoriteIcon.innerHTML = 'check_circle_outline';
      favorite.classList.add('disabled');
    };

    favoriteIcon.addEventListener('click', () => {
      storeData(
        searchedRecipes[i],
        recipesData,
        searchedRecipes[i].ingredients ? searchedRecipes[i].ingredients : [],
        searchedRecipes[i].preparation
      );
      searchedRecipes[i]['saved'] = true;
      // STROING FAVORITE RECIPE DATA INTO LOCAL STORAGE
      localStorage.setItem('recipesData', JSON.stringify(recipesData));
      localStorage.setItem('searchedRecipes', JSON.stringify(searchedRecipes));
      // OVERLAYING COLOR & DISABLE THE BUTTON FOR THE RECIPE THAT IS SAVED
      overlaySaved();
    });
    if ('saved' in searchedRecipes[i]) {
      overlaySaved();
    }
    //4 Card content
    const content = document.createElement('div');
    content.classList.add('card-content');
    card.appendChild(content);
    // 4-1
    const title = document.createElement('span');
    title.classList.add('card-title', 'center-align');
    title.innerHTML = searchedRecipes[i].title;
    content.appendChild(title);
    // 5
    const action = document.createElement('div');
    action.classList.add('card-action', 'center-align', 'my-action');
    card.appendChild(action);

    //   MODAL
    // 5-1-1
    const ingredientsA = document.createElement('a');
    ingredientsA.setAttribute(
      'href',
      '#showIngredients-' + searchedRecipes[i].id
    );
    ingredientsA.classList.add('modal-trigger');
    ingredientsA.innerHTML = 'Ing. & Prep.';
    action.appendChild(ingredientsA);

    //parent <div class="card-action">
    //child <div class="modal" id="details">
    const detailsModal = document.createElement('div');
    detailsModal.classList.add('modal');
    detailsModal.setAttribute('id', 'showIngredients-' + searchedRecipes[i].id);
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
    detailsTitle.innerHTML = searchedRecipes[i].title;
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

    // console.log(searchedRecipes[i]);
    if (
      searchedRecipes[i].ingredients &&
      searchedRecipes[i].ingredients.length > 0
    ) {
      // REMOVE DUPICATE ING. FROM INGREDIENTS ARR
      const origIngArr = searchedRecipes[i].ingredients;
      const uniIngArr = origIngArr.filter(
        (item, index) => origIngArr.indexOf(item) === index
      );
      // Collection items
      for (let j = 0; j < uniIngArr.length; j++) {
        const ingListsLi = document.createElement('li');
        ingListsLi.classList.add('collection-item');
        ingCollection.appendChild(ingListsLi);
        // first content for the collection item
        const ingName = document.createElement('div');
        ingName.innerHTML = uniIngArr[j];
        ingListsLi.appendChild(ingName);
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
    const prepArr = searchedRecipes[i].preparation;
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
    websiteA.setAttribute('href', searchedRecipes[i].sourceUrl);
    websiteA.setAttribute('target', '_blank');
    websiteA.innerHTML = 'Recipe Website';
    action.appendChild(websiteA);
  }
};

// ADD NEW RECIPES FUNCTIONS
const addNewRecipes = async () => {
  // GETTING DATA FROM API (CALLING THE FUNCTION)
  const recipes = await fetchRecipes();
  console.log(recipes);
  // 1. first store the searched recipes into local storage
  // 2. make elements by DOM with the localStorage data 'searchedRecipes'

  // STORE INGREDIENTS INFO
  //   res.data.results[0].analyzedInstructions[0].steps[0].ingredients[0].name
  for (let i = 0; i < recipes.length; i++) {
    let ingredients = [];
    let preparation = [];
    if (recipes[i].analyzedInstructions.length > 0) {
      const steps = recipes[i].analyzedInstructions[0].steps;
      for (let j = 0; j < steps.length; j++) {
        let ingredientsList = steps[j].ingredients;
        let stepsList = steps[j].step;
        preparation.push(stepsList);
        for (let k = 0; k < ingredientsList.length; k++) {
          ingredients.push(ingredientsList[k].name);
        }
      }
    }
    // Storing the searched recipes data into searchedRecipe at LocalStorage
    storeData(recipes[i], searchedRecipes, ingredients, preparation);
  }
  // UPDATE LOCALSTORAGE'S searchedRecipes Data
  localStorage.setItem('searchedRecipes', JSON.stringify(searchedRecipes));

  // 2.
  // MAKE ELEMENTS BY DOM with searchedRecipes Data from localStorage
  createCards1(searchedRecipes);
};

// Get an array of recipes with axios(and with async await func)
// This data includes ID that can be used to request the data of ingredients as below (getInfredients())
const fetchRecipes = async () => {
  try {
    const res = await axios.get(
      'https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&intolerances=gluten&sort=random&apiKey=' +
        myKey
    );
    return res.data.results;
    //return res.data.results;
  } catch (e) {
    console.log(e);
  }
};

// CALL FUNCTION to SHOW THE DATA WHEN LOADING THE PAGE
if (searchedRecipes.length === 0) {
  addNewRecipes();
} else {
  createCards1(searchedRecipes);
}

// GETTING RID OF THE DATA THAT IS IN searchedRecipes and has a key save == true,
// But the id can't be found in the recipesData
let hasOrangeLayer = searchedRecipes.filter((recipe) => 'saved' in recipe);
let savedIdArr = recipesData.map((recipe) => recipe.id);
for (let i = 0; i < hasOrangeLayer.length; i++) {
  let isThereRecipe = savedIdArr.includes(hasOrangeLayer[i].id);
  if (!isThereRecipe) {
    // IF there is no recipe in the recipesData(saved recipes), remove this recipe from searchedRecipe
    let index = searchedRecipes.findIndex((x) => x.id === hasOrangeLayer[i].id);
    searchedRecipes.splice(index, 1);
    localStorage.setItem('searchedRecipes', JSON.stringify(searchedRecipes));
    createCards1(searchedRecipes);
    location.reload();
  }
}

// CLICKING THE BUTTON AND CALLING THE FUNC ABOVE(addNewRecipes)
newRecipesBtn.addEventListener('click', () => {
  searchedRecipes = [];
  cards.innerHTML = '';
  addNewRecipes();
});

// MATERIALIZE FUNCTION
var modalOptions = {
  opacity: 0.4,
  outDuration: 350,
};

// MODAL FOR RECIPES PAGE
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, modalOptions);
});

// SIDE NAV
var options = {
  edge: 'left',
};
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, options);
});
