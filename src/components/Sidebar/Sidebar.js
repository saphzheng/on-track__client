import './Sidebar.scss';
import { v4 as uuid } from 'uuid';
import items from '../../data/sidebar.json';
import SidebarItem from '../SidebarItem/SidebarItem';

const Sidebar = () => {
    return (
        <nav className="sidebar">
            {items.map(item => <SidebarItem key={uuid()} item={item} child={false} />)}
        </nav>
    );
}

export default Sidebar;