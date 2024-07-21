import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css"
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.navLink, isActive && css.active);
};

const Navigation = () => {
    return ( 
        <header className={css.navContainer}>
            <nav>
                <NavLink to="/" className={buildLinkClass}>
                    Home
                </NavLink>
                <NavLink to="/movies" className={buildLinkClass}>
                    Movies
                </NavLink>
            </nav>
        </header>
     );
}
 
export default Navigation;