// if we want hot reloaded html in dev server:
import './index.html';

import './style.css';
import './style.scss';

async function getImage() {
  console.log('hello');
  const response = await fetch('https://dog.ceo/api/breeds/image/random');
  const data = await response.json();
  console.log(data.message);
  document.querySelector('img').setAttribute('src', data.message);
}

document.querySelector('button').addEventListener('click', getImage);
