// script.js
let recipes = [];

// Handle Recipe Submission
document.getElementById('recipe-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const recipeName = document.getElementById('recipe-name').value.trim();
  const ingredientsText = document.getElementById('ingredients').value.trim();
  const ingredients = ingredientsText.split('\n').map(item => item.trim());

  if (recipeName && ingredients.length > 0) {
    recipes.push({ name: recipeName, ingredients });
    displayRecipes();
    alert('Recipe added!');
  } else {
    alert('Please fill in all fields.');
  }

  // Clear form fields
  e.target.reset();
});

// Display Recipes in Selector
function displayRecipes() {
  const recipeList = document.getElementById('recipe-list');
  recipeList.innerHTML = '';

  recipes.forEach((recipe, index) => {
    const label = document.createElement('label');
    label.innerHTML = `
      <input type="checkbox" data-index="${index}">
      ${recipe.name}
    `;
    recipeList.appendChild(label);
  });
}

// Generate Shopping List
document.getElementById('generate-list').addEventListener('click', () => {
  const selectedRecipes = Array.from(
    document.querySelectorAll('#recipe-list input:checked')
  ).map(input => recipes[input.dataset.index]);

  const allIngredients = {};
  selectedRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      const [quantity, ...item] = ingredient.split(' ');
      const key = item.join(' ');

      if (allIngredients[key]) {
        allIngredients[key] += parseFloat(quantity);
      } else {
        allIngredients[key] = parseFloat(quantity);
      }
    });
  });

  displayShoppingList(allIngredients);
});

// Display Shopping List
function displayShoppingList(ingredients) {
  const ingredientList = document.getElementById('ingredient-list');
  ingredientList.innerHTML = '';

  Object.keys(ingredients).forEach(ingredient => {
    const item = document.createElement('p');
    item.textContent = `${ingredients[ingredient]} ${ingredient}`;
    ingredientList.appendChild(item);
  });
}
