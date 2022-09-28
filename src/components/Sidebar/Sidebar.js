import './Sidebar.scss';
import { v4 as uuid } from 'uuid';
import { useAuth0 } from '@auth0/auth0-react';
import items from '../../data/sidebar.json';
import logo from '../../assets/images/ontrack-logo.svg';
import SidebarItem from '../SidebarItem/SidebarItem';

const Sidebar = ({ openNav, setOpenNav }) => {
    const { logout } = useAuth0();

    return (
        <>
        <div className={`${openNav ? "sidebar-overlay" : ""}`}></div>
        <nav className={`sidebar ${openNav ? "sidebar--open" : ""}`}>
        <i className={`${openNav ? "sidebar__hamburger--show" : "" } sidebar__hamburger bi-list`} onClick={() => setOpenNav(!openNav)}></i>
            <img className="logo" src={logo} alt="onTrack Fitness"></img>
            {items.map(item => <SidebarItem key={uuid()} item={item} setOpenNav={setOpenNav} />)}
            <div className="logout">
                <i className="logout__icon bi-box-arrow-in-left"></i>
                <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
            </div>
        </nav>
        </>
    );
}

export default Sidebar;