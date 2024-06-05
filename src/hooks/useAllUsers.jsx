import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useAllUsers = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    console.log(loading)

    const {data: users = [], refetch,  isPending} = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get('/users', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.data
        }
    })

    return [users, refetch, isPending]
};

export default useAllUsers;