import classes from "./FoodList.module.css";
import FoodListItem from './FoodListItem';
import PLACEHOLDER_FOODS from "../../mockdata/food-data";

const FoodList = props => {

    const foodList = PLACEHOLDER_FOODS.map(food =>
        <FoodListItem
            food={food}
            key={food.id}
        />
    );

    return (
        <section>
            <ul className={classes['food-list']}>
                {foodList}
            </ul>
        </section>
    );
};

export default FoodList;
