import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../actions/authedUser";
import { handleInitialData } from "../actions/shared";

function MainLayout() {
  const navigate = useNavigate();
  const authedUser = useSelector((state) => state.authedUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  useEffect(() => {
    if (!authedUser) {
      navigate(`/login?redirect=${location.pathname}`);
    }
    dispatch(handleInitialData());
  }, [navigate, authedUser, dispatch, location]);

  if (!authedUser) return null;

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/add">
                  New
                </NavLink>
              </li>
            </ul>
            <span className="d-flex">
              <span className="d-flex align-items-center justify-content-center">
                <img
                  height={30}
                  width={30}
                  src={authedUser.avatarURL ?? "/default-user.jpg"}
                  alt={authedUser.name}
                />
                {authedUser.name}
              </span>
              <button className="btn" onClick={handleLogout}>
                Log out
              </button>
            </span>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
