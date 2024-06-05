import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../shared/Loading/Loading";
import useAdmin from "../hooks/useAdmin";

const AdminRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const [isAdmin, adminLoading] = useAdmin();

    if(user && isAdmin){
        return children
    }

    if(loading || adminLoading){
        return <Loading />
    }

    return <Navigate to='/login' />
};

export default AdminRoutes;