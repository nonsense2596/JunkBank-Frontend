import classes from './FoodListItem.module.css';
import {useRef, useState} from "react";

const FoodListItemForm = () => {

    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();
        console.log("submit event is fired!");

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 ||
            enteredAmountNumber > 10) {
            console.log("invalid");
            setAmountIsValid(false);
            return;
        } else {
            setAmountIsValid(true);
            // do logic later, to add to cart
        }

    }

    return (
        <form
            className={`${classes['food-card-col']} ${classes['add-to-cart-col']}`}
            onSubmit={submitHandler}
        >
            <input type="number" name="amount" ref={amountInputRef}/>
            <button className={classes['add-to-cart-button']}>+ Add</button>
            {!amountIsValid && <p style={{color:'red'}}>Please enter a valid amount</p>}
        </form>
    );
};

export default FoodListItemForm;
