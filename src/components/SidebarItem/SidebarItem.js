import './SidebarItem.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const SidebarItem = ({ item, setOpenNav }) => {
    const [ open, setOpen ] = useState(false);

    if (item.children) {
        return (
            <div className={`sidebar-item ${open ? "sidebar-item--open" : ""}`}>
                <div className="sidebar-item__content" onClick={() => setOpen(!open)}>
                    {item.icon && <i className={`sidebar-item__icon ${item.icon}`}></i>}
                    <span className="sidebar-item__title">{item.title}</span>
                    <i className={`bi-chevron-down sidebar-item__expand ${open ? "sidebar-item__expand--open" : ""}`}></i>
                </div>
                <div className={`sidebar-item__children ${open ? "sidebar-item__children--open" : ""}`}>
                    {item.children.map(child => {
                        return (
                            <NavLink key={uuid()} className={`sidebar-item__content sidebar-item__child 
                                ${({ isActive }) => isActive ? "active" : ""}`} to={child.path} onClick={() => setOpenNav(false)}>
                                <span className="sidebar-item__title">{child.title}</span>
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        );
    } else {
        return (
            <div className="sidebar-item">
                <NavLink className={`sidebar-item__content sidebar-item--single 
                    ${({ isActive }) => isActive ? "active" : ""}`} end to={item.path} onClick={() => setOpenNav(false)}>
                    {item.icon && <i className={`sidebar-item__icon ${item.icon}`}></i>}
                    <span className="sidebar-item__title">{item.title}</span>
                </NavLink>
            </div>
        )
    }
    
}

export default SidebarItem;