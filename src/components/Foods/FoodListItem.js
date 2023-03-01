import classes from './FoodListItem.module.css';
import FoodListItemForm from "./FoodListItemForm";

const FoodListItem = props => {
    return (
        <li className={classes['food-card']} id={props.food.id}>
            <img src={props.food.image}/>
            <div className={classes['food-card-col']}>
                <h2>{props.food.name}</h2>
                <div>{props.food.description}</div>
                <div className={classes['food-card-price']}>Price: EUR {props.food.price}</div>
            </div>
            <FoodListItemForm/>
        </li>
    );
}

export default FoodListItem;
