// querySelectors
let modal;
const recipeCardContainer = document.querySelector('.recipes-container');
const myFavoritesNav = document.querySelector('#my-favorites-nav');
const allRecipesNav = document.querySelector('#all-recipes-nav');
const myPantryNav = document.querySelector('#my-pantry-nav');
const whatsCookinNav = document.querySelector('#whats-cookin-nav');
const instructionsBtn = document.getElementById('preview-btn');
const closeModalBtn = document.querySelector('.close');
const searchContainer = document.querySelector('#search-container');
const pantryContainer = document.querySelector('.pantry-container');

let user = new User(usersData[0], ingredientsData);
let allRecipes = []
let ingredientsInventory = new IngredientsInventory(ingredientsData);
let recipeBox = new RecipeBox(recipeData);

// eventListeners
window.onload = loadPage();
window.addEventListener('click', closeModal);

myFavoritesNav.addEventListener('click', showFavorites);
allRecipesNav.addEventListener('click', showAllRecipes);
myPantryNav.addEventListener('click', showMyPantry);
whatsCookinNav.addEventListener('click', showWhatsCookin);

recipeCardContainer.addEventListener('click', function() {
  addRecipeToFavorites(event.target);
  addRecipeToWhatsCookin(event.target);
  openModel(event);
});

function loadPage() {
  recipeData.forEach(recipe => {
    allRecipes.push(new Recipe(recipe));
  })
  displayRecipes(allRecipes);


}

function highlightPageOnMenu(id) {
  let navButton = document.getElementById(id);

  if (navButton.style.color === 'black') {
    navButton.style.color = '#d54215';
  } else {
    navButton.style.color = 'black';
  }
}

function displayRecipes(recipes) {
  recipes.forEach(recipe => {
    let recipeCard = `<div class="recipe-card">
      <div class="recipe-img-box">
        <img src=${recipe.image} alt="recipe image" class="recipe-display-img">
      </div>
      <div class="recipe-action-btns flex-row">
        <button id="favorite-btn"><img src="../assets/heart-icon-before.png" id="favorite-btn-${recipe.id}" alt="favorite button"></button>
        <button id="whats-cookin-btn"><img src="../assets/plus-icon.png" id="whats-cookin-btn-${recipe.id}" alt="favorite button"></button>
      </div>
      <h3>${recipe.name}</h3>
      <button class="show-recipe-btn-${recipe.id}" id="show-recipe-btn"><h3 class="show-recipe-btn-${recipe.id}">Show Recipe</h3></button>
        <div class="modal">
          <div class="modal-content flex-column">
            <div class="modal-header">
              <div>
                <img src=${recipe.image} alt="recipe image" class="modal-banner">
              </div>
            </div>
            <div class="modal-body flex-column">
            <div class="modal-header-text flex-row">
              <button id="favorite-btn"><img src="../assets/heart-icon-before.png" id="favorite-btn-${recipe.id}" alt="favorite button"></button>
              <h1>${recipe.name}</h1>
              <button id="whats-cookin-btn"><img src="../assets/plus-icon.png" id="whats-cookin-btn-${recipe.id}" alt="favorite button"></button>
            </div>
              <div class="flex-row">
              <div class="card-effect"
                <h2>Ingredients</h2>
                <p class="ingredients-display">${recipe.makeIngredients(ingredientsData)}</p>
                <p><b>Total Cost of Ingredients</b></p>
                <p class="ingredients-display">${recipe.calculateCost(ingredientsData)}</p>
              </div>
                <div class="card-effect"
                  <h2>How To Cook This</h2>
                  <p>${recipe.getInstructions()}<p>
                </div>
              </div>
            </div>
           </div>
         </div>
      </div>`
      return recipeCardContainer.insertAdjacentHTML('afterbegin', recipeCard);
    });
  }

function displayIngredients() {
  user.pantry.makeIngredients(ingredientsData);
  user.pantry.ingredients.forEach(ingredient => {
    var ingredientCard = `<div class="ingredient-card flex-row">
    <div>
      <p id="ingredient-name">${ingredient.name.toUpperCase()}</p>
      <p>Amount: ${ingredient.amount}</p>
    </div>
    <div class="decorative-line"></div>
  </div>
  `;
  pantryContainer.insertAdjacentHTML('afterbegin', ingredientCard);
  });
}

function showAllRecipes() {
  searchContainer.classList.remove('hidden');
  recipeCardContainer.innerHTML = '';
  pantryContainer.innerHTML = '';
  displayRecipes(allRecipes);
  highlightPageOnMenu('nav1');
}

function showFavorites() {
  searchContainer.classList.remove('hidden');
  recipeCardContainer.innerHTML = '';
  pantryContainer.innerHTML = '';
  displayRecipes(user.favoriteRecipes);
  highlightPageOnMenu('nav2');
}

function showMyPantry() {
  searchContainer.classList.remove('hidden');
  recipeCardContainer.innerHTML = '';
  displayIngredients();
  highlightPageOnMenu('nav3');
}

function showWhatsCookin() {
  searchContainer.classList.add('hidden');
  recipeCardContainer.innerHTML = '';
  pantryContainer.innerHTML = '';
  displayRecipes(user.recipesToCook);
  highlightPageOnMenu('nav4');
}

function addRecipeToFavorites(target) {
  allRecipes.forEach(recipe => {
    if (event.target.id === `favorite-btn-${recipe.id}`) {
      console.log(`added ${recipe.name} to favorites`)
      user.toggleRecipeStatus(user.favoriteRecipes, 'isFavorite', recipe);
    }
  })
}

function addRecipeToWhatsCookin(target) {
  allRecipes.forEach(recipe => {
    if (event.target.id === `whats-cookin-btn-${recipe.id}`) {
      console.log(`added ${recipe.name} to whats cookin`)
      user.toggleRecipeStatus(user.recipesToCook, 'readyToCook', recipe);
    }
  })
}

function openModel() {
  allRecipes.forEach(recipe => {
    if (event.target.className === `show-recipe-btn-${recipe.id}`) {
      modal = document.querySelector('.modal');
      modal.style.display = 'block';
    }
  })
}

function closeModal(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}
