import './SidebarItem.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const SidebarItem = ({ item }) => {
    const [ open, setOpen ] = useState(false);

    if (item.children) {
        return (
            <div className={`sidebar-item ${open ? "sidebar-item--open" : ""}`}>
                <div className="sidebar-item__title">
                    {item.icon && <i className={`sidebar-item__icon ${item.icon}`}></i>}
                    <span>{item.title}</span>
                    <i className={`bi-chevron-down sidebar-item__expand ${open ? "sidebar-item__expand--open" : ""}`}
                        onClick={() => setOpen(!open)}></i>
                </div>
                <div className={`sidebar-item__children ${open ? "sidebar-item__children--open" : ""}`}>
                    {item.children.map(child => {
                        return (
                            <NavLink key={uuid()} className={`sidebar-item__title sidebar-item__child ${({ isActive }) => isActive ? "active" : ""}`} to={child.path}>
                                <span>{child.title}</span>
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        );
    } else {
        return (
            <div className="sidebar-item">
                <NavLink className={`sidebar-item__title sidebar-item--single ${({ isActive }) => isActive ? "active" : ""}`} end to={item.path}>
                    {item.icon && <i className={`sidebar-item__icon ${item.icon}`}></i>}
                    <span>{item.title}</span>
                </NavLink>
            </div>
        )
    }
    
}

export default SidebarItem;