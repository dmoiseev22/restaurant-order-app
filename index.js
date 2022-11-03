import { menuArray } from '/data.js'

const menu = document.getElementById('menu')
const orderList = document.getElementById('order-list')
let pizzaCount = 0
let hamburgerCount  = 0
let beerCount = 0
let itemPrice = 0
let isPizzaOrdered = ''
let isHamburgerOrdered = ''
let isBeerOrdered = ''
let beerTotalPrice = 0
let hamburgerTotalPrice = 0
let pizzaTotalPrice = 0


// "ADD" EVENT LISTENER

document.addEventListener('click', function(e){
    if (e.target.dataset.addname) {
        handleAddClick(e.target.dataset.addname)
    }
})


// HANDLE ADD CLICK , MODIFY ITEMCOUNT

function handleAddClick(itemAdded) {
    if  (itemAdded === 'Pizza'){
        pizzaCount ++ 
        pizzaTotalPrice = pizzaCount * getItemPrice(itemAdded)
        document.getElementsByClassName('pizza-total')[0].style.display = 'flex'
        document.getElementById('pizza-total-price').innerText = `$${pizzaTotalPrice}`
        
    } else if (itemAdded === 'Hamburger') {
        hamburgerCount ++
        isHamburgerOrdered = true
        hamburgerTotalPrice = hamburgerCount * getItemPrice(itemAdded)
        document.getElementsByClassName('hamburger-total')[0].style.display = 'flex'
        document.getElementById('hamburger-total-price').innerText = `$${hamburgerTotalPrice}`

    } else if (itemAdded === 'Beer') {
        beerCount ++
        isBeerOrdered = true
        beerTotalPrice = beerCount * getItemPrice(itemAdded)
        document.getElementsByClassName('beer-total')[0].style.display = 'flex'
        document.getElementById('beer-total-price').innerText = `$${beerTotalPrice}`
    } 
    renderOrderSummary()
}

// RENDER ORDER SUMMARY TOTAL PRICE

function renderOrderSummaryTotal() {
    
    let totalPrice = pizzaTotalPrice + hamburgerTotalPrice + beerTotalPrice
    document.getElementById('total-price').innerText = `$${totalPrice}`
     
}

// GET ITEM PRICE

function getItemPrice(itemAdded) {
    for (let menuItem of menuArray) {
        const {name, ingredients, id, price, emoji} = menuItem
        if (itemAdded === menuItem.name) 
        {return menuItem.price}
    }
}

// RENDER ORDER SUMMARY FUNTION

function renderOrderSummary() {
    document.getElementById('orderList').style.display = 'block'
    renderOrderSummaryTotal()
}

// GET MENU HTML FROM DATA.JS FILE
function getMenuHtml(){
    let menuHtml = ''
    for (let menuItem of menuArray) {
        const {name, ingredients, id, price, emoji} = menuItem
        menuHtml += `
                    <div class="menu-element">
                        <div class="menu-element-img-div"><p class="img">${emoji}</p></div>
                        <div class="menu-element-core">
                            <div class="menu-element-description">
                                <h2>${name}</h2>
                                <p class="ingredients">${ingredients.join(', ')}</p>
                                <p class="price"> $${price} </p>
                            </div>
                            <div>
                                <button id="add-el" class="add-el" data-addName="${name}">+</button>
                            </div>
                        </div>
                    </div>` 
        }
    return menuHtml
}


// RENDER MENU TO HTML PAGE

function renderMenuHtml() {
    menu.innerHTML = getMenuHtml()
}

// EVENT LISTENERS TO REMOVE ORDERED ITEMS

document.getElementById('remove-beer').addEventListener('click', function(){
    document.getElementsByClassName('beer-total')[0].style.display = 'none'
    beerCount = 0; 
    renderOrderSummary()
})

document.getElementById('remove-hamburger').addEventListener('click', function(){
    document.getElementsByClassName('hamburger-total')[0].style.display = 'none'
    hamburgerCount = 0; 
    renderOrderSummary()
})

document.getElementById('remove-pizza').addEventListener('click', function(){
    document.getElementsByClassName('pizza-total')[0].style.display = 'none'
    pizzaCount = 0; 
    renderOrderSummary()
})


// HANDLE COMPLETE ORDER BUTTON

document.getElementById("complete-order-btn").addEventListener('click', function () {
    document.getElementsByClassName('modal')[0].style.display = 'block'
    let payForm = document.getElementById('pay-form')
    payForm.addEventListener('submit', function(e) {
        const payFormData = new FormData(payForm)
        let clientName = payFormData.get('name')
        
        document.getElementById('thank-you-message').innerText = `Thank's ${clientName}, your order is on the way`
        e.preventDefault()
        document.getElementsByClassName('modal')[0].style.display = 'none'
        document.getElementsByClassName('modal')[0].style.display = 'none'
        document.getElementsByClassName('order')[0].style.display = 'none'
        document.getElementsByClassName('thank-you-box')[0].style.display = 'block'
    })
})


renderMenuHtml()

