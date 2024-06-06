import { useForm, Controller } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const AddPost = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { title, description, tag } = data;

    console.log(title, description, tag.value)
  };

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
              <span className="text-red-500">Description field is required</span>
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
                  onChange={(selectedOption) => field.onChange(selectedOption)}
                />
              )}
              rules={{ required: true }}
            />
            {errors.tag && (
              <span className="text-red-500">Tag field is required</span>
            )}
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
};

export default AddPost;
