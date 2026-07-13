import { useState } from "react";

export default function PostCard({
  id,
  user,
  text,
  image,
  avatar,
  time,
  onDelete,
  darkMode,
  likesData,
  profile,
  isMyPost,
  currentUserId,
  onBookmark,
  addNotification,
  isFollowing,
  toggleFollow,
  onRepost,
  onEdit,
  edited,
  totalLikes,
  setTotalLikes,
  totalcomments,
  setTotalComments,
  totalBookmarks,
  setTotalBookmarks,
}) {
  const [liked, setLiked] = useState(
  likesData?.includes(profile?._id) || false
);

const [likes, setLikes] = useState(
  likesData?.length || 0
);
  const [isEditing, setIsEditing] = useState(false);
const [editedText, setEditedText] = useState(text);
  const [saved, setSaved] = useState(false);
  const[shared, setShared] = useState(false);
  const[quoted , setQuoted] = useState(false);
  const [quoteText, setQuoteText] = useState("");
  const [showEmoji , setShowEmoji] = useState(false);
  const[showImage, setShowImage] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

 const addComment = () => {
  if (comment.trim() === "") return;

  setComments([...comments, comment]);
  setTotalComments((prev)=> prev + 1);

  if (addNotification) {
    addNotification({
      message: `💬 You commented on $${typeof user === "object" ? user.name : user}'s post`,
      time: "Just now",
    });
  }

  setComment("");
};
const emojis = [
  "😀",
  "😂",
  "😍",
  "🥳",
  "😎",
  "🔥",
  "❤️",
  "👍",
  "👏",
  "💯",
  "🎉",
  "🚀",
];

  return (
    <div
      className={`rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mt-5 ${
        darkMode
          ? "bg-slate-900 text-white border border-slate-700"
          : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center">

        <div className="flex gap-3 items-center">
          <img
            src={avatar ||
              "https://i.pravatar.cc/150?img=12"}
            alt="avatar"
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <h3 className="font-bold text-lg">
              {typeof user === "object" ?
              user.name : user}
            </h3>

            <p className="text-sm text-gray-500">
              Frontend Developer
            </p>

            <p className="text-xs text-gray-400">
              {time}
            </p>
          </div>
        </div>

      {!isMyPost && (
  <button
    onClick={() => {
  const username =
    typeof user === "object" ? user.name : user;

  toggleFollow(username);

  addNotification?.({
    message: isFollowing
      ? `➖ You unfollowed ${username}`
      : `➕ You followed ${username}`,
    time: "Just now",
  });
}}
    className={`px-4 py-1 rounded-lg text-white text-sm transition ${
      isFollowing
        ? "bg-red-500 hover:bg-red-600"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
  >
    {isFollowing ? "Unfollow" : "Follow"}
  </button>
)}

      </div>

      {isEditing ? (
  <textarea
    value={editedText}
    onChange={(e) => setEditedText(e.target.value)}
    rows="4"
    className={`mt-4 w-full rounded-lg border p-3 ${
      darkMode
        ? "bg-slate-700 border-slate-600 text-white"
        : "bg-white border-gray-300"
    }`}
  />
) : (
  <p className="mt-4 leading-7">
    {text.split(" ").map((word, index) =>
      word.startsWith("#") ? (
        <span
          key={index}
          className="text-blue-500 font-semibold"
        >
          {word}{" "}
        </span>
      ) : (
        word + " "
      )
    )}

    {edited && (
      <span className="text-gray-400 text-sm ml-2">
        (Edited)
      </span>
    )}
  </p>
)}
      {image && (
        <div className="mt-4" flex justify-center >
  <img
    src={image}
    alt="post"
    onClick={() => setShowImage(true)}
    className="w-auto max-w-sm h-56 object-cover rounded-xl cursor-pointer hover:opacity-90 transition shadow-md"
  />
  </div>
)}
{showImage && (
  <div
    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    onClick={() => setShowImage(false)}
  >
    <button
      className="absolute top-5 right-6 text-white text-4xl"
      onClick={() => setShowImage(false)}
    >
      ✕
    </button>

    <img
      src={image}
      alt="Full"
      onClick={(e) => e.stopPropagation()}
      className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
    />
  </div>
)}
      <div className="flex gap-6 mt-5 text-sm font-medium">

        <button
         onClick={async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/posts/like/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const updatedPost = await res.json();

    const likedByMe = 
    updatedPost.likes.some(
      (id) => id.toString() ===
      profile._id
    );

    setLiked(likedByMe);
    setLikes(updatedPost.likes.length);

    if (likedByMe) {
      setTotalLikes((prev) => prev + 1);
    } else {
      setTotalLikes((prev) => prev - 1);
    }
  } catch (err) {
    console.log(err);
  }
}}
          className="hover:text-blue-500 transition"
        >
          {liked
            ? `❤️ Liked (${likes})`
            : `🤍 Like (${likes})`}
        </button>

        <button
          className="hover:text-blue-500 transition"
        >
          💬 Comment
        </button>

        <button
  onClick={() => {
    setSaved(!saved);

    if (!saved && onBookmark) {
      onBookmark({
        user,
        text,
        image,
        avatar,
        time,
      });
    }
  }}
