import { useState } from "react";
import PostCard from "./PostCard";
export default function Feed({ darkMode }) {
   const [posts, setPosts] = useState([
    {
  id: 1,
  user: "Aakash",
  text: "Hello Social Feed 🚀 #react #frontend",
  image: null,
  avatar: "https://i.pravatar.cc/150?img=1",
  time: "2 hours ago",
},

{
  id: 2,
  user: "Rahul",
  text: "Learning React today! #react #javascript",
  image: null,
  avatar: "https://i.pravatar.cc/150?img=2",
  time: "3 hours ago",
},

{
  id: 3,
  user: "Priya",
  text: "Building a social media app. #react #mongodb",
  image: null,
  avatar: "https://i.pravatar.cc/150?img=3",
  time: "5 hours ago",
},

{
  id: 4,
  user: "Ananya",
  text: "Just posted my first blog! #javascript",
  image: null,
  avatar: "https://i.pravatar.cc/150?img=4",
  time: "1 day ago",
},

{
  id: 5,
  user: "Rohit",
  text: "Exploring new features. #nodejs #mongodb",
  image: null,
  avatar: "https://i.pravatar.cc/150?img=5",
  time: "2 days ago",
},
  ]);
  const [newPost, setNewPost] = 
  useState("");
  const[search , setSearch] = useState("");
  const [image, setImage] = useState(null);
    const handlePost = () => {
  if (newPost.trim() === "") return;

  const post = {
    id: Date.now(),
    user: "Aakash",
    text: newPost,
    image: image,
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(
      Math.random() * 70
    )}`,
    time: "Just now",
  };
      setPosts([post, ...posts]);
      setNewPost("");
      setImage(null);
    }
  return (
    <div className="p-4">
      <input
  type="text"
  placeholder="Search posts..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className={`w-full border rounded p-3 mb-3 ${
    darkMode
      ? "bg-gray-800 text-white placeholder-gray-400"
      : "bg-white text-black"
  }`}
/>
     <textarea
  value={newPost}
  onChange={(e) => setNewPost(e.target.value)}
  placeholder="What's happening?"
  className={`w-full border rounded p-3 ${
    darkMode
      ? "bg-gray-800 text-white placeholder-gray-400"
      : "bg-white text-black"
  }`}
     />
     <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }}
  className="mt-2"
/>
{image &&(
    <img
    src={image}
    alt="preview"
    className="mt-2 max-h-60 object-cover rounded"
    />
)}
      <button 
      onClick={handlePost}
      className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Post
      </button>

      {posts
  .filter((post) =>
    post.text.toLowerCase().includes(search.toLowerCase())
  )
  .map((post) => (
        <PostCard
        key={post.id}
        id={post.id}
        user={post.user}
        text={post.text}
        avatar={post.avatar}
        darkMode={darkMode}
        image={post.image}
        time={post.time}
        onDelete={() => setPosts(posts.filter((p) => p.id !== post.id))}
        />
      ))}
      </div>
  );
}