import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FaHome, FaUsers } from "react-icons/fa";
import { MdOutlineMedicalInformation, MdPostAdd } from "react-icons/md";
import { BsPostcardHeartFill } from "react-icons/bs";
import useAdmin from "../hooks/useAdmin";
import Loading from "../shared/Loading/Loading";

const Dashboard = () => {
  const [isAdmin, adminLoading] = useAdmin();

  if (adminLoading) {
    return <Loading />;
  }

  return (
    <div className="flex">
      <div className="w-60 min-h-screen bg-purple-500 text-white p-4 space-y-2">
        {isAdmin ? (
          <>
            <NavLink to="/dashboard/adminHome">
              <button className="btn w-full mt-12">
                <FaHome />
                Admin Profile
              </button>
            </NavLink>

            <NavLink to="/dashboard/allUsers">
              <button className="btn w-full mt-3">
                <FaUsers />
                Manage Users
              </button>
            </NavLink>

            <NavLink>
              <button className="btn w-full mt-3">
                <MdOutlineMedicalInformation />
                Reported Activities
              </button>
            </NavLink>

            <NavLink>
              <button className="btn w-full mt-3">
                <MdOutlineMedicalInformation />
                Make Announcement
              </button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/dashboard/myProfile">
              <button className="btn w-full mt-3">
                <FaUsers />
                My Profile
              </button>
            </NavLink>

            <NavLink to="/dashboard/addPost">
              <button className="btn w-full mt-3">
                <MdPostAdd  />
                Add Post
              </button>
            </NavLink>

            <NavLink to="/dashboard/myPosts">
              <button className="btn w-full mt-3 mb-12">
                <BsPostcardHeartFill />
                My Posts
              </button>
            </NavLink>
          </>
        )}

        <div className="divider divider-info">or</div>

        <NavLink to="/">
          <button className="btn w-full mt-12">
            <FaHome />
            Back Home
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
