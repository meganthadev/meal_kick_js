const homeEndPoint = "http://localhost:3000/api/v1/categories"
const allRecipes = [];


document.addEventListener('DOMContentLoaded', () => {
  getCategories()
  getRecipes()
})

function getCategories() {
  fetch(homeEndPoint)
    .then(response => response.json())
    .then(categories => {
      categories.data.forEach(category => { //categories.data regards to serializer, iterate over serialied data
        const categoryMarkup = `
            <div class="categoryPanel" data-id=${category.id}>
              <h3>${category.attributes.name}</h3>
              <button class="setCategory" data-id=${category.id}>Show ${category.attributes.name} Recipes</button>
              </div>
              `
        document.querySelector('#category-container').innerHTML += categoryMarkup
      })
    })
}

document.addEventListener("click", (e) => {
   if (e.target.classList.contains("setCategory")) {
    const categoryId = e.target.dataset.id
    const filtRecipes = allRecipes.filter(function (recipe) {
      return categoryId == recipe.getCategoryId()
    })
    renderRecipes(filtRecipes)
  }
  if (e.target.classList.contains("fullButton")) {
    const recipeId = e.target.dataset.id
    const theRecipe = allRecipes.find(function(recipe) {
      return recipe.id == recipeId
    })
    if (!theRecipe) {
      return
    }
    const panel = theRecipe.renderFullRecipe()
    body.innerHTML += panel
  }
  if (e.target.classList.contains("closePanel")) {
    document.querySelector(".fullRecipe").remove()
  }
})


