export default function Notifications({
  darkMode,
  notifications,
}) {
  return (
    <div
      className={`rounded-2xl shadow-xl p-6 ${
        darkMode
          ? "bg-slate-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">
        🔔 Notifications
      </h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500">
          No notifications yet.
        </p>
      ) : (
        notifications.map((item, index) => (
          <div
            key={index}
            className={`mb-4 p-4 rounded-xl ${
              darkMode
                ? "bg-slate-700"
                : "bg-gray-100"
            }`}
          >
            <p>{item.sender?.name}{item.type}d
              your post
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {new
              Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}