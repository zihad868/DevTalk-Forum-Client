import { Link, NavLink } from "react-router-dom";
import { MdOutlineAddAlert } from "react-icons/md";
import logo from "../assets/Logo/logo.jpg";
import { useContext } from "react";
import { authContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, signOutUser } = useContext(authContext);

  const logoutUser = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign-out Success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Sign-out Failed",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const navLink = (
    <>
      <NavLink to="/" activeClassName="active">
        <li>Home</li>
      </NavLink>
      <NavLink to="/membership" activeClassName="active">
        <li>Membership</li>
      </NavLink>
      <NavLink to="/notifications">
        <li className="flex items-center">
          <MdOutlineAddAlert className="text-2xl" />
        </li>
      </NavLink>
    </>
  );

  return (
    <div className="fixed top-0 w-full z-30  bg-base-100 opacity-70 shadow-md">
      <div className="max-w-screen-xl">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <button tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box space-y-2"
              >
                {navLink}
              </ul>
            </div>
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                Dev<span className="text-sky-600">Talk</span>
              </span>
              <img className="w-12 h-8" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-4 font-bold text-xl">
              {navLink}
            </ul>
          </div>
          <div className="navbar-end">
            {user?.email ? (
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} className="flex items-center space-x-2">
                  <img
                    className="w-14 rounded-full"
                    src={user?.photoURL}
                    alt="User Avatar"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-44"
                >
                  <p className="p-2">{user?.displayName}</p>
                  <Link to="/dashboard" className="p-2 rounded-full bg-slate-400 text-white">
                    <button>Dashboard</button>
                  </Link>
                  <button
                    onClick={logoutUser}
                    className="mt-2 p-2 rounded-full bg-slate-400 text-white"
                  >
                    Logout
                  </button>
                </ul>
              </div>
            ) : (
              <Link to="/signin" className="btn">
                Join Us
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
