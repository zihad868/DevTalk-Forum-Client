import { useForm, Controller } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import moment from "moment";
import useUser from "../../hooks/useUser";
import usePostEmail from "../../hooks/usePostEmail";
import { Link } from "react-router-dom";
import Ban from "../../shared/Ban";

const options = [
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
  { value: "python", label: "Python" },
  { value: "django", label: "Django" },
  { value: "flask", label: "Flask" },
  { value: "c", label: "C" },
  { value: "ruby", label: "Ruby" },
];

const AddPost = () => {
  const axiosSecure = useAxiosSecure();
  const imageApi = import.meta.env.VITE_IMAGE_BB_API;
  const { user } = useAuth();
  const { displayName: authName, email: authEmail, photoURL: authPhoto } = user;

  const [dbUser] = useUser();
  const [userPost] = usePostEmail();
  console.log(dbUser);
  const postLength = Object.keys(userPost).length;

  console.log("post", postLength, typeof postLength);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { title, description, tag, image } = data;

    // upload image
    const formData = new FormData();
    formData.append("image", image[0]);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageApi}`,
        formData
      );
      const imageUrl = response.data.data.display_url;
      const upVote = 0;
      const downVote = 0;
      const postImage = imageUrl;
      const postTag = tag?.value;
      const createDate = moment().format("MMMM Do YYYY, h:mm:ss a");

      console.log(tag);
      const postInfo = {
        authName,
        authEmail,
        authPhoto,
        title,
        description,
        postImage,
        postTag,
        upVote,
        downVote,
        createDate,
      };
      console.log(postInfo);

      const res = await axiosSecure.post("/post", postInfo);

      if (res.data?.insertedId) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Post Add Success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top",
          icon: "error",
          title: `Post Failed`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: `Please Select Post Image`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if(dbUser?.status === "ban"){
    return <Ban />
  }

  if (
    dbUser?.badge === "gold" ||
    (dbUser?.badge === "bronze" && postLength < 5)
  ) {
    return (
      <div>
        <div className="mt-12">
          <SectionTitle header="Add Post" />
        </div>
        <div className="border-2 p-4 ml-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
                htmlFor="title"
              >
                Post Title
              </label>
              <input
                className="input input-bordered w-full"
                placeholder="Post Title"
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
                Post Description
              </label>
              <textarea
                className="textarea textarea-bordered textarea-lg w-full max-w-full"
                placeholder="Post Description"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="text-red-500">
                  Description field is required
                </span>
              )}
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
                htmlFor="tag"
              >
                Select Tag
              </label>
              <Controller
                name="tag"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={options}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption)
                    }
                  />
                )}
                rules={{ required: true }}
              />
              {errors.tag && (
                <span className="text-red-500">Tag field is required</span>
              )}
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 "
                  htmlFor="loggingPassword"
                >
                  Upload Your Image
                </label>
              </div>

              <br />
              <input
                {...register("image")}
                type="file"
                className="file-input w-full max-w-xs"
              />
              <br />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-12 flex justify-between mx-72 items-center">
        <SectionTitle header={"Please Pay More Post"} />
        <div>
          <Link to="/payment">
            <button className="btn btn-error ml-8">Pay</button>
          </Link>
        </div>
      </div>
    );
  }
};

export default AddPost;
