const recipeEndPoint = "http://localhost:3000/api/v1/recipes"

class Recipe {

    constructor(recipe, recipeAttributes) {
        this.id = recipe.id
        this.title = recipeAttributes.title
        this.ingredients = recipeAttributes.ingredients
        this.instructions = recipeAttributes.instructions
        this.category = recipeAttributes.category
        Recipe.all.push(this)
    }  
    
    static findById(id) {
        return this.all.find(recipe => recipe.id === id);
      }

    renderRecipeCard() {
        return `
        <div data-id=${this.id}>
                <h3>${this.title}</h3>
                <p>${this.category.name}</p>
                <button id="full-button" data-id=${this.id}>View Full Recipe</button>
                </div>
                <br><br>`; 
    }   

  //  fullRecipeCard() {
  //      return `
   //     <div data-id=${this.id}>
     //           <h3>${this.title}</h3>
     //           <h5>${this.category.name}</h5>
      //          <p>${this.ingredients}</p>
      //         <p>${this.instructions}</p>
      //          </div>
      //          <br><br>`; 
 //   }
}

document.addEventListener('DOMContentLoaded', () => {
  
//  getRecipes()

    const createRecipeForm = document.querySelector('#create-recipe-form')
    createRecipeForm.addEventListener("submit", (e) => createFormHandler(e))
    //listen for 'click' event on recipe contain
    const recipeContainer = document.querySelector('#recipe-container')
    recipeContainer.addEventListener('click', e => {
      const id = parseInt(e.target.dataset.id);
      const recipe = Recipe.findById(id);
     document.querySelector('#recipe-container').innerHTML == recipe;
      console.log(recipe);
    });
  })

function getRecipes() {
      fetch(recipeEndPoint) 
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
        fetch(recipeEndPoint, {
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

// function viewFullRecipe() {
 //   toggleView()
  //  fetch(recipeEndPoint) 
   //    .then(response => response.json())
    //   .then(recipes => {
    //       recipes.data.forEach(recipe => { //recipes.data regards to serializer, iterate over serialied data
      //      let newRecipe =  new Recipe(recipe, recipe.attributes)  //passed recipe data to new instance of recipe class and construct obj w/ it
       //     document.querySelector('#recipe-container').innerHTML += newRecipe.fullRecipeCard()
       //    })
         //  .catch(err => console.log(err))
     //  })
  //  }

 //  function toggleView() {
 //   let fullSelect = document.getElementById('full-button');
 //   let displaySetting = fullSelect.style.display;

//    if (displaySetting == 'block'){
      //recipe is visible, hide it >
 //     fullSelect.style.display = 'none';
 //   } else {
      //recipe half hidden, show it >
 //     fullSelect.style.display = 'block';
 //   }
 // }


Recipe.all = [];