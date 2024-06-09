import Loading from "../../shared/Loading/Loading";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import PostCard from "./PostCard";
import usePosts from "../../hooks/usePosts";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const Posts = () => {
  const axiosPublic = useAxiosPublic();
  const [posts, isPending] = usePosts();
  const [postData, setPostData] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);

  // Effect to set postData to initial posts
  useEffect(() => {
    setPostData(posts);
  }, [posts]);

  
  const handlePopular = async () => {
    setIsLoading(true); 
    try {
      const res = await axiosPublic.get('/posts/popular'); 
      setPostData(res.data); 
    } catch (error) {
      console.error("Failed to fetch popular posts", error);
    } finally {
      setIsLoading(false); 
    }
  };


  if (isPending) {
    return <Loading />;
  }


  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="mt-12">
        <SectionTitle header={"Posts"} />
        <div className="flex justify-center">
          <button onClick={handlePopular} className="btn btn-secondary">
            Popular Post
          </button>
        </div>
      </div>

      <div>
        {postData.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
