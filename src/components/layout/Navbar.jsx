import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__brand">Dayframe</div>

        <nav className="navbar__nav">
          <NavLink
            to={ROUTES.HOME}
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to={ROUTES.STATS}
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
          >
            Stats
          </NavLink>

          <NavLink
            to={ROUTES.JOURNAL}
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
          >
            Journal
          </NavLink>
        </nav>
      </div>
    </header>
  );
}