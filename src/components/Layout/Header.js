import classes from './Header.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import JunkBankLogo from '../../assets/junkbanklogo.png';

const Header = (props) => {
  return (
      <header>
        <div className={`${classes.navbar} container`}>
          <input type="checkbox" id="toggle" className={classes['toggle-checkbox']}/>
          <label htmlFor="toggle" id="menu" className={classes['toggle-button']}>
            <FontAwesomeIcon icon={faBars}/>
          </label>
          <a className={classes['page-logo']}><img src={JunkBankLogo} alt="JunkBank"/></a>
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
              <li
                  className={`${classes['nav-items']} ${classes['nav-cart']}`}
                  onClick={props.onShowModal}
              >
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
