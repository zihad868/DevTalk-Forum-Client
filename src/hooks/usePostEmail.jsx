import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const usePostEmail = () => {
    const axiosSecure = useAxiosSecure();
    const {user, loading} = useAuth();

    const { data: userPost = [], isPending: postPending, refetch:  postRefetch} = useQuery({
      queryKey: ["posts"],
      enabled: !loading,
      queryFn: async () => {
        const res = await axiosSecure.get(`/posts/${user?.email}`);
        return res.data;
      },
    });
  
    console.log(userPost)
    return [userPost, postPending, postRefetch];
};

export default usePostEmail;