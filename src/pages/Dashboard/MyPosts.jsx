import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading/Loading";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyPosts = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: posts = [], isPending, refetch } = useQuery({
    queryKey: ["posts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (post) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/posts/${post._id}`)
        .then(res => {
           if(res.data.deletedCount > 0){
            refetch();
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Successfully Removed",
              showConfirmButton: false,
              timer: 1500
            });
           }
        })
        .catch(error => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: error,
            showConfirmButton: false,
            timer: 1500
          });
        })
      }
    });
    
  }

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
                    <Link to={`/comments/${post._id}`}><button className="btn btn-secondary">View Comments</button></Link>
                  </td>
                  <th>
                    <button onClick={() => handleDelete(post)} className="btn btn-error text-white">Delete</button>
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
