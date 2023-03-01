# JunkBank - React

## Installing react, cleaning up the default project, creating basic components

We have already seen multiple ways of starting a new React application.
- Including it from a CDN.
- Downloading and adding it to the project through npm or other package managers.

There is a third way as well, building upon the latter. Using create-react-app.

```
npx create-react-app
```

After installed, we can run the node live server.

Similarly to the starter project we have worked before, this also comes with some default content, so let's clean it up first.

What files we don't need:

```
App.test.js
logo.svg
reportWebVitals.js
setupTests.js
App.css
index.css
```

The ```logo192.png```, ```logo512.png``` and the ```favicon.ico``` can also be safely deleted.

As well as delete their respective includes as well.

What we should have now is two files in the ```src``` folder, ```index.js``` and ```App.js``` with respectively the following contents:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
```

and

```javascript
function App() {
  return (
    <div>
        Hello world!
    </div>
  );
}

export default App;
```

If we see "Hello world" being printed, everything works, and we can start happily hacking away recreating what we had before,
just using React now.


create header.js

```javascript
const Header = props => {
    return (
      <div>Header!</div>
    );
};

export default Header;
```

create footer.js
```javascript
const Footer = props => {
    return (
        <div>Footer!</div>
    );
};

export default Footer;

```

We can add one of them to the render block in App.js and it will work:

```javascript
import Header from "./components/Layout/Header";

function App() {
  return (
      <Header />
  );
}

export default App;
```

However, if we try also adding the ```<Footer/>```, we get en error citing
```Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>? (7:6)```

A component can only has one parent level element, that should wrap all the content put therein.
One way to fix it is to wrap both of them in a <div> for example, but that adds unneeded elements
in the HTML, and can also have unwanted sideeffects later down the road.

The correct way to do it is to wrap them in a React Fragment. It serves as a wrapping enclosing tag,
however it will not be rendered in the DOM.

```javascript
      <React.Fragment>
          <Header />
          <Footer />
      </React.Fragment>
```

For that, we also need to import React, if we haven't done so already:

```javascript
import React from "react";
```

An alternative, shorter syntax also exists for fragments, and they are equivalent in any other way
but their tags:

```javascript
<>
    <Header />
    <Footer />
</>
```

Create Hero.js inside the regular components folder. 
Add the HTML contents with the appropriate sections from our old project to all of the files we have created.
[See below](#files1)

## Styling

install fontawesome...

The classes need a little bit of working, as they behave differently in React, than in a regular HTML page.


We still see some margin around the menu, that we do not want.
It is because we mistakenly deleted some global styles. To re-add them, create an index.css, and include it just as we normally would in regular
Javascript.

```javascript
import './index.css';
```

and inside ```index.css``` just create a simple rule for the body, removing margin and padding:

```css
body {
    margin: 0;
    padding: 0;
}
```

I would also suggest adding global classes here, that can be freely applied to all elements with matching class names.
For example the ```container``` class. Let's remove this part from ```Header.module.css``` and ```Footer.module.css``` and
add it to ```index.css``` instead.

```css
.container {
    margin-right: auto;
    margin-left: auto;
    height: 100%;
}

@media (min-width: 768px) {
    .container {
        width: 750px;
    }
}

@media (min-width: 992px) {
    .container {
        width: 970px;
    }
}

