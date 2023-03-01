import classes from './CartModal.module.css';

const CartModal = props => {
    return (
        <>
            <div className={classes.backdrop} onClick={props.onHideModal}> </div>
            <div className={classes['cart-modal']}>
                <div className={classes['cart-modal-content']}>
                    <ul className={classes['cart-list']}> </ul>
                    <hr/>
                    <div className={classes['cart-total']}>
                        <span>Total Amount</span>
                        <span>EUR <span className={classes['cart-total-amount']}>0</span></span>
                    </div>
                    <hr/>
                    <section className={classes['cart-addresses']}>
                        <h3>Add a new address...</h3>
                        <form>
                            <div className={classes['cart-new-address-form']}>
                                <input type="text" id="street" name="street" className={classes['cart-new-address-input']}
                                       placeholder="Street"/>
                                <input type="text" id="city" name="city" className={classes['cart-new-address-input']}
                                       placeholder="City"/>
                                <input type="text" id="zip" name="zip" className={classes['cart-new-address-input']}
                                       placeholder="ZIP"/>
                            </div>
                        </form>
                    </section>
                    <hr/>
                    <section className={classes['cart-action-buttons']}>
                        <button className={classes['cart-action-submit']}>Order</button>
                        <button className={classes['cart-action-close']} onClick={props.onHideModal}>Close</button>
                    </section>
                </div>
            </div>
        </>
    );

};

export default CartModal;
