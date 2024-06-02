import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import Membership from "../pages/Membership/Membership";
import Signup from "../pages/Signup/Signup";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
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
          path: '/signup',
          element: <Signup />
        }
      ]
    },
  ]);

export default router;