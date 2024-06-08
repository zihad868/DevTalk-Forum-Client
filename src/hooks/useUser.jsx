import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUser = () => {
    const {user, loading} = useAuth();
    const axioxSecure = useAxiosSecure();

    const { data:  dbUser={}, isPending, refetch} = useQuery({
        queryKey: ['user', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axioxSecure.get(`/users/${user?.email}`)
            return res.data;
        }
    }) 
    return [dbUser, isPending, refetch]
};

export default useUser;