import { Link } from "react-router-dom";
import usePosts from "../../hooks/usePosts";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import Loading from "../../shared/Loading/Loading";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAllUsers from "../../hooks/useAllUsers";

const ReportedActivities = () => {
  const [posts, isPending, refetch] = usePosts();
  const [users] = useAllUsers();
  const axiosSecure = useAxiosSecure();

  console.log(users);
  console.log(posts);

  const handleBanUser = (post) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Ban ${post.authEmail}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure
          .post(`/api/ban/user/${post?.authEmail}`)
          .then(() => {
            refetch();
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Successfully Ban",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch(() => {
            Swal.fire({
              position: "top",
              icon: "error",
              title: "Fail tot Ban",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  const handleDelete = (post) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/posts/${post._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: "top",
                icon: "success",
                title: "Successfully Removed",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: error,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="mt-10">
      <SectionTitle header={"Reported Activities"} />
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Post Title</th>
                <th>Email</th>
                <th>Number of votes</th>
                <th>Comment</th>
                <th>Action</th>
                <th>Dismiss</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idx) => (
                <tr key={post._id}>
                  <th>{idx + 1}</th>
                  <td>
                    {post?.title.split(" ").slice(0, 3).join(" ") + "..."}
                  </td>
                  <td>{post?.authEmail}</td>
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
                    <Link to={`/comments/${post._id}`}>
                      <button className="btn btn-secondary">
                        View Comments
                      </button>
                    </Link>
                  </td>
                  <th>
                    <button
                      onClick={() => handleDelete(post)}
                      className="btn btn-error text-white"
                    >
                      Delete
                    </button>
                  </th>
                  {post?.status === "ban" ? (
                    <>
                    <th>
                        <button className="btn btn-error text-white">Suspended</button>
                      </th>
                    </>
                  ) : (
                    <>
                      <th>
                        <button
                          onClick={() => handleBanUser(post)}
                          className="btn btn-error text-white"
                        >
                          Ban user
                        </button>
                      </th>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportedActivities;
