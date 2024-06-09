const Comments = ({ comment }) => {
    if (!comment?.text) return null;
  
    const { name, email, userImage, comment: commentText } = comment.text.commentInfo;
    const date = comment.date ? new Date(comment.date).toLocaleDateString() : "Unknown date";
  
    return (
      <div className="flex space-x-4 mt-4 p-4 border-t border-gray-300">
        <img
          alt=""
          src={userImage || ""}
          className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
        />
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-semibold">{name}</span>
          <span className="text-sm font-semibold">{email}</span>
          <span className="text-xs dark:text-gray-600">{date}</span>
          <p className="text-sm dark:text-gray-600">{commentText}</p>
        </div>
      </div>
    );
  };
  
  export default Comments;
  