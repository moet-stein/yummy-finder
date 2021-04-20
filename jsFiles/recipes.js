const myKey = config.MY_KEY;

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

// *************** FILTERING *************************//

// const addEvents = (recipesData) => {
//   // VEGETARIAN VEGAN DROPDOWN
//   // Every time the dropdown is selected, the filtering function is called
//   document.getElementById('vegeVegan').addEventListener('change', () => {
//     filteringRecipes(recipesData);
//   });

//   // READING CHECKBOXES
//   // Every time any checkbox is checked or unchecked, the filtering function is called
//   document.querySelectorAll('input[name=checkbox]').forEach((x) => {
//     x.addEventListener('change', () => {
//       filteringRecipes(recipesData);
//     });
//   });
// };
// VEGETARIAN VEGAN DROPDOWN
// Every time the dropdown is selected, the filtering function is called
document.getElementById('vegeVegan').addEventListener('change', () => {
  filteringRecipes(searchedRecipes);
});

// READING CHECKBOXES
// Every time any checkbox is checked or unchecked, the filtering function is called
document.querySelectorAll('input[name=checkbox]').forEach((x) => {
  x.addEventListener('change', () => {
    filteringRecipes(searchedRecipes);
  });
});

// FILTERING
// Listening all the values that have to filter with, and calling createCards function with the filtered recipes
const filteringRecipes = (recipes) => {
  let checkedValue = [];
  // CREATING ARRAY OF CHECKBOXES' VALUE
  const checkedBoxes = Array.from(
    document.querySelectorAll('input[name=checkbox]:checked')
  );
  checkedBoxes.map((x) => checkedValue.push(x.value));
  // CREATING VEGE VEGAN VARIABLE
  const vegeVegan = document.getElementById('vegeVegan').value;
  // WHEN THE VEGETARIAN OR VEGAN IS CHOSEN, PUSH THE VALUE INTO THE CHECKEDvALUE
  // SO THAT CHECKED VALUE ARRAY CAN HAVE ALL THE VALUE THAT NEEDS TO BE CHECKED AND FILTER THE ORIGINAL RECIPE ARRAY
  if (vegeVegan === 'vegetarian' || vegeVegan === 'vegan') {
    checkedValue.push(vegeVegan);
  }
  console.log(checkedValue);

  // FILTERING RECIPES; CREATING CARDS
  // This filteredRecipes are updated each time of forEach loop
  let filteredRecipes = [];
  // If nothing is checked (everthing is unchecked), just create cards with the original data
  if (checkedValue.length === 0) {
    createCards(recipes);
  } else {
    // Loop through the checkbox values
    checkedValue.forEach((value) => {
      if (filteredRecipes.length === 0) {
        filteredRecipes = recipes.filter((recipe) => recipe[value]);
      } else {
        filteredRecipes = filteredRecipes.filter((recipe) => recipe[value]);
      }
      return filteredRecipes;
    });
    createCards(filteredRecipes);
  }
  // If there are no recipes after filtering, show the picture with no recipes found
  const noRecipesFound = document.getElementById('noRecipesFound');
  if (checkedValue.length > 0 && filteredRecipes.length === 0) {
    noRecipesFound.classList.remove('no-recipes-hidden');
  } else {
    noRecipesFound.classList.add('no-recipes-hidden');
  }
};

//***********************/ FILTERING END **************************//

//
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
  resetFilter();
  searchedRecipes = [];
  //localStorage.setItem('searchedRecipes', JSON.stringify(searchedRecipes));
  cards.innerHTML = '';
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
      `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&sort=random&apiKey=${myKey}`
    );

    return res.data.results;
    //return res.data.results;
  } catch (e) {
    console.log(e);
  }
};

// RESET FILTER
const resetFilter = () => {
  document.getElementById('vegeVegan').options.selectedIndex = '0';
  document
    .querySelectorAll('input[name=checkbox]')
    .forEach((checkbox) => (checkbox.checked = false));
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

const newRecipesBtn = document.getElementById('newRecipes');
// CLICKING THE BUTTON AND CALLING THE FUNC ABOVE(addNewRecipes)
newRecipesBtn.addEventListener('click', () => {
  // searchedRecipes = [];
  // localStorage.setItem('searchedRecipes', JSON.stringify(searchedRecipes));
  // cards.innerHTML = '';
  addNewRecipes();
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

// PARALLAX
document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.parallax');
  const instances = M.Parallax.init(elems, options);
});

// CAROUSEL
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.carousel');
  var instance = M.Carousel.init(elems, options);
});
