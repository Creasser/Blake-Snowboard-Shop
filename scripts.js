//use DOMContentLoaded to fetch the toys AFTER the DOM has loaded, this is to prevent any errors happening before the DOM has loaded
document.addEventListener('DOMContentLoaded', fetchSnowboards)

//grab the toys using fetch GET

function fetchSnowboards(){
    fetch('http://localhost:3000/snowboards')
    .then(resp => resp.json())
    .then(boardData => console.log(boardData))
}
//fetchSnowboards()