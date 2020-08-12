const endPoint = "http://localhost:3000/api/v1/recipes"

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM is Loaded");
  getRecipes()

    const createRecipeForm = document.querySelector('#create-recipe-form')
    createRecipeForm.addEventListener("submit", (e) => createFormHandler(e))
  })
   
   function getRecipes() {
      fetch(endPoint) 
       .then(response => response.json())
       .then(recipes => {
           recipes.data.forEach(recipe => {
               const recipeMarkup = `
                   <div data-id=${recipe.id}>
                   <h3>${recipe.attributes.title}</h3>
                   <p>${recipe.attributes.category.name}</p>
                   <button data-id=${recipe.id}>View Full Recipe</button>
                   </div>
                   <br><br>`;
   
               document.querySelector('#recipe-container').innerHTML += recipeMarkup
           })
       })
}

function createFormHandler(e) {
    e.preventDefault()
    const titleInput = document.querySelector('#input-title').value
    const ingredientsInput = document.querySelector('#input-ingredients').value
    const instructionsInput = document.querySelector('#input-instructions').value
    const categoryId = parseInt(document.querySelector('#categories').value)
    postFetch(titleInput, ingredientsInput, instructionsInput, categoryId) 
}

function postFetch(title, ingredients, instructions, category_id) {
    console.log(title, ingredients, instructions, category_id);
}