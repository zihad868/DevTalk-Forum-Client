import Swal from "sweetalert2";
import useAllUsers from "../../hooks/useAllUsers";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading/Loading";
import { RiAdminFill } from "react-icons/ri";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, refetch, isPending] = useAllUsers();

  if (isPending) {
    return <Loading />;
  }

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/admin/${id}`)
        if(res.data.modifiedCount > 0){
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Make Admin Success",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    });
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id}>
              <th>{idx+1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={user?.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {user?.name}
              </td>
              <td>{user?.email}</td>
              <th>
                 {
                    user?.role === 'admin' ? 'Admin' : 
                    <>
                      <button onClick={() => handleMakeAdmin(user._id)} className="btn btn-secondary"><RiAdminFill />Make Admin</button>
                    </>
                 }
              </th>
              <th>
              <button className="btn btn-error">Delete User</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
