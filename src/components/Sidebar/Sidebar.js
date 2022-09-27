import './Sidebar.scss';
import { v4 as uuid } from 'uuid';
import items from '../../data/sidebar.json';
import SidebarItem from '../SidebarItem/SidebarItem';

const Sidebar = ({ openNav, setOpenNav }) => {
    return (
        <nav className={`sidebar ${openNav ? "sidebar--open" : ""}`}>
            {items.map(item => <SidebarItem key={uuid()} item={item} setOpenNav={setOpenNav} />)}
        </nav>
    );
}

export default Sidebar;