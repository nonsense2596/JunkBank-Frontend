import classes from './Foods.module.css';
import FoodList from './FoodList';

const Foods = () => {
    return (
        <main className="container">
            <section className={classes['food-list-title']}>
                <h1>Browse our great selection of foods!</h1>
            </section>
            <FoodList/>
        </main>
    );
};

export default Foods;
