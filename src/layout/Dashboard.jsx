
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {


    const isAdmin = true;

    return (
        <div className="flex">
            <div className="w-60 min-h-screen bg-purple-500 text-white p-4 space-y-2">
                <ul className="btn btn-active btn-secondary w-full">
                    <li><NavLink>Admin Home</NavLink></li>
                </ul>
                <ul className="btn btn-active btn-secondary w-full">
                    <li><NavLink>All Users</NavLink></li>
                </ul>
                <ul className="btn btn-active btn-secondary w-full">
                    <li><NavLink>Manage Posts</NavLink></li>
                </ul>

                <div className="divider divider-info">Info</div>

            </div>
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;