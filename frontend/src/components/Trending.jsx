export default function Trending({ darkMode, posts = []}) {
  const hashtags = [
    { tag: "#react", count: 12 },
    { tag: "#frontend", count: 9 },
    { tag: "#javascript", count: 8 },
    { tag: "#nodejs", count: 6 },
    { tag: "#mongodb", count: 5 },
    { tag: "#tailwind", count: 4 },
  ];

  return (
   <div
  className={`rounded-2xl shadow-lg p-5 ${
    darkMode
      ? "bg-slate-900 text-white"
      : "bg-white"
  }`}
>
      <h2 className="text-xl font-bold mb-5">
        🔥 Trending
      </h2>

      {hashtags.map((item, index) => (
        <div
          key={index}
          className={`p-3 mb-3 rounded-xl transition hover:scale-105 cursor-pointer ${
            darkMode
              ? "hover:bg-slate-700"
              : "hover:bg-gray-100"
          }`}
        >
          <p className="text-blue-500 font-semibold">
            {item.tag}
          </p>

          <p className="text-sm text-gray-500">
            {item.count} posts
          </p>
        </div>
      ))}
    </div>
  );
}