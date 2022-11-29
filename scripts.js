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
    let quantity = document.createElement('div')
    quantity.textContent = `Quantity: ${board.quantity}`
    quantity.className = 'board-info'
    card.append(img, brand, price, quantity)
    boardContainer.append(card)
}

// build a function that will get all the info from the form and submit it to the db.json 

let form = document.querySelector('form')
form.addEventListener('submit', createNewBoard)

function createNewBoard(e){
    e.preventDefault()
}
//Quantity: check to see if the quantity is 0, if it is send a POST request that changes the quantity to sold out, if it is not zero then send a POST request that will decrease the quantity by 1
