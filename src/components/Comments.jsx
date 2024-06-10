import { useState } from 'react';

const Comments = ({ comment }) => {
  const [showFullText, setShowFullText] = useState(false);

  if (!comment?.text) return null;

  const { name, email, userImage, comment: commentText } = comment.text.commentInfo;
  const date = comment.date ? new Date(comment.date).toLocaleDateString() : "Unknown date";

  const toggleShowFullText = () => {
    setShowFullText((prev) => !prev);
  };

  const previewText = commentText.slice(0, 20); // Show the first 20 characters as a preview

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
        <p className="text-sm dark:text-gray-600">
          {showFullText ? commentText : previewText}
          {commentText && commentText.length > 10 && (
            <span
              onClick={toggleShowFullText}
              className="text-blue-500 cursor-pointer ml-2"
            >
              {showFullText ? "Show less" : "Read more"}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Comments;
