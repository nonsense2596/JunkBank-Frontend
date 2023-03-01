import classes from './Footer.module.css';

const Footer = () => {
    return (
        <footer>
            <div className={`container ${classes['footer-content']}`}>
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
                <nav className="footer-row">
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
