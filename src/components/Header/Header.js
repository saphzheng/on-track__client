import './Header.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ openNav, setOpenNav }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth0();
    const [ query, setQuery ] = useState("");
    const [ open, setOpen ] = useState(false);

    return (
        <header className="header">
            <div className="header__content">
                <div className="header__left">
                    <i className="header__hamburger bi-list" onClick={() => setOpenNav(!openNav)}></i>
                    <form className="header__search" onSubmit={() => navigate(`/search/${query}`)}>
                        <input className="form-field header__input" type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search exercises..."></input>
                        <button type="submit"><i className="header__button bi-search"></i></button>
                    </form>
                </div>
                <div className="header__user">
                    <span className="header__title">Welcome, {user.given_name || user.nickname}</span>
                    {user.picture ? <img className="header__avatar" src={user.picture} alt={user.nickname}/> : <i className="bi-person-circle header__avatar"></i> }
                    <i className={`bi-three-dots-vertical header__expand ${open ? "header__expand--open" : ""}`} onClick={() => setOpen(!open)}></i>
                </div>
            </div>
            <button className={`header__logout ${open ? "header__logout--open" : ""}`} onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
        </header>
    );
}

export default Header;