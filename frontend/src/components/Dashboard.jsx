export default function Dashboard({
  darkMode,
  posts,
  totalLikes,
  totalComments,
  totalBookmarks,
}) {
  const followers = 450;
  const following = 180;

  const engagement =
    posts.length === 0
      ? 0
      : (
          ((totalLikes +
            totalComments +
            totalBookmarks) /
            posts.length) *
          100
        ).toFixed(1);

  const cards = [
    {
      title: "Posts",
      value: posts.length,
      icon: "📝",
    },
    {
      title: "Likes",
      value: totalLikes,
      icon: "❤️",
    },
    {
      title: "Comments",
      value: totalComments,
      icon: "💬",
    },
    {
      title: "Bookmarks",
      value: totalBookmarks,
      icon: "📌",
    },
    {
      title: "Followers",
      value: followers,
      icon: "👥",
    },
    {
      title: "Following",
      value: following,
      icon: "👤",
    },
  ];

  return (
    <div
      className={`rounded-2xl p-6 shadow-xl ${
        darkMode
          ? "bg-slate-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">
        📊 Creator Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-4">

        {cards.map((card) => (
          <div
            key={card.title}
            className={`rounded-xl p-5 ${
              darkMode
                ? "bg-slate-700"
                : "bg-gray-100"
            }`}
          >
            <div className="text-3xl">
              {card.icon}
            </div>

            <h2 className="mt-3 text-xl font-bold">
              {card.value}
            </h2>

            <p className="text-gray-500">
              {card.title}
            </p>
          </div>
        ))}

      </div>

      <div
        className={`mt-8 rounded-xl p-5 ${
          darkMode
            ? "bg-slate-700"
            : "bg-blue-50"
        }`}
      >
        <h2 className="text-xl font-bold">
          📈 Engagement Rate
        </h2>

        <p className="text-4xl mt-3 font-bold text-blue-500">
          {engagement}%
        </p>
      </div>
    </div>
  );
}