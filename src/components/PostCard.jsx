import { useState } from "react";

export default function PostCard({
  user,
  text,
  image,
  avatar,
  time,
  onDelete,
  darkMode,
}) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const [saved, setSaved] = useState(false);
 const [isFollowing, setIsFollowing] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
 

  const addComment = () => {
    if (comment.trim() === "") return;

    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <div
  className={`rounded-xl p-4 shadow-lg mb-4 ${
    darkMode
      ? "bg-gray-800 text-white"
      : "bg-white text-black"
  }`}
>
      {/* User */}
      <div className="flex items-center justify-between">
  <div className="flex items-center gap-3">
    <img
      src={avatar}
      alt="avatar"
      className="w-10 h-10 rounded-full"
    />

    <div>
      <h3 className="font-bold">{user}</h3>

      <p className="text-gray-400 text-sm">
        Frontend Developer
      </p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
  {user !== "Aakash" && (
    <button
      onClick={() =>
        setIsFollowing(!isFollowing)
      }
      className={`px-3 py-1 rounded-lg text-white text-sm ${
        isFollowing
          ? "bg-red-500"
          : "bg-blue-500"
      }`}
    >
      {isFollowing
        ? "Unfollow"
        : "Follow"}
    </button>
  )}
</div>

      {/* Text */}
      <p className="mt-3">
        {text.split(" ").map((word, index) =>
          word.startsWith("#") ? (
            <span
              key={index}
              className="text-blue-400 font-semibold"
            >
              {word}{" "}
            </span>
          ) : (
            word + " "
          )
        )}
      </p>

      {/* Image */}
      {image && (
        <img
          src={image}
          alt="post"
          className="w-full rounded-lg mt-3"
        />
      )}

      {/* Actions */}
      <div className="mt-4 flex items-center gap-5">

        <button
          onClick={() => {
            setLiked(!liked);

            if (!liked) {
              setLikes(likes + 1);
            } else {
              setLikes(likes - 1);
            }
          }}
        >
          {liked
            ? `❤️ Liked (${likes})`
            : `🤍 Like (${likes})`}
        </button>

        <button>
          💬 Comment
        </button>

        <button
          onClick={() => setSaved(!saved)}
        >
          {saved ? "📌 Saved" : "📌 Save"}
        </button>

        <button
          onClick={onDelete}
          className="ml-auto text-red-400 hover:text-red-600"
        >
          🗑 Delete
        </button>

      </div>

      {/* Comment Box */}
      <div className="mt-4">

        <input
          type="text"
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          placeholder="Write a comment..."
          className="w-full p-2 rounded text-black"
        />

        <button
          onClick={addComment}
          className="bg-blue-500 px-3 py-1 rounded mt-2"
        >
          Add Comment
        </button>

        <div className="mt-2">
          {comments.map((c, index) => (
            <p
              key={index}
              className="border-b border-gray-600 py-1"
            >
              💬 {c}
            </p>
          ))}
        </div>

      </div>

    </div>
  );
}