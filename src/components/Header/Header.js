import './Header.scss';
import logo from "../../assets/images/ontrack-logo.jpg";
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Header = ({ openNav, setOpenNav }) => {
    const { logout, user, isAuthenticated } = useAuth0();
    const [ open, setOpen ] = useState(false);

    return (
        <header className="header">
            <div className="header__content">
                <i className="header__hamburger bi-list" onClick={() => setOpenNav(!openNav)}></i>
                <img className="header__logo" src={logo} alt="onTrack"></img>
                {isAuthenticated ? <div className="header__user">
                    <span className="header__title">Welcome, {user.given_name || user.nickname}</span>
                    {user.picture ? <img className="header__avatar" src={user.picture} alt={user.nickname}/> : <i className="bi-person-circle header__avatar"></i> }
                    <i className={`bi-three-dots-vertical header__expand ${open ? "header__expand--open" : ""}`} onClick={() => setOpen(!open)}></i>
                </div> : null}
            </div>
            <button className={`header__logout ${open ? "header__logout--open" : ""}`} onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
        </header>
    );
}

export default Header;