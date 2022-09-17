import 'Sidebar.scss';

const Sidebar = () => {
    return (
        <nav className="sidenav">
            <ul className="sidenav__list">
                <li className="sidenav__item">Explore Exercises</li>
                <li className="sidenav__item">My Workouts</li>
                <li className="sidenav__item">Progress</li>
            </ul>
        </nav>
    );
}

export default Sidebar;