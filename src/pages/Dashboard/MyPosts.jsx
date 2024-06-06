import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading/Loading";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";

const MyPosts = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: posts = [], isPending } = useQuery({
    queryKey: ["posts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${user?.email}`);
      return res.data;
    },
  });

  console.log(posts);

  if (isPending || loading) {
    return <Loading />;
  }

  return (
    <div className="mt-10">
      <SectionTitle header={"My Post"} />
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Post Title</th>
                <th>Number of votes</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idx) => (
                <tr key={post._id}>
                  <th>{idx + 1}</th>
                  <td>{post?.title}</td>
                  <td className="grid grid-cols-2">
                    <span>
                      <span>UpVote</span>
                      <br />
                      <span>DownVote</span>
                    </span>
                    <span>
                      {post?.upVote}
                      <br />
                      {post?.upVote}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-secondary">View Comments</button>
                  </td>
                  <th>
                    <button className="btn btn-error text-white">Delete</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
