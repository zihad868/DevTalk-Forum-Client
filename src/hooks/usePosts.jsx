import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePosts = () => {
  const axiosPublic = useAxiosPublic();
  const { data: posts = [], isPending, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/posts`);
      return res.data;
    },
  });

  return [posts, isPending, refetch];
};

export default usePosts;
