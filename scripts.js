//use DOMContentLoaded to fetch the toys AFTER the DOM has loaded, this is to prevent any errors happening before the DOM has loaded
document.addEventListener('DOMContentLoaded', fetchSnowboards)

//grab the toys using fetch GET

function fetchSnowboards(){
    fetch('http://localhost:3000/snowboards')
    .then(resp => resp.json())
    .then(boardData => initialize(boardData))
}
//Using forEach to loop through the board data and send each individual board through the addBoardToDom function
function initialize(boardData){
    boardData.forEach(board => {
        addBoardToDOM(board)
    });
}

let boardContainer = document.querySelector('.board-container')

function addBoardToDOM(board){
    let card = document.createElement('div')
    card.className = 'card'
    let img = document.createElement('img')
    img.src = board.image
    img.className = 'board-img'
    let brand = document.createElement('div')
    brand.textContent = board.brand
    brand.className = 'board-info'
    let price = document.createElement('div')
    price.textContent = board.price
    price.className = 'board-info'
    let quantity = document.createElement('div')
    quantity.textContent = `Quantity: ${board.quantity}`
    quantity.className = 'quant'
    let buyBtn = document.createElement('button')
    buyBtn.textContent = 'Buy Now'
    buyBtn.id = board.id
    buyBtn.className = 'buy-btn'
    card.append(img, brand, price, quantity, buyBtn)
    boardContainer.append(card)
    if(board.quantity === 0){
        buyBtn.disabled = true
        card.querySelector('.quant').textContent = 'Out Of Stock'
    }
    let buy = document.getElementById(`${board.id}`)
    buy.addEventListener('click', () => {
        board.quantity -= 1
        if (board.quantity === 0){
            card.querySelector('.quant').textContent = 'Out Of Stock'
            buyBtn.disabled = true
            sendUpdateToServer(board)
        }else{
            card.querySelector('.quant').textContent = `Quantity: ${board.quantity}`
            sendUpdateToServer(board)
        }
    })
}

// PATCH method used to send the updated board quantity to the server
function sendUpdateToServer(board){
        fetch(`http://localhost:3000/snowboards/${board.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application.json'
            },
            body:JSON.stringify(board)
        })
    }

//used submit event listener 
let form = document.querySelector('form')
form.addEventListener('submit', createNewBoard)

function createNewBoard(e){
    e.preventDefault()
    let newBoard = {
        'brand': e.target.name.value,
        'image': e.target.image.value,
        'price': e.target.price.value,
        'quantity': e.target.quantity.value
    }
    submitNewBoardToDb(newBoard)

    form.reset()
}

// use post method to send new boards submitted through the form to the DB
function submitNewBoardToDb(newBoard){
    fetch('http://localhost:3000/snowboards',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(newBoard)
    })
    .then(resp => resp.json())
    .then(board => addBoardToDOM(board))
}

