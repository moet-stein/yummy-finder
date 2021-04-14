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

// ADD NEW RECIPES FUNCTIONS
const addNewRecipes = async () => {
  // GETTING DATA FROM API (CALLING THE FUNCTION)
  const recipes = await fetchRecipes();
  console.log(recipes);
  // 1. first store the searched recipes into local storage
  // 2. make elements by DOM with the localStorage data 'searchedRecipes'

  // 1. STORE INGREDIENTS INFO into local storage
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
  createCards(searchedRecipes);
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
    createCards(searchedRecipes);
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

// FILTER INIT
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, options);
});

// vegan vegetarian
document
  .getElementById('vegeVegan')
  .addEventListener('change', function (event) {
    console.log(`event`, event.target.value);
  });
// glutenFree
document
  .getElementById('glutenFree')
  .addEventListener('change', function (event) {
    console.log(`event`, event.target.value);
  });
// dairyFree
document
  .getElementById('dairyFree')
  .addEventListener('change', function (event) {
    console.log(`event`, event.target.value);
  });

// healthyMeal
document
  .getElementById('healthyMeal')
  .addEventListener('change', function (event) {
    console.log(`event`, event.target.value);
  });
