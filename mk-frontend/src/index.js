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
           recipes.data.forEach(recipe => { //recipes.data regards to serializer, iterate over serialied data
            let newRecipe =  new Recipe(recipe, recipe.attributes)  //passed recipe data to new instance of recipe class and construct obj w/ it
            document.querySelector('#recipe-container').innerHTML += newRecipe.renderRecipeCard()
           })
         //  .catch(err => console.log(err))
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
    const bodyData = {title, ingredients, instructions, category_id}
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
        let newRecipe =  new Recipe(recipeData, recipeData.attributes)
            document.querySelector('#recipe-container').innerHTML += newRecipe.renderRecipeCard()
    })

    
}