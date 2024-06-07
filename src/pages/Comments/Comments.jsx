import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading/Loading";

const Comments = () => {
  const params = useParams();
  const axiosSecure = useAxiosSecure();
  const postId = params.id;

  const {
    data: post = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/post/${postId}`);
      return res.data;
    },
  });

  console.log(post);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-24 w-9/12 mx-auto">
     <h3 className="text-2xl font-semibold mb-4">{post.title}</h3>
      <div>
        <img className="w-full h-full" src={post.postImage} alt="" />

        {/* Button */}
        <div className="flex justify-between mt-2">
          <div className="flex">
            <button type="button" className="flex items-center p-1 space-x-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Number of likes"
                className="w-8 h-8 fill-current dark:text-violet-600"
              >
                <path d="M126.638,202.672H51.986a24.692,24.692,0,0,0-24.242,19.434,487.088,487.088,0,0,0-1.466,206.535l1.5,7.189a24.94,24.94,0,0,0,24.318,19.78h74.547a24.866,24.866,0,0,0,24.837-24.838V227.509A24.865,24.865,0,0,0,126.638,202.672ZM119.475,423.61H57.916l-.309-1.487a455.085,455.085,0,0,1,.158-187.451h61.71Z"></path>
                <path d="M494.459,277.284l-22.09-58.906a24.315,24.315,0,0,0-22.662-15.706H332V173.137l9.573-21.2A88.117,88.117,0,0,0,296.772,35.025a24.3,24.3,0,0,0-31.767,12.1L184.693,222.937V248h23.731L290.7,67.882a56.141,56.141,0,0,1,21.711,70.885l-10.991,24.341L300,169.692v48.98l16,16H444.3L464,287.2v9.272L396.012,415.962H271.07l-86.377-50.67v37.1L256.7,444.633a24.222,24.222,0,0,0,12.25,3.329h131.6a24.246,24.246,0,0,0,21.035-12.234L492.835,310.5A24.26,24.26,0,0,0,496,298.531V285.783A24.144,24.144,0,0,0,494.459,277.284Z"></path>
              </svg>
              <span>{post.upVote}</span>
            </button>

            <button type="button" className="flex items-center p-1 space-x-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Number of dislikes"
                className="ml-8 w-8 h-8 fill-current dark:text-red-600"
              >
                <path d="M126.638 309.328h-74.652c-10.433 0-19.474-6.626-23.042-16.335a487.118 487.118 0 0 1-1.466-206.535l1.5-7.189c3.889-10.167 13.431-16.355 23.08-16.355h74.548c13.664 0 24.837 11.173 24.837 24.838v206.217c0 13.665-11.174 24.838-24.837 24.838zM119.475 88.39h-61.559l-.309 1.487a455.096 455.096 0 0 0 .158 187.451h61.71v-189.517zM494.459 234.716l-22.09 58.906a24.315 24.315 0 0 1-22.662 15.706H332v30.535l9.573 21.2c-20.801 45.412-63.801 55.45-92.8 29.1a24.3 24.3 0 0 1-31.767-12.1L184.693 289.063V264h23.731L290.7 444.118a56.141 56.141 0 0 0 21.711-70.885l-10.991-24.341L300 342.308v-48.98l16-16h100.3l19.7-57.508v-9.272l-67.988-128.931H271.07l-86.377 50.67v-37.1L256.7 67.367a24.222 24.222 0 0 1 12.25-3.329h131.6c9.509 0 17.67 4.496 21.035 12.234l72.25 132.4a24.26 24.26 0 0 1 2.165 11.969v12.748a24.144 24.144 0 0 1-1.541 11.849z"></path>
              </svg>
              <span>{post.downVote}</span>
            </button>
          </div>
          <div>
            <button
              type="button"
              title="Share post"
              className="flex items-center justify-center"
            >
              <span>5</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="ml-2 w-7 h-7 fill-current"
              >
                <path d="M474.444,19.857a20.336,20.336,0,0,0-21.592-2.781L33.737,213.8v38.066l176.037,70.414L322.69,496h38.074l120.3-455.4A20.342,20.342,0,0,0,474.444,19.857ZM337.257,459.693,240.2,310.37,389.553,146.788l-23.631-21.576L215.4,290.069,70.257,232.012,443.7,56.72Z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Post Description */}
        <div>
           <h3 className="text-xl mb-4">{post.description}</h3>
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Comments"
            className="input input-bordered w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