>
  {saved ? "📌 Saved" : "📌 Save"}
</button>
        <button
  onClick={() => {
    navigator.clipboard.writeText(text);
    setShared(true);

    setTimeout(() => {
      setShared(false);
    }, 2000);
  }}
>
  {shared ? "✅ Shared" : "📤 Share"}
</button>
{isMyPost && !isEditing && (
  <button
    onClick={() => setIsEditing(true)}
    className="hover:text-yellow-500 transition"
  >
    ✏ Edit
  </button>
)}

{isEditing && (
  <>
    <button
      onClick={() => {
        onEdit(editedText);
        setIsEditing(false);

        addNotification &&
          addNotification({
            message: "✏️ You edited your post",
            time: "Just now",
          });
      }}
      className="text-green-500 hover:text-green-600"
    >
      💾 Save
    </button>

    <button
      onClick={() => {
        setEditedText(text);
        setIsEditing(false);
      }}
      className="text-gray-500 hover:text-gray-700"
    >
      ❌ Cancel
    </button>
  </>
)}

       {isMyPost && (
<button
onClick={onDelete}
className="ml-auto text-red-500 hover:text-red-700 transition"
>
🗑 Delete
</button>
)}

      </div>
        {quoted && (
  <div className="mt-4">
    <textarea
      value={quoteText}
      onChange={(e) => setQuoteText(e.target.value)}
      placeholder="Write your thoughts..."
      className={`w-full p-3 rounded-lg border ${
        darkMode
          ? "bg-slate-700 border-slate-600 text-white"
          : "bg-white border-gray-300"
      }`}
    />

    <button
      onClick={() => {
        if (onRepost) {
          onRepost({
            user: profile.name,
            text: `${quoteText}\n\n🔁 ${text}`,
            image,
            profilePic: profile.profilePic,
            avatar: profile.profilePic,
            time: "Just now",
            reposted: true,
          });
        }

        setQuoted(false);
        setQuoteText("");

        if (addNotification) {
          addNotification({
            message: `💬 You quoted ${typeof user === "object" ? user.name : user}'s post`,
            time: "Just now",
          });
        }
      }}
      className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"
    >
      Post Quote
    </button>
  </div>
)}
      {/* Comment Box */}
      <div className="mt-5">

        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          className={`w-full rounded-lg border p-2 outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode
              ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400"
              : "bg-white border-gray-300"
          }`}
        />
        <div className="mt-2 flex items-center gap-2 flex-wrap">
  <button
    onClick={() => setShowEmoji(!showEmoji)}
    className="px-3 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500"
  >
    😊 Emoji
  </button>

  {showEmoji && (
    <div
      className={`flex flex-wrap gap-2 p-3 rounded-lg ${
        darkMode ? "bg-slate-700" : "bg-gray-100"
      }`}
    >
      {emojis.map((emoji) => (
        <button
          key={emoji}
          onClick={() => setComment((prev) => prev + emoji)}
          className="text-2xl hover:scale-125 transition"
        >
          {emoji}
        </button>
      ))}
    </div>
  )}
</div>

        <button
          onClick={addComment}
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Add Comment
        </button>
        <button
  onClick={() => {
    if (onRepost) {
      onRepost({
        user: profile.name,
        text,
        image,
        profilePic: profile.profilePic,
        avatar: profile.profilePic,
        time: "Just now",
        reposted: true,
      });
    }

    if (addNotification) {
      addNotification({
        message: `🔁 You reposted ${typeof user === "object" ? user.name : user}'s post`,
        time: "Just now",
      });
    }
  }}
  className="hover:text-green-500 transition"
>
  🔁 Repost
</button>
<button
  onClick={() => setQuoted(!quoted)}
  className="hover:text-purple-500 transition"
>
  💬 Quote
</button>

        {comments.length > 0 && (
          <div className="mt-4 space-y-2">
            {comments.map((c, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? "bg-slate-700"
                    : "bg-gray-100"
                }`}
              >
                💬 {c}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}