import useAllUsers from "../../hooks/useAllUsers";
import Loading from "../../shared/Loading/Loading";
import { RiAdminFill } from "react-icons/ri";

const AllUsers = () => {
  const [users, refetch, isPending] = useAllUsers();

  if (isPending) {
    return <Loading />;
  }

  const handleMakeAdmin = (id) => {
    console.log(id)
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
                      <button onClick={handleMakeAdmin} className="btn btn-secondary"><RiAdminFill />Make Admin</button>
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
