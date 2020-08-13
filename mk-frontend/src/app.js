class App {
    attachEventListeners() {
      document.querySelector('#category-container').addEventListener('click', e => {
        getRecipes(),
        document.querySelector('#recipe-container').addEventListener('click', e => {
            viewFullRecipe(recipe);
      })
    })
}

  }