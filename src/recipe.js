const Ingredient = require('../src/ingredient');

class Recipe {
  constructor(recipe) {
    recipe = recipe || {}
    this.id = recipe.id || null;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.name = recipe.name;
    this.instructions = recipe.instructions;
  }

  getInstructions() {
    return this.instructions.reduce((instructions, step) => {
      instructions.push(`${step.number}. ${step.instruction}`);
      return instructions;
    }, []);
  }


  makeIngredients(ingredientsData) {
    let allIngredients = []
    this.ingredients.forEach(ingredient => {
      allIngredients.push(new Ingredient(ingredient));
    })

    allIngredients.forEach(ingredient => {
      ingredient.updateIngredientData(ingredientsData, 'name');
      ingredient.updateIngredientData(ingredientsData, 'estimatedCostInCents');
    })

    this.ingredients = allIngredients;
  }


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
