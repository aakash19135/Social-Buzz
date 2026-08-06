export default function Bookmarks({ darkMode, bookmarks }) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-xl ${
        darkMode
          ? "bg-slate-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-5">
        📌 Bookmarks
      </h2>

      {bookmarks.length === 0 ? (
        <p className="text-gray-500">
          No bookmarked posts yet.
        </p>
      ) : (
        bookmarks.map((post, index) => (
          <div
            key={index}
            className={`mb-4 p-4 rounded-xl border ${
              darkMode
                ? "border-slate-700"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={post.avatar}
                alt=""
                className="w-10 h-10 rounded-full"
              />

              <div>
                <h3 className="font-bold">
                  {post.user}
                </h3>

                <p className="text-sm text-gray-500">
                  {post.time}
                </p>
              </div>
            </div>

            <p className="mt-3">
              {post.text}
            </p>

            {post.image && (
              <img
                src={post.image}
                alt=""
                className="rounded-xl mt-3"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}