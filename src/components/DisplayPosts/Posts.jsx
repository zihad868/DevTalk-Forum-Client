import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../shared/Loading/Loading";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import PostCard from "./PostCard";

const Posts = () => {
  const axiosPublic = useAxiosPublic();

  const { data: posts = [], isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/posts`);
      return res.data;
    },
  });

  if (isPending) {
    return <Loading />;
  }

  console.log(posts);

  return (
    <div>
      <div className="mt-12">
        <SectionTitle header={"Posts"} />
      </div>
      <div> Total Post {posts.length}</div>
      <div>
        {
          posts.map(post => <PostCard key={post._id} post={post}/>)
        }
      </div>
    </div>
  );
};

export default Posts;
