import './Header.scss';
import logo from "../../assets/images/ontrack-logo.jpg";

const Header = ({ loggedIn }) => {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="onTrack"></img>
            <div className="header__user">
                {loggedIn ? <span className="header__title">Welcome, User</span> : <button className="header__login">Log In</button>}
                <i className="bi-person-circle header__profile"></i>
            </div>
        </header>
    );
}

export default Header;