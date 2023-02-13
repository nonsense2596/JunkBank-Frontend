// if we want hot reloaded html in dev server:
import './index.html';

import '../node_modules/font-awesome/fonts/fontawesome-webfont.woff';
import '../node_modules/font-awesome/fonts/fontawesome-webfont.woff2';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './style.css';
import './layout.css';

import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase-config";
import {getFirestore, collection, getDocs} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const foods = collection(db, 'foods');

const loadedFoodsArray = [];
let cart = [];

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

getDocs(foods).then((snapshot) => {
    snapshot.forEach((doc) => {
        foodList.insertAdjacentHTML('beforeend',createFoodItem(doc.data(), doc.id));
        loadedFoodsArray.push({id:doc.id, ...doc.data()})
    })
    console.log(loadedFoodsArray);
});


const toggleCartVisibility = () => {
    document.querySelector('.cart-modal').classList.toggle('visible');
    document.querySelector('.backdrop').classList.toggle('visible');
}


const submitCart = () => {
    // do stuff later...
    toggleCartVisibility();
};

document.querySelector('.nav-cart').addEventListener('click', toggleCartVisibility);
document.querySelector('.backdrop').addEventListener('click', toggleCartVisibility);
document.querySelector('.cart-action-close').addEventListener('click', toggleCartVisibility);
document.querySelector('.cart-action-submit').addEventListener('click', submitCart);
