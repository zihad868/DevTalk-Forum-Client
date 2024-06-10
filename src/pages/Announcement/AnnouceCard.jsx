const AnnouceCard = ({announce}) => {
    console.log(announce);

    const {authPhoto, authName, createDate, description, title} = announce;
  return (
    <div className="rounded-md shadow-md mx-auto sm:w-96 dark:bg-gray-50 dark:text-gray-800">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <img
            src={authPhoto}
            alt=""
            className="object-cover object-center w-8 h-8 rounded-full shadow-sm dark:bg-gray-500 dark:border-gray-300"
          />
          <div className="-space-y-1">
            <h2 className="text-sm font-semibold leading-none">
              {authName}
            </h2>
            <span className="inline-block text-xs leading-none dark:text-gray-600">
              {createDate}
            </span>
          </div>
        </div>

      </div>

      <div className="p-2">
        <div className="flex flex-wrap items-center pb-3 ">
            <span>{title}</span>
          <div className="flex items-center space-x-2">        
            <span className="text-sm">
              {description}
            </span>
          </div>
        </div>
        {/* <div className="space-y-8">

          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full py-0.5 dark:bg- border-none rounded text-sm pl-0 dark:text-gray-800"
          />
        </div> */}
      </div>
    </div>
  );
};

export default AnnouceCard;
