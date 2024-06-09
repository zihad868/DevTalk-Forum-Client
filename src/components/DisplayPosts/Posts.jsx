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

  useEffect(() => {
    setPostData(posts)
  }, [posts])

  // console.log(postData)
  // console.log((posts));




  if (isPending) {
    return <Loading />;
  }

  const handlePopular = () => {
    setPostData('')
    axiosPublic('/posts/popular')
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
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
