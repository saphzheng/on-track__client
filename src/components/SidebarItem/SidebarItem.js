import './SidebarItem.scss';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const SidebarItem = ({ item, child }) => {
    const [ open, setOpen ] = useState(false);

    return (
        <div className={`sidebar-item ${open ? "sidebar-item--open" : ""} ${child ? "sidebar-item__child" : ""}`}>
            <div className={`sidebar-item__title ${!item.children ? "sidebar-item--clickable" : ""}`}>
                {item.icon && <i className={`sidebar-item__icon ${item.icon}`}></i>}
                <span>{item.title}</span>
                {item.children ? <i className={`bi-chevron-down sidebar-item__expand ${open ? "sidebar-item__expand--open" : ""}`}
                    onClick={() => setOpen(!open)}></i> : null}
            </div>
            {item.children ? <div className={`sidebar-item__children ${open ? "sidebar-item__children--open" : ""}`}>
                {item.children.map(child => <SidebarItem key={uuid()} item={child} child={true}/>)}
            </div> : null}
        </div>
    );
}

export default SidebarItem;