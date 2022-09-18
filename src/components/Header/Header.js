import './Header.scss';
import logo from "../../assets/images/ontrack-logo.jpg";
import { useState } from 'react';

const Header = () => {
    const [ loggedIn, setLoggedIn ] = useState(false);

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="onTrack"></img>
            <div className="header__user">
                {loggedIn ? <button>Log In</button> : <h1 className="header__title">Welcome, User</h1>}
                <i className="bi-person-circle header__profile"></i>
            </div>
        </header>
    );
}

export default Header;