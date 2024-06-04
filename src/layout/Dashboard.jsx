import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FaHome, FaUsers } from "react-icons/fa";
import { MdOutlineMedicalInformation } from "react-icons/md";

const Dashboard = () => {
  const isAdmin = true;

  return (
    <div className="flex">
      <div className="w-60 min-h-screen bg-purple-500 text-white p-4 space-y-2">
        {isAdmin ? (
          <>
            <NavLink to='/dashboard/adminHome'>
              <button className="btn w-full mt-12">
                <FaHome />
                Admin Home
              </button>
            </NavLink>

            <NavLink to='/dashboard/allUsers'>
              <button className="btn w-full mt-3">
                <FaUsers />
                All Users
              </button>
            </NavLink>

            <NavLink>
              <button className="btn w-full mt-3">
                <MdOutlineMedicalInformation />
                Manage Posts
              </button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to='/dashboard/userHome'>
              <button className="btn w-full mt-12">
                <FaHome />
                User Home
              </button>
            </NavLink>

            <NavLink>
              <button className="btn w-full mt-3">
                <FaUsers />
                 Profile
              </button>
            </NavLink>

            <NavLink>
              <button className="btn w-full mt-3">
                <MdOutlineMedicalInformation />
                 Posts
              </button>
            </NavLink>
          </>
        )}

        <div className="divider divider-info">or</div>

        <NavLink to="/">
          <button className="btn w-full mt-12">
            <FaHome />
            Home
          </button>
        </NavLink>

        <NavLink to="/">
          <button className="btn w-full mt-3">
            <FaHome />
             
          </button>
        </NavLink>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
