import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import Membership from "../pages/Membership/Membership";
import Signup from "../pages/Signup/Signup";
import Signin from "../pages/Signin/Signin";
import NotFound from "../pages/NotFount/NotFount";
import Dashboard from '../layout/Dashboard';


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

      ]
    }
  ]);

export default router;