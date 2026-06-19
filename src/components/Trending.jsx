export default function Trending({ darkMode }) {
  const hashtags = [
    "#react",
    "#javascript",
    "#mongodb",
    "#nodejs",
    "#frontend",
  ];

  return (
    <div
      className={`p-4 rounded-xl shadow-lg ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">
        🔥 Trending
      </h2>

      {hashtags.map((tag, index) => (
        <div
          key={index}
          className="mb-3 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
        >
          <p className="font-semibold text-blue-500">
            {tag}
          </p>
          <p className="text-sm text-gray-500">
            {Math.floor(Math.random() * 1000) + 100} posts
          </p>
        </div>
      ))}
    </div>
  );
}