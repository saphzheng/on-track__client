import './Header.scss';
import logo from "../../assets/images/ontrack-logo.jpg";

const Header = ({ isAuthenticated, logout }) => {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="onTrack"></img>
            {isAuthenticated ? <div className="header__user">
                <span className="header__title">Welcome, User</span>
                <i className="bi-person-circle header__profile"></i>
                <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
            </div> : null}
        </header>
    );
}

export default Header;