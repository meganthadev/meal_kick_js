const homeEndPoint = "http://localhost:3000/api/v1/categories"

  
  document.addEventListener('DOMContentLoaded', () => {
    getCategories()
    const app = new App();
    app.attachEventListeners();
  })

  function getCategories() {
       fetch(homeEndPoint) 
       .then(response => response.json())
       .then(categories => {
        categories.data.forEach(category => { //categories.data regards to serializer, iterate over serialied data
            const categoryMarkup = `
            <div data-id=${category.id}>
              <h3>${category.attributes.name}</h3>
              <button onclick="toggleCat()" data-id=${category.id}>Show ${category.attributes.name} Recipes</button>
              </div>
              <br><br>
              `

            document.querySelector('#category-container').innerHTML += categoryMarkup


          })
        })

      
 }

 function toggleCat() {
    let catSelect = document.getElementById('recipe-container');
    let displaySetting = catSelect.style.display;

    if (displaySetting == 'block'){
      //recipes visible, hide them >
      catSelect.style.display = 'none';
    } else {
      //recipes hidden, show them
      catSelect.style.display = 'block';
    }
  }

  