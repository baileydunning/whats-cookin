const chai = require('chai');
const expect = chai.expect;

// const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');

describe('Recipe', () => {
  let recipe;
  const sampleIngredientsData = [
    {
      "id": 1,
      "name": "instant vanilla pudding",
      "estimatedCostInCents": 660
    },
    {
      "id": 2,
      "name": "brown sugar",
      "estimatedCostInCents": 559
    }];

  let pumpkinJuice = {id: 123, image: 'https://exampleimage.com/1/1/1', ingredients: [{
    "id": 1,
    "quantity": {
      "amount": 2,
      "unit": "c"
    }
  },
  {
    "id": 2,
    "quantity": {
      "amount": 1.5,
      "unit": "tsp"
    }
  }],
  name: 'Pumpkin Juice',
  instructions: [{
    "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
    "number": 1
  },
  {
    "instruction": "Add egg and vanilla and mix until combined.",
    "number": 2
  }]};

  beforeEach(() => {
    recipe = new Recipe(pumpkinJuice);
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of recipe', () => {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should have an id', () => {
    expect(recipe.id).to.deep.equal(123);
  });

  it('should have an image source', () => {
    expect(recipe.image).to.deep.equal('https://exampleimage.com/1/1/1');
  });

  it('should have a name', () => {
    expect(recipe.name).to.be.a('string');
    expect(recipe.name).to.deep.equal('Pumpkin Juice');
  });

  it('should contain an array of ingredients', () => {
    expect(recipe.ingredients).to.be.an('array');
  });

  it('should contain objects in the ingredients array', () => {
    expect(recipe.ingredients[0]).to.be.an('object');
    expect(recipe.ingredients[1]).to.be.an('object');
  });

  it('should have an id for each ingredient', () => {
    expect(recipe.ingredients[0].id).to.deep.equal(1);
    expect(recipe.ingredients[1].id).to.deep.equal(2);
  });

  it('should contain an array of instructions', () => {
    expect(recipe.instructions).to.be.an('array');
  });

});
