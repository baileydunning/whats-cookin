const Ingredient = require('../src/ingredient');

class Pantry {
  constructor(pantry) {
    this.ingredients = pantry || [];
  }

  extractValues(array, itemCriteria) {
    if (array !== undefined) {
      let allValues = array.reduce((values, item) => {
        values.push(item[itemCriteria]);
        return values;
      }, []);
      return allValues;
    }
  }

  makeIngredients(ingredientsData) {
    let allIngredients = [];
    let ingredientIds = this.extractValues(this.ingredients, 'ingredient');
    let ingredientAmounts = this.extractValues(this.ingredients, 'amount');

    if (ingredientsData !== undefined) {
      ingredientIds.forEach(id => {
        ingredientsData.filter(ingredient => {
          if (ingredient.id === id) {
            allIngredients.push(new Ingredient(ingredient, null));
          }
        })
      })

      allIngredients.forEach(item => {
        this.ingredients.filter(ingredient => {
          if (ingredient.ingredient === item.id) {
            item.amount = ingredient.amount;
          }
        })
      })
      this.ingredients = allIngredients;
    }
  }

  checkStock(recipe) {

    // take ids & amounts from recipe ingredients, push into new array objects
    // compare new array to this.items.id at each index
    // if pantry.items[i].amount >= recipe.ingredients[i].quantity.amount
  }
}


if (typeof module !== 'undefined') {
  module.exports = Pantry;
};
