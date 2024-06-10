import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import moment from "moment";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { displayName: authName, email: authEmail, photoURL: authPhoto } = user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { title, description } = data;

    const createDate = moment().format("MMMM Do YYYY, h:mm:ss a");

    const announcementInfo = {
        authName,
        authEmail,
        authPhoto,
        title,
        description,
        createDate,
    };
    console.log("Submitting announcement:", announcementInfo);

    try {
        const res = await axiosSecure.post("/announcement", announcementInfo);
        console.log("Server response:", res);
        if(res?.data.result?.insertedId){
          Swal.fire({
            position: "top",
            icon: "success",
            title: `Announcement Send Success`,
            showConfirmButton: false,
            timer: 1500,
        });
        }
        
    } catch (error) {
        console.error("Error sending announcement:", error);
        Swal.fire({
            position: "top",
            icon: "error",
            title: `Announcement Send Failed: ${error.message}`,
            showConfirmButton: false,
            timer: 1500,
        });
    }
};


  return (
    <div>
      <div className="mt-12">
        <SectionTitle header="Make announcement" />
      </div>
      <div className="border-2 p-4 ml-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="title"
            >
              Announcement Title
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="Announcement Title"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500">Title field is required</span>
            )}
          </div>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="description"
            >
              Announcement Description
            </label>
            <textarea
              className="textarea textarea-bordered textarea-lg w-full max-w-full"
              placeholder="Announcement Description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-red-500">
                Description field is required
              </span>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Create Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
