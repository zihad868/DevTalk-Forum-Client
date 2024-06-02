import { Link, NavLink } from "react-router-dom";
import { MdOutlineAddAlert } from "react-icons/md";
import logo from "../assets/Logo/puzzle.avif";

const Navbar = () => {
  const navLink = (
    <>
      <NavLink to='/'>
        <li>Home</li>
      </NavLink>
      <NavLink to='/membership'>
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
        <Link to='/' className="flex">
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
        <Link to='/signin' className="btn">Join Us</Link>
      </div>
    </div>
  );
};

export default Navbar;
