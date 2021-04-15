const myKey = config.MY_KEY;

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

// let gfChekced = false;
// let dfChecked = false;
const checkboxes = {
  glutenFree: false,
  dairyFree: false,
  veryHealthy: false,
};

// GLUTEN-FREE CHECKBOX, CHECK & UNCHECK
const gfCheckbox = document.querySelector('input[name=glutenFree]');
gfCheckbox.addEventListener('change', function () {
  if (this.checked) {
    checkboxes.glutenFree = true;
    // filteringRecipes(searchedRecipes);
  } else {
    checkboxes.glutenFree = false;
    // filteringRecipes(searchedRecipes);
  }
  filteringRecipes(searchedRecipes);
});

//  DAIRY-FREE CHECKBOX, CHECK & UNCHECK
const dfCheckbox = document.querySelector('input[name=dairyFree]');
dfCheckbox.addEventListener('change', function () {
  if (this.checked) {
    checkboxes.dairyFree = true;
    // filteringRecipes(searchedRecipes);
  } else {
    checkboxes.dairyFree = false;
    // filteringRecipes(searchedRecipes);
  }
  filteringRecipes(searchedRecipes);
});

//  very-heathy CHECKBOX, CHECK & UNCHECK
const healthyCheckbox = document.querySelector('input[name=veryHealthy]');
healthyCheckbox.addEventListener('change', function () {
  if (this.checked) {
    checkboxes.veryHealthy = true;
    // filteringRecipes(searchedRecipes);
  } else {
    checkboxes.veryHealthy = false;
    // filteringRecipes(searchedRecipes);
  }
  filteringRecipes(searchedRecipes);
});

const filteringRecipes = (recipes) => {
  // console.log(recipes);
  // let filteredRecipes = [...recipes];
  removeHide(recipes);
  if (checkboxes.glutenFree && checkboxes.dairyFree && checkboxes.veryHealthy) {
    const glutenDairyHealthy = recipes.filter(
      (recipe) =>
        recipe.glutenFree === false ||
        recipe.dairyFree === false ||
        recipe.veryHealthy === false
    );
    hideOtherCards(glutenDairyHealthy);
  } else if (
    !checkboxes.glutenFree &&
    checkboxes.dairyFree &&
    checkboxes.veryHealthy
  ) {
    const dairyHealthy = recipes.filter(
      (recipe) => recipe.dairyFree === false || recipe.veryHealthy === false
    );
    hideOtherCards(dairyHealthy);
  } else if (
    checkboxes.glutenFree &&
    !checkboxes.dairyFree &&
    checkboxes.veryHealthy
  ) {
    const glutenHealthy = recipes.filter(
      (recipe) => recipe.glutenFree === false || recipe.veryHealthy === false
    );
    hideOtherCards(glutenHealthy);
  } else if (
    checkboxes.glutenFree &&
    checkboxes.dairyFree &&
    !checkboxes.veryHealthy
  ) {
    const glutenDairy = recipes.filter(
      (recipe) => recipe.glutenFree === false || recipe.dairyFree === false
    );
    hideOtherCards(glutenDairy);
  } else if (
    checkboxes.glutenFree &&
    !checkboxes.dairyFree &&
    !checkboxes.veryHealthy
  ) {
    const onlyGluten = recipes.filter((recipe) => recipe.glutenFree === false);
    hideOtherCards(onlyGluten);
  } else if (
    !checkboxes.glutenFree &&
    checkboxes.dairyFree &&
    !checkboxes.veryHealthy
  ) {
    const onlyDairy = recipes.filter((recipe) => recipe.dairyFree === false);
    hideOtherCards(onlyDairy);
  } else if (
    !checkboxes.glutenFree &&
    !checkboxes.dairyFree &&
    checkboxes.veryHealthy
  ) {
    const onlyHealthy = recipes.filter(
      (recipe) => recipe.veryHealthy === false
    );
    hideOtherCards(onlyHealthy);
  } else {
    removeHide(recipes);
  }

  // if (checkboxes.glutenFree === true && checkboxes.dairyFree === true) {
  //   const noGfDf = recipes.filter((recipe) => {
  //     return recipe.glutenFree === false || recipe.dairyFree === false;
  //   });
  //   removeHide(recipes);
  //   hideOtherCards(noGfDf);
  // } else if (checkboxes.glutenFree === true && checkboxes.dairyFree === false) {
  //   const noGf = recipes.filter((recipe) => recipe.glutenFree === false);
  //   removeHide(recipes);
  //   hideOtherCards(noGf);
  // } else if (checkboxes.dairyFree === true && checkboxes.glutenFree === false) {
  //   const noDf = recipes.filter((recipe) => recipe.dairyFree === false);
  //   removeHide(recipes);
  //   hideOtherCards(noDf);
  // } else {
  //   removeHide(recipes);
  // }
};

