//use DOMContentLoaded to fetch the toys AFTER the DOM has loaded, this is to prevent any errors happening before the DOM has loaded
document.addEventListener('DOMContentLoaded', fetchSnowboards)

//grab the toys using fetch GET

function fetchSnowboards(){
    fetch('http://localhost:3000/snowboards')
    .then(resp => resp.json())
    .then(boardData => initialize(boardData))
}

//build an initialize function that will send the board data to another function that will build the cards for each board
function initialize(boardData){
    boardData.forEach(board => {
        addBoardToDOM(board)
    });
}

//build a function that will add ONE board to the DOM
let boardContainer = document.querySelector('.board-container')

function addBoardToDOM(board){
    let card = document.createElement('div')
    card.className = 'card'
    let img = document.createElement('img')
    img.src = board.image
    let brand = document.createElement('div')
    brand.textContent = board.brand
    brand.className = 'board-info'
    let price = document.createElement('div')
    price.textContent = board.price
    price.className = 'board-info'
    let type = document.createElement('div')
    type.textContent = board.type
    type.className = 'board-info'
    card.append(img, brand, price, type)
    boardContainer.append(card)
}