import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import Membership from "../pages/Membership/Membership";
import Signup from "../pages/Signup/Signup";
import Signin from "../pages/Signin/Signin";
import NotFound from "../pages/NotFount/NotFount";
import Dashboard from '../layout/Dashboard';
import AdminRoutes from "./AdminRoutes";
import MyProfile from "../pages/Dashboard/MyProfile";
import AddPost from "../pages/Dashboard/AddPost";
import MyPosts from "../pages/Dashboard/MyPosts";
import AdminProfile from "../pages/Dashboard/AdminProfile";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ReportedActivities from "../pages/Dashboard/ReportedActivities";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        {
            index: true,
            element: <Home />
        },
        {
            path: '/membership',
            element: <Membership />
        },
        {
          path: '/signin',
          element: <Signin />
        },
        {
          path: '/signup',
          element: <Signup />
        }
      ]
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [

        // Admin Role
        {
          path: 'adminProfile',
          element: <AdminProfile />
        },
        {
          path: 'manageUsers', 
          element: <AdminRoutes> <ManageUsers /> </AdminRoutes>
        },
        {
          path: 'reportedActivities', 
          element: <AdminRoutes> <ReportedActivities /> </AdminRoutes>
        },
        {
          path: 'makeAnnouncement', 
          element: <AdminRoutes> <MakeAnnouncement /> </AdminRoutes>
        },




        // User Role
        {
           path: 'myProfile',
           element: <MyProfile />
        },
        {
          path: 'addPost',
          element: <AddPost />
        },
        {
          path: 'myPosts',
          element: <MyPosts />
        },

      ]
    }
  ]);

export default router;