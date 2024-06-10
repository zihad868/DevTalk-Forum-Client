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
import PrivateRoutes from "./PrivateRoutes";
import Comments from "../pages/Comments/Comments";
import Payments from "../pages/Payments/Payments";
import Search from "../pages/Search/Search";
import Announcement from "../pages/Announcement/Announcement";


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
            element: <PrivateRoutes> <Membership /> </PrivateRoutes>
        },
        {
          path: '/notifications',
          element: <PrivateRoutes> <Announcement /> </PrivateRoutes>
      },
        {
            path: '/post/search',
            element: <Search />
        },
        {
            path: '/comments/:id',
            element: <PrivateRoutes> <Comments /> </PrivateRoutes>
        },
        {
          path: '/signin',
          element: <Signin />
        },
        {
          path: '/signup',
          element: <Signup />
        },
        {
          path: '/payment',
          element: <PrivateRoutes> <Payments /> </PrivateRoutes>
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
           element: <PrivateRoutes> <MyProfile /> </PrivateRoutes> 
        },
        {
          path: 'addPost',
          element: <PrivateRoutes> <AddPost /> </PrivateRoutes>
        },
        {
          path: 'myPosts',
          element: <PrivateRoutes> <MyPosts /> </PrivateRoutes>
        },

      ]
    }
  ]);

export default router;