// if we want hot reloaded html in dev server:
import './index.html';

import '../node_modules/font-awesome/fonts/fontawesome-webfont.woff';
import '../node_modules/font-awesome/fonts/fontawesome-webfont.woff2';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './style.css';
import './layout.css';

import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase-config";
import {getFirestore, collection, getDocs, addDoc, serverTimestamp} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const foods = collection(db, 'foods');

const loadedFoodsArray = [];
let cart = [];

const updateCartAmount = () => {
    const navCartAmount = document.querySelector('#nav-cart-amount');
    // let sumAmount = 0;
    // for(let i=0;i<cart.length;i++){
    //     sumAmount += cart[i].amount;
    // }
    // navCartAmount.innerText = sumAmount;
    const cartAmount = cart.reduce((acc,food) => acc + food.amount, 0);
    navCartAmount.innerText = cartAmount;
}

const foodList = document.querySelector('.food-list');

const createFoodItem = (food, id) => {
    return `<li class="food-card" id="${id}">
                <img src="${food.image}">
                <div class="food-card-col">
                    <h2>${food.name}</h2>
                    <div>${food.description}</div>
                    <div class="food-card-price">Price: EUR ${food.price}</div>
                </div>
                <div class="food-card-col add-to-cart-col">
                        <input type="number" name="amount" min="1" max="10" value="1">
                        <button class="add-to-cart-button">+ Add</button>
                </div>
            </li>`;
};

const addToCart = (id, amount) => {
    const foodInCart = cart.find((food) => food.id === id);
    const intAmount = parseInt(amount);
    if(!foodInCart){
        cart.push({id, amount: intAmount});
    } else {
        foodInCart.amount = foodInCart.amount + intAmount;
    }
    updateCartAmount();
}

getDocs(foods).then((snapshot) => {
    snapshot.forEach((doc) => {
        foodList.insertAdjacentHTML('beforeend',createFoodItem(doc.data(), doc.id));
        loadedFoodsArray.push({id:doc.id, ...doc.data()})
    })
}).then(()=>{
    const foodElements = document.querySelectorAll('.food-card');
    foodElements.forEach((foodElement) => {
        foodElement.querySelector('.add-to-cart-button').addEventListener('click',()=>{
            const id = foodElement.id;
            const amount = foodElement.querySelector('input[name="amount"]').value;
            addToCart(id, amount);
        })
    })
});




const toggleCartVisibility = () => {
    document.querySelector('.cart-modal').classList.toggle('visible');
    document.querySelector('.backdrop').classList.toggle('visible');
}


const submitCart = () => {
    const street = document.querySelector('#street').value;
    const city = document.querySelector('#city').value;
    const zip = document.querySelector('#zip').value;

    addDoc(collection(db, "orders"),{
        cart,
        street,
        city,
        zip,
        date: serverTimestamp()
    }).then(() => {
        cart = [];
        const cartList = document.querySelector('.cart-list');
        cartList.innerHTML = '';
        updateCartAmount();
    })

    toggleCartVisibility();
};

const calculateTotal = () => {
    const total = cart.reduce((acc, food) => {
        const foodItem = loadedFoodsArray.find((foodItem) => foodItem.id === food.id);
        return acc + foodItem.price * food.amount;
    }, 0);
    const totalAmountElement = document.querySelector('.cart-total-amount');
    totalAmountElement.innerText = total;
}

const openCart = () => {

    const cartList = document.querySelector('.cart-list');
    cartList.innerHTML = '';
    cart.forEach((food)=> {
        const foodItem = loadedFoodsArray.find((foodItem) => foodItem.id === food.id);
        cartList.insertAdjacentHTML('beforeend',`
             <li class="cart-list-item" id="cart-${foodItem.id}">
                 <div>
                     <h2>${foodItem.name}</h2>
                     <div>
                         <span>EUR <span>${foodItem.price}</span></span>
                         <span>x <span class="cart-item-amount">${food.amount}</span></span>
                     </div>
                 </div>
                 <div class="cart-plus-minus">
                     <button class="cart-item-minus">-</button>
                     <button class="cart-item-plus">+</button>
                 </div>
             </li>`);
    });

    const cartItemMinusButtons = document.querySelectorAll('.cart-item-minus');
    cartItemMinusButtons.forEach((button) => {
        const outermostParent = button.parentElement.parentElement;
        button.addEventListener('click', () => {
            const id = outermostParent.id.split('-')[1];
            const food = cart.find((food) => food.id === id);
            food.amount = food.amount - 1;
            if (food.amount === 0) {
                cart.splice(cart.indexOf(food), 1);
                outermostParent.remove();
            }
            // update the cart-item-amount span with the new amount
            outermostParent.querySelector('.cart-item-amount').innerText = food.amount;
            calculateTotal();
            updateCartAmount();
        });
    });
    const cartItemPlusButtons = document.querySelectorAll('.cart-item-plus');
    cartItemPlusButtons.forEach((button) => {
        const outermostParent = button.parentElement.parentElement;
        button.addEventListener('click', () => {
            const id = outermostParent.id.split('-')[1];
            const food = cart.find((food) => food.id === id);
            food.amount = food.amount + 1;
            outermostParent.querySelector('.cart-item-amount').innerText = food.amount;
            calculateTotal();
            updateCartAmount();
        });
    });
    calculateTotal();
    toggleCartVisibility();
}

document.querySelector('.nav-cart').addEventListener('click', openCart);
document.querySelector('.backdrop').addEventListener('click', toggleCartVisibility);
document.querySelector('.cart-action-close').addEventListener('click', toggleCartVisibility);
document.querySelector('.cart-action-submit').addEventListener('click', submitCart);
