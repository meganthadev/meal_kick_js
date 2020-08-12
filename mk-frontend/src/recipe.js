class Recipe {

    constructor(recipe, recipeAttributes) {
        this.id = recipe.id
        this.title = recipeAttributes.title
        this.ingredients = recipeAttributes.ingredients
        this.instructions = recipeAttributes.instructions
        this.category = recipeAttributes.category
        Recipe.all.push(this)
    }

    renderRecipeCard() {
        return `
        <div data-id=${this.id}>
                <h3>${this.title}</h3>
                <p>${this.category.name}</p>
                <button data-id=${this.id}>View Full Recipe</button>
                </div>
                <br><br>`; 
    }   

    static findById(id) {
        return this.all.find(recipe += recipe.id === id)
    }
 

}

Recipe.all = [];