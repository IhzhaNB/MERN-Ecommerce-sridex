import { NavLink, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { FaBarsStaggered } from "react-icons/fa6";

import NavList from "./NavList";
import customAPI from "../services/customAPI";
import { logoutUser } from "../features/userSlice";
import { clearCartItem } from "../features/cartSlice";
import ThemeController from "./ThemeController";

const Nav = () => {
  const user = useSelector((state) => state.userState.user);
  const countInCart = useSelector((state) => state.cartState.numItemsInCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await customAPI.get("/auth/logout");
      dispatch(logoutUser());
      dispatch(clearCartItem());
      navigate("/");
    } catch (error) {
      dispatch(logoutUser());
      dispatch(clearCartItem());
      navigate("/");
    }
  };

  return (
    <nav className="bg-base-200">
      <div className="navbar mx-auto max-w-6xl px-8">
        <div className="navbar-start">
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center"
          >
            LOGO
          </NavLink>
          {/* Mobile Device */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavList />
            </ul>
          </div>

          {/* PC Device */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal">
              <NavList />
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          <ThemeController />
          <NavLink to="/cart" className="btn btn-ghost btn-cicle btn-md">
            <div className="indicator">
              <BsCart3 className="text-2xl" />
              <span className="badge badge-primary badge-sm indicator-item">
                {countInCart}
              </span>
            </div>
          </NavLink>
          {user && (
            <button
              className="mx-4 btn btn-error btn-outline btn-md"
              onClick={handleLogout}
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
