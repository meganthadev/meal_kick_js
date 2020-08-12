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
                   <img src=${recipe.attributes.image_url} height="200" width="250">
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
    const imageInput = document.querySelector('#input-url').value
    postFetch(titleInput, ingredientsInput, instructionsInput, categoryId,  imageInput) 
}

function postFetch(title, ingredients, instructions, category_id, image_url) {
    const bodyData = {title, ingredients, instructions, category_id, image_url}
    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(recipe => {
        console.log(recipe);
        const recipeData = recipe.data 
        //render JSON response
        const recipeMarkup = `
        <div data-id=${recipe.id}>
                   <h3>${recipeData.attributes.title}</h3>
                   <img src=${recipe.attributes.image_url} height="200" width="250">
                   <p>${recipeData.attributes.category.name}</p>
                   <button data-id=${recipeData.id}>View Full Recipe</button>
                   </div>
                   <br><br>`;
    
       document.querySelector('#recipe-container').innerHTML += recipeMarkup
    })
}