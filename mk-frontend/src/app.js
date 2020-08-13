class App {
    attachEventListeners() {
      document.querySelector('#category-container').addEventListener('click', e => {
        console.log('clicked'),
        document.querySelector('#recipe-container').addEventListener('click', e => {
            console.log('clicked');
      })
    })
}

  }