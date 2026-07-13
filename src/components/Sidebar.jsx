import { NavLink } from "react-router-dom";

export default function Sidebar({ 
  darkMode, toggleDarkMode, profile, onLogout }) {
  return (
    <div
      className={`rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 ${
        darkMode
          ? "bg-slate-900 text-white border border-slate-700"
          : "bg-white text-black"
      }`}
    >
      <div
        className={`text-center rounded-2xl p-5 border ${
          darkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <img
  src={
    profile.profilePic ||
    "https://ui-avatars.com/api/?name=" + encodeURIComponent(profile.name)
  }
  alt="profile"
  className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500 shadow-lg object-cover"
/>
        <div className="flex justify-center items-center mt-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="ml-2 text-sm text-green-500">
            Online
          </span>
        </div>

        <h2 className="text-2xl font-bold mt-3">
          {profile.name}
        </h2>

        <p
          className={
            darkMode
              ? "text-gray-300"
              : "text-gray-500"
          }
        >
          Frontend Developer
        </p>

        <div
          className={`flex justify-around mt-5 pt-4 border-t ${
            darkMode
              ? "border-slate-600"
              : "border-gray-300"
          }`}
        >
          <div>
            <h3 className="text-xl font-bold">
              120
            </h3>
            <p className="text-sm text-gray-400">
              Posts
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold">
              450
            </h3>
            <p className="text-sm text-gray-400">
              Followers
            </p>
          </div>
        </div>
      </div>

      
      <div className="mt-7 space-y-3">

    <NavLink
  to="/"
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "hover:bg-blue-500 hover:text-white"
    }`
  }
>
  🏠 Home
</NavLink>

       <NavLink
  to="/profile"
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "hover:bg-blue-500 hover:text-white"
    }`
  }
>
  👤 Profile
</NavLink>

        <NavLink
  to="/trending"
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "hover:bg-blue-500 hover:text-white"
    }`
  }
>
  🔥 Trending
</NavLink>

        <NavLink
  to="/notifications"
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "hover:bg-blue-500 hover:text-white"
    }`
  }
>
          🔔 Notifications
        </NavLink>

       <NavLink
  to="/bookmarks"
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "hover:bg-blue-500 hover:text-white"
    }`
  }
>
  📌 Bookmarks
</NavLink>
    <NavLink
  to="/dashboard"
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "hover:bg-blue-500 hover:text-white"
    }`
  }
>
  📊 Dashboard
</NavLink>

<button
  onClick={toggleDarkMode}
  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
    darkMode
      ? "bg-yellow-400 hover:bg-yellow-500 text-black"
      : "bg-slate-800 hover:bg-slate-900 text-white"
  }`}
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>

  <button
    onClick={onLogout}
    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
  >
    Logout
  </button>
</div>
</div>
  );
}