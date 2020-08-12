
document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/api/v1/categories") 
    .then(response => response.json())
    .then(categories => {
        console.log(categories);
    })
//    .catch()
})