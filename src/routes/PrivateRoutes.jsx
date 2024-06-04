import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../shared/Loading/Loading";


const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();

    if(user){
        return children
    }

    if(loading){
        return <Loading />
    }

    return <Navigate to='/login' />
};

export default PrivateRoutes;