import { Link, NavLink } from "react-router-dom";
import { MdOutlineAddAlert } from "react-icons/md";
import logo from "../assets/Logo/puzzle.avif";
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
        timer: 1500
      });  
     })
     .catch(() => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Sign-out Failed",
        showConfirmButton: false,
        timer: 1500
      });
     })
  }

  const navLink = (
    <>
      <NavLink to="/">
        <li>Home</li>
      </NavLink>
      <NavLink to="/membership">
        <li>Membership</li>
      </NavLink>
      <NavLink>
        <MdOutlineAddAlert className="mt-1 text-2xl" />
        <p className=""> </p>
      </NavLink>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box space-x-3"
          >
            {navLink}
          </ul>
        </div>
        <Link to="/" className="flex">
          <a className="text-2xl font-bold">
            <p>
              pu<span className="text-sky-600">zz</span>les
            </p>
          </a>
          <img className="w-16 ml-2" src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2 font-bold text-xl">
          {navLink}
        </ul>
      </div>
      <div className="navbar-end">
        {user?.email ? (
          <>
            <div className="dropdown dropdown-hover">
              <div tabIndex={0}  className="">
                <img className="w-14 rounded-full" src={user?.photoURL} alt="" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box mr-20"
              >
                <p className="p-2">
                  {user?.displayName}
                </p>
                <Link className="bg-slate-400 p-1 rounded-full text-white" to=''>
                  <button>DashBoard</button>
                </Link>

                <Link className="bg-slate-400 p-1 rounded-full text-white" to=''>
                <button onClick={logoutUser}>Logout</button>
                </Link>
                
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/signin" className="btn">
              Join Us
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
