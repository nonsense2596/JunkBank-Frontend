import classes from './Hero.module.css';

const Hero = () => {
    return (
        <section className={classes['hero-wrapper']}>
            <div className="container">
                <div className={classes.herobox}>
                    <h2>Order food!</h2>
                    <p>Indulge in Your Guilty Pleasures with JunkBank’s<br/> Exclusive Junk Food Delivery Service!</p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
