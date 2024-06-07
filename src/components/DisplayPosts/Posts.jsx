import Loading from "../../shared/Loading/Loading";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import PostCard from "./PostCard";
import usePosts from "../../hooks/usePosts";

const Posts = () => {
  const [posts, isPending] = usePosts();
  

  if (isPending) {
    return <Loading />;
  }


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
