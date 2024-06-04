import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useAllUsers = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: users = [], refetch,  isPending} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    return [users, refetch, isPending]
};

export default useAllUsers;