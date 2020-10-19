const Ingredient = require('./ingredient.js');
const IngredientsInventory = require('./ingredientInventory.js');


class Recipe {
  constructor(recipe, rawIngredientsData) {
    this.id = recipe.id || null;
    this.image = recipe.image;
    this.rawRecipeIngredientData = recipe.ingredients;
    this.ingredients = []
    this.name = recipe.name;
    this.instructions = recipe.instructions;
    this.isFavorite = false;
    this.readyToCook = false;
    this.ingredientsInventory = new IngredientsInventory(rawIngredientsData);
  }

  getInstructions() {
    return this.instructions.reduce((instructions, step) => {
      instructions.push(`${step.number}. ${step.instruction}`);
      return instructions;
    }, []);
  }

  makeIngredients() {
    this.ingredientsInventory.makeIngredients();
    this.rawRecipeIngredientData.forEach(ingredient => {
      let foundIngredient = this.ingredientsInventory.findIngredient(ingredient.id);
      this.ingredients.push(foundIngredient);
    });

    this.ingredients.forEach(ingredient => {
      ingredient.updateIngredientData(this.ingredients, 'quantity');
    });
  }


  // makeIngredients(ingredientsData) {
  //   if (ingredientsData !== undefined) {
  //     let allIngredients = []
  //     this.ingredients.forEach(ingredient => {
  //       allIngredients.push(new Ingredient(ingredient));
  //     })
  //
  //     allIngredients.forEach(ingredient => {
  //       ingredient.updateIngredientData(ingredientsData, 'name', 'id');
  //       ingredient.updateIngredientData(ingredientsData, 'estimatedCostInCents', 'id');
  //     })
  //
  //     this.ingredients = allIngredients;
  //     return this.ingredients;
  //   }
  // }


  calculateCost(ingredientsData) {
    if (!ingredientsData) {
      return 'Insufficient data available';
    }

    let totalCost = 0;

    const ids = this.ingredients.reduce((ingredientIds, ingredient) => {
      ingredientIds.push(ingredient.id);
      return ingredientIds;
    }, []);

    ids.forEach(id => {
      ingredientsData.filter(ingredient => {
        if (ingredient.id === id) {
          totalCost += ingredient.estimatedCostInCents
        }
      })
    })

    return totalCost;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