const hideOtherCards = (recipes) => {
  recipes.forEach((x) => {
    const card = document.getElementById(`colDiv-${x.id}`);
    card.classList.add('my-hide-card');
  });
};
const removeHide = (recipes) => {
  recipes.forEach((x) => {
    const card = document.getElementById(`colDiv-${x.id}`);
    card.classList.remove('my-hide-card');
  });
};

// GETTING RID OF THE DATA THAT IS IN searchedRecipes and has a key save == true,
// But the id can't be found in the recipesData
const removeDeletedCards = () => {
  let hasOrangeLayer = searchedRecipes.filter((recipe) => 'saved' in recipe);
  let savedIdArr = recipesData.map((recipe) => recipe.id);
  hasOrangeLayer.forEach((recipe) => {
    let isThereRecipe = savedIdArr.includes(recipe.id);
    if (!isThereRecipe) {
      // IF there is no recipe in the recipesData(saved recipes), remove this recipe from searchedRecipe
      let index = searchedRecipes.findIndex((x) => x.id === recipe.id);
      searchedRecipes.splice(index, 1);
      localStorage.setItem('searchedRecipes', JSON.stringify(searchedRecipes));
      createCards(searchedRecipes);
      location.reload();
    }
  });
};

// ADD NEW RECIPES FUNCTIONS
const addNewRecipes = async () => {
  // GETTING DATA FROM API (CALLING THE FUNCTION)
  const recipes = await fetchRecipes();
  console.log(recipes);
  // 1. first store the searched recipes into local storage
  // 2. make elements by DOM with the localStorage data 'searchedRecipes'

  // 1. STORE INGREDIENTS INFO into local storage
  //   res.data.results[0].analyzedInstructions[0].steps[0].ingredients[0].name
  recipes.forEach((recipe) => {
    let ingredients = [];
    let preparation = [];
    if (recipe.analyzedInstructions.length > 0) {
      const steps = recipe.analyzedInstructions[0].steps;
      steps.forEach((step) => {
        let ingredientsList = step.ingredients;
        let stepsList = step.step;
        preparation.push(stepsList);
        ingredientsList.forEach((ing) => {
          ingredients.push(ing.name);
        });
      });
    }
    // Storing the searched recipes data into searchedRecipe at LocalStorage
    storeData(recipe, searchedRecipes, ingredients, preparation);
  });
  // UPDATE LOCALSTORAGE'S searchedRecipes Data
  localStorage.setItem('searchedRecipes', JSON.stringify(searchedRecipes));

  // 2.
  // MAKE ELEMENTS BY DOM with searchedRecipes Data from localStorage
  createCards(searchedRecipes);
  removeDeletedCards();
};

// Get an array of recipes with axios(and with async await func)
// This data includes ID that can be used to request the data of ingredients as below (getInfredients())
const fetchRecipes = async () => {
  try {
    const res = await axios.get(
      'https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&sort=random&apiKey=' +
        myKey
    );
    return res.data.results;
    //return res.data.results;
  } catch (e) {
    console.log(e);
  }
};

// CALL FUNCTION to SHOW THE DATA WHEN LOADING THE PAGE
// IF there are no recipes yet (first time to visit website or deleted all recipes), call function to fetch api and show cards
// ELSE show cards from local storage
if (searchedRecipes.length === 0) {
  addNewRecipes();
} else {
  createCards(searchedRecipes);
  removeDeletedCards();
}

// CLICKING THE BUTTON AND CALLING THE FUNC ABOVE(addNewRecipes)
newRecipesBtn.addEventListener('click', () => {
  searchedRecipes = [];
  cards.innerHTML = '';
  addNewRecipes();
});

// MATERIALIZE FUNCTION
const modalOptions = {
  opacity: 0.4,
  outDuration: 350,
};

// MODAL FOR RECIPES PAGE
document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.modal');
  const instances = M.Modal.init(elems, modalOptions);
});

// SIDE NAV
const options = {
  edge: 'left',
};
document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.sidenav');
  const instances = M.Sidenav.init(elems, options);
});

// FILTER INIT
document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('select');
  const instances = M.FormSelect.init(elems, options);
});

// vegan vegetarian
document
  .getElementById('vegeVegan')
  .addEventListener('change', function (event) {
    console.log(`event`, event.target.value);
  });
