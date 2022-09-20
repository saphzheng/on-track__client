import './Header.scss';
import logo from "../../assets/images/ontrack-logo.jpg";
import { useState } from 'react';

const Header = ({ isAuthenticated, logout, user }) => {
    const [ open, setOpen ] = useState(false);

    return (
        <header className="header">
            <div className="header__content">
                <img className="header__logo" src={logo} alt="onTrack"></img>
                {isAuthenticated ? <div className="header__user">
                    <span className="header__title">Welcome, {user.nickname}</span>
                    {user.picture ? <img className="header__avatar" src={user.picture} alt={user.nickname}/> : <i className="bi-person-circle header__avatar"></i> }
                    <i className={`bi-chevron-down header__expand ${open ? "header__expand--open" : ""}`} onClick={() => setOpen(!open)}></i>
                    
                </div> : null}
            </div>
            <button className={`header__logout ${open ? "header__logout--open" : ""}`} onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
        </header>
    );
}

export default Header;