@media (min-width: 1200px) {
    .container {
        width: 1170px;
    }
}
```

But how do we use these? And the classes in the module.css files?

A few rules for that:
1. The "normally" included classes from stylesheets (imported with ```import './index.css';```) can simply be typed on an
element as: ```className="something"```. So in our case, ```className="container"```.
2. The classes included as a css module use an alternative syntax:
```className={classes.something}```.
3. However, if our classname includes a dash in the css file, we have do modify our syntax a little bit, as the dot notation
does not allow for dashes in the class names. How we should invoke a class name in this case is the following:
```className={classes['something-with-dash']}```
4. If we need to add multiple classes, we can use the combination of the previous three methods in a backtick block (``` ` ```) with the
elements separated by spaces. For example: ```className={`${classes['some-thing']} something ${classes.something`}```

Copy over the section with the hero-wrapper class from our js project as well inside the return statement of the Hero.js.
Similarly to the Hero.model.css, include it, and apply the classes in the react way.

## <a name="files1"></a>The story so far...
A list of how the files should look like now:

![filelistsofar1](https://i.imgur.com/W4bqYFR.png)

As well as their contents:

<details>
    <summary>App.js</summary>

```javascript
import React from "react";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Hero from "./components/Hero";

function App() {
  return (
      <>
          <Header />
          <main>
              <Hero/>
          </main>
          <Footer />
      </>
  );
}

export default App;
```
</details>

<details>
    <summary>index.css</summary>

```css
body {
    margin: 0;
    padding: 0;
}

.container {
    margin-right: auto;
    margin-left: auto;
    height: 100%;
}

@media (min-width: 768px) {
    .container {
        width: 750px;
    }
}

@media (min-width: 992px) {
    .container {
        width: 970px;
    }
}

@media (min-width: 1200px) {
    .container {
        width: 1170px;
    }
}
```
</details>

<details>
    <summary>index.js</summary>

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


```
</details>

<details>
    <summary>Footer.js</summary>

```javascript
import classes from './Footer.module.css';

const Footer = props => {
    return (
        <footer>
            <div className={`${classes['footer-content']} container`}>
                <div className={classes['footer-row']}>
                    <h2>Fuud</h2>
                </div>
                <nav className={classes['footer-row']}>
                    <h3>Company</h3>
                    <ul>
                        <li>
                            About Us
                        </li>
                        <li>
                            Careers
                        </li>
                        <li>
                            Investors
                        </li>
                    </ul>
                </nav>
                <nav className={classes['footer-row']}>
                    <h3>Useful links</h3>
                    <ul>
                        <li>
                            Support
                        </li>
                        <li>
                            Fuud blog
                        </li>
                        <li>
                            Privacy Policy
                        </li>
                    </ul>
                </nav>
                <nav className={classes['footer-row']}>
                    <h3>Social</h3>
                    <ul>
                        <li>
                            Facebook
                        </li>
                        <li>
                            Twitter
                        </li>
                        <li>
                            TikTak
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;

```
</details>

<details>
    <summary>Footer.module.css</summary>

```css
footer {
    background: linear-gradient(90deg,  rgb(151,87,231) 10%, rgb(49, 195, 233) 140%);
    color: white;
    padding: 10px;
}

.footer-content {
    display: flex;
}

.footer-row {
    justify-content: space-between;
    width: 100%;
}

.footer-row ul {
    list-style-type: none;
    padding-left: 0px;
}


```
</details>

<details>
    <summary>Header.js</summary>

```javascript
import classes from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Header = props => {
    return (
        <header>
            <div className={`${classes.navbar} container`}>
                <input type="checkbox" id="toggle" className={classes['toggle-checkbox']}/>
                <label htmlFor="toggle" id="menu" className={classes['toggle-button']}>
                    <FontAwesomeIcon icon={faBars} />
                </label>
                <a className={classes['page-logo']}>Fuuud Order</a>
                <nav className={classes['nav-links']}>
                    <ul>
                        <li className={classes['nav-items']}>
                            <a href="#">About us</a>
                        </li>
                        <li className={classes['nav-items']}>
                            <a href="#">Info</a>
                        </li>
                        <li className={classes['nav-items']}>
                            <a href="#">Login</a>
                        </li>
                        <li className={classes['nav-items']}>
                            <a href="#">Sign up</a>
                        </li>
                        <li className={`${classes['nav-items']} ${classes['nav-cart']}`}>
                            <a href="#">
                                <span>Cart</span>&nbsp;
                                (<span id="nav-cart-amount">0</span>)
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

```
</details>

<details>
    <summary>Header.module.css</summary>

```css
header {
    background: linear-gradient(90deg,  rgb(151,87,231) 10%, rgb(49, 195, 233) 140%);
}

.navbar {
    display: flex;
    padding: 10px;
    align-items: center;
}

.toggle-button {
    display: none;
}

.toggle-checkbox {
    display: none;
}

.toggle-button svg {
    vertical-align: middle;
    line-height: inherit;
    margin: 2px;
    color: white;
    align-self: center;
    font-size:2em;
}

.page-logo {
    color: white;
    padding-left: 10px;
    font-size: 2em;
}

.nav-links {
    margin-left: auto;
}

.nav-links ul {
    list-style-type: none;
    display: flex;
}
.nav-items {
    padding: 0.5em 1em;
}

.nav-items a {
    color: white;
    text-decoration: none;
}
.nav-cart {
    border: 1px solid white;
}
.nav-cart:hover {
    background: rgba(255,255,255,0.2) !important;
}


@media (max-width: 800px) {

    .navbar {
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .nav-links {
        display:none;
        width: 100%;
    }


    .toggle-button {
        display: block;
    }


    .toggle-checkbox:checked ~ .nav-links {
        display: block;
    }

    .nav-links ul {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 10px 0;
        padding-left:0px;
        width: 100%;
    }

    .nav-items {
        width: 100%;
        margin: 0px;
        padding: 0px;
        height: 50px;
    }

    .nav-items a {
        height: 3em;
        width: 100%;
        padding-left: 10px;
        height: 50px;
        display: flex;
        align-items: center;
    }


}


```
</details>

<details>
    <summary>Hero.js</summary>

```javascript
import classes from './Hero.module.css';

const Hero = props => {
    return (
        <section className={classes['hero-wrapper']}>
            <div className="container">
                <div className={classes.herobox}>
                    <h2>Order food!</h2>
                    <p>We have a wide variety of delicious junk foods!</p>
                </div>
            </div>
        </section>
    );
};

export default Hero;

```
</details>

<details>
    <summary>Hero.module.css</summary>

```css
.hero-wrapper {
    background: url("https://images.rawpixel.com/image_1000/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTM2OTgxMy1pbWFnZS1rd3Z4eHA5MS5qcGc.jpg") no-repeat;
    background-size: cover;
    height: 50vh;
    overflow: hidden;
}

.herobox {
    font-family: 'Gordita', sans-serif;
    color: white;
    display: flex;
    padding: 0 3em;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}

.herobox h2 {
    font-size: 3em;
}

.herobox p {
    font-size: 1.5em;
}
```
</details>

## Foods, and food components

Inside the components package, create a new one called Foods. Inside that, we will create Foods.js and Foods.module.css.

```javascript
import classes from 'Foods.module.css';

const Foods = props => {
    return (
        <main className="container">
            <section className={classes['food-list-title']}>
                <h1>Browse our great selection of foods!</h1>
            </section>
            <section>
                <ul className="food-list"></ul>
            </section>
        </main>
    );
};

export default Foods;
```

```css
.food-list-title {
    padding-left: 5em;
    font-weight: bold;
    font-size: medium;
}

.food-list-title > h1 {
    background: linear-gradient(90deg,  rgb(151,87,231) 10%, rgb(49, 195, 233) 140%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
}

```

The first part of the Foods.js file will stay this way, however the second section, we will move to its own component
which will have even further components serving as the list elements.

Replace the second section with a ```<FoodList/>``` component that we will create just now, as well as with the `FoodList.module.css`.

```javascript
import classes from './FoodList.module.css';

const FoodList = props => {
    return (
        <section>
            <ul className={classes['food-list']}>
            </ul>
        </section>
    );
}

export default FoodList;

```

```css
.food-list {
    list-style-type: none;
}
```

Here, inside the ul will we dynamically create FoodListItems.
Let's take a step back. First we won't use firebase, as we don't want to overcomplicate our current application with web calls, 
rather we go back to having the data in a local array for now.

```javascript
const PLACEHOLDER_FOODS = [
    {
        id: 'cb459b2c-b623-11ed-afa1-0242ac120002',
        name: "Pizza",
        description: "Pizza is a dish of Italian origin consisting of a usually round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients",
        price: 10,
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg'
    },
    {
        id: 'd8585479-c126-42b7-a1e8-a1e1931f32da',
        name: "Fish and chips",
        description: "Fish and chips is a hot dish consisting of fried fish in batter, served with chips. The dish originated in England, where these two components had been introduced from separate immigrant cultures; it is not known who combined them",
        price: 15,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Fish_and_chips_blackpool.jpg/275px-Fish_and_chips_blackpool.jpg'
    },
    {
        id: 'e1d0fbcb-32fd-4f26-9a4b-25db7c16580b',
        name: "Hamburger",
        description: "A hamburger, or simply burger, is a food consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.",
        price: 20,
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg'
    }
];
```

We can put this data snipper inside the FoodList.js, but let's create a "mockdata" folder in "src", and create a food-data.js file
which stores the data above, as well an export statement ```export default PLACEHOLDER_FOODS;``` which we can import in FoodList.js with
the following code: ```import PLACEHOLDER_FOODS from "../../mockdata/food-data";```

With the map function, we can convert the data object array to variables, other arrays, or even HTML/JSX elements to be rendered.
Inside the `<ul>` block:

```javascript
{PLACEHOLDER_FOODS.map(food => food.name)}
```

We can loop out all the names of the food. However, it will be rendered as plain text, and will lack a proper structure that
HTML can give us.
An improved version can be the following:

```javascript
{PLACEHOLDER_FOODS.map(food => <h1>{food.name}</h1>)}
```

As we are using proper HTML/JSX tags now, the string template syntax comes into play, so we have to use the curly braces for javascript
code parts inside the HTML/JSX.
If we want to output multiple elements at once, we once again need to use Fragments.

```javascript
{PLACEHOLDER_FOODS.map(food => (
    <>
        <h1>{food.name}</h1>
        <p>{food.description}</p>
    </>
))}
```

And similarly, we can output our own Components here as well.

```javascript
{PLACEHOLDER_FOODS.map(food => <FoodListItem/>)}
```

That looks nicer, but our content is once again not dynamic. Let's fix that now.

## Props

Props are a way to pass JSX attributes, properties, data, or functions to a children component. All of these are passed
as a single object, and we usually call them as "props".

You may have noticed, that we have written "props" in the declaration of all of our component functions. For example
```javascript
const FoodListItem = props => {/*...*/};
```

Inside the component, we can access the various props passed to it by calling ```props.something```, while we can pass it
from its parent by setting the ```something``` property on the element. 

For example, we can set it as such: ```<FoodListItem name="Pizza"/>```
Then use its value inside the FoodListItem component by accessing it like this: ```props.name```, or as ```{props.name}``` if 
we are inside JSX code.

Of course, we can pass variables as props as well, it does not have to be hardcoded string. This way, let's add all the
required fields from PLACEHOLDER_FOODS to our FoodListItem component.

```javascript
{PLACEHOLDER_FOODS.map(food =>
    <FoodListItem
        id={food.id}
        key={food.id}
        name={food.name}
        description={food.description}
        price={food.price}
        image={food.image}
    />
)}
```

Then after setting all the props in place in the FoodListItem component, its return statement should look like the following:

```javascript
return (
    <li className={classes['food-card']} id={props.id}>
        <img src={props.image} />
            <div className={classes['food-card-col']}>
                <h2>{props.name}</h2>
                <div>{props.description}</div>
                <div className={classes['food-card-price']}>Price: EUR {props.price}</div>
            </div>
            <div className={`${classes['food-card-col']} ${classes['add-to-cart-col']}`}>
                <input type="number" name="amount" min="1" max="10" value="1"/>
                <button className={classes['add-to-cart-button']}>+ Add</button>
            </div>
    </li>
);
```